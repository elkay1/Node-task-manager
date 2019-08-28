const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be more than 0");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    contains(value) {
      if (value.includes("password")) {
        throw new Error("Password cannot contain the word 'password'");
      }
    },
    length(value) {
      if (value.length < 6) {
        throw new Error("Password cannot be less than 6 characters");
      }
    }
  }
});

module.exports = User;
