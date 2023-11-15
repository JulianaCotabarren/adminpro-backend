require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Create the express server
const app = express();

// CORS configuration
app.use(cors());

// Database
dbConnection();

// Routes
app.use("/api/users", require("./routes/users"));

app.listen(process.env.PORT, () => {
  console.log("Server running in port " + process.env.PORT);
});
