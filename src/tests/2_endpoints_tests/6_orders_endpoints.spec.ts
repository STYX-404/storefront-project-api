import app from '../../app';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);
describe('Orders endpoints', () => {
  var token: string;
  let getToken = async () => {
    const response = await request.post('/users');
    token = response.body.token;
    return 'Bearer ' + token;
  };

  it('/orders endpoint should exist and return status 200 [GET]', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });
  it('/orders/:id endpoint should exist and return status 200 [GET]', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });
  it('/orders endpoint should exist and return status 200 [POST]', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });
  it('/orders/:id/products endpoint should exist and return status 200 [POST]', async () => {
    const response = await request
      .post('/orders/1/products')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
  });
});
