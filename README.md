Simple CRUD Backend I made using Express JS,Mysql & ChatGPT.

> tipis tipis 🔥 🔥 🔥.\
>  menyala abangkuh 🔥 🔥 🔥.

Base Url : https://belajar-backend-okev.vercel.app/api

## Register

endpoint : /register

method : **`POST`**\
form-data: **`username`**,**`password`**\
headers: **`Accept: application/json`**

### Example Response :

```
{
    "msg": "User Successfully Created",
    "user": {
        "userId": "a1f5d19c-db39-4715-8300-b3c467c189c8",
        "username": "anjaymabar",
        "updatedAt": "2024-01-31T13:24:09.838Z",
        "createdAt": "2024-01-31T13:24:09.838Z"
    }
}
```

> **Note:** We apologize for any inconvenience you may be experiencing. Currently, our servers are located at a considerable distance, impacting performance.

## Login

endpoint : /login

method : **`POST`**\
form-data: **`username`**,**`password`**\
headers: **`Accept: application/json`**

### Example Response :

```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVybWFuIiwicGFzc3dvcmQiOiIxMjM0NSIsImlhdCI6MTcwNjcwNTc4NSwiZXhwIjoxNzA2NzA5Mzg1fQ.nVL4FNPTMNh65YhwyeVsKp8cpJ6pZqyFyNihcO0MW7Y"
}
```

## Get All Products

endpoint : /products

method : **`GET`**\
authorization: **`Bearer Token`**\
headers: **`Accept: application/json`**

### Example Response :

```
[
    {
        "id": 3,
        "name": "Laptop",
        "imageUrl": [
            "https://ucarecdn.com/8a0e775b-df28-45d1-af5d-bdeaa2b77f85/"
        ]
    },
    {
        "id": 4,
        "name": "Camera",
        "imageUrl": [
            "https://ucarecdn.com/f4c105f7-6e5a-4518-a4f1-461391f24449/"
        ]
    }
]
```

> **Note:** Untuk Endpoint yang lainya menyusul kalo lagi gabut xixi.
