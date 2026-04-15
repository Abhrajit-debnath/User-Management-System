const dotenv = require("dotenv").config();
const connectb = require("./src/config/db.config")
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

connectb()


app.get("/health-check", (req, res) => {
  res.json({
    status: "running",
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
