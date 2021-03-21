const path = require('path');

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

const swaggerSpecs = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Analytics API',
            version: '1.0.0',
        },
    },
    apis: [path.join(__dirname, './*')],
});

router.get('/swagger.json', (req, res) => {
    res.send(swaggerSpecs);
});

module.exports = router;
