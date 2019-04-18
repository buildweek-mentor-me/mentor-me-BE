const request = require("supertest");
const server = require("../../api/server");

describe("QUESTION", () => {
  describe("GET", () => {
    it("Returns status 200", async () => {
      const res = await request(server).get("/questions");
      expect(res.status).toBe(200);
    });
  });
  describe("PUT", () => {
    it("Returns an Object", async () => {
      const res = await request(server)
        .put("/questions/10")
        .send({
          title: "Changing",
          body: "this is the body of the change",
          author: "dylan",
          FK_user_id: "2"
        });
      expect(res.body).toBeInstanceOf(Object);
    });
  });

  describe("POST", () => {
    it("201 OK", async () => {
      const res = await request(server)
        .post("/questions")
        .send({
          title: "Here is a brand new question",
          body: "this is the body of the question wow!",
          author: "dylan d",
          FK_user_id: "6"
        });
      expect(res.status).toBe(201);
    });
  });
  describe("DELETE", () => {
    it("200 OK", async () => {
      const res = await request(server).delete("/questions/19");
      expect(res.status).toBe(200);
    });
  });
});
