// Initializes the `places` service on path `/places`
const { Places } = require('./places.class');
const hooks = require('./places.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    multi: ['remove']
  };

  // Initialize our service with any options it requires
  app.use('/places', new Places(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('places');

  service.hooks(hooks);
};
