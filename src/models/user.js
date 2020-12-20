const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 5,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "nonbinary"],
  },
  birthdate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^.+@.+\..+$/,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});

module.exports = mongoose.model("Usuario", userSchema);
