/* eslint-disable no-undef */
const express = require('express');
const request = require('supertest');

const { createApp } = require('../../index');

/*
     declare the token variable in a scope accessible
      by the entire test suite
*/
let token = null;
let app = express();

beforeAll(async () => {
    app = await createApp();
    const res = await request(app)
        .post('/users/authenticate')
        .send({
            email: 'admin@modus.com',
            password: 'helloworld',
        });

    token = res.body.token;
});

describe('/stockPrices', () => {
    describe('GET /', () => {
        it('should return 401 if client is not logged in', async () => {
            const res = await request(app).get('/stock');

            expect(res.status).toBe(401);
        });

        it('should return all stock ticker prices', async () => {
            const res = await request(app).get('/stock')
                .set('authorization', `bearer ${token}`);

            expect(res.status).toBe(200);
        });
    });
});
