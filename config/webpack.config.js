const path = require('path');

module.exports = {
    entry: './src/memoize.js',
    mode: 'production',
    output: {
        path: path.resolve(path.join(__dirname, '/../', 'build')),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
