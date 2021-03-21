const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'User',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        email: {
            type: 'varchar',
        },
        firstName: {
            type: 'varchar',
        },
        lastName: {
            type: 'varchar',
        },
        hashedPassword: {
            type: 'varchar',
        },
    },
});
