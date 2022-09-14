import express, { json, urlencoded } from "express";
import http from "http";
import cors from "cors";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");

import connectDB from "./common/db";

class Server {
  public app: express.Application;
  public server!: http.Server;
  public port = process.env.PORT || 4000;

  constructor() {
    this.app = express();
  }

  public async run(): Promise<void> {
    this.app.use(json(), cors(), urlencoded({ extended: true }));

    await connectDB();

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    this.app.use(router);

    this.server = this.app.listen(this.port);
    this.server.on("listening", () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}

export default new Server();
