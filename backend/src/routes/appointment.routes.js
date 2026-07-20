const express = require("express");

const appointmentController = require("../controllers/appointment.controller");

const {
  createAppointmentValidator,
} = require("../validators/appointmentValidator");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/doctors/:doctorId/slots",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST"),
  appointmentController.getAvailableSlots,
);

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST"),
  createAppointmentValidator,
  appointmentController.createAppointment,
);

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST", "DOCTOR"),
  appointmentController.getAppointments,
);

module.exports = router;
