const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization - String: Bearer + token
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", ""); // extracting token
  jwt.verify(token, "A_VERY_SECRET_KEY_YEP", async (err, payload) => {
    //payload -> info in the token, HENCE -> userId
    if (err) {
      return res
        .status(401)
        .send({ error: "An error occurred when trying to log in." });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
