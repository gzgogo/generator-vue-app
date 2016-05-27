/**
 * Webpack 配置
 */
var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const AppPaths = {
  src: path.join(__dirname, 'src'),
  dst: path.join(__dirname, 'dst')
};

var AppPages = [
  { title: 'Vue Project', entry: ['main'], template: path.resolve(AppPaths.src, 'index.html') , fileName: 'index.html' }
];

module.exports = {

  entry: {
    'main': path.resolve(AppPaths.src, 'javascripts/main.js')
  },

  output: {
    path: AppPaths.dst,
    filename: 'javascripts/[name].min.js',
    // publicPath: '/' //默认为'/'
  },

  module: {
    loaders: [
      //配置name参数，值为img output的位置(img后由hash值，避免cache导致的更新不及时)
      //name属性的值为基于output.path属性的相对路径 limit:8192 1200000
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          limit: 1200000,
          name: path.normalize('./images/[name].[ext]?[hash]')
        }
      },

      //{ test: /\.less$/, loader: "style!css!less"}

      // Optionally extract less files
      // or any other compile-to-css language
      // Extract css files
      //{
      //  test: /\.css$/,
      //  loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      //},

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },

      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader'}
    ],
    /*
    如果你确定一个模块中没有其它新的依赖 就可以配置这项，webpack 将不再扫描这个文件中的依赖。
    与resolve的alias一起使用提高打包性能：
        1. webpack 检查到某个文件对vue-resource的请求；
        2. 请求被 alias 重定向，转而请求 vue-resource/dist/vue-resource.min.javascripts；
        3. noParse 规则中的 /vue-resource/ 一条生效，所以 webpack 就直接把依赖打包进了 bundle.javascripts 。
    * */
    noParse: [/^vue$/, /vue-resource/]
  },

  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      stylus: ExtractTextPlugin.extract("css!stylus")
      // javascripts: 'babel'
    }
  },

  plugins: [
    //此输出路径基于output.path: path.normalize("../../build/css/[name].css")
    //而且此路径只能使用基于output.path的相对路径，不能使用绝对路径
    new ExtractTextPlugin( path.normalize("./stylesheets/[name].min.css") ),

    //提取公共模块
    // new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.javascripts', chunks: ['main.javascripts']}),

    //设置此处，则在JS中不用类似require('vue')引入基础模块， 只要直接使用Vue变量即可
    //此处通常可用做对常用组件，库的提前设置
    new webpack.ProvidePlugin({
      'Vue': 'vue'
    })

    //new webpack.optimize.UglifyJsPlugin({ compress: true })
  ].concat(HtmlWebpackPluginPages(AppPages)),

    resolve: {
    //modulesDirectories: ["node_modules", "components"],
    extensions: ['', '.js'],
    alias: {
      //utils: path.resolve(__dirname, "utils"),
      //filters: path.resolve(__dirname, "filters"),
      'vue-resource': path.normalize("vue-resource/dist/vue-resource.min.js")
      //"vue-loader": path.normalize("vue/dist/vue.min.javascripts")
    }
  }
};

// 生成 HtmlWebpackPlguin 页面
function HtmlWebpackPluginPages(pages) {
  return pages.map(function(page) {
    return new HtmlWebpackPlugin({
      title: page.title,
      filename: page.fileName,
      chunks: page.entry,
      chunksSortMode: 'none',
      // favicon: path.resolve(__dirname, 'src/img/favicon.ico'),
      template: page.template
    })
  });
}
