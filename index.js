require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Create the express server
const app = express();

// CORS configuration
app.use(cors());

// Reading and Body parsing
app.use(express.json());

// Database
dbConnection();

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/all", require("./routes/searches"));

app.listen(process.env.PORT, () => {
  console.log("Server running in port " + process.env.PORT);
});
