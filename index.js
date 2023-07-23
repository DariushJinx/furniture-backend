const Application = require("./app/server");
const DB_URI = "mongodb://127.0.0.1:27017/furniture";
require("dotenv").config();
new Application(3333, DB_URI);
