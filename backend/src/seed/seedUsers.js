const bcrypt = require("bcrypt")
const dotenv = require("dotenv")

const User = require("../models/user.model")
const connectDB = require("../config/db")

dotenv.config()

const seedUsers = async () => {
  try {

    await connectDB()

    await User.deleteMany({})

    const password = await bcrypt.hash("Password@123", 10)

    const users = [
      {
        name: "Super Admin",
        email: "admin@emr.com",
        password,
        role: "SUPER_ADMIN",
      },
      {
        name: "Receptionist",
        email: "reception@emr.com",
        password,
        role: "RECEPTIONIST",
      },
      {
        name: "Dr. John",
        email: "doctor@emr.com",
        password,
        role: "DOCTOR",
      },
    ];

    await User.insertMany(users)

    console.log("Users seeded successfully");

    process.exit()

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers()
