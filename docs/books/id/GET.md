# Show A Book

Show a specified book

**URL** : `/books/:id`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : NO

## Success Responses

**Code** : `200 OK`

**Content** : `{}`

**Example** : 

```json
{
    "sequel": {
        "_id": "60377ba6733d366539bfe9f8",
        "title": "x-men",
        "__v": 0
    },
    "_id": "6037851295e4736d5793c1b2",
    "title": "x-men apocalypse",
    "author": "marvel studios",
    "__v": 0
}
```

## Error Response

**Condition1** : Invalid id (id is not complete)

**Code** : `500 INTERNAL SERVER ERROR`

**Content Example**:

```json
{
    "error": "Cast to ObjectId failed for value \"6037851295e4736d5793c1\" at path \"_id\" for model \"Book\""
}
```

**Condition2** : Incorrect id

**Code** : `404 NOT FOUND`

**Content example**:

```json
{
    "message": "No entry for provided ID"
}
```

**Condition3** : User isnt Authorized

**Code** : `401 UNAUTHORIZED`

**Content** : 
```json
{
    "message": "User Not Authenticated!!!"
}
```