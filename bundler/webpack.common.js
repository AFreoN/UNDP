const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry:{
        main: path.resolve(__dirname, '../src/script.js'),
        links: path.resolve(__dirname, '../src/ui_controller/links.js')
    },
    output:
    {
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        chunkFilename: '[id].bundle_[chunkhash].js',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
            minify: true,
            chunks:['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/links.html'),
            filename: 'links.html',
            minify: true,
            chunks:['links']
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },

            // {
            //     test: /\.html$/,
            //     use:
            //     [
            //         {
            //             loader: 'file-loader',
            //             options:
            //             {
            //                 name: '[name].[ext]',
            //                 outputPath: '/'
            //             }
            //         }
            //     ],
            //     include:path.resolve(__dirname,'../src/links.html'),
            //     exclude:[
            //         path.resolve(__dirname,'../src/index.html'),
            //         path.resolve(__dirname,'../src/adventurer.html'),
            //         path.resolve(__dirname,'../src/changeseeker.html'),
            //         path.resolve(__dirname,'../src/mapmaker.html')
            //     ]
            // },
        ]
    }
}
