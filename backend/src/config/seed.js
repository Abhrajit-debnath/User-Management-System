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
        name: "Regular User 1",
        email: "user1@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 2",
        email: "user2@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 3",
        email: "user3@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 4",
        email: "user4@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 5",
        email: "user5@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 6",
        email: "user6@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 7",
        email: "user7@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 8",
        email: "user8@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 9",
        email: "user9@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 10",
        email: "user10@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 11",
        email: "user11@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 12",
        email: "user12@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 13",
        email: "user13@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 14",
        email: "user14@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 15",
        email: "user15@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 16",
        email: "user16@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 17",
        email: "user17@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 18",
        email: "user18@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 19",
        email: "user19@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 20",
        email: "user20@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 21",
        email: "user21@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 22",
        email: "user22@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 23",
        email: "user23@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 24",
        email: "user24@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 25",
        email: "user25@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 26",
        email: "user26@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 27",
        email: "user27@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 28",
        email: "user28@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 29",
        email: "user29@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 30",
        email: "user30@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 31",
        email: "user31@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 32",
        email: "user32@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 33",
        email: "user33@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 34",
        email: "user34@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 35",
        email: "user35@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 36",
        email: "user36@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 37",
        email: "user37@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 38",
        email: "user38@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 39",
        email: "user39@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 40",
        email: "user40@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 41",
        email: "user41@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 42",
        email: "user42@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 43",
        email: "user43@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 44",
        email: "user44@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 45",
        email: "user45@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },

      {
        name: "Regular User 46",
        email: "user46@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 47",
        email: "user47@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 48",
        email: "user48@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 49",
        email: "user49@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
      {
        name: "Regular User 50",
        email: "user50@test.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
        status: "active",
      },
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
        password: await bcrypt.hash("user@123", 10),
        role: "user",
        status: "active",
      },
    ];
    await User.insertMany(users);
    console.log("All users seeded successfully!");
    process.exit(1);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
