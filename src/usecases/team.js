const Team = require("../models/team");

function getAll() {
  return Team.find();
}

function create(dataTeam) {
  return Team.create(dataTeam);
}

function update(id, data) {
  return Team.findByIdAndUpdate(id, data, { new: true });
}

function deleteTeam(id) {
  return Team.findByIdAndRemove({ id: _id });
}

module.exports = {
  getAll,
  create,
  update,
  deleteTeam,
};
