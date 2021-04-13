const places = require('./places/places.service.js');
const users = require('./users/users.service.js');
const images = require('./images/images.service.js');
const seed = require('./seed/seed.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(places);
  app.configure(users);
  app.configure(images);
  app.configure(seed);
}
