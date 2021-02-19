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
	}
]
```

## Success Responses

**Code** : `200 OK`

**Content example** : 

```json
{
    "message": "Updated Successfully"
}
```

## Error Response

**Condition1** : Invalid id (id is not complete)

**Code** : `500 INTERNAL SERVER ERROR`

**Content Example**:

```json
{
    "message": "Invalid ID"
}
```

**Condition2** : Incorrect id

**Code** : `404 NOT FOUND`

**Content example**:

```json
{
    "message": "iD not Found"
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