### API endpoint users 

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST    | /users/       | register new account |
| POST    | /users/login  | login account |
| POST    | /users/verify | verify token  |
| PATCH   | /users/:id    | update data 1 specific user  |


### Usage and Output

`POST /users` for registration process

You may send data to this endpoint as shown below 
```javascript
req.body = {
  email: STRING,
  password: STRING,
  fullname: STRING,
  phone: STRING
}
```
> note : please make a validation for appropriate email format on your client side

if the process is succesful, you will get result :  
example : 
```javascript
{
    "message": "success",
    "payload": {
        "id": 7,
        "email": "test6@gosport.com",
        "password": "$2a$10$nHFDxu2zZoak9Rux0J2K5uJffN5QGT9G86/r7UA3lWAfFRo3NxN/y",
        "fullname": "test user",
        "phone": 081,
        "createdAt": "2017-12-26T07:22:20.899Z",
        "updatedAt": "2017-12-26T07:22:20.901Z"
    }
}

```

if an error occurred, you will get: 
```javascript
{
  "message": "error",
  "payload": DETAIL_ERROR_FROM_SERVER
}
```


`POST /users/login` for login process

You may send data to this endpoint as shown below 
```javascript
req.body = {
  email: STRING,
  password: STRING
}
```

There are 3 possible responses : 

a. email / user not found
```javascript
{
    "message": "user not found",
    "user": null
}
```

b. email / user exist but password wrong 
```javascript
{
    "message": "password not match",
    "payload": {
        "email": "test6@gosport.com"
    }
}
```
> please note that you will get email data back from server

c. email and password correct -> you got token
```javascript
{
    "message": "success",
    "payload": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlSOMEEXAMPLETOKEN"
    }
}
```

`POST /users/verify` for verify token

you can use it for login status checking, and to protect some pages from non login user. 
When user logout, remove the token and re-check on this endpoint. If you got error, it means that your user already logged out

You may send data to this endpoint as shown below 
```javascript
req.body = {
  token: STRING
}
```
or 
```javascript
req.headers = {
  token: STRING
}
```

you'll get result 
```javascript
{
    "message": "success",
    "payload": {
        "user": {
            "id": 7,
            "email": "test6@gosport.com",
            "password": "$2a$10$nHFDxu2zZoak9SOMEHASHEDPASS",
            "fullname": "test user",
            "phone": 081,
            "createdAt": "2017-12-26T07:22:20.899Z",
            "updatedAt": "2017-12-26T07:22:20.901Z"
        },
        "iat": 1514292034
    }
}
```

if some crazy people send fake token 
```javascript
{
    "message": "error",
    "payload": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
}

```
if you send nothing (no token given) 
```javascript
{
    "message": "error",
    "payload": {
        "name": "JsonWebTokenError",
        "message": "jwt must be provided"
    }
}
```

`PATCH /users/:id` for updating data user

You have to send data to this endpoint as shown below 
```javascript
req.body = {
  email: STRING,
  password: STRING,
  fullname: STRING,
  phone: STRING,
  changePassword: BOOLEAN  // (default false)
  token: STRING
}
```
> please make sure you send `token` and `changePassword` status. you can make an algorithm to check whether user want to change the password. If you send `password` but forgot to send `changePassword` , the password won't be changed 