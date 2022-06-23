import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import express from 'express';
import createServer from '../src/app';

import { sequelize } from '../src/sequelize.config';

describe('GET /user', function () {
  let app: express.Application;

  beforeAll(async () => {
    app = await createServer();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('responds with json', async () => {
    return request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('up and working! yes!');
      });
  });
});
