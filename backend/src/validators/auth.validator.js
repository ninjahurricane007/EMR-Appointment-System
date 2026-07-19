const {body} = require("express-validator")

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email"),

  body("password")
    .notEmpty()
    .withMessage("Enter Password")
];

module.exports = loginValidator;