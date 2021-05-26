# API Documentation: fancy-todo

## **TODOS**

### **1.  SHOW ALL TODOs**
Returns all todos that exist.

**URL**  `/todos`

**Method**  `GET`

**URL Params**  none

**Data Params**  none

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    [
        {
            "id": 1,
            "title": "Kerjain Fancy Todo",
            "description": "todo tapi lebih fancy",
            "status": "ongoing",
            "due_date": "2022-07-10T12:00:00.000Z",
            "createdAt": "2021-05-26T10:32:24.610Z",
            "updatedAt": "2021-05-26T10:32:24.610Z"
        },
        {
            "id": 2,
            "title": "Submit rekap pajak",
            "description": "tahun 2020",
            "status": "ongoing",
            "due_date": "2021-06-30T12:00:00.000Z",
            "createdAt": "2021-05-26T10:32:24.610Z",
            "updatedAt": "2021-05-26T10:32:24.610Z"
        },
        {
            "id": 3,
            "title": "Beli kado ultah doi",
            "description": "budget 200ribu",
            "status": "ongoing",
            "due_date": "2021-08-01T12:00:00.000Z",
            "createdAt": "2021-05-26T10:32:24.610Z",
            "updatedAt": "2021-05-26T10:32:24.610Z"
        }
    ]
  ```

**Error Response**

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```

### **2.  CREATE 1 NEW TODO**
Create one new todo and add it to the database.

**URL**  `/todos`

**Method**  `POST`

**URL Params**  none

**Data Params**

```json
  {
    "id": "<id todo> required",
    "title": "<todo name> required",
    "description": "<todo description> not required",
    "status": "<Ongoing | Completed> required",
    "due_date": "<date> required"
  }
```

**Success Response**

- Code: `201`<br/>
  Content:

  ```json
    {
        "newTodo": {
            "id": 4,
            "title": "Follow up potential clients",
            "description": "Prioritas yg deadline Juli 2021",
            "status": "ongoing",
            "due_date": "2021-06-10T14:48:00.000Z",
            "updatedAt": "2021-05-26T10:34:41.202Z",
            "createdAt": "2021-05-26T10:34:41.202Z"
        }
    }
  ```

**Error Response**

- Code: `400`<br/>
  Content:

  ```json

    "Due date cannot be empty"

  ```

### **3.  FIND AND SHOW 1 TODO**
Search and find, then display one particular todo.

**URL**  `/todos/:id`

**Method**  `GET`

**URL Params**

Required:
`id=[integer]`

**Data Params**  none

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    {
        "todo": {
            "id": 7,
            "title": "Setrika baju",
            "description": "Siapin baju buat meeting Senin depan",
            "status": "ongoing",
            "due_date": "2021-08-15T14:48:00.000Z",
            "createdAt": "2021-05-26T08:09:42.755Z",
            "updatedAt": "2021-05-26T08:09:42.755Z"
        }
    }
  ```

**Error Response**

- Code: `404`<br/>
  Content:

  ```json

    {
        "message": "Todo with ID 10 does not exist"
    }

  ```


### **4.  UPDATE ALL FIELDS FOR 1 TODO**
Update values in all column fields for one particular todo.

**URL**  `/todos/:id`

**Method**  `PUT`

**URL Params**

Required:
`id=[integer]`

**Data Params**

```json
  {
    "id": "<id todo> required",
    "title": "<todo name> required",
    "description": "<todo description> not required",
    "status": "<Ongoing | Completed> required",
    "due_date": "<date> required"
  }
```

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    {
        "todo": {
            "id": 7,
            "title": "Setrika baju",
            "description": "Siapin baju ama masker buat meeting Senin depan",
            "status": "completed",
            "due_date": "2021-08-15T14:48:00.000Z",
            "createdAt": "2021-05-26T08:09:42.755Z",
            "updatedAt": "2021-05-26T08:09:42.755Z"
        }
    }
  ```

**Error Response**

- Code: `404`<br/>
  Content:

  ```json

    {
        "message": "Todo with ID 10 does not exist"
    }

  ```

- Code: `400`<br/>
  Content:

  ```json

    {
        "message": "Due date cannot be empty"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```

### **5.  UPDATE SELECTIVE FIELDS FOR 1 TODO**
Update values in some selected column fields for one particular todo.

**URL**  `/todos/:id`

**Method**  `PATCH`

**URL Params**

Required:
`id=[integer]`

**Data Params**

```json
  {
    "status": "<Ongoing | Completed> required",
  }
```

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    [
        {
            "id": 8,
            "title": "Follow up potential clients",
            "description": "Prioritas yg deadline Juli 2021",
            "status": "completed",
            "due_date": "2021-08-15T14:48:00.000Z",
            "createdAt": "2021-05-26T09:55:04.635Z",
            "updatedAt": "2021-05-26T10:16:44.936Z"
        }
    ]
  ```

**Error Response**

- Code: `404`<br/>
  Content:

  ```json

    {
        "message": "Todo with ID 10 does not exist"
    }

  ```

- Code: `400`<br/>
  Content:

  ```json

    {
        "message": "Status cannot be empty"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```

### **6.  DELETE 1 TODO**
Delete and remove one particular todo from the database.

**URL**  `/todos/:id`

**Method**  `DELETE`

**URL Params**

Required:
`id=[integer]`

**Data Params**  none

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    {
        "message": "Todo with ID 6 deleted successfully"
    }
  ```

**Error Response**

- Code: `404`<br/>
  Content:

  ```json

    {
        "message": "Todo with ID 22 does not exist"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```