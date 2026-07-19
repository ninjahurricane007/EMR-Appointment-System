const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/auth.routes")
const errorHandler = require("./middlewares/error.middleware")

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        message: "EMR Appointment System API Running"
    })
})

app.use("/api/v1/auth", authRoutes)

app.use(errorHandler);

module.exports = app