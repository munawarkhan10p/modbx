const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const config = require('../config');

exports.generateAuthToken = async (user, password) => {
    if (!user.hashedPassword) {
        throw new Error('Password is missing');
    }

    if (!await bcrypt.compare(password, user.hashedPassword)) {
        throw new Error('Password did not match');
    }

    const claims = {
        type: 'auth',
        userId: user.id,
        role: user.role,
    };

    return JWT.sign(claims, config.token.auth.secret, {
        expiresIn: config.token.auth.expiry,
    });
};

exports.verifyAuthToken = (token) => {
    const claims = JWT.verify(token, config.token.auth.secret);

    if (claims.type !== 'auth') {
        throw new Error('Token type is not valid');
    }

    return claims;
};
