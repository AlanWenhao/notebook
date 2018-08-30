const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css/,
                include: path.resolve(__dirname,'src'),
                exclude: /node_modules/,
                use: [{
                    loader: miniCssExtractPlugin.loader
                }, {
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                },'css-loader']
            },
            {
                test:/\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
                use:[{
                        loader:'url-loader',
                        // options:{ limit: 4096 },
                        options: {
                            outputPath: 'img'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // hash: true,
            minify: {
                removeAttributeQuotes: true,
                minify: true
            }
        }),
        new miniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8888,
        proxy: {}
    }
}
