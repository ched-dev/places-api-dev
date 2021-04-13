# Places API

Deployed API URL:
```
https://places-api-dev.herokuapp.com
```

Follows common REST API endpoints for the following URLs:
```
/places
/images
```

Data is tied to a specific API key. You will need to send your API key along with the ajax request headers. Ex:

```
fetch(endpoint, {
  headers: {
    "Authorization": `Bearer ${apiKey}`
  }
})
```

To quickly seed your API, you can do:

> POST /seed

Similarly, you can quickly erase all data with

> DELETE /seed


# Places

> POST /places
```
{
  "title": "Denver Beer Co",  // required
  "last_visited": 1618269320880
}
```

> GET /places
```
[
  {
    "_id": objectId,
    "title": "Denver Beer Co",
    "last_visited": 1618269320880,
    "images": [image1, image2]
  },
  {
    "_id": objectId,
    "title": "Teachers Lounge",
    "last_visited": 1618269320880,
    "images": []
  }
]
```

> GET /places/:place_id
```
{
  "_id": objectId,
  "title": "Denver Beer Co",
  "last_visited": 1618269320880,
  "images": [image1, image2]
}
```

> PUT /places/:place_id
```
{
  "title": "Denver Beer Co on Platte"
}
```

> DELETE /places/:place_id
```
// no body needed
// will also delete all associated images
```


# Images

> POST /images
```
{
  "place_id": objectId,  // required
  "url": "/image1.png",  // required
  "alt": "Princess Yum Yum at Denver Beer Co"  // required
}
```

> GET /images
```
[
  {
    "_id": objectId,
    "place_id": objectId,
    "url": "/image1.png",
    "alt": "Princess Yum Yum at Denver Beer Co"
  },
  {
    "_id": objectId,
    "place_id": objectId,
    "url": "/image2.png",
    "alt": "Graham Cracker Porter at Denver Beer Co"
  }
]
```

> PUT /images/:image_id
```
{
  "url": "/image1.png",
}
```

> DELETE /images/:image_id
```
// no body needed
```