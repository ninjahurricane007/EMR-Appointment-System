const Patient = require("../models/patient.model");

exports.createPatient = async (data) => {
  const count = await Patient.countDocuments();

  const patientId = "PAT" + String(count + 1).padStart(6, "0");

  const patient = await Patient.create({
    ...data,
    patientId,
  });

  return patient;
};

exports.getAllPatients = async () => {
  const patients = await Patient.findAll();

  return patients;
};

exports.getPatientByPatientId = async (patientId) => {
  const patient = await Patient.findOne({ patientId });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};
