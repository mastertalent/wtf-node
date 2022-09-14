import fs from "fs";
import { db_file } from "./common/constants";
import Acronym from "./models/acronymModel";
import { IAcronymList } from "./common/interface";

export async function getList(
  limit: number,
  offset: number,
  search: string
): Promise<IAcronymList> {
  try {
    const searchStr = search.replace(/ +(?= ) /g, "");
    const regEx = new RegExp(searchStr, "gi");
    const docs = await Acronym.find(
      {
        $or: [
          {
            acronym: {
              $regex: regEx,
            },
          },
          {
            definition: {
              $regex: regEx,
            },
          },
        ],
      },
      { _id: 0, __v: 0 }
    )
      .skip(offset - 1)
      .limit(limit);

    return { data: docs, totalCount: (await Acronym.find()).length };
  } catch (e) {
    console.log(e);
    return { data: [], totalCount: 0 };
  }
}

export async function _createAcronym(acronym: string, definition: string) {
  const newAcronym = new Acronym({ acronym, definition });
  await newAcronym.save();
}

export async function _updateAcronym(acronym: string, definition: string) {
  const _acronym = await Acronym.findOne({ acronym });
  if (!_acronym) return -1;
  await Acronym.findOneAndUpdate({ acronym }, { definition });
  return 1;
}

export async function _deleteAcronym(acronym: string) {
  const _acronym = await Acronym.findOne({ acronym });
  if (!_acronym) return -1;
  await Acronym.findOneAndDelete({ acronym });
  return 1;
}
