const { validationResult } = require("express-validator");
const userService = require("../services/user.service");

exports.createDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const result = await userService.createDoctor(req.body);

    return res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await userService.getDoctors();

    const response = doctors.map((d) => ({
      doctorId: d._id,
      name: d.user?.name,
      department: d.department,
    }));

    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

exports.createReceptionist = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const result = await userService.createReceptionist(req.body);

    return res.status(200).json({
      success: true,
      message: "Receptionist created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
