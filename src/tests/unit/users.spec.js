/* eslint-disable no-undef */
const { getConnection } = require('typeorm');
const { findByEmail } = require('./users');

afterAll(async () => {
    await getConnection().close();
});
describe('getUserByEmail', () => {
    it('should fetch user against email', async () => {
        const user = await findByEmail('admin@modus.com');

        expect(user).toMatchSnapshot();
    });
});
