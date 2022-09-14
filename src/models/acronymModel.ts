import { Schema, model } from "mongoose";
import { IAcronym } from "../common/interface";

const acronymSchema = new Schema<IAcronym>(
  {
    acronym: {
      type: String,
      required: true,
      trim: true,
    },
    definition: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "acronym" }
);

const Acronym = model<IAcronym>("acronym", acronymSchema);

export default Acronym;
