#FANCY TODO SERVER

## TODOS API
**Post Data Todos**
----
  create a new data todos and save it to database

* **URL**

  '/todos'

* **Method:**
  
  `POST`

* **URL Params**
* **Data Params**
    ```json
    {
        "title": "<todos title>",
        "descripton": "<todos description>",
        "status": "Undone || Done",
        "due_date": "<todos due date>"
    }
    ```
* **Success Response:**
  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "title": "<todos title>",
        "descripton": "<todos description>",
        "status": "Undone || Done",
        "due_date": "<todos due date>"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** 
    ```json
    {
        "error": "<validation error>"
    }
    ```    

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "<error response>" }`

**Get All Data Todos**
----
  get all data todos

* **URL**

  '/todos'

* **Method:**
  
  `GET`

* **URL Params**
* **Data Params**
* **Success Response:**
  * **Code:** 201 <br />
    **Content:** 
    ```json
    [
        {
            "id": "<todos id>",
            "title": "<todos title>",
            "descripton": "<todos description>",
            "status": "Undone || Done",
            "due_date": "<todos due date>"
        }   
    ]
    ```
 
* **Error Response:**
  * **Code:** 500 <br />
    **Content:** `{ error : "<error response>" }`

**Get Todos By ID**
----
  get todos data by id

* **URL**

  '/todos/:id'

* **Method:**
  
  `GET`

* **URL Params**
* **Data Params**
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "id": "<todos id>",
            "title": "<todos title>",
            "descripton": "<todos description>",
            "status": "Undone || Done",
            "due_date": "<todos due date>"
        }   
    ]
    ```
 
* **Error Response:**
  * **Code:** 404 <br />
    **Content:** `{ error : "<error response>" }`


**Put Data Todos**
----
  Update todos data by id

* **URL**

  '/todos/:id'

* **Method:**
  
  `PUT`

* **URL Params**
* **Data Params**
    ```json
    {
        "id": "<todos id>",
        "title": "<todos title>",
        "descripton": "<todos description>",
        "status": "Undone || Done",
        "due_date": "<todos due date>"
    }   
    ```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "id": "<todos id>",
            "title": "<todos title>",
            "descripton": "<todos description>",
            "status": "Undone || Done",
            "due_date": "<todos due date>"
        }   
    ]
    ```
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ error : "<error response>" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "<Not Found error response>" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "<rror response>" }`



**Patch Data Todos**
----
  Update Status todos data by id

* **URL**

  '/todos/:id'

* **Method:**
  
  `PATCH`

* **URL Params**
* **Data Params**
    ```json
    {
        "status": "<todos status>"
    }   
    ```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "id": "<todos id>",
            "title": "<todos title>",
            "descripton": "<todos description>",
            "status": "Undone || Done",
            "due_date": "<todos due date>"
        }   
    ]
    ```
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ error : "<error response>" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "<Not Found error response>" }`

  OR

  * **Code:** 505 <br />
    **Content:** `{ error : "<error response>" }`


**Delete Data Todos**
----
  Delete todos data by id

* **URL**

  '/todos/:id'

* **Method:**
  
  `DELETE`

* **URL Params**
* **Data Params**
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{message: "todo success to delete"}`
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ error : "<error response>" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ error : "<Not Found error response>" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "<error response>" }`


## TODOS USERS
**Register User**
----
  create a new data user and save it to database

* **URL**

  '/users'

* **Method:**
  
  `POST`

* **URL Params**
* **Data Params**
    ```json
    {
        "email": "<user email>",
        "password": "<user password>"
    }
    ```
* **Success Response:**
  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "message": "user created"
    }
    ```
 
* **Error Response:**
  * **Code:** 500 <br />
    **Content:** `{ error : "<error response>" }`

**Login User**
----
  Login user and get access_token

* **URL**

  '/users/login'

* **Method:**
  
  `POST`

* **URL Params**
* **Data Params**
    ```json
    {
        "email": "<user email>",
        "password": "<user password>"
    }
    ```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "access_token": "<access token>"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{ message : "User Or Password Incorrect" }`

 OR

  * **Code:** 500 <br />
    **Content:** `{ error : "<error response>" }`


## GET DATA COVID
**Get Data Covid World**
----
  Get information about covid data in the world

* **URL**

  '/covid'

* **Method:**
  
  `GET`

* **URL Params**
* **Data Params**
* **Success Response:**
  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "data": "{data covid world}"
    }
    ```
 
* **Error Response:**
  * **Code:** 500 <br />
    **Content:** `{ error : "<error response>" }`