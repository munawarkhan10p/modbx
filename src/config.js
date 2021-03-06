var convict = require('convict');

var config = convict({
    env: {
        format: ['development', 'staging', 'production', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    app: {
        name: {
            format: '*',
            default: 'Node',
            env: 'APP_NAME',
        },
        url: {
            format: '*',
            default: 'http://localhost:4200',
            env: 'APP_URL',
        },
        supportEmail: {
            format: '*',
            default: 'support@node.com',
            env: 'APP_SUPPORT_EMAIL',
        },
    },
    server: {
        port: {
            format: 'port',
            default: 3000,
            env: 'NODE_PORT',
        },
        basePath: {
            format: '*',
            default: '/',
            env: 'BASE_PATH',
        },
    },
    transactionalEmailSource: {
        format: '*',
        default: 'munawarkhan6656@gmail.com',
        env: 'EMAIL_SOURCE',
    },
    token: {
        auth: {
            secret: {
                format: '*',
                default: 'auth-secret',
                env: 'AUTH_TOKEN_SECRET',
            },
            expiry: {
                format: '*',
                default: '1 day',
                env: 'AUTH_TOKEN_EXPIRY',
            },
        },
    },
    database: {
        host: {
            format: '*',
            default: 'localhost',
            env: 'DB_HOST',
        },
        port: {
            format: 'port',
            default: 5432,
            env: 'DB_PORT',
        },
        name: {
            format: '*',
            default: 'postgres',
            env: 'DB_NAME',
        },
        username: {
            format: '*',
            default: 'postgres',
            env: 'DB_USERNAME',
        },
        password: {
            format: '*',
            default: 'postgres',
            env: 'DB_PASSWORD',
        },
    },
    appUrl: {
        format: '*',
        default: 'http://localhost:4200',
        env: 'APP_URL',
    },
    aws: {
        endpoint: {
            format: '*',
            default: '',
            env: 'AWS_ENDPOINT',
        },
        region: {
            format: '*',
            default: 'us-east-1',
            env: 'AWS_DEFAULT_REGION',
        },
    },
    sqs: {
        resetPassword: {
            format: '*',
            default: '',
            env: 'SQS_RP_URL',
        },
    },
});

config.validate({ allowed: 'strict' });
module.exports = config.getProperties();
