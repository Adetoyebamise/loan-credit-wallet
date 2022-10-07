const { SUCCESS, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN } = require("../constants");
const { User } = require("../schema/userSchema");
const { Transaction } = require('../schema/transactionSchema');
const { tokenHandler, messageHandler, hashPassword, AlphaNumeric, verifyPassword } = require("../utils");

const userRegistrationService = async (payload) => {
      let user = new User(payload);
      user.password = await hashPassword(user.password);
      user = await user.save();
      user.password = undefined;

      return messageHandler("User Registered Successfully", true, SUCCESS, user);
}

const userLoginService = async (payload) => {
      const { email, password } = payload;
      const user = await User.findOne({ email }).select("+password");

      if(user === null) {
            return messageHandler("Invalid user", false, NOT_FOUND, {});
      }

      const isValid = await verifyPassword(password, user.password);
      if(isValid) {
            const token = tokenHandler(user);
            return messageHandler("User logged in successfully", true, SUCCESS, token);
      }

      return messageHandler("Invalid Email or password", false, UNAUTHORIZED, {});
}

const fundWalletService = async ({payload, params}) => {
      const user = await User.findOne({ _id: params.userId });

      if(user === null) {
            return messageHandler("Invalid user", false, NOT_FOUND, {});
      }

      const updatedUser = await User.updateOne({ _id: params.userId }, { $inc: { wallet: payload.amount }});

      user.balance = user.balance + payload.amount;
      if(updatedUser.modifiedCount > 0) {
            return messageHandler("Funds added to wallet", true, SUCCESS, user);
      }

      return messageHandler("Unable to complete request", false, BAD_REQUEST, {});
}

const transferFundsService = async ({payload, params}) => {
  const { accountNumber, amount, destinationAccountNumber } = payload
  const user = await User.findOne({ _id: params.userId });

  if(user === null) {
        return messageHandler("Invalid user", false, NOT_FOUND, {});
  }
      const reference = AlphaNumeric(5);
  
      const transaction = new Transaction();
      transaction.amount = -amount;
      transaction.operation = 'transfer';
      transaction.accountNumber = accountNumber;
      transaction.destinationAccountNumber = destinationAccountNumber;
      transaction.reference = 'transfer_to_account:' + destinationAccountNumber;
      const savedTransaction = await transaction.save();
      const savedUser = await User.findOne({ 'accountNumber': accountNumber });
  
      const transactionBeneficiary = new Transaction();
      transactionBeneficiary.amount = amount;
      transactionBeneficiary.operation = 'transfer';
      transactionBeneficiary.accountNumber = destinationAccountNumber;
      transactionBeneficiary.reference = 'transfer_from_account:' + accountNumber;
      const savedTransactionBeneficiary = await transactionBeneficiary.save();
  
      return messageHandler("successfully transfered the funds", true,  SUCCESS,{ transactionTo: savedTransactionBeneficiary,  transactionFrom: savedTransaction}) ;
}

const withdrawFundsService = async ({payload, params})  => {
      const { accountNumber, amount } = payload

      // const gatewayResponse = await simulateGatewayCall(card, amount);
      // const gatewayTransaction = new GatewayTransaction(gatewayResponse);
      // const savedGatewayTransaction = await gatewayTransaction.save();
      // if(savedGatewayTransaction.status === 'failure'){
      //     throw new APIError({
      //         message: 'Withdrawal Rejected',
      //         status: httpStatus.BAD_GATEWAY,
      //       });
      // }
  
      const transaction = new Transaction();
      transaction.amount = -amount;
      transaction.operation = 'withdrawal';
      transaction.accountNumber = accountNumber;
      transaction.reference = "withdrawal_gateway_transaction:"+transaction.id;
      const savedTransaction = await transaction.save();
      const savedUser = await User.findOne({ 'accountNumber': accountNumber }).populate();
      // const response = { transaction: transaction.transform(), customer: savedCustomer.transformBalance() }

      return messageHandler("Successfully Withdrew funds", true,  SUCCESS,{ transactionDetails: savedUser}) ;

};

module.exports = { userRegistrationService, userLoginService, fundWalletService, transferFundsService, withdrawFundsService };