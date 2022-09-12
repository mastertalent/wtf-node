import fs from "fs";
import { db_file } from "./common/constants";
import { validationResult } from "express-validator";
import acronymService from "./services";

const getAcronymList = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "invalid params" });
  }
  try {
    const { limit, offset, search } = req.query;

    if (limit < 1 || limit > 100 || offset < 1)
      return res.status(400).send({ message: "wrong params!" });

    const resource = req.path.split("/")[1];

    const { data, totalCount } = acronymService.getList(limit, offset, search);

    return res
      .header("Access-Control-Expose-Headers", "Content-Range")
      .header("Access-Control-Expose-Headers", "Accept-Range")
      .header(
        "Content-Range",
        `${offset}-${
          parseInt(limit) > data.length
            ? parseInt(offset) - 1 + data.length
            : parseInt(offset) - 1 + parseInt(limit)
        }/${totalCount}`
      )
      .header("Accept-Range", `${resource} 100`)
      .status(200)
      .json(data);
  } catch (e) {
    return res.status(500);
  }
};

const createAcronym = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "invalid params" });
  }
  try {
    const { acronym, definition } = req.body;

    acronymService.create(acronym, definition);

    return res.status(200).send({ status: 200, message: "Success!" });
  } catch (e) {
    return res.status(500);
  }
};

const updateAcronym = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "invalid params" });
  }
  try {
    const { acronym } = req.params;
    const { definition } = req.body;

    if (acronymService.update(acronym, definition) === -1) {
      return res
        .status(404)
        .send({ status: 404, message: "Acronym Not Found!" });
    }

    return res.status(200).send({ status: 200, message: "Success!" });
  } catch (e) {
    return res.status(500);
  }
};

const deleteAcronym = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "invalid params" });
  }
  try {
    const { acronym } = req.params;

    if (acronymService.delete(acronym) === -1) {
      return res
        .status(404)
        .send({ status: 404, message: "Acronym Not Found!" });
    }

    return res.status(200).send({ status: 200, message: "Success!" });
  } catch (e) {
    return res.status(500);
  }
};

export { getAcronymList, createAcronym, updateAcronym, deleteAcronym };
