const { Service } = require('feathers-mongodb');

exports.Images = class Images extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('images');
    });
  }
};
