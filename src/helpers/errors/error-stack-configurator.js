const colors = require('colors')


/**
 * Bundles extra optional configuration for `Error.stack`.
 *
 * @see Error
 */
class ErrorStackConfigurator {
    static EOL = '\n'
    static NODE_MODULES_LINES = 'node_modules'
    static NODE_LINES = '(node:'

    /**
     * Given an `Error.stack`, this function configures it to color all lines
     * that point to code that is not made in the current project, but is
     * imported via an external package, or related to Node.
     *
     * Requires `import colors from 'colors';`
     *
     * @param {Error.stack} stack The `Error.stack` to configure.
     * @param {colors.Color} color The color to set the non-source code.
     * @return {Error.stack} The new configured `Error.stack`.
     */
    static configNonSourceCodeLinesToBeColored = (stack, color = colors.grey) => {
        let stackLines = stack.split(ErrorStackConfigurator.EOL);
        stackLines = stackLines.map((stackLine) => {
            return stackLine.includes(ErrorStackConfigurator.NODE_MODULES_LINES) ? color(stackLine) : stackLine;
        });
        stackLines = stackLines.map((stackLine) => {
            return stackLine.includes(ErrorStackConfigurator.NODE_LINES) ? color(stackLine) : stackLine;
        });
        stackLines = stackLines.join(ErrorStackConfigurator.EOL);
        return stackLines;
    }

    /**
     * Given an `Error.stack`, this function configures it to remove all lines
     * that point to code that is not made in the current project, but is
     * imported via an external package, or related to Node.
     *
     * @param {Error.stack} stack The `Error.stack` to configure.
     * @return {Error.stack} The new configured `Error.stack`.
     */
    static configNonSourceCodeLinesToBeRemoved = (stack) => {
        let stackLines = stack.split(ErrorStackConfigurator.EOL);
        stackLines = stackLines.filter((stackLine) => {
            return !stackLine.includes(ErrorStackConfigurator.NODE_MODULES_LINES);
        });
        stackLines = stackLines.filter((stackLine) => {
            return !stackLine.includes(ErrorStackConfigurator.NODE_LINES);
        });
        stackLines = stackLines.join(ErrorStackConfigurator.EOL);
        return stackLines;
    }
}


module.exports = ErrorStackConfigurator;
