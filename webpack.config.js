// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname  
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//這個 plugin 的用途就是把 text 類型的結果匯出成一個檔案
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//設定路徑
var node_modules = path.resolve(__dirname, "node_modules");
//將檔案轉成css
// const extractCss = new ExtractTextPlugin({
//     filename: (getPath) => {
//         return getPath('css/[name].css').replace('css/js', 'css');
//     },
//     allChunks: true
// });
//HtmlWebpackPlugin的插件，用來執行inline的設定
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
/*======================
    初始化inline插件
=======================*/
const sourcePlugin = new HtmlWebpackInlineSourcePlugin();
/*======================
    初始化HtmlWebpackPlugin插件
    產生index.html
=======================*/
const index = new HtmlWebpackPlugin({
    //目標檔案    
    filename: `${__dirname}/dist/index.html`,
    //模板
    template: `${__dirname}/app/index.html`,
    inject: 'body',
    title: 'this is index',
    chuncks: ['index'],
    // excludeChunks: ['index', 'a', 'router', './components/TodoApp', 'd3_first']
    //inlineSource:  '.(js|css)$' 
    //讓css變成inline
    // inlineSource: '.(css)$'
});

module.exports = {
    entry: {
        'js/index': './app/js/index.js',
        // a: './js/a.js',
        // router: './js/react-router.js',
        // //直接改變名稱到指定資料夾
        // './components/TodoApp': './js/list/TodoApp.jsx',
        // d3_first: './js/d3_first.js',
        // flux: './js/flux.js'

    },
    watch: true,
    output: {
        //resolve 的函式是為了不管在 Windows 或是 Unix 上都可以正確解析路徑
        path: path.resolve(__dirname, './dist'),
        publicPath: "/",//讓router有一個公共的路徑
        //這邊用[name]，產出的js才會有各個entry的
        filename: '[name].js'
    },
    module: {
        // loaders 則是放欲使用的 loaders，在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案（排除了 npm 安裝的套件位置 node_modules）轉譯成瀏覽器可以閱讀的 
        //JavaScript。preset 則是使用的 babel 轉譯規則，這邊使用 react、es2015。若是已經單獨使用 .babelrc 作為 presets 設定的話，則可以省略 query
        rules: [{
                test: /\.js$/,
                //不包含node_modules裡面的js，可以增加載入速度
                exclude: /node_modules/,
                //只包含某一區塊的js
                // include:'.src',
                loader: 'babel-loader',
                query: {
                    //轉換特性有'latest'
                    presets: ['es2015', 'react'],
                },
            }, {
                test: /\.jsx$/,
                //不包含node_modules裡面的js，可以增加載入速度
                exclude: /node_modules/,
                //只包含某一區塊的js
                // include:'.src',
                loader: 'babel-loader',
                query: {
                    //轉換特性有'latest'
                    presets: ['es2015', 'react'],
                },
            },
            {
                test: /\.css$/,
                use: [{

                    loader: 'style-loader'

                }, {

                    loader: 'css-loader?importLoaders=1'

                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            //自動加前綴
                            return [require('autoprefixer')

                            ];
                        }
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    //自動加前綴
                                    return [require('autoprefixer')

                                    ];
                                }
                            }
                        }
                    ]
                })
            }, {
                test: /\.(svg|png|jpg|gif)$/,
                use: [
                    //limit可以限制檔案大小到多大的時候啟用
                    {
                        loader: 'url-loader?limit=500&mimetype=img/jpg&name=img/[name].[ext]'
                    }
                ]
            }


        ],
    },
    // devServer 則是 webpack-dev-server 設定
    devServer: {
        //開啟的地方
        contentBase: path.resolve(__dirname,"./dist"),
        // publicPath:"http://localhost:8080/",
        inline: true,
        compress: true,
        port: 8080,
        // hot:true,
        historyApiFallback: true //讓route產生作用
    },
    // plugins 放置所使用的外掛
    plugins: [
        new ExtractTextPlugin('css/main.css')
        , 
        index
    ]
}