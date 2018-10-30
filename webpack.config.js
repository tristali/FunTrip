const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            }
        ],
        // //
        // loaders: [
        //     { exclude: ["node_modules"], loader: "babel", test: /\.jsx?$/ },
        //     { loader: "style-loader!css-loader", test: /\.css$/ },
        //     { loader: "url-loader", test: /\.gif$/ },
        //     { loader: "file-loader", test: /\.(ttf|eot|svg)$/ }
        // ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    // //
    // resolve: {
    //     alias: {
    //         config$: "./configs/app-config.js",
    //         react: "./vendor/react-master"
    //     },
    //     extensions: ["", "js", "jsx"],
    //     modules: [
    //         "node_modules",
    //         "bower_components",
    //         "shared",
    //         "/shared/vendor/modules"
    //     ]
    // }
};
