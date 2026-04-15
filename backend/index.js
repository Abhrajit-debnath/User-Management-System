const dotenv = require("dotenv");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const connectb = require("./src/config/db.config");
const express = require("express");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

connectb();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/", userRoutes);

app.get("/health-check", (req, res) => {
  res.json({ status: "running" });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
