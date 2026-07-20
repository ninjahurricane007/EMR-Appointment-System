const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    slot: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Arrived", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent double booking. To tell the combination of doctor + appointmentDate + slot must be unique. To prevent 2 or more bookings for same slot
appointmentSchema.index(
  {
    doctor: 1,
    appointmentDate: 1,
    slot: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
