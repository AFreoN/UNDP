const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'production',
        output: {
            // for relative paths use './'
            publicPath: './'
            // or for absolute: '/<your-username>/<your-repo>/'
        },
        plugins:
        [
            new CleanWebpackPlugin()
        ]
    }
)
