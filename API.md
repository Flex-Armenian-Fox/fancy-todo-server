# API Documentation: fancy-todo

## **TODOS / USERS**

| Method | Route            | Description                                            |
| ------ | -----------------| ------------------------------------------------------ |
| GET    | /todos           | Display all `Todo`                                     |
| POST   | /todos           | Add a new `Todo`                                       |
| GET    | /todos/weather   | Show today's weather in Jakarta                        |
| GET    | /todos/:id       | Display a `Todo` based on its ID                       |
| DEL    | /todos/:id       | Delete a `Todo` based on its ID                        |
| PUT    | /todos/:id       | Update all fields/columns of a `Todo` based on its ID  |
| PATCH  | /todos/:id       | Update the status field of `Todo` based on its ID      |
| POST   | /users/register  | Register a new `User`                                  |
| POST   | /users/login     | Login with a `User` credentials                        |

<br>
<br>
*******************************************

### **TODOS: SHOW ALL TODOs**
Display all `Todo`s that exist.

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
<br>
*******************************************

### **TODOS: CREATE 1 NEW TODO**
Create one new `Todo` and add it to the database.

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
            "id": 14,
            "title": "Masak makan siang",
            "description": "Udang sambel pete",
            "status": "ongoing",
            "due_date": "2021-06-29T14:48:00.000Z",
            "UserId": 1,
            "updatedAt": "2021-06-01T05:53:58.971Z",
            "createdAt": "2021-06-01T05:53:58.971Z"
        }
    }
  ```

**Error Response**

- Code: `400`<br/>
  Content:

  ```json

    {
      "message": "Validation error: Due date must be today or after"
    }

  ```
- Code: `400`<br/>
  Content:

  ```json

    {
        "message": "Validation error: Title cannot be empty"
    }

  ```
- Code: `400`<br/>
  Content:

  ```json

    {
        "message": "Validation error: Status cannot be empty,\nValidation error: Status must be \"ongoing\" or \"completed\""
    }

  ```
<br>
*******************************************

### **TODOS: WEATHER**
Show today's weather.

**URL**  `/todos/weather`

**Method**  `GET`

**URL Params** none

**Data Params** none

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    {
        "city": "Jakarta",
        "date": "2021-06-01",
        "weather": [
            {
                "id": 721,
                "main": "Haze",
                "description": "kabut asap",
                "icon": "50n"
            }
        ],
        "actual_temperature": "27.67°C",
        "feels_like": "31.84°C"
    }
  ```

**Error Response**
- Code: `401`<br/>
  Content:

  ```json

    {
        "cod": 401,
        "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
    }

  ```
- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal Server Error"
    }

  ```
<br>
*******************************************

### **TODOS: FIND AND SHOW 1 TODO**
Search and find, then display one particular `Todo`.

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
- Code: `401`<br/>
  Content:

  ```json

    {
        "message": "User 1 does not have permission"
    }

  ```
- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```
<br>
*******************************************

### **TODOS: UPDATE ALL FIELDS FOR 1 TODO**
Update values in all column fields for one particular `Todo`.

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
        "message": "Validation error: Due date must be today or after"
    }

  ```

- Code: `401`<br/>
  Content:

  ```json

    {
        "message": "User 1 does not have permission"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```
<br>
*******************************************

### **TODOS: UPDATE SELECTIVE FIELDS FOR 1 TODO**
Update values in some selected column fields for one particular `Todo`.

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

- Code: `401`<br/>
  Content:

  ```json

    {
        "message": "User 1 does not have permission"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```
<br>
*******************************************

### **TODOS: DELETE 1 TODO**
Delete and remove one particular `Todo` from the database.

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

- Code: `401`<br/>
  Content:

  ```json

    {
        "message": "User 1 does not have permission"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```
<br>
*******************************************

### **USERS: REGISTER**
Register a new `User`.

**URL**  `/users/register`

**Method**  `POST`

**URL Params** none

**Data Params**
```json
  {
    "email": "<user email> required",
    "password": "<user password> required"
  }
```

**Success Response**

- Code: `201`<br/>
  Content:

  ```json
    {
        "message": "New user successfully created",
        "data": "user5@email.com"
    }
  ```

**Error Response**

- Code: `400`<br/>
  Content:

  ```json

    {
        "message": "Validation error: Must be a valid email address"
    }

  ```

- Code: `400`<br/>
  Content:

  ```json

    {
        "message": "Validation error: Password cannot be less than 5 characters"
    }

  ```

- Code: `409`<br/>
  Content:

  ```json

    {
        "message": "Email already registered"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```
<br>
*******************************************

### **USERS: LOGIN**
Login with a `User` credentials

**URL**  `/users/login`

**Method**  `POST`

**URL Params** none

**Data Params**
```json
  {
    "email": "<user email> required",
    "password": "<user password> required"
  }
```

**Success Response**

- Code: `200`<br/>
  Content:

  ```json
    {
        "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBlbWFpbC5jb20iLCJpYXQiOjE2MjI1MjY2NTB9.wIZYZt49eHzxRGmALETGwUZQgdvwdwurlyN664y1_nI"
    }
  ```

**Error Response**

- Code: `401`<br/>
  Content:

  ```json

    {
        "message": "Email/Password incorrect"
    }

  ```

- Code: `500`<br/>
  Content:

  ```json

    {
        "message": "Internal server error"
    }

  ```
<br>
