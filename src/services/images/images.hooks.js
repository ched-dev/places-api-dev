const hooks = require('../../hooks/index')
const pick = require('lodash/pick')

const attachFindData = async (context) => {
  await hooks.attachUserIdToQuery(context)
}

const attachCreateData = async (context) =>  {
  await hooks.attachUser(context)
  
  const { data, user } = context

  if (!data || !data.url) {
    context.statusCode = 400
    throw new Error(`A 'url' is required`)
  }
  if (!data.alt) {
    context.statusCode = 400
    throw new Error(`An 'alt' is required`)
  }

  context.data = {
    place_id: data.place_id,
    user_id: user._id,
    url: data.url,
    alt: data.alt
  }
}

const attachPatchData = async (context) =>  {
  await hooks.attachUser(context)
  
  const { data, user } = context

  context.data = {
    ...(pick(data || {}, 'url', 'alt')),
    user_id: user._id,
  }
}

module.exports = {
  before: {
    all: [],
    find: [ attachFindData ],
    get: [],
    create: [ attachCreateData ],
    update: [ attachCreateData ],
    patch: [ attachPatchData ],
    remove: []
  },

  after: {
    all: [ hooks.removeUserId ],
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
}
