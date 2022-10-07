const { Schema, model } = require('mongoose');
const User = require('./userSchema');

const transactionSchema = new Schema({
      userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
      },
      transactionId: {
            type: String,
            required: false
      },
      operation: {
            type: String,
            required: true,
            enum: ['deposit', 'withdrawal', 'transfer', 'fee'],
      },
            accountNumber: {
            type: 'Number',
            ref: 'User',
            required: false,
      },
            destinationAccountNumber: {
            type: 'Number',
            ref: 'User'
      },
      amount: {
            type: Number,
            default: 0,
            required: true,
      },
            reference: {
            type: String,
      },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema, 'transactions');

module.exports = { Transaction };