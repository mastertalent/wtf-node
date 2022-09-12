import fs from "fs";
import { db_file } from "./common/constants";

const acronymService = {
  getList: (limit: number, offset: number, search: string) => {
    const loadedData = JSON.parse(fs.readFileSync(db_file).toString());

    let filterResult: Array<Object> = loadedData;

    if (!(search == undefined || search == "")) {
      filterResult = [];

      const searchStr = search.replace(/ +(?= ) /gi, "");
      const regEx = new RegExp(searchStr, "gi");

      loadedData.forEach((element: any) => {
        const key = element["acronym"];
        const value = element["definition"];

        if (key.match(regEx) || value.match(regEx)) {
          filterResult.push(element);
        }
      });
    }
    const _totalCount = filterResult.length;

    filterResult = filterResult.slice(offset - 1);
    return { data: filterResult.slice(0, limit), totalCount: _totalCount };
  },

  create: (acronym: string, definition: string) => {
    const loadedData = JSON.parse(fs.readFileSync(db_file).toString());

    loadedData.push({ acronym: acronym, definition: definition });

    const newData = loadedData.sort((n1: any, n2: any) => {
      return n1.acronym.toLowerCase().localeCompare(n2.acronym.toLowerCase());
    });

    fs.writeFileSync(db_file, JSON.stringify(newData));
  },

  update: (acronym: string, definition: string) => {
    let loadedData = JSON.parse(fs.readFileSync(db_file).toString());

    const acronymData = loadedData.find((obj: any) => {
      return obj["acronym"].toLowerCase() === acronym.toLowerCase();
    });

    if (acronymData == undefined) {
      return -1;
    }

    loadedData.map((item: any) => {
      item["definition"] =
        item["acronym"].toLowerCase() === acronym.toLowerCase()
          ? definition
          : item["definition"];
      return item;
    });

    fs.writeFileSync(db_file, JSON.stringify(loadedData));

    return 1;
  },

  delete: (acronym: string) => {
    let loadedData = JSON.parse(fs.readFileSync(db_file).toString());

    const acronymIndex = loadedData.findIndex((obj: any) => {
      return obj["acronym"].toLowerCase() === acronym.toLowerCase();
    });

    if (acronymIndex === -1) {
      return -1;
    }

    loadedData.splice(acronymIndex, 1);

    fs.writeFileSync(db_file, JSON.stringify(loadedData));
  },
};

export default acronymService;
