const ErrorStackConfigurator = require('./error-stack-configurator')
const StatusCode = require('status-code-enum').StatusCode


/**
 * This class wraps a generic Http error ready to be sent as a response, when an
 * error occurs.
 *
 * Usage:
 * - Throw a new Http error (see example 1).
 * - Wrap an existing generic `Error` as an Http error, and throw it (see example 2).
 *
 * @example
 * throw new HttpResponseError({
 *     statusCode: 404,
 *     message: 'The document was not found'
 * });
 * @example
 * try {
 *     const num = 15;
 *
 *     // Converts a number to an array. Throws a generic `Error`.
 *     console.log(num.split(''));
 * } catch (err) {
 *
 *     // Wraps the `message` and `stack` of `err`, with default `statusCode`.
 *     throw new HttpResponseError(err);
 * }
 *
 * @see Error
 * @see ErrorStackConfigurator
 */
class HttpResponseError extends Error {
    /**
     * Constructor, able to copy-construct from an existing `Error`.
     *
     * @param {*} param0 Constructor object. In case you construct this object
     * with a given `Error`, then this object copy-constructs each property.
     * @param {number} param0.statusCode Indicates the statusCode for the Http
     *                                   response error.
     * @param {string} param0.message Indicates the message for the Http response
     *                                error.
     * @param {{key, value}[]} param0.headers Indicates the additional headers
     *                                        to attach for the Http response
     *                                        error.
     * @param {stack} param0.stack Indicates the stack for the Http response
     *                             error.
     */
    constructor({ statusCode = StatusCode.ServerErrorInternal, message, headers = [], stack = new Error().stack }) {
        super();
        this.name = 'HttpResponseError';
        this.statusCode = statusCode;
        this.message = message;
        this.headers = headers;
        this.stack = ErrorStackConfigurator.configNonSourceCodeLinesToBeRemoved(stack);
    }

    toString() {
        return `
{
    name: ${this.name}
    statusCode: ${this.statusCode}
    message: ${JSON.stringify(this.message, null, 2)}
    headers: ${JSON.stringify(this.headers, null, 2)}
    ${this.stack}
}`;
    }
}

module.exports = HttpResponseError;
