const HttpResponseError = require('../helpers/errors/http-response-error')


const errorHandler = (err, req, res, next) => {
    const httpResponseError = new HttpResponseError(err);
    console.error(`${httpResponseError}`);

    httpResponseError.headers.forEach((KeyValueHeader) => {
        res.set(KeyValueHeader);
    });

    res
        .status(httpResponseError.statusCode)
        .json({
            status: 'error',
            message: httpResponseError.message
        });
}


module.exports = errorHandler;
