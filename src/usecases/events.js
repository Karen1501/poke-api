const Events = require("../models/event");

function getAllEvents() {
  return Events.find();
}

function createEvent(eventData) {
  return Events.create(eventData);
}

function updateEvent(id, data) {
  return Events.findByIdAndUpdate(id, data, { new: true });
}

function deleteEvent(id) {
  return Events.findByIdAndRemove({ _id: id });
}

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
