/* eslint-disable no-undef */
const wrapAsync = (fn = (req, res, next)) => {
    return async function(_req, _res, _next) {
        try {
            await fn(_req, _res, _next);
        } catch (err) {
            _next(err);
        }
    };
};
// adding comment for checking gpg keys

module.exports = wrapAsync;
