// pone en marcha la app

//inicializar dotenv
require("dotenv").config();

const dbConnect = require("./src/lib/db");
const server = require("./src/server");

dbConnect()
  .then(() => {
    console.log("DB connected");
    server.listen(8080, () => {
      console.log("server is listening");
    });
  })

  .catch((error) => {
    console.error("Error:", error);
  });
