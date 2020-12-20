//conjunto de rutas

const express = require("express");

const router = express.Router();
const pokemons = require("../usecases/pokemons");

router.get("/", async (request, response) => {
  try {
    const allPokemons = await pokemons.getAll();
    response.json({
      success: true,
      data: {
        allPokemons,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const newPokemonData = request.body;
    const newPokemon = await pokemons.create(newPokemonData);

    response.json({
      success: true,
      data: {
        newPokemon,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const newPokemonData = request.body;
    const idPokemon = request.params.id;
    const newPokemon = await pokemons.update(idPokemon, newPokemonData);
    response.json({
      success: true,
      data: {
        newPokemon,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  const pokemonDeleteId = request.params.id;
  const pokemonDelete = await pokemons.detele(pokemonDeleteId);
  response.json({
    success: true,
    data: {
      pokemonDelete,
    },
  });
});

module.exports = router;
