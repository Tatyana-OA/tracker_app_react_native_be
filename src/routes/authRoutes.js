const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  try {
    await user.save();
  } catch (err) {
    return res.status(422).send(err.message);
  }

  res.send("We made a signup request");
});

module.exports = router;
