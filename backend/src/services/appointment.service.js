const Doctor = require("../models/doctor.model");
const Appointment = require("../models/appointment.model");

const { generateSlots } = require("../utils/slotGenerator");

exports.getAvailableSlots = async (doctorId, date) => {
  const doctor = await DoctorProfile.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (!doctor.workingDays.includes(dayName)) {
    return [];
  }

  let slots = [];

  if (doctor.morningSession?.start && doctor.morningSession?.end) {
    slots.push(
      ...generateSlots(
        doctor.morningSession.start,
        doctor.morningSession.end,
        doctor.slotDuration,
      ),
    );
  }

  if (doctor.eveningSession?.start && doctor.eveningSession?.end) {
    slots.push(
      ...generateSlots(
        doctor.eveningSession.start,
        doctor.eveningSession.end,
        doctor.slotDuration,
      ),
    );
  }

  const bookedAppointments = await Appointment.find({
    doctor: doctorId,
    appointmentDate: new Date(date),
  });

  const bookedSlots = bookedAppointments.map((appointment) => appointment.slot);

  return slots.map((slot) => ({
    time: slot,
    available: !bookedSlots.includes(slot),
  }));
};

exports.createAppointment = async (data) => {
  const patient = await Patient.findOne({
    patientId: data.patientId,
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  const doctor = await Doctor.findById(data.doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const appointmentDate = new Date(data.date);
  appointmentDate.setHours(0, 0, 0, 0);

  try {
    const appointment = await Appointment.create({
      patient: patient._id,

      doctor: doctor._id,

      appointmentDate,

      slot: data.slot,
    });

    return appointment;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Selected slot is already booked");
    }

    throw err;
  }
};

exports.getAppointments = async () => {
  return await Appointment.find()
    .populate("patient")
    .populate({
      path: "doctor",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .sort({
      appointmentDate: 1,
      slot: 1,
    });
};
