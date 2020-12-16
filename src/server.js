// definición del servidor

const { response } = require("express");
const express = require("express");
const cors = require("cors");

const app = express();

const pokemonsRouter = require("./routes/pokemon");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());

//montando router pokemons
app.use("/pokemon", pokemonsRouter);
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/auth", authRouter);

app.get("/", (request, response) => {
  response.json({
    succes: true,
    message: "Poke-API",
  });
});

module.exports = app;
