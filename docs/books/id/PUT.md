# Update A Book

Update a book

**URL** : `/books/:id/`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
[
	{
		"key":"[property name you wish to change]",
		"value": "[new value for property]"
	}
]
```

**Data example**

```json
[
	{
		"key":"title",
		"value": "Sapphire"
	},
	{

		"key": "author",
		"value": "Melisa stone"
	},
	{
		"key":"sequel",
		"value": "60371c8dd4eaa22d3c514851"
	}
]
```

## Success Responses

**Code** : `200 OK`

**Content example** : 

```json
{
    "sequel": {
        "_id": "60371c8dd4eaa22d3c514851",
        "title": "white books",
        "__v": 0
    },
    "_id": "6037851295e4736d5793c1b2",
    "title": "sapphire",
    "author": "melisa stone",
    "__v": 0
}
```

## Error Response
**Condition1** : Invalid Sequel id (id is not complete)

**Code** : `500 INTERNAL SERVER ERROR`

**Content Example**:

```json
{
    "error": "Cast to ObjectId failed for value \"60371c8dd4eaa22d3c5148\" at path \"_id\" for model \"Sequel\""
}
```

**Condition2** : Wrong sequel id (id is not complete)

**Code** : `404 NOT FOUND`

**Content Example**:

```json
{
    "message": "sequel ID not found"
}
```

**Condition3** : Incorrect Book id

**Code** : `404 NOT FOUND`

**Content example**:

```json
{
    "message": "Book ID not Found"
}
```

**Condition4** : Invalid Book id (id is not complete)

**Code** : `500 INTERNAL SERVER ERROR`

**Content Example**:

```json
{
    "error": "Cast to ObjectId failed for value \"{ _id: '6037851295e4736d5793c1' }\" at path \"_id\" for model \"Book\""
}
```

**Condition5** : User isnt Authorized

**Code** : `401 UNAUTHORIZED`

**Content** : 
```json
{
    "message": "User Not Authenticated!!!"
}
```