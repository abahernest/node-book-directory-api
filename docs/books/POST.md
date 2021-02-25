# Add A Book

Used to add a book to database

**URL** : `/books/`

**Method** : `POST`

**Auth required** : YES

**Data constraints** :

```json
{
    "title": "[String]",
    "author": "[String]",
    "sequel": "[ObjectId]
}
```

**Data example**

```json
{
	"title":"Walking Drugs",
	"author":"Pablo Escobar",
    "sequel": "60377ba6733d366539bfe9f8"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "New Book Added",
    "book": {
        "_id": "6037851295e4736d5793c1b2",
        "title":"Walking Drugs",
        "author":"Pablo Escobar",
        "sequel": "60377ba6733d366539bfe9f8",
        "__v": 0
    }
}
```

## Error Response

**Condition1** : If any field is omitted.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
    "error": "Book validation failed"
}
```

**Condition2** : If user not authenticated.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "message": "User Not Authenticated!!!"
}
```

**Condition2** : If item already exist in database

**Code** : `409 CONFLICT`

**Content** :

```json
{
    "message": "Item already exist"
}
```