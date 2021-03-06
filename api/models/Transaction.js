import {transactionTypes} from '../../config/transaction';

module.exports = {
  attributes: {
    fromAccount: {
      columnName: 'from_account',
      model: 'Account',
      required: true,
      index: true
    },
    toAccount: {
      columnName: 'to_account',
      model: 'Account',
      required: true,
      index: true
    },
    transactionType: {
      columnName: 'transaction_type',
      type: 'string',
      enum: transactionTypes,
      required: true
    },
    amount: {
      columnName: 'amount',
      type: 'integer',
      required: true
    },
    fee: {
      columnName: 'transaction_fee',
      type: 'float',
      required: true
    },
    totalAmount: {
      columnName: 'total_amount',
      type: 'float',
      required: true
    },
    note: {
      columnName: 'note',
      type: 'string'
    },
    everyPay: {
      columnName: 'everypay',
      model: 'EveryPay',
      index: true,
      unique: true
    }
  }
};
