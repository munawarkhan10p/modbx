/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const { getRepository } = require('typeorm');
const User = require('../models/User');

module.exports = class Seed1580070688033 {
    async up() {
        const user = getRepository(User).create({
            email: 'admin@modus.com',
            firstName: 'Munawar',
            lastName: 'khan',
            hashedPassword: bcrypt.hashSync('helloworld', 8),
        });

        await getRepository(User).save(user);
    }

    async down() {
        const user = await getRepository(User).findOne({
            where: { email: 'admin@modus.com' },
        });
        if (!user) {
            throw new Error('User not found');
        }

        await getRepository(User).remove(user);
    }
};
