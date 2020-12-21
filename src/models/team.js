const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team: [
    {
      type: Object,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Equipo", teamSchema);
