# Login

Used to collect a Token for a registered User.

**URL** : `/users/login/`

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
    "email": "papii@example.com",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWhlcm5lc3RvMUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MDJkZWQ2ZmJlYzYwNTM1ZTk1MzFkNzQiLCJpYXQiOjE2MTM2NjA3MTgsImV4cCI6MTYxMzY2NDMxOH0.8P17-dzWiwTXIn8IKd1zKifJrwp-FZKC8DtX3tmSUHA"
}
```

## Error Response

**Condition1** : If 'password' is wrong.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "message": "Incorrect Password"
}
```

**Condition2** : If 'email' is wrong.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "message": "User doesn't exist"
}
```