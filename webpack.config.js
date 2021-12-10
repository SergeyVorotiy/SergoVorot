const path = require('path');
const isdev = process.env.NODE_ENV === "development";
const isProd = !isdev;
// подключение плагинов для webpack
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.css', '.png', '.pug', 'svg'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        minimize: isProd,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: '' +
                './UIKit/FormElements/formElements.pug',
            minify: false
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPugPlugin({
            adjustIndent: false
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, 'dist'),
        //         },
        //     ]
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',

                    },
                    {
                        loader: 'pug-html-loader',

                    }
                ]
            }
        ]
    }
}