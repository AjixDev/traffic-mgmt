# Traffic Processor

## Description

The Traffic Processor is a Node.js application designed to handle incoming traffic source requests, generate unique internal parameters (`our_param`), and redirect users to affiliate links. It also provides APIs to retrieve original traffic source values and refresh mappings.

---

## Requirements

- **Node.js**: v16 or higher
- **MySQL**: v8.0 or higher
- **npm**: v7 or higher

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd traffic-mgmt
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up the Database**:

   - Create a MySQL database:
     ```sql
     CREATE DATABASE traffic_processor;
     ```
   - Import the schema:
     ```bash
     mysql -u <username> -p traffic_processor < schema.sql
     ```

4. **Configure the Database Connection**:

   - Update the database credentials in `services/dbService.js`:
     ```javascript
     const db = mysql.createPool({
       host: "localhost",
       user: "root",
       password: "password",
       database: "traffic_processor",
     });
     ```

5. **Run the Application**:
   ```bash
   npm start
   ```

---

## Testing

1. **Run Tests**:

   ```bash
   npm test
   ```

2. **Test Coverage**:
   - The application includes unit and integration tests for all major components.
   - Ensure the database is running before executing tests.

---

## API Endpoints

### 1. **Traffic Request Handling**

- **Endpoint**: `GET /`
- **Description**: Processes incoming traffic source requests and redirects to the affiliate link with `our_param`.
- **Query Parameters**:
  - `keyword`: The keyword associated with the traffic.
  - `src`: The source of the traffic.
  - `creative`: The creative ID used in the traffic source.
- **Example**:
  ```bash
  curl "http://localhost:3000/?keyword=shoes&src=google&creative=1234"
  ```

### 2. **Retrieve Original Values**

- **Endpoint**: `GET /mapping/retrieve_original`
- **Description**: Retrieves the original traffic source values based on `our_param`.
- **Query Parameters**:
  - `our_param`: The internally generated parameter.
- **Example**:
  ```bash
  curl "http://localhost:3000/mapping/retrieve_original?our_param=abc123xyz"
  ```

### 3. **Refresh Mapping**

- **Endpoint**: `POST /mapping/refresh`
- **Description**: Forces a refresh of `our_param` for a given combination of traffic source parameters.
- **Body Parameters**:
  - `keyword`: The keyword associated with the traffic.
  - `src`: The source of the traffic.
  - `creative`: The creative ID used in the traffic source.
- **Example**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"keyword":"shoes","src":"google","creative":"1234"}' http://localhost:3000/mapping/refresh
  ```

---

## Project Structure

```
traffic-mgmt/
├── controllers/
│   ├── trafficController.js
│   ├── mappingController.js
├── routes/
│   ├── trafficRoutes.js
│   ├── mappingRoutes.js
├── services/
│   ├── dbService.js
│   ├── paramService.js
├── tests/
│   ├── trafficController.test.js
│   ├── mappingController.test.js
│   ├── paramService.test.js
├── schema.sql
├── app.js
├── server.js
├── package.json
├── README.md
```

---

## Features

- **Traffic Source Request Handling**: Processes requests and generates unique internal parameters.
- **Affiliate Link Redirection**: Redirects users to affiliate links with `our_param`.
- **Mapping Retrieval**: Provides an API to retrieve original traffic source values.
- **Mapping Refresh**: Allows forced regeneration of `our_param`.

---

## License

This project is licensed under the ISC License.
