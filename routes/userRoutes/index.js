const router = require("express").Router()
const { validate } = require("../../validations/validate");
const { tokenVerifier } = require("../../utils")
const { checkSchema } = require('express-validator');

const { userRegistration, userLogin } = require("../../validations/userValidations/user");
const { addFunds } = require("../../validations/userValidations/wallet");

const { userRegistrationController, userLoginController, fundWalletController, transferFundsController,withdrawFundsController } = require("../../controllers/userController");

//  ROUTES
router.post("/register", validate(checkSchema(userRegistration)), userRegistrationController)
router.post("/login", validate(checkSchema(userLogin)), userLoginController)
router.put("/wallet/:userId", validate(checkSchema(addFunds)), fundWalletController)
router.post("/wallet/:userId/:recepientId", validate(checkSchema(addFunds)), transferFundsController)
router.post("/withdraw/:userId", validate(checkSchema(addFunds)), withdrawFundsController)


module.exports = router