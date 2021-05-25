# Fancy Todos API Documentation

## Add Todo
Add new todo to Fancy Todo

* **URL**

  `/todos`

* **Method:**
  
  `POST`
  
* **URL Params**: none

* **Data Params**: none

* **Request Body**
    ```json
      {
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date, format: YYYY-MM-DD>"
      }
      ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
      "message": created
      "data":
        {
          "id": "<id number>",
          "title": "<todo title>",
          "description": "<todo description>",
          "status": "<todo status: done/undone>",
          "due_date": "<todo due date>",
          "createdAt": "2021-05-24T15:01:21.735Z",
          "updatedAt": "2021-05-24T15:01:21.735Z"
        }
    },
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
  "message": [
    "Due date cannot be before today"
  ]}`

     OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** Error stack

* **Sample Call:**

  Request body:
  ```json
  {
    "title": "REST API",
    "description": "learning about REST API",
    "status": "undone",
    "due_date": "2021-05-26"
  }
  ```

  Response:
  ```json
  {
    "id": 1,
    "title": "REST API",
    "description": "learning about REST API",
    "status": "undone",
    "due_date": "2021-05-26T00:00:00.000Z",
    "createdAt": "2021-05-24T15:01:21.735Z",
    "updatedAt": "2021-05-24T15:01:21.735Z"
  }
  ```

* **Notes:** none

---

## Show All Todos
Show all todos in Fancy Todo

* **URL**

  `/todos`

* **Method:**
  
  `GET`
  
* **URL Params**: none

* **Data Params**: none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<id number>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      },
      {
        "id": "<id number>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** Error stack

* **Notes:** none
---
## Show Todo by ID
Show todo in Fancy Todo by ID

* **URL**

  `/todos`

* **Method:**
  
  `GET`
  
* **URL Params**

  `/todos/:id`

  **Required:**
  
  `id=[integer]`

* **Data Params**: none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
      {
        "id": "<id number>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
  "message": "Not Found"
}`

* **Notes:** none
---
## Update Todo
Update all todo field in Fancy Todo

* **URL**

  `/todos`

* **Method:**
  
  `PUT`
  
* **URL Params**

  `/todos/:id`

  **Required:**
  
  `id=[integer]`

* **Data Params**: none

* **Request Body**
    ```json
      {
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date, format: YYYY-MM-DD>"
      }
      ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
      {
        "id": "<id number>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
  "message": [
    "Due date cannot be before today"
  ]}`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Not Found"
  }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** Error stack

* **Notes:** none
---
## Update Todo Status
Update only todo status field in Fancy Todo

* **URL**

  `/todos`

* **Method:**
  
  `PATCH`
  
* **URL Params**

  `/todos/:id`

  **Required:**
  
  `id=[integer]`

* **Data Params**: none

* **Request Body**
    ```json
      {
        "status": "<todo status: done/undone>"
      }
      ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
      {
        "id": "<id number>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
  "message": [
    "Due date cannot be before today"
  ]}`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Not Found"
  }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** Error stack

* **Notes:** none
---
## Delete Todo
Delete todo from Fancy Todo

* **URL**

  `/todos`

* **Method:**
  
  `DELETE`
  
* **URL Params**

  `/todos/:id`

  **Required:**
  
  `id=[integer]`

* **Data Params**: none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "todo deleted",
      "deletedData": 
      {
        "id": "<id number>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status: done/undone>",
        "due_date": "<todo due date>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      }
    }
    ```
 
* **Error Response:**

 * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Not Found"
  }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** Error stack

* **Notes:** none
