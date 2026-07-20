const express = require("express");

const { authenticate } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const { authorize } = require("../middlewares/role.middleware");

const {
  createDoctorValidator,
  createReceptionistValidator,
} = require("../validators/user.validator");

const router = express.Router();

router.post(
  "/doctor",
  authenticate,
  authorize("SUPER_ADMIN"),
  createDoctorValidator,
  userController.createDoctor,
);

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "RECEPTIONIST"),
  userController.getDoctors,
);

router.post(
  "/receptionist",
  authenticate,
  authorize("SUPER_ADMIN"),
  createReceptionistValidator,
  userController.createReceptionist,
);

module.exports = router;
