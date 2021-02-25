# POST A Sequel

Used to add a sequel to database

**URL** : `/sequel/`

**Method** : `POST`

**Auth required** : YES

**Data constraints** :

```json
{
    "title": "[String]",
}
```

**Data example**

```json
{
	"title":"Walking Drugs",
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "New Sequel Added",
    "book": {
        "_id": "602e85869fea7d476239dff1",
        "title": "Walking Drugs"
    }
}
```

## Error Response

**Condition1** : If field is omitted.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
    "error": {
        "errors": {
            "title": {
                "name": "ValidatorError",
                "message": "Path `title` is required.",
                "properties": {
                    "message": "Path `title` is required.",
                    "type": "required",
                    "path": "title",
                    "value": ""
                },
                "kind": "required",
                "path": "title",
                "value": ""
            }
        },
        "_message": "Sequel validation failed",
        "name": "ValidationError",
        "message": "Sequel validation failed: title: Path `title` is required."
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
    "error": "MongoError: E1100 Sequel is not unique"
}
```