import app from '../../app';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);
describe('Products endpoints', () => {
  var token: string;
  let getToken = async () => {
    const response = await request.post('/users');
    token = response.body.token;
    return 'Bearer ' + token;
  };
  it('/products endpoint should exist and return status 200 [POST]', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });

  it('/products endpoint should exist and return status 200 [GET]', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('/products/:id endpoint should exist and return status 200 [GET]', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
});
