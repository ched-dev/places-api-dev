const { Service } = require('feathers-mongodb');

exports.Places = class Places extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('places');
    });
  }
};
