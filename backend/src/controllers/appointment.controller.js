const { validationResult } = require("express-validator");

const appointmentService = require("../services/appointment.service");

exports.getAvailableSlots = async (req, res, next) => {
  try {
    const slots = await appointmentService.getAvailableSlots(
      req.params.doctorId,
      req.query.date,
    );

    res.json({
      success: true,
      data: slots,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const appointment = await appointmentService.createAppointment(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAppointments();

    res.json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    next(err);
  }
};
