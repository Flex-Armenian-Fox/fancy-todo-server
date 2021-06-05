# TODO API Doc

API Endpoints Documentation for Todo!

List of Endpoints:
| HTTP Method | URL        | Deskripsi                                                                                   |
| ----------- | ---------- | ------------------------------------------------------------------------------------------- |
| **GET**     | /todos     | Menampilkan semua todo yang ada di database                                                 |
| **GET**     | /todos/:id | Menampilkan todo berdasarkan param **id**                                                   |
| **POST**    | /todos     | Membuat todo baru                                                                           |
| **PUT**     | /todos/:id | Mengupdate kolom title, description, status, due_date berdasarkan param **id** yang dikirim |
| **PATCH**   | /todos/:id | Mengupdate kolom status berdasarkan param **id** yang dikirim                               |
| **DELETE**  | /todos/:id | Menghapus todo berdasarkan param **id** yang dikirim                                        |
| **POST** | /users/register | Register user baru |
| **POST** | /users/login | Melakukan proses login |
| **POST** | /users/google-login | Login dengan google |
| **POST** | /users/facebook-login | Login dengan facebook |
----------

### Menampilkan semua todo yang ada di database
- **URL** : `/todos`
- **Method** : `GET`
- **URL Param** : none
- **Data Param** : none
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
     ```json
     [
          {
              "id": 1,
              "title": "Menangkap ayam di kebun",
              "description": "Pergi ke kebun di pagi hari untuk menangkap ayam",
              "status": "New",
              "due_date": {
                "value": "2021-05-24T00:56:21.112Z",
                "holiday": null
              },
              "createdAt": "2021-05-24T13:42:39.759Z",
              "updatedAt": "2021-05-24T13:42:39.759Z"
          },
          {
              "id": 2,
              "title": "Memotong ayam, minimal 1000 ayam per jam",
              "description": "Setelah selesai ditangkap, ayam ayam tersebut dipotong",
              "status": "New",
              "due_date": {
                "value": "2021-06-01T05:12:21.112Z",
                "holiday": {
                  "id": 4,
                  "holiday_name": "Pancasila Day",
                  "holiday_date": "2021-06-01",
                  "holiday_description": "Pancasila Day is a national holiday in Indonesia",
                  "holiday_type": "National Holiday",
                  "createdAt": "2021-06-01T12:20:18.119Z",
                  "updatedAt": "2021-06-01T12:20:18.119Z"
                }
              },
              "createdAt": "2021-05-24T13:42:39.759Z",
              "updatedAt": "2021-05-24T13:42:39.759Z"
          }
      ]
     ```
- **Error response** :
    - **Response Code** : `500`
    - **Content** : 
        ```json
        {
          "status": "Error",
          "name": "Internal Server Error",
          "message": "Internal Server Error"
        }
        ```
----------

### Menampilkan Todo By Id
- **URL** : `/todos/:id`
- **Method** : `GET`
- **URL Param** : `id`
- **Data Param** : none
- **Success response** : 
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "id": 1,
      "title": "Menangkap ayam di kebun",
      "description": "Pergi ke kebun di pagi hari untuk menangkap ayam",
      "status": "New",
      "due_date": {
        "value": "2021-05-24T00:56:21.112Z",
        "holiday": null
      },
      "createdAt": "2021-05-24T13:42:39.759Z",
      "updatedAt": "2021-05-24T13:42:39.759Z"
    }  
    ```
- **Error response** :
    - **Response Code** : `404`
    - **Content** :
      ```json
      {
         "status": "Error",
         "name": "NotFound",
         "message": "Todo with id <id> not found"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
       ```json
       {
         "status": "Error",
         "name": "Internal Server Error",
         "message": "Internal Server Error"
       }
       ```

----------
### Membuat todo baru
- **URL** : `/todos`
- **Method** : `POST`
- **URL Param** : none
- **Body** :
   ```json
   {
        "title": "Mencuci baju",
        "description": "Mencuci baju yang masih kotor",
        "status": "New",
        "due_date": "2021-05-25"
   }
   ```
- **Success response** :
  - **Response Code** : `201`
  - **Content** :
    ```json
    {
      "message": "Success create new todo",
      "data": {
          "id": 39,
          "title": "Mencuci baju",
          "description": "Mencuci baju yang masih kotor",
          "status": "New",
          "due_date": "2021-05-25T00:00:00.000Z",
          "updatedAt": "2021-05-25T13:35:21.090Z",
          "createdAt": "2021-05-25T13:35:21.090Z"
      }
    }
    ```
- **Error response** :
    - **Response Code** : `400`
    - **Content** :
      ```json
      {        
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "max attribute due_date is today"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
       ```json
      {        
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```
----------
### Mengupdate kolom title, description, status, due_date berdasarkan param **id** yang dikirim
- **URL** : `/todos/:id`
- **Method** : `PUT`
- **URL Param** : `id`
- **Body** :
   ```json
   {
        "title": "Mencuci baju tetangga",
        "description": "Mencuci baju tetangga yang masih kotor",
        "status": "New",
        "due_date": "2021-05-25"
   }
   ```
- **Success response** :
  - **Response Code** : `201`
  - **Content** :
    ```json
    {
      "message": "Update success, 1 row affected",
      "data": {
          "id": 39,
          "title": "Mencuci baju tetangga",
          "description": "Mencuci baju tetangga yang masih kotor",
          "status": "New",
          "due_date": "2021-05-25T00:00:00.000Z",
          "updatedAt": "2021-05-25T13:35:21.090Z",
          "createdAt": "2021-05-25T13:35:21.090Z"
      }
    }
    ```
- **Error response** :
    - **Response Code** : `400`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "max attribute due_date is today"
      }
      ```
    - **Response Code** : `404`
    - **Content** :
      ```json
      {        
        "status": "Error",
        "name": "NotFound",
        "message": "Todo with id <id> was not found"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
      ```json
      {        
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```

----------
### Mengupdate kolom status berdasarkan param **id** yang dikirim
- **URL** : `/todos/:id`
- **Method** : `PATCH`
- **URL Param** : `id`
- **Body** :
   ```json
   {        
        "status": "Complete"
   }
   ```
- **Success response** :
  - **Response Code** : `201`
  - **Content** :
    ```json
    {
      "message": "Update success, 1 row affected",
      "data": {
          "id": 39,
          "title": "Mencuci baju tetangga",
          "description": "Mencuci baju tetangga yang masih kotor",
          "status": "Complete",
          "due_date": "2021-05-25T00:00:00.000Z",
          "updatedAt": "2021-05-25T13:35:21.090Z",
          "createdAt": "2021-05-25T13:35:21.090Z"
      }
    }
    ```
- **Error response** :
    - **Response Code** : `400`
    - **Content** :
      ```json
      {        
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "max attribute due_date is today"      
      }
      ```
    - **Response Code** : `404`
    - **Content** :
      ```json
      {          
        "status": "Error",
        "name": "NotFound",
        "message": "Todo with id <id> was not found"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
      ```json
      {          
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```

----------
### Menghapus todo berdasarkan param **id** yang dikirim
- **URL** : `/todos/:id`
- **Method** : `DELETE`
- **URL Param** : `id`
- **Body** : none   
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "message": "todo success to delete",
      "data": {
          "id": 39,
          "title": "Mencuci baju tetangga",
          "description": "Mencuci baju tetangga yang masih kotor",
          "status": "Complete",
          "due_date": "2021-05-25T00:00:00.000Z",
          "updatedAt": "2021-05-25T13:35:21.090Z",
          "createdAt": "2021-05-25T13:35:21.090Z"
      }
    }
    ```
- **Error response** :    
    - **Response Code** : `404`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "NotFound",
        "message": "Todo with id <id> was not found"      
      }
      ```
    - **Response Code** : `500`
    - **Content** : 
       ```json
      {          
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
       ```

----------
### Register user baru
- **URL** : `/users/register`
- **Method** : `POST`
- **URL Param** : none
- **Body** : 
    ```json
    {
        "email": "jhondoe@mail.com",
        "password": "my password"
    }
    ```
- **Success response** :
  - **Response Code** : `201`
  - **Content** :
    ```json
    {
        "message": "User create successfully",
        "data": {
            "id": 7,
            "email": "jhondoe@mail.com",
            "createdAt": "2021-05-28T14:12:13.979Z"
        }
    }
    ```
- **Error response** :    
    - **Response Code** : `400`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "Wrong email format"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```

----------
### Melakukan proses login
- **URL** : `/users/login`
- **Method** : `POST`
- **URL Param** : none
- **Body** : 
    ```json
    {
        "email": "jhondoe@mail.com",
        "password": "my password"
    }
    ```
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
        "message": "Login Success",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJqaG9uZG9lQG1haWwuY29tIiwiaWF0IjoxNjIyMjEyMjc1fQ.APFNGkqE_LVf_RyNopLu_MijijebwFqPJTEeelMFfiY"
    }
    ```
- **Error response** :    
    - **Response Code** : `400`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "Please provide field username or password"
      }
      ```
    - **Response Code** : `401`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "JSONWebTokenError",
        "message": "invalid credentials"
      }
      ```
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```
----------
### Login dengan google
- **URL** : `/users/google-login`
- **Method** : `POST`
- **URL Param** : none
- **Body** : 
    ```json
    {
      "google_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MTllYjk1N2Y2OTU2YjU4MThjMTk2OGZmMTZkZmY3NzRlNzA4ZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjY1NDI2NDc5MzUxLWQ4bDYxbXExaGZxazQ0cG5zZDNiOTRtcXZxcmg3MjgzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjY1NDI2NDc5MzUxLWQ4bDYxbXExaGZxazQ0cG5zZDNiOTRtcXZxcmg3MjgzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyMTgzMzMwMDE5OTY0ODgwMDcwIiwiZW1haWwiOiJhcGhtYWlsZGV2MTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZkhrMnowV2hHakdjQkNUdk91NjUyZyIsIm5hbWUiOiJNYWlsIERldiBBY2NvdW50IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnkyOXh5dHFzS0hVRW9xQkQ3eFJXdjRLbnBMR1g5X2JMSWFxQ1loPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1haWwgRGV2IiwiZmFtaWx5X25hbWUiOiJBY2NvdW50IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MjI4NzU3NzYsImV4cCI6MTYyMjg3OTM3NiwianRpIjoiZTYxNTlhMGVjYjFiZTk2MzFmMGQ1OWQ2NjgwZGJjODUwZjBjMGU5YSJ9.aD5S6Y-x7amsGPrijtOs-_54d0JkxrRRbZ0VPf_VJI-IuhOnl705nKRhKJ6cdHrmdLxwa3eNl2BTZ42MXMYimkU9teHN_wFK69amy9XTi8446uBOLoqcjUsmlW80lr1XRkaAdVsnaDlih0jDTpNiZAtHGZWp63H3bEb5Cco3WV_4aCZ8N2BqafZLQIXGHa-PyPUtvs4G54QEEyPb8iZzm2ydowhtRyURQIAjGYYj3_sgsZNEPLyDWZBJ_LUYRLW2TBiOde3oliBGL6v6D4xU0A1sYQA_bfKnVACj_JWV1-Hu1NHXTDysft5dPbKSMo_cQMI0VtlM_OrEM3z_28rzIQ"
    }
    ```
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
        "message": "Login Success",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJqaG9uZG9lQG1haWwuY29tIiwiaWF0IjoxNjIyMjEyMjc1fQ.APFNGkqE_LVf_RyNopLu_MijijebwFqPJTEeelMFfiY"
    }
    ```
- **Error response** :    
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```

----------
### Login dengan facebook
- **URL** : `/users/facebook-login`
- **Method** : `POST`
- **URL Param** : none
- **Body** : 
    ```json
    {
      "email": "your-facebook-email@gmail.com"
    }
    ```
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
        "message": "Login Success",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJqaG9uZG9lQG1haWwuY29tIiwiaWF0IjoxNjIyMjEyMjc1fQAPFNGkqE_LVf_RyNopLu_MijijebwFqPJTEeelMFfiY"
    }
    ```
- **Error response** :    
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "status": "Error",
        "name": "Internal Server Error",
        "message": "Internal Server Error"
      }
      ```