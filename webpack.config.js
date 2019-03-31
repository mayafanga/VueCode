const path = require('path');

const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=13749&name=[hash:8]-[name].[ext]' },
            { test: /\.(ttf|svg|eot|woff|woff2)$/, use: 'url-loader' }, //处理字体文件的loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //这是配置babel来转换高级的语法
            { test: /\.vue$/, use: 'vue-loader' } //处理 .vue 文件的 loader
        ]
    },
    resolve: {
        alias: { //修改 Vue 被导入时候的包的路径
            //"vue$": "vue/dist/vue.js"
        }
    }
}


//json 里面不能写注释