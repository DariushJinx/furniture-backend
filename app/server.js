const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const { COOKIE_PARSER_SECRET_KEY } = require("./utils/constans.utils");
const session = require("express-session");
const AllRouter = require("./routers/main.routes");
const { notFound, Errors } = require("./utils/errorHandler.utils");

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#DB_URI = DB_URI;
    this.#PORT = PORT;
    this.configApplication();
    this.initClientSession();
    this.initRedis();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
  }

  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "furniture website",
              version: "1.0.0",
              description:
                "This site is for display and supply of all kinds of furniture",
            },
            servers: [
              {
                url: "http://127.0.0.1:3333",
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/routers/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }
  initClientSession() {
    this.#app.use(cookieParser(COOKIE_PARSER_SECRET_KEY));
    this.#app.use(
      session({
        secret: COOKIE_PARSER_SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {
          secure: true,
          signed: true,
        },
      })
    );
  }
  initRedis() {
    require("./utils/initRedis.utils");
  }
  connectToMongoDB() {
    const mongoose = require("mongoose");
    mongoose.connect(this.#DB_URI).then(() => {
      console.log("connect to DB successfully...");
    });
    // The following items are for the Morgan package
    // connected to DB
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB ...");
    });
    // disconnected to DB
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose disconnected to DB ...");
    });
    // exit
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
  }
  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(`server run on => http://127.0.0.1:${this.#PORT}`);
    });
  }
  createRoutes() {
    this.#app.use(AllRouter);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      notFound(res);
    });
    this.#app.use((error, req, res, next) => {
      Errors(error, res);
    });
  }
};
