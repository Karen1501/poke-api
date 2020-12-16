const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  moves: [
    {
      type: String,
      required: true,
    },
  ],

  sprites: {
    type: Object,
    required: true,
  },
  stats: [
    {
      type: Object,
      required: true,
    },
  ],
  types: [
    {
      type: String,
      required: true,
    },
  ],
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
