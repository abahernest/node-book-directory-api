# Delete A Book

Delete a book

**URL** : `/book/:id/`

**URL Parameters** : `id=[alphanumeric string]` where `id` is the ID of the book in the database

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Condition** : If the Account exists.

**Code** : `200 OK`

**Content** : 
```json
{
    "message": "Book Deleted"
}
```

## Error Responses

**Condition1** : Invalid id (id is not complete)

**Code** : `500 INTERNAL SERVER ERROR`

**Content Example**:

```json
{
    "message": "Invalid ID"
}
```

**Condition2** : If there was no Account available to delete.

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "message": "No Object with that ID"
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
