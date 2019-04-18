const request = require("supertest");
const server = require('./server')

describe('SERVER', () => {
  describe('GET', () => {
    it('200 OK', async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
});