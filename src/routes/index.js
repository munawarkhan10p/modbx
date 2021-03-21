const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Default
 *     summary: Health check
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: Hello World
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', async (req, res) => {
    res.send({ message: 'Hello World', build: process.env.BUILD });
});

module.exports = router;
