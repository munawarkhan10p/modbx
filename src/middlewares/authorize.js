const Boom = require('@hapi/boom');
const { findUserByID } = require('../services/users');

const { verifyAuthToken } = require('../services/authToken');

exports.authorize = async (req, res, next) => {
    let token = null;
    const authheader = (req.headers.authorization || '').split(' ');
    if (authheader.length === 2 && authheader[0].toLowerCase() === 'bearer') {
        token = authheader[1];
    }
    if (!token) {
        return next(Boom.unauthorized('Token required'));
    }

    try {
        const claims = verifyAuthToken(token);

        const user = await findUserByID(claims.userId);
        req.user = user;

        return next();
    } catch (err) {
        req.log.error({ err });

        return next(Boom.unauthorized('This token is unauthorized'));
    }
};
