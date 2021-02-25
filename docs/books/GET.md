# Show All Books

Show all Books

**URL** : `/books/`

**Method** : `GET`

**Auth required** : NO

**Data constraints** : NO

## Success Responses

**Code** : `200 OK`

**Content** : `[{}]`

**Example** : 

```json
[
    {
        "_id": "6037851295e4736d5793c1b2",
        "sequel": [
            {
                "_id": "60377ba6733d366539bfe9f8",
                "title": "x-men"
            }
        ],
        "title": "x-men apocalypse",
        "author": "marvel studios"
    },
    {
        "_id": "603785c000d4ec6ff5cc0d06",
        "sequel": [
            {
                "_id": "60377ba6733d366539bfe9f8",
                "title": "x-men"
            }
        ],
        "title": "x-men days of future past",
        "author": "marvel studios"
    }
]
```

