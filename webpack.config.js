const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PORT = 5678;

module.exports = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/index_bundle.js'
    },
    resolve: {
        alias: {
            "script": path.resolve(__dirname,"src/js")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test in webpack",
            template: "index.html",
            filename: "main.html"
        })
    ],
    devServer: {
        port: PORT,
        compress: false,
        contentBase: path.resolve(__dirname, "dist")
    }
}
