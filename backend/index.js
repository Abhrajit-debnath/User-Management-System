const dotenv = require("dotenv");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const connectb = require("./src/config/db.config");
const express = require("express");
const cors = require("cors");

dotenv.config();

const allowedOrigin = [
  "https://user-management-system-seven-phi.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
];
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

connectb();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "active",
    service: "User Management API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
    },
  });
});

app.get("/health-check", (req, res) => {
  res.json({ status: "running" });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
