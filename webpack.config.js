const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const env = require('./utils/env')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

// load the secrets
const alias = {}

const secretsPath = path.join(__dirname, ('secrets.' + env.NODE_ENV + '.js'))

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif']

if (fs.existsSync(secretsPath)) {
    alias['secrets'] = secretsPath;
}

const options = {
    target: 'web',
    entry: {
        popup: path.join(__dirname, 'src', 'js', 'popup.js'),
        options: path.join(__dirname, 'src', 'js', 'options.js'),
        background: path.join(__dirname, 'src', 'js', 'background.js'),
        contentscript: path.join(__dirname, 'src', 'js', 'contentscript.js'),
        internals: path.join(__dirname, 'src', 'js', 'main.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /node_modules/,
            },
            {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: 'file-loader?name=[name].[ext]',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000, // 1 KO
                    name: 'fonts/[name].[hash:7].[ext]',
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
            }
        ]   
    },
    resolve: {
        alias: alias,
    },
    externals: {
        chrome: 'chrome',
        CW: 'chatwork.core',
        RM: 'chatwork.room',
    },
    plugins: [
        // expose and write the allowed env vars on the compiled bundle
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'popup.html'),
            filename: 'popup.html',
            chunks: ['popup'],
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'options.html'),
            filename: 'options.html',
            chunks: ['options'],
        }),
        new WriteFilePlugin(),
    ]
};

if (env.NODE_ENV === 'development') {
    options.devtool = 'cheap-module-eval-source-map'
}

module.exports = options
