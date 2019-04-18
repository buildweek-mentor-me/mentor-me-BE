const request = require("supertest");
const server = require("../../api/server");

describe("USERS", () => {
  describe('GET', () => {
    it("Returns status 200", async () => {
      const res = await request(server).get("/users");
      expect(res.status).toBe(200);
    });
  });
  describe("PUT", () => {
    it("Returns an Object", async () => {
      const res = await request(server)
        .put("/users/3")
        .send({
          "handle": "james",
          "email": "5@7.com",
          "password": '123'
        });
      expect(res.body).toBeInstanceOf(Object);
    });
  });

  describe("POST", () => {
    it('201 OK', async () => {
      const res = await request(server)
      .post("/users")
      .send({
        "handle": "alex003",
        "email": "5@8.com",
        "password": '123'
      })
      expect(res.status).toBe(201);
    });
  });
  describe('DELETE', () => {
    it('200 OK', async () => {
      const res = await request(server).delete('/users/1');
      expect(res.status).toBe(200);
    });
    
  });
});
