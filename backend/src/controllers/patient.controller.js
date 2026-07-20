exports.createPatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const patient = await patientService.createPatient(req.body);

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPatients = async () => {
  const count = await Patient.countDocuments();

  const patientId = "PAT" + String(count + 1).padStart(6, "0");

  const patient = await Patient.create({
    ...data,
    patientId,
  });

  return patient;
};

exports.getPatientByPatientId = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientByPatientId(
      req.params.patientId,
    );

    res.json({
      success: true,
      data: patient,
    });
  } catch (err) {
    next(err);
  }
};
