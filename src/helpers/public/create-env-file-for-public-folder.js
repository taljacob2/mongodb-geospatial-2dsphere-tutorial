const fs = require('fs');
const path = require('path');


const createEnvFileForPublicFolder = () => {
    const content =
`const PROTOCOL = '${process.env.PROTOCOL}';
const DOMAIN = '${process.env.DOMAIN}';
const NODE_PORT = ${process.env.NODE_PORT};
const HOST = \`\${PROTOCOL}://\${DOMAIN}:\${NODE_PORT}\`;`;

    const dirPath = path.join(`${__dirname}/../..`, 'public/js');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.writeFileSync(path.join(dirPath, 'env.js'), content, (err) => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
};


module.exports = createEnvFileForPublicFolder;
