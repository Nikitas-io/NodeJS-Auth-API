# Instructions
For the app to run correctly you have to:
- `npm install` all its dependencies first.
- Create a database on MongoDB Atlas.
- Create a **.env** file in its root directory with the following environment variables:
```
DB_CONNECT = mongodb+srv://<user>:<password>@cluster0-3ltus.mongodb.net/<db_name>?retryWrites=true&w=majority
TOKEN_SECRET = your-secret
```
- Install Postman to make requests to the API.