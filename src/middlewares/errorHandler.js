exports.ErrorHandler = function (err, req, res, next) {
    const joiErr = err ;
    if (joiErr.isJoi) {
        res.status(400).send({ message: joiErr.details[0].message });

        return next();
    }

    const boomErr = err;
    if (boomErr.isBoom) {
        res.status(boomErr.output.statusCode).send({ message: boomErr.message });

        return next();
    }

    switch (err.name) {
    case 'SyntaxError':
        res.status(400).send({ message: 'Invalid body syntax' });

        return next();
    default:
        req.log.error({ err }, `Something not handled well: ${err.message}`);
        res.status(500).send({
            message: err.message,
        });

        return next();
    }
};
