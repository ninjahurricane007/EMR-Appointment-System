const { body } = require("express-validator");

exports.createPatientValidator = [
  body("name").trim().notEmpty().withMessage("Patient name is required"),

  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),

  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits"),

  body("dob").isISO8601().withMessage("Valid date of birth is required"), //YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.000Z
];
