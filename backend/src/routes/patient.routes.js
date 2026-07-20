const express = require("express");

const router = express.Router();

const patientController = require("../controllers/patient.controller");

const { createPatientValidator } = require("../validators/patient.validator");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST"),
  createPatientValidator,
  patientController.createPatient,
);

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST"),
  patientController.getAllPatients,
);

router.get(
  "/:patientId",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST", "DOCTOR"),
  patientController.getPatientByPatientId,
);

module.exports = router;
