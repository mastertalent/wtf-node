import request from "supertest";
import { servicesVersion } from "typescript";
import app, { server } from "../src/index";

describe("WTF Test", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  test("Get List", async () => {
    let from = 1,
      limit = 10,
      search = "IMO";
    const res = await request(app).get(
      `/acronym?offset=${from}&limit=${limit}&search=${search}`
    );

    expect(res.status).toBe(200);

    const jsonData = JSON.parse(res.text);

    expect(jsonData[0]["acronym"]).toEqual(search);
  });

  test("POST/acronym test", async () => {
    const res = await request(app).post("/acronym").send({
      acronym: "btw",
      definition: "by the way",
    });

    expect(res.status).toBe(200);
    expect(res.text).toMatch('{"status":200,"message":"Success!"}');
  });

  test("PUT/acronym/:acronym test", async () => {
    let res = await request(app).put("/acronym/unknown_acronym").send({
      definition: "updated by the way",
    });

    expect(res.status).toBe(404);
    expect(res.text).toMatch('{"status":404,"message":"Acronym Not Found!"}');

    res = await request(app).put("/acronym/btw").send({
      definition: "updated by the way",
    });

    expect(res.status).toBe(200);
    expect(res.text).toMatch('{"status":200,"message":"Success!"}');
  });

  test("DELETE/acronym/:acronym test", async () => {
    const res = await request(app).delete("/acronym/btw");

    expect(res.status).toBe(200);
    expect(res.text).toMatch('{"status":200,"message":"Success!"}');
  });
});
