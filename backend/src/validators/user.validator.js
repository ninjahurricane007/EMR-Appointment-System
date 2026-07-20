const { body } = require("express-validator");

exports.createDoctorValidator = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),

  body("department").notEmpty().withMessage("Department is required"),

  body("workingDays")
    .isArray({ min: 1 })
    .withMessage("Working days are required"),

  body("slotDuration")
    .isInt({ min: 5 })
    .withMessage("Slot duration must be at least 5"),
];

exports.createReceptionistValidator = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),
];
