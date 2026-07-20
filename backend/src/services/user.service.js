const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");

exports.createDoctor = async (data) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "DOCTOR",
  });

  try {
    const doctorProfile = await Doctor.create({
      user: user._id,

      department: data.department,

      workingDays: data.workingDays,

      morningSession: data.morningSession,

      eveningSession: data.eveningSession,

      slotDuration: data.slotDuration,
    });

    return {
      user,
      doctorProfile,
    };
  } catch (err) {
    await User.findByIdAndDelete(user._id);

    throw err;
  }
};

exports.getDoctors = async () => {
  return await Doctor.find({ isActive: true })
    .populate("user", "name")
    .select("department user");
};

exports.createReceptionist = async (data) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "RECEPTIONIST",
  });
};
