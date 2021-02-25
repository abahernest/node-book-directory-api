# Delete Book From Sequel

Delete a book from a sequel. What we're doing under the hood is setting the sequel ID to that of the squel with title 'default'

**URL** : `/book/:id/sequel`

**URL Parameters** : `id=[alphanumeric string]` where `id` is the ID of the book in the database

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Condition** : If the Account exists.

**Code** : `200 OK`

**Content** : 
```json
{
    "sequel": {
        "_id": "60371c8dd4eaa22d3c514851",
        "title": "default",
        "__v": 0
    },
    "_id": "6037851295e4736d5793c1b2",
    "title": "x-men apocalypse",
    "author": "marvel studios",
    "__v": 0
}
```

## Error Responses

**Condition1** : Invalid id (id is not complete)

**Code** : `500 INTERNAL SERVER ERROR`

**Content Example**:

```json
{
    "error": "Cast to ObjectId failed for value \"6037851295e4736d5793c1b\" at path \"_id\" for model \"Book\""
}
```

**Condition2** : If there was no Account available to delete.(Wrong ID)

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "message": "ID not Found"
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
