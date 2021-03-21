const express = require('express');
const router = express.Router();
const yahooFinance = require('yahoo-finance');
const { authorize } = require('../middlewares/authorize');
const wrapAsync = require('../utils/asyncHandler');

/**
 * @swagger
 * /stock:
 *   get:
 *     tags:
 *       - Stock Ticker
 *     summary: Get stock ticker prices
 *     security:
 *       - JWT: []
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
router.get('/stock', wrapAsync(authorize), wrapAsync(async (req, res) => {
    const prices = await yahooFinance.historical({
        symbol: 'AAPL',
        from: '2020-01-01',
        to: '2021-03-15',
        period: 'm', // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    });

    res.send(prices);
}));

module.exports = router;
