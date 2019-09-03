const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    // Remove the word bearer from the token
    const token = req.header("Authorization").replace("Bearer ", "");
    // decode the token using jwt, make sure it is a valid token
    const decoded = jwt.verify(token, "thisismynewcourse");

    // Make sure token is still in tokens array ie. user hasnt logged out
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error("Some error");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
    console.error(err);
  }
};

module.exports = auth;
