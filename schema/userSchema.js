const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
        type: String,
        required: true
  },
  email: {
        type: String,
        required: true
  },
  password: {
        type: String,
        required: true,
        select: false
  },
  otp: {
    type: String,
    default: ""
},
  balance: {
        type: Number,
        default: 0
  }
}, { timestamps: true });


const User = model('User', userSchema, 'users');

module.exports = { User };