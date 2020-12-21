const express = require("express");
const { response, request } = require("../server");

const router = express.Router();
const team = require("../usecases/team");

router.get("/", async (request, response) => {
  try {
    const allTeam = await team.getAll();
    response.json({
      success: true,
      data: {
        allTeam,
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
    const newTeamData = request.body;
    const newTeam = await team.create(newTeamData);
    response.json({
      success: true,
      data: {
        newTeam,
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
    const newTeamData = request.body;
    const idTeam = request.params.id;
    const newTeam = await team.update(idTeam, newTeamData);
    response.json({
      success: true,
      data: {
        newTeam,
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
  const teamDeleteId = request.params.id;
  const teamDelete = await team.delete(teamDeleteId);
  response.json({
    success: true,
    data: {
      teamDelete,
    },
  });
});

module.exports = router;
