const request = require("supertest");
const app = require("../server"); // Import the main app

describe("Traffic Controller", () => {
  it("should return 400 if parameters are missing", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Missing parameters");
  });

  it("should redirect to the affiliate link with our_param", async () => {
    const response = await request(app)
      .get("/")
      .query({ keyword: "shoes", src: "google", creative: "1234" });
    expect(response.status).toBe(302);
    expect(response.headers.location).toMatch(
      /https:\/\/affiliate-network\.com\?our_param=/
    );
  });

  it("should handle database errors gracefully", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console errors
    const db = require("../services/dbService");
    jest.spyOn(db, "query").mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/")
      .query({ keyword: "shoes", src: "google", creative: "1234" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal Server Error");

    jest.restoreAllMocks();
  });
});
