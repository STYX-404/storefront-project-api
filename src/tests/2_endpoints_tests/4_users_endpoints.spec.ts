import app from '../../app';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

describe('users endpoints', () => {
  var token: string;
  let getToken = async () => {
    const response = await request.post('/users');
    token = response.body.token;
    return 'Bearer ' + token;
  };
  it('/users endpoint should exist and return status 200 [POST]', async () => {
    const response = await request.post('/users');
    expect(response.status).toBe(200);
  });

  it('/users endpoint should exist and return status 200 [GET]', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });
  it('/users endpoint should return status 401 when no token found [GET]', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });
  it('/users/:id endpoint should exist and return status 200 [GET]', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });
});
