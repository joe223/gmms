const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PORT = 5678;

module.exports = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main/index.js'
    },
    resolve: {
        alias: {
            "script": path.resolve(__dirname,"dist/js")
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/]
        }]
    }
}
