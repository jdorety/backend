# backend

backend repository

## **Back-end Development Role Description**

You have been learning all about NodeJS and Express and SQL in order to craft Web Servers and build API's for consumption by client side applications. You will use these skills to be in charge of building out the back-end API for your project.

## **The `Back End Development` unit explored the following topics:**

- Building RESTful Web APIs with Express and Node.js
- Server-side Routing`,`Express Middleware
- Deployment and Good Practices
- Introduction to Relational Databases and SQL
- Inserting and Modifying Data
- Querying Data, Migrations and Seeding
- Introduction to Data Modeling
- Introduction to Authentication
- Using Sessions and Cookies
- Using JSON Web Tokens (JWT)
- Client Side Authentication
- Introduction to Automated Testing
- Testing React Applications
- Testing Web APIs

## **Your primary role as a Back-end Architect**

You will use your skills to be responsible for the back-end architecture of this project. You will work closely with your Front End Architect and your Scrum Master in order to discover project needs and deliver working Endpoints for your application.

## Grading Rubric:

Use [this rubric](https://docs.google.com/spreadsheets/d/1sFgvt8HtqNCw32YC8Wvrgrdb61oEWPTsBUrvOL3rAGQ/edit#gid=0) to help guide your development processes

## API documentation

### **Authentication Endpoints**

| HTTP method | endpoint             | description                                                                    |
| ----------- | -------------------- | ------------------------------------------------------------------------------ |
| **POST**    | `/api/auth/register` | post object containing `username` and `password` to add user to database.      |
| **POST**    | `/api/auth/login`    | post object containing `username` and `password` to authenticate existing user |

### **User Endpoints**

| HTTP method | endpoint                | description                                                                                  |
| ----------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| **GET**     | `/api/user/:id/parties` | `:id = user_id` Pass user id in endpoint. Returns array of all parties associated with user. |
| **GET**     | `/api/user/:id`         | Find user by id number.                                                                      |

### **Party Endpoints**

| HTTP method | endpoint                       | description                                                                                                                                                                       |
| ----------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POST**    | `/api/party`                   | Post object containing required `user_id`, and can also include `numberGuest` (int), `when` (string formatted `MM-DD-YYYY`), `theme` (str), and `budget` (float) key/value pairs. |
| **PUT**     | `/api/party/:id`               | Pass `party_id` in URL and object containing keys whose values need changing. Returns `int` 1 on success                                                                          |
| **GET**     | `/api/party/:id`               | Retrieve party with `id` specified in URL. Returns object containing all info related to party, including shopping, entertainment, and todo lists                                 |
| **GET**     | `/api/party/:id/todos`         | Returns todo list array associated with `party_id` passed in URL                                                                                                                  |
| **GET**     | `/api/party/:id/entertainment` | Returns entertainment list array associated with `party_id` passed in URL                                                                                                         |
| **GET**     | `/api/party/:id/shopping`      | Returns shopping list array associated w/ `party_id` passed in URL                                                                                                                |
| **DELETE**  | `/api/party/:id`               | Delete party object with matching `id`                                                                                                                                            |

### **ToDo Endpoints**

| HTTP method | endpoint         | description                                                                                                                                                                            |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POST**    | `/api/todos`     | Add new todo item, posting object containing `party_id` (int), `item` (str), and `completed` (boolean). `completed` defaults to false if not included in post. Returns `id` on success |
| **PUT**     | `/api/todos/:id` | Edit existing todo item with object containing entries for what needs changing. Returns `int` 1 on success                                                                             |
| **DELETE**  | `/api/todos/:id` | Delete existing todo item that matches `id` passed in URL                                                                                                                              |

### **Entertainment Endpoints**

| HTTP method | endpoint                 | description                                                                                                                                                                                      |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **POST**    | `api/entertainment`      | Adds entertainment entry to list associated w/ `party_id` posted in object. `party_id` (int) and `item` (str) are required. `ready` will default to false if not passed. Returns `id` on success |
| **PUT**     | `/api/entertainment/:id` | Edits object w/ matching `id` using passed object to indicate changes. Returns `int` 1 on success                                                                                                |
| **DELETE**  | `api/entertainment/:id`  | Deletes entry w/ matching `id` (int)                                                                                                                                                             |

### **Shopping Endpoints**

| HTTP method | endpoint           | description                                                                                                                                                                                                                                      |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **POST**    | `api/shopping`     | Adds shopping list entry for required `party_id` (int) entry in posted object. Other entries include `item` (required str), `quantity` (int, defaults to 1), `purchased` (boolean, defaults to false), and `cost` (int). Returns `id` on success |
| **PUT**     | `api/shopping/:id` | Edits entry w/ `id` matching one passed in URL, and object with changes in PUT request. Returns `int` 1 on success                                                                                                                               |
| **DELETE**  | `api/shopping/:id` | Deletes entry w/ matching id (int)                                                                                                                                                                                                               |

### **Mood Board Enpoints**

| HTTP method | endpoint             | description                                                                                                                                                            |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POST**    | `api/mood/:party_id` | Add image to mood board associated with party that matches `party_id`. Returns image's `id` from the mood_board table. Only supports JPEG format at the moment         |
| **DELETE**  | `api/mood/:id`       | Deletes image assocated with `id` in mood_board table, and from hosting service. Returns only status code 200 on success, and status 404 if image does not exist in DB |
| **GET**     | `api/mood/:id`       | Retrieve image record with associated `id` from mood_board table                                                                                                       |
