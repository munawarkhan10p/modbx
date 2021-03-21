/* eslint-disable no-undef */
const express = require('express');
const request = require('supertest');

const { createApp } = require('../../index');

let app = express();

describe('auth middleware', () => {
    beforeEach(async () => { app = await createApp();});
    it('should return 401 if invalid input is passed', async () => {
        const res = await request(app)
            .post('/users/authenticate')
            .send({
                email: 'admin@modus1.com',
                password: 'helloworld',
            });

        expect(res.status).toBe(401);
    });
});
