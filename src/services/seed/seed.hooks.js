const hooks = require('../../hooks/index')
const seed = require('../../hooks/seed')

const seedHandler = async (context) => {
  const { app } = context

  await hooks.attachUser(context)

  if (context.method === 'create') {
    await seed.all(context)
  }

  if (context.method === 'remove') {
    await seed.removeAll(context)
  }

  context.result = {
    mode: context.method,
    result: await app.service('places').find({ user: context.user })
  }
}

const deny = (context) => {
  context.statusCode = 404
}

module.exports = {
  before: {
    all: [],
    find: [ deny ],
    get: [ deny ],
    create: [ seedHandler ],
    update: [ deny ],
    patch: [ deny ],
    remove: [ seedHandler ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
