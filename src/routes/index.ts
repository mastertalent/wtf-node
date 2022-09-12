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

export default routes;
