# API Doc Todo App

## Todos

### Show Todos

Mendapatkan semua data movie yang ada

- **URL**

  `/movies`

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

  - **Code:** 201 <br />
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

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "message": ["<field1> can not be null", "<field2> can not be null"]
  }
  ```

  - **Code:** 404 NOT FOUND <br />
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

  - **Code:** 201 <br />
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
    "message": ["<field1> can not be null", "<field2> can not be null"]
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

  - **Code:** 201 <br />
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

  - **Code:** 400 BAD REQUEST <br />
  - **Code:** 404 NOT FOUND <br />
  - **Code:** 500 INTERNAL SERVER ERROR <br />
