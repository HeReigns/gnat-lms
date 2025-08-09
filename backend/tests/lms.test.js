const request = require('supertest');
const app = require('../src/app');
describe('LMS protected routes', () => {
  it('rejects unauthenticated', async () => {
    const res = await request(app).get('/api/lms/courses');
    expect(res.statusCode).toBe(401);
  });
});
