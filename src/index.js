var express = require('express');
var { createConnection } = require('typeorm');
var fg = require('fast-glob');
var cors = require('cors');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var logger = require('./utils/logger');
var bunyanMiddleware = require('express-bunyan-logger');
var { ErrorHandler } = require('./middlewares/errorHandler');
var compression = require('compression');
var config = require('./config');

async function start() {
    logger.info('Starting server...');

    await createConnection();

    const app = express();
    // Register middlewares
    const appUrl = new URL(config.appUrl);

    app.use(compression());
    app.use(cors({
        origin: config.env === 'production' ? appUrl.origin : '*',
    }));
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bunyanMiddleware({
        logger,
        parseUA: false,
        excludes: ['response-hrtime', 'req-headers', 'res-headers'],
        format: ':incoming :method :url :status-code',
    }));

    // Register routes
    const routes = await fg('./routes/*.(js)', { cwd: __dirname });
    for (const routePath of routes) {
        const { default: router } = await import(routePath);
        if (typeof (router) === 'function') app.use(config.server.basePath, router);
    }

    // Error handler must come last...
    app.use(ErrorHandler);

    // Kick it off!
    app.listen(config.server.port, async () => {
        logger.info({ port: config.server.port }, 'Hey! I\'m listening...');
    });
}

start();

exports.createApp = async () => {
    await createConnection();

    const app = express();

    // Error handler must come last...
    app.use(ErrorHandler);

    return app;
};
