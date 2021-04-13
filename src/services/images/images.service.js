// Initializes the `images` service on path `/images`
const { Images } = require('./images.class');
const hooks = require('./images.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    multi: ['create','remove']
  };

  // Initialize our service with any options it requires
  app.use('/images', new Images(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('images');

  service.hooks(hooks);
};
