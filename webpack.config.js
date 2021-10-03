// @ts-check

const path = require("path");

const MODE = process.env.NODE_ENV || "production";

module.exports = {
    mode: MODE,
    devtool: MODE === "production" ? "source-map" : "eval",
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/build"),
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|ogg)$/,
                type: "asset/resource",
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
            watch: true,
        },
        devMiddleware: {
            writeToDisk: true,
        },
        watchFiles: ["src/**/*.ts", "src/**/*.scss", "public/index.html"],
        hot: true,
        host: "0.0.0.0",
        port: parseInt(process.env.PORT) || 8080,
    },
};
