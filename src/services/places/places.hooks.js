const hooks = require('../../hooks/index')
const pick = require('lodash/pick')

const attachFindData = async (context) => {
  await hooks.attachUserIdToQuery(context)
}

const attachCreateData = async (context) =>  {
  await hooks.attachUser(context)
  
  const { data, user } = context

  if (!data || !data.title) {
    context.statusCode = 400
    throw new Error(`A 'title' is required`)
  }

  context.data = {
    user_id: user._id,
    title: data.title,
    last_visited: data.last_visited || null
  }
}

const attachPatchData = async (context) =>  {
  await hooks.attachUser(context)
  
  const { data, user } = context

  context.data = {
    ...(pick(data || {}, 'title', 'last_visited')),
    user_id: user._id,
  }
}

const attachImageData = async (context) => {
  const { user } = context

  const { data: allImages } = await context.app.service('images').find({ user })

  if (Array.isArray(context.result.data)) {
    context.result.data.map(item => {
      item.images = allImages.filter(img => img.place_id.toString() === item._id.toString())
    })
  } else {
    context.result.images = allImages.filter(img => img.place_id.toString() === context.result._id.toString())
  }
}

const deleteAttachedImages = async (context) => {
  await hooks.attachUser(context)
  const { user } = context

  await context.app.service('images').remove(null, {
    user,
    query: {
      place_id: context.result._id,
      user_id: user._id
    }
  })
}

module.exports = {
  before: {
    all: [],
    find: [ attachFindData ],
    get: [ attachFindData ],
    create: [ attachCreateData ],
    update: [ attachCreateData ],
    patch: [ attachPatchData ],
    remove: []
  },

  after: {
    all: [ hooks.removeUserId ],
    find: [ attachImageData ],
    get: [ attachImageData ],
    create: [ attachImageData ],
    update: [],
    patch: [],
    remove: [ deleteAttachedImages ]
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
