const express = require("express")

const loginValidator = require("../validators/auth.validator")
const authController = require("../controllers/auth.controller")

const router = express.Router()

router.post("/login", loginValidator, authController.login)
router.post("/refresh", authController.refresh)
router.post("/logout", authController.logout)

module.exports = router