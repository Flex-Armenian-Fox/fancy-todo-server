# API Doc Todo App

## Todos

### Show Todos

Mendapatkan semua data todo yang ada

- **URL**

  `/todos`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    [
        {
            "id": 1,
            "title": "todositos",
            "description": "make doritos",
            "status": "donito",
            "due_date": "1970-01-19T18:31:04.068Z",
            "createdAt": "2021-05-24T13:48:27.837Z",
            "updatedAt": "2021-05-24T14:10:58.197Z"
        },
        {
            "id": 3,
            "title": "todos",
            "description": "make todos",
            "status": "pending",
            "due_date": "1970-01-19T18:31:04.068Z",
            "createdAt": "2021-05-24T14:33:59.475Z",
            "updatedAt": "2021-05-24T14:33:59.475Z"
        }
    ]

    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Show By Id

Mendapatkan Todo Spesifik

- **URL**

  `/todos`

- **Method:**

  `GET`

- **URL Param:** ID

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
        "id": 1,
        "title": "todositos",
        "description": "make doritos",
        "status": "donito",
        "due_date": "1970-01-19T18:31:04.068Z",
        "createdAt": "2021-05-24T13:48:27.837Z",
        "updatedAt": "2021-05-24T14:10:58.197Z"
    }

    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Create Todos

menambahkan data todo

- **URL**

  `/todos`

- **Method:**

  `POST`

- **Url Param:** none
- **Body:**

  ```json
  {
    "title": <title todos> required,
    "description": <description> required,
    "status" : <status> required,
    "due_date": <due date> required
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "created",
      "data": {
            "title": "<title todos>",
            "description": "<description>",
            "status" : "<status>",
            "due_date": "<due date>"
        }
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": ["Title cannot be empty", "Date must be after today"]
    }
    ```
   - **Code:** 401 AUTHENTICATION ERROR <br />
    **Content:**

      ```json
      {
        "message": "Login Error"
      }
      ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />

---
### Put Todos

Mengubah keseluruhan data todo

- **URL**

  `/todos`

- **Method:**

  `PUT`

- **Url Param:** ID
- **Body:**

  ```json
  {
    "title": <title todos> required,
    "description": <description> required,
    "status" : <status> required,
    "due_date": <due date> required
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "put completed",
      "data": {
            "title": "<title todos>",
            "description": "<description>",
            "status" : "<status>",
            "due_date": "<due date>"
        }
    }
    ```

- **Error Response:**
   - **Code:** 401 AUTHENTICATION ERROR <br />
    **Content:**

      ```json
      {
        "message": "Login Error"
      }
      ```
  
  - **Code:** 401 AUTHENTICATION ERROR <br />

    **Content:**

    ```json
    {
      "message": "User does not have permission"
    }
    ```

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": ["Title cannot be empty", "Date must be after today"]
    }
    ```

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Todo not Found"
    }
    ```
  - **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Patch Todos

Mengubah data status

- **URL**

  `/todos`

- **Method:**

  `PATCH`

- **Url Param:** ID
- **Body:**

  ```json
  {
    "status" : <status> required
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "put completed",
      "data": {
            "title": "<title todos>",
            "description": "<description>",
            "status" : "<status>",
            "due_date": "<due date>"
        }
    }
    ```

- **Error Response:**

   - **Code:** 401 AUTHENTICATION ERROR <br />
    **Content:**

      ```json
      {
        "message": "Login Error"
      }
      ```

  - **Code:** 401 AUTHENTICATION ERROR <br />

    **Content:**

    ```json
    {
      "message": "User does not have permission"
    }
    ```
  

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Todo not found"
    }
    ```
  
  - **Code:** 500 INTERNAL SERVER ERROR <br />

---
### Delete Todos

Menghapus data todo

- **URL**

  `/todos`

- **Method:**

  `DELETE`

- **Url Param:** ID


- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "todo success to delete",
    }
    ```

- **Error Response:**

   - **Code:** 401 AUTHENTICATION ERROR <br />
    **Content:**

      ```json
      {
        "message": "Login Error"
      }
      ```

  - **Code:** 401 AUTHENTICATION ERROR <br />

    **Content:**

    ```json
    {
      "message": "User does not have permission"
    }
    ```
  

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Todo not found"
    }
    ```
  
  - **Code:** 500 INTERNAL SERVER ERROR <br />

--- 

## Users

### Register User

Mendaftarkan User baru

- **URL**

  `/users/register`

- **Method:**

  `POST`

- **Url Param:** none
- **Body:**

  ```json
  {
    "email": <email user>,
    "password": <password user>
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "User Registered",
      "data": <email user>
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Please Fill Email and Password"
    }
    ```

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Please use proper email format"
    }
    ```
  
  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Password must be between 4 to 32 characters"
    }
    ```

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Email already taken"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />

--- 
### Login User

Login user

- **URL**

  `/users/login`

- **Method:**

  `POST`

- **Url Param:** none
- **Body:**

  ```json
  {
    "email": <email user>,
    "password": <password user>
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Login Success",
      "access_token": <access token>
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Please Fill Email and Password"
    }
    ```

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "No Email"
    }
    ```

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Wrong Password"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
--- 
### Login Google

Login google

- **URL**

  `/users/gauth`

- **Method:**

  `POST`

- **Url Param:** none
- **Body:**

  ```json
  {
    "token": <google token>
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Login Success",
      "access_token": <access token>
    }
    ```

- **Error Response:**
  - **Code:** 500 INTERNAL SERVER ERROR <br />
