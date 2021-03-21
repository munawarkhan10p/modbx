const Bunyan = require('bunyan');

const config = require('../config');

const logger = new Bunyan({
    name: 'Node-API',
    serializers: Bunyan.stdSerializers,
    streams: [{
        level: config.env !== 'production' ? 'debug' : 'info',
        stream: process.stdout,
    }],
});

module.exports = logger;
