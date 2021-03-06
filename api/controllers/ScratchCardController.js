import uuid from 'node-uuid';
import _ from 'lodash';

const generateScratchCard = (req, res) => {
  const amount = parseFloat(req.body.amount, 10);
  const count = parseInt(req.body.count, 10);
  const generationId = uuid.v4();
  const scratchcards = _.map(_.range(0, count), () => {
    const scratchId = Math.floor(Math.random() * 1000000000000);
    return {amount, generationId, scratchId};
  });
  return ScratchCard.create(scratchcards).then((sc) => {
    res.status(200).json(sc);
  }).catch((err) => res.status(500).json(err));
};

const useScratchCard = (req, res) => {
  const scID = req.body.scratch_card_id;
  const toAccount = req.user.id;

  return ScratchCard.update({scratchId: scID, status: 'active'}, {status: 'used'}).
  then((sc) => {
    if (!sc || sc.length === 0) {
      throw new Error('Invalid or Inactive ScratchCard');
    }
    return Transaction.create({from_account: 0, toAccount, transaction_type: 'CREDIT', amount: sc[0].amount, metadata: 'From scratch card'});
  }).
  then((t) => res.status(200).json(t)).
  catch((err) => res.status(400).json({err: err.message || err}));
};

const activateScratchCardGroup = (req, res) => {
  const generationId = req.body.generationId;
  const status = req.body.status || 'active';
  return ScratchCard.update({
    generationId
  }, {status}).then((sc) => res.status(200).json(sc)).catch((err) => res.status(200).json(err));
};

module.exports = {
  generateScratchCard,
  useScratchCard,
  activateScratchCardGroup
};
