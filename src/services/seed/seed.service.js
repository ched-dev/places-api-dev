// Initializes the `seed` service on path `/seed`
const { Seed } = require('./seed.class');
const hooks = require('./seed.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/seed', new Seed(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('seed');

  service.hooks(hooks);
};
