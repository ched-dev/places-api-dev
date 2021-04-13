const { Service } = require('feathers-mongodb');

exports.Seed = class Seed extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('seed');
    });
  }
};
