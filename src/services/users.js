const Boom = require('@hapi/boom');
const { findByEmail, findById } = require('../repositories/users');

exports.findUserByEmail = async (email) => {
    const user = await findByEmail(email);
    if (!user) {
        throw Boom.notFound('User with this email does not exist');
    }

    return user;
};

exports.findUserByID = async (userId) => {
    const user = await findById(userId);
    if (!user) {
        throw Boom.notFound('User with this id does not exist');
    }

    return user;
};
