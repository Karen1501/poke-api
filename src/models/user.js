const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 5,
    required: true,
  },

  birthdate: {
    type: String,
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
