const express = require("express");
const { request, response } = require("../server");

const router = express.Router();
const events = require("../usecases/events");

router.get("/", async (request, response) => {
  try {
    const allEvents = await events.getAllEvents();
    response.json({
      succces: true,
      data: {
        events: allEvents,
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
    const newEventData = request.body;
    const newEvent = await events.createEvent(newEventData);
    response.json({
      succces: true,
      data: {
        newEvent,
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
    const newEventData = request.body;
    const eventId = request.params.id;
    const newEvent = await events.updateEvent(eventId, newEventData);
    response.json({
      succces: true,
      data: {
        newEvent,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      succces: false,
      error: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deleteEventId = request.params.id;
    const deleteEvent = await events.deleteEvent(deleteEventId);
    response.json({
      success: true,
      data: {
        deleteEvent,
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
