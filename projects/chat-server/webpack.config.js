const path = require("path");
module.exports = {
    entry: './app.ts',
    output: {
        filename: "chatServer-webpack.bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};