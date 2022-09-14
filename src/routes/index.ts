import express from "express";
import {
  getAcronymList,
  createAcronym,
  updateAcronym,
  deleteAcronym,
} from "../controller";

import { buildCheckFunction, validationResult, body } from "express-validator";
const checkParam = buildCheckFunction(["query", "body", "params"]);

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Acronym REST API",
  });
});

routes.get(
  "/acronym",
  [
    checkParam("limit").exists().isInt(),
    checkParam("offset").exists().isInt(),
    checkParam("search").optional().isString(),
  ],
  getAcronymList
);

routes.post(
  "/acronym",
  [
    checkParam("acronym").exists().isString(),
    checkParam("definition").exists().isString(),
  ],
  createAcronym
);

routes.put(
  "/acronym/:acronym",
  [checkParam("acronym").exists().isString()],
  updateAcronym
);

routes.delete(
  "/acronym/:acronym",
  [checkParam("acronym").exists().isString()],
  deleteAcronym
);

routes.use("*", (req, res) => {
  res.status(404).send({
    status: 404,
    message: "Not Found!",
  });
});

export default routes;
