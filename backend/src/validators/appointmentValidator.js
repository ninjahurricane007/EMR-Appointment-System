const { body } = require("express-validator");

exports.createAppointmentValidator = [
  body("patientId").notEmpty().withMessage("Patient ID is required"),

  body("doctorId").notEmpty().withMessage("Doctor ID is required"),

  body("date").isISO8601().withMessage("Valid appointment date is required"),

  body("slot").notEmpty().withMessage("Slot is required"),
];
