const { getConnection } = require('typeorm');
const User = require('../models/User');

const repo = getConnection().getRepository(User);

exports.create = async (email) => {
    // const repo = getConnection().getRepository(User);
    const user = repo.create({ email });

    return this.repo.save(user);
};

exports.findById = async (userId) => {
    // const repo = getConnection().getRepository(User);
    const user = await repo.findOne({
        where: [
            { id: userId },
        ],
    });

    return user;
};

exports.findByEmail = async (email) => {
    const repo = getConnection().getRepository(User);
    const user = await repo.findOne({
        where: [
            { email },
        ],
    });

    return user;
};
