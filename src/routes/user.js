const express = require("express");
const { response, request } = require("../server");

const router = express.Router();
const users = require("../usecases/users");

router.get("/", async (request, response) => {
  try {
    const allUsers = await users.getAllUsers();
    response.json({
      success: true,
      data: {
        users: allUsers,
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
    const newUserData = request.body;
    const newUser = await users.createUser(newUserData);
    response.json({
      success: true,
      data: {
        newUser,
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
    const newUserData = request.body;
    const idUser = request.params.id;
    const newUSer = await users.updateUSer(idUser, newUserData);
    response.json({
      success: true,
      data: {
        newUser,
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
  try {
    const deleteUSerId = request.params.id;
    const userDelete = await users.deleteUser(deleteUSerId);
    response.json({
      success: true,
      data: {
        userDelete,
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

module.exports = router;
