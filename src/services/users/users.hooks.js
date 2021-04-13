async function attachApiKey(context) {
  const { app, result } = context
  const apiKey = Date.now().toString() + result._id
  await app.service('users').patch(result._id, {
    apiKey
  })

  result.apiKey = apiKey
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ attachApiKey ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
