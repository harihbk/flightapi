const users = require('./users/users.service.js');
const flight = require('./flight/flight.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(flight);
};
