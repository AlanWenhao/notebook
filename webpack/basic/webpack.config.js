const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }, {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }]
            },
            {
                test: /\.css/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: miniCssExtractPlugin.loader
                }, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: miniCssExtractPlugin.loader,
                }, 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: miniCssExtractPlugin.loader,
                }, 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 102400,
                        outputPath: '/img',
                        // publicPath: 'img'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
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
            filename: 'css/[name].css'
        })

    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8888,
        proxy: {}
    }
}