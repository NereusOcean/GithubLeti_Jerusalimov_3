const path = require('path');

module.exports = {
    entry: './public/style/mainPage.css',
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        ]
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'index_bundle.js'
    }
}
