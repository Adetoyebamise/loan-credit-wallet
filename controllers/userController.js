const { userRegistrationService, userLoginService, fundWalletService ,transferFundsService, withdrawFundsService} = require("../services/userService");

module.exports.userRegistrationController = async (req, res) => {
  try {
        const user = await userRegistrationService(req.body);

        res.status(user.statusCode).json({ user })
  } catch (error) {
        res.status(500).json({ message: "Something went wrong...", success: false, data: error })
  }
}


module.exports.userLoginController = async (req, res) => {
  try {
        const user = await userLoginService(req.body);

        res.status(user.statusCode).json({ user })
  } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong...", success: false, data: error })
  }
}



module.exports.fundWalletController = async (req, res) => {
  try{
        const user = await fundWalletService({payload: req.body, params: req.params});

        res.status(user.statusCode).json({ user })
  } catch(error) {
        res.status(500).json({ message: "Something went wrong...", success: false, data: error })
  }
}


module.exports.transferFundsController = async (req, res) => {
  try{
        const user = await transferFundsService({payload: req.body, params: req.params});

        res.status(user.statusCode).json({ user })
  } catch(error) {
      console.log("error", error.message)
        res.status(error.status || 500).json({ message: "Something went wrong...", success: false, data: error })
  }
}

module.exports.withdrawFundsController = async (req, res) => {
      try{
            const user = await withdrawFundsService({payload: req.body, params: req.params});
    
            res.status(user.statusCode).json({ user })
      } catch(error) {
          console.log("error", error.message)
            res.status(error.status || 500).json({ message: "Something went wrong...", success: false, data: error })
      }
}