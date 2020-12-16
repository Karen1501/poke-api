const Users = require("../models/user");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

function getAllUsers() {
  return Users.find();
}

function createUser(userData) {
  return Users.create(userData);
}

function updateUSer(id, data) {
  return Users.findByIdAndUpdate(id, data, { new: true });
}

function deleteUser(id) {
  return Users.findByIdAndRemove({ _id: id });
}

//registro de usuario
async function signup(userData) {
  const { password } = userData;

  //encriptar contraseña
  const passwordEncripted = await bcrypt.hash(password);

  return Users.create({
    ...userData,
    password: passwordEncripted,
  });
}

async function login(email, passwordPlain) {
  const userByEmail = await Users.findOne({ email });
  if (!userByEmail) {
    throw new Error("Correo invalido");
  }
  //verificar que si sea su contraseña
  const isValid = await bcrypt.compare(passwordPlain, userByEmail.password);
  if (!isValid) {
    throw new Error("Contraseña incorrecta");
  }

  return jwt.sign({ id: userByEmail._id });
}

module.exports = {
  getAllUsers,
  createUser,
  updateUSer,
  deleteUser,
  signup,
  login,
};
