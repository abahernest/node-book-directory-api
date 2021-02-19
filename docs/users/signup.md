# Signup

Register a user

**URL** : `/users/signup/`

**Method** : `POST`

**Auth required** : NO

**Data constraints** :

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
	"email": "papii@gmail.com",
	"password": "pappisnoop"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "Signed Up"
}
```

## Error Response

**Condition** : If 'email' format is wrong.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
    "error": {
        "errors": {
            "email": {
                "name": "ValidatorError",
                "message": "Path `email` is invalid (papiigmail.com).",
                "properties": {
                    "message": "Path `email` is invalid (papiigmail.com).",
                    "type": "regexp",
                    "regexp": {},
                    "path": "email",
                    "value": "papiigmail.com"
                },
                "kind": "regexp",
                "path": "email",
                "value": "papiigmail.com"
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: email: Path `email` is invalid (papiigmail.com)."
    }
}
```