const request = require("supertest");
const server = require("../../api/server");

describe("QUESTION", () => {
  describe("PUT", () => {
    it("Returns status 200", async () => {
      const res = await request(server).get("/questions");
      expect(res.status).toBe(200);
    });
    it("Returns an Object", async () => {
      const res = await request(server)
        .put("/questions/1")
        .send({
          title: "Hello Wurrld",
          body: "this is the body of the question",
          author: "dylan",
          FK_user_id: "1"
        });
      expect(res.body).toBeInstanceOf(Object);
    });
  });

  describe("POST", () => {
  });
});
