import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Pokemons = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  // console.log("allPokemon:", allPokemon);

  const [pokeTeam, setPokeTeam] = useState([]);

  const [teamComplete, setTeamComplete] = useState(false);

  const addPokemon = (event) => {
    let selectedPokemon = allPokemon.filter(
      (pokemon) => pokemon._id === event.target.dataset.pokemonId
    )[0];
    if (pokeTeam.length === 6) {
      setTeamComplete(true);
    } else {
      setPokeTeam([...pokeTeam, selectedPokemon]);
    }
  };

  useEffect(() => {
    //console.log("useEffect");
    getDataApi();
  }, []);

  const saveTeamHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk3MWE5ZWZlZGRhNWIxYzI0NjJlYSIsImlhdCI6MTYwODA5ODg2NiwiZXhwIjoxNjA5ODI2ODY2fQ.HZ4XM-OvLUFsH10CuEBMipRplwvvdkoGZ381WMjKm7U"
    );

    var raw = JSON.stringify({
      team: pokeTeam,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/team", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const getDataApi = async () => {
    //console.log("data", data);
    const data = await fetch("http://localhost:8080/pokemon");
    const pokemonData = await data.json();
    //console.log("pokemonData:", pokemonData.data);

    setAllPokemon(pokemonData.data.allPokemons);
  };

  return (
    <>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          !teamComplete ? "hidden" : ""
        }`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Guardar equipo
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      ¡Has elegido a tu equipo Pokemón!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Link to="/equipo">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveTeamHandler}
                >
                  Guardar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {allPokemon.map((pokemon) => {
          let { name, sprites, moves, types, order, _id, stats } = pokemon;
          return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
              <div className="flex-col">
                <div>
                  <p className="text-right  p-4 ">
                    Número Pokedex :
                    <span className="text-blue-500"> {order}</span>
                  </p>
                  <img
                    className="inline-block  rounded-full ring-2 ring-white w-full"
                    src={sprites.front_default}
                    alt="front_default"
                  />
                </div>
                <div className="border-t border-gray-200 flex">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Nombre
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {name}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Tipo(s)
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {pokemon.types.join(", ")}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Moves
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {pokemon.moves.slice(0, 4).join(", ")}
                      </dd>
                    </div>

                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mx-auto my-5 block"
                      data-pokemon-id={_id}
                      onClick={addPokemon}
                    >
                      Seleccionar pokemón
                    </button>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Pokemons;
