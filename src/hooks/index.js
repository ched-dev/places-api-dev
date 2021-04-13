const hooks = {

  getApiUser: async (context) =>  {
    if (context.user) {
      return context.user
    }
    if (context.params.user) {
      return context.params.user
    }

    const { app, params } = context
    const bearer = params.headers.authorization
    const apiKey = (bearer || '').slice('Bearer '.length)
  
    if (!bearer || !apiKey) {
      context.statusCode = 401
      throw new Error(`Missing Authorization header`)
    }
  
    const user = await app.service('users').find({
      query: {
        apiKey
      }
    })
  
    if (!user || user.total === 0) {
      context.statusCode = 403
      throw new Error(`Invalid Authorization token`)
    }
  
    return user.data[0]
  },
  
  attachUser: async (context) =>  {
    const user = await hooks.getApiUser(context)
  
    context.user = user
  },

  attachUserIdToQuery: async (context) => {
    await hooks.attachUser(context)

    context.params.query = {
      ...(context.params.query || {}),
      user_id: context.user._id
    }
  },
  
  removeUserId: async (context) => {
    const { result } = context
  
    if (result.data && Array.isArray(result.data)) {
      result.data.forEach(item => {
        delete item.user_id
      })
    }
    if (result.user_id) {
      delete result.user_id
    }
  }
}

module.exports = hooks
