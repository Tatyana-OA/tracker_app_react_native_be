require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = `mongodb+srv://admin:admin@cluster0.bvjsuyv.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to Mongo instance ", err);
});

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
