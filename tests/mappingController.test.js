const request = require("supertest");
const app = require("../server");

describe("Mapping Controller", () => {
  it("should return 400 if our_param is missing in /retrieve_original", async () => {
    const response = await request(app).get("/mapping/retrieve_original");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Missing our_param");
  });

  it("should return 404 if mapping is not found in /retrieve_original", async () => {
    const response = await request(app)
      .get("/mapping/retrieve_original")
      .query({ our_param: "nonexistent" });
    expect(response.status).toBe(404);
    expect(response.text).toBe("Mapping not found");
  });

  it("should return the original values for a valid our_param", async () => {
    // Insert a test mapping into the database
    const db = require("../services/dbService");
    await db.query(
      "INSERT INTO mappings (combination_key, our_param, version) VALUES (?, ?, ?)",
      ["shoes|google|1234", "testparam123", 1]
    );

    const response = await request(app)
      .get("/mapping/retrieve_original")
      .query({ our_param: "testparam123" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      keyword: "shoes",
      src: "google",
      creative: "1234",
    });
  });

  it("should return 400 if parameters are missing in /refresh", async () => {
    const response = await request(app).post("/mapping/refresh").send({});
    expect(response.status).toBe(400);
    expect(response.text).toBe("Missing parameters");
  });

  it("should return 404 if mapping is not found in /refresh", async () => {
    const response = await request(app)
      .post("/mapping/refresh")
      .send({ keyword: "shoes", src: "google", creative: "1234" });
    expect(response.status).toBe(404);
    expect(response.text).toBe("Mapping not found");
  });

  it("should refresh the mapping and return the new our_param", async () => {
    // Insert a test mapping into the database
    const db = require("../services/dbService");
    await db.query(
      "INSERT INTO mappings (combination_key, our_param, version) VALUES (?, ?, ?)",
      ["shoes|google|1234", "testparam123", 1]
    );

    const response = await request(app)
      .post("/mapping/refresh")
      .send({ keyword: "shoes", src: "google", creative: "1234" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("our_param");
    expect(response.body.our_param).not.toBe("testparam123");
  });
});
