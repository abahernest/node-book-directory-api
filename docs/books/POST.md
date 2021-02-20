# Login

Used to collect a Token for a registered User.

**URL** : `/books/`

**Method** : `POST`

**Auth required** : YES

**Data constraints** :

```json
{
    "title": "[String]",
    "author": "[String]"
}
```

**Data example**

```json
{
	"title":"Walking Drugs",
	"author":"Pablo Escobar"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "New Book Added",
    "book": {
        "_id": "602e85869fea7d476239dff1",
        "title": "Walking Drugs",
        "author": "Pablo Escobar",
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
    "error": {
        "errors": {
            "author": {
                "name": "ValidatorError",
                "message": "Path `author` is required.",
                "properties": {
                    "message": "Path `author` is required.",
                    "type": "required",
                    "path": "author"
                },
                "kind": "required",
                "path": "author"
            }
        },
        "_message": "Book validation failed",
        "name": "ValidationError",
        "message": "Book validation failed: author: Path `author` is required."
    }
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