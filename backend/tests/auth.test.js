const request = require('supertest');
const app = require('../src/app');
describe('Auth', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'newuser@gnat.local', password: 'pass123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('newuser@gnat.local');
  });

  it('logs in user', async () => {
    // ensure seed user exists
    await request(app).post('/api/auth/register').send({ email: 'loginuser@gnat.local', password: 'pass123' });
    const res = await request(app).post('/api/auth/login').send({ email: 'loginuser@gnat.local', password: 'pass123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});
