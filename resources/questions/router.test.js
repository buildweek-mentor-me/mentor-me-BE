const request = require('supertest');
const server = require('../../api/server');

describe('QUESTION', () => {
  describe('PUT', () => {
    it('Returns status 200', async () => {
      const res = await request(server).get('/questions');
      expect(res.status).toBe(200)
    });
  });
});