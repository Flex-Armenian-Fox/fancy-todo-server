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