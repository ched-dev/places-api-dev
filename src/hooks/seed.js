const hooks = require('./index')

const seed = {
  data: {
    places: [
      { title: "Denver Beer Co", last_visited: 1618271174377 },
      { title: "Teachers Lounge", last_visited: 1618271200511 }
    ],
    images: [
      { url: "/image1.png", alt: "Graham Cracker Porter" },
      { url: "/image2.png", alt: "Princess Yum Yum" },
      { url: "/image3.png", alt: "Iago sighting" },
      { url: "/image4.png", alt: "Kiki sighting" },
    ]
  },

  removeAll: async (context) => {
    await hooks.attachUser(context)
    const { app, user } = context

    const params = {
      user,
      query: {
        _id: {
          $nin: [0]
        }
      }
    }

    await app.service('places').remove(null, params)
    await app.service('images').remove(null, params)
  },

  all: async (context) => {
    await hooks.attachUser(context)

    const { app, user } = context

    const places = [...seed.data.places]
    const images = [...seed.data.images]

    do {
      const place = places.shift()

      console.log('create place', place)
      const createdResult = await app.service('places').create(place, { user })

      console.log('createdResult', createdResult)
      const place_id = createdResult._id
      
      // take two images
      await app.service('images').create({
        ...images.shift(),
        place_id,
      }, { user })
      await app.service('images').create({
        ...images.shift(),
        place_id,
      }, { user })
    } while (places.length)
  }
}

module.exports = seed