# The Chauffeur Backend API Documentation

## Endpoints

### POST /user/register

Register a new user.

#### Request

- **URL**: `/user/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

#### Response

- **Success**: 
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 5 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

- **Missing Fields**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Please provide all required fields"
        }
      ]
    }
    ```

#### Description

This endpoint registers a new user by accepting their first name, last name, email, and password. The password is hashed before storing it in the database. Upon successful registration, a JWT token is generated and returned along with the user details.

### POST /user/login

Login a user.

#### Request

- **URL**: `/user/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 5 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Invalid Credentials**:
  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### Description

This endpoint logs in a user by accepting their email and password. Upon successful login, a JWT token is generated and returned along with the user details.

### GET /user/profile

Get the profile of the logged-in user.

#### Request

- **URL**: `/user/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer jwt_token`

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
    ```

#### Description

This endpoint retrieves the profile of the logged-in user.

### POST /user/logout

Logout the logged-in user.

#### Request

- **URL**: `/user/logout`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer jwt_token`

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Description

This endpoint logs out the logged-in user by clearing the JWT token.

### POST /captain/register

Register a new captain.

#### Request

- **URL**: `/captain/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

#### Response

- **Success**: 
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 5 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Plate must be at least 3 characters long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be at least 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "Vehicle type must be either motorcycle, car or Auto",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

- **Missing Fields**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Please provide all required fields"
        }
      ]
    }
    ```

#### Description

This endpoint registers a new captain by accepting their first name, last name, email, password, and vehicle details. The password is hashed before storing it in the database. Upon successful registration, a JWT token is generated and returned along with the captain details.

### POST /captain/login

Login a captain.

#### Request

- **URL**: `/captain/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 5 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Invalid Credentials**:
  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### Description

This endpoint logs in a captain by accepting their email and password. Upon successful login, a JWT token is generated and returned along with the captain details.

### GET /captain/profile

Get the profile of the logged-in captain.

#### Request

- **URL**: `/captain/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer jwt_token`

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
    ```

#### Description

This endpoint retrieves the profile of the logged-in captain.

### POST /captain/logout

Logout the logged-in captain.

#### Request

- **URL**: `/captain/logout`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer jwt_token`

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Description

This endpoint logs out the logged-in captain by clearing the JWT token.

### POST /ride/create

Create a new ride.

#### Request

- **URL**: `/ride/create`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer jwt_token`
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "pickup": "Pickup location",
    "destination": "Destination location",
    "vehicleType": "car"
  }
  ```

#### Response

- **Success**: 
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "rideId": "ride_id",
      "pickup": "Pickup location",
      "destination": "Destination location",
      "vehicleType": "car",
      "status": "pending"
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Pickup location must be at least 3 characters long",
          "param": "pickup",
          "location": "body"
        },
        {
          "msg": "Destination must be at least 3 characters long",
          "param": "destination",
          "location": "body"
        },
        {
          "msg": "Vehicle type must be one of the following: motorcycle, car, auto",
          "param": "vehicleType",
          "location": "body"
        }
      ]
    }
    ```

#### Description

This endpoint allows a user to create a new ride by providing the pickup location, destination, and vehicle type. The ride is created with a pending status.

---

### GET /ride/get-fare

Get the estimated fare for a ride.

#### Request

- **URL**: `/ride/get-fare`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer jwt_token`
- **Query Parameters**:
  - `pickup`: Pickup location (string, required)
  - `destination`: Destination location (string, required)

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "fare": 150
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Pickup location must be at least 3 characters long",
          "param": "pickup",
          "location": "query"
        },
        {
          "msg": "Destination must be at least 3 characters long",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```

#### Description

This endpoint calculates the estimated fare for a ride based on the provided pickup and destination locations.

---

### GET /maps/get-coordinates

Get the coordinates of a given address.

#### Request

- **URL**: `/maps/get-coordinates`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer jwt_token`
- **Query Parameters**:
  - `address`: Address to get coordinates for (string, required)

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "latitude": 12.971598,
      "longitude": 77.594566
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Address must be at least 3 characters long",
          "param": "address",
          "location": "query"
        }
      ]
    }
    ```

#### Description

This endpoint retrieves the latitude and longitude of a given address.

---

### GET /maps/get-distance-time

Get the distance and estimated time between two locations.

#### Request

- **URL**: `/maps/get-distance-time`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer jwt_token`
- **Query Parameters**:
  - `origin`: Origin location (string, required)
  - `destination`: Destination location (string, required)

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "distance": "10 km",
      "time": "15 mins"
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Origin is required and must be at least 3 characters long",
          "param": "origin",
          "location": "query"
        },
        {
          "msg": "Destination is required and must be at least 3 characters long",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```

#### Description

This endpoint calculates the distance and estimated time between the origin and destination locations.

---

### GET /maps/get-suggestions

Get location suggestions based on input.

#### Request

- **URL**: `/maps/get-suggestions`
- **Method**: `GET`
- **Query Parameters**:
  - `input`: Input text for location suggestions (string, required)

#### Response

- **Success**: 
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "suggestions": [
        "Location 1",
        "Location 2",
        "Location 3"
      ]
    }
    ```

- **Validation Errors**:
  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Input query parameter is required",
          "param": "input",
          "location": "query"
        }
      ]
    }
    ```

#### Description

This endpoint provides location suggestions based on the input text.