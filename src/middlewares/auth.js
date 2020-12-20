//nos dice si alguien tiene autorización o no

const jwt = require("../lib/jwt");
const User = require("../models/user");

async function auth(request, response, next) {
  //todas las llamadas deben tener un header authorization con un token
  try {
    const { authorization } = request.headers;
    console.log("auth:", authorization);

    const decodedToken = jwt.verify(authorization);
    console.log("decodedToken:", decodedToken);

    const user = await User.findById(decodedToken.id);
    request.user = user;

    next();
  } catch (error) {
    response.json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = auth;
