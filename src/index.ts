import express, { json, urlencoded } from "express";
import cors from "cors";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");

const app = express();

app.use(cors(), json(), urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Acronym REST API",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("*", (req, res) => {
  res.status(404).send({
    status: 404,
    message: "Not Found!",
  });
});

const _port = process.env.PORT || 4000;

const server = app.listen(_port, () => {
  console.log(`Server is listening on port ${_port}`);
});

export default app;
export { server };
