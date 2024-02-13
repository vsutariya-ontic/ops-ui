const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devServer: {
        // read
        hot: true,
        historyApiFallback: true,
    },
    target: "web",
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),

        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules", "public"],
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
                options: {
                    plugins: [
                        isDevelopment && require.resolve("react-refresh/babel"),
                    ].filter(Boolean),
                },
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "public"),
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.webp$/i,
                use: [
                    {
                        loader: "webp-loader",
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: "svg-loader",
                    },
                ],
            },
        ],
    },
};
