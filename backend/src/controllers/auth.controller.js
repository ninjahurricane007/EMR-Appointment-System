const { validationResult } = require("express-validator")
const authService = require("../services/auth.service")

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const result = await authService.login(req.body)

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

exports.refresh = async (req, res) => {
  res.json({
    success: true,
    message: "Refresh API coming next",
  });
};

exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: "Logout API coming next",
  });
}