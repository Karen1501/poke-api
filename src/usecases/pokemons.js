//las acciones que el usuario puede ejercer en el sistema, crud pokemon

const Pokemons = require("../models/pokemon");

function getAll() {
  return Pokemons.find();
}

function create(dataPokemon) {
  return Pokemons.create(dataPokemon);
}

function update(id, data) {
  return Pokemons.findByIdAndUpdate(id, data, { new: true });
}

function detele(id) {
  return Pokemons.findByIdAndRemove({ _id: id });
}

module.exports = {
  getAll,
  create,
  update,
  detele,
};
