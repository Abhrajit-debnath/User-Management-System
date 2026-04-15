const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/user.model");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: "admin@test.com" });
    if (existing) {
      console.log("Users already seeded!");
      process.exit();
    }

    const users = [
      {
        name: "Admin User",
        email: "admin@test.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        status: "active",
      },
      {
        name: "Manager User",
        email: "manager@test.com",
        password: await bcrypt.hash("manager123", 10),
        role: "manager",
        status: "active",
      },
      {
        name: "Regular User",
        email: "user@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
    ];
    await User.insertMany(users);
    console.log("All users seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
