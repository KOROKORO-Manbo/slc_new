require('babel-polyfill'); 												  // WebPackコマンドのオプション内容検知のpathのために必要
const path = require('path');
const DEBUG = !process.argv.includes('-p');	        // -pオプションでリリースビルドを判断する
console.log(DEBUG)                               // デバッグビルドで true  注意：package.jsonの"build"の方のWebPackコマンドには−dとかオプションを付けないこと＝ソースマップが出なくなる
const webpack = require('webpack');


const moment = require("moment");                    // webpackの中で指定されたlocaleだけ定義されているmomentで上書き
moment.locale("en");
moment.locale("ja");
var date = moment(Date.now());
date = date.format("MM月DD日h時m分");
// console.log(date.format("MM月DD日"));

module.exports = {
  entry: './src/js/index.js',       // 複数エントリは複数指定   entry: { top: './app/main.js', list: './app/list/main.js' }
                                 // 全ページ共通ライブラリを別：' vendor: ['bootstrap-loader', 'backbone-fetch-cache'],'
                                 // CommonChunk参照＝「 //フロント用WebPack/WebPack基本/共通モジュールまとめCommonsChunkPluginCommonChunkポイント.txt 」
  output: {
    path: `${__dirname}/build`,  // 複数出力は[name]      output: {filename: '[name].bundle.js', publicPath: '/assets/' }
    filename: 'bundle.js',
    // publicPath: '/assets/'       //本番時のパス＝Webpackプラグイン利用する本番ビルド時にCSSやHTMLファイル内のURLを更新 = 埋め込む画像などの参照に必要な（URLに組み込まれる）パスなど
  },
                                // デバッグビルドではソースマップを出力  'source-map'
  devtool: DEBUG ? false : false,

  resolve: {                   // importのルートパスの追加定義
    // root: [                 // これで「import sum from ./app/modules/log.js」 を 「import sum from log.js」 と書ける
    //   path.resolve('./app/modules'),
    //   path.resolve('./vendor/modules')
    // ]
  },

                                // ローカル開サーバーを立ち上げる
  devServer: {
    contentBase: 'build',
    port: 8081,
    // proxy: {                    // 串設定
    //   '**': {
    //     'target': {
    //       'protocol': 'http:',
    //       'host': 'localhost',
    //       'port': 80            // contentBaseのパス上にないファイルのリクエストに関しては、プロキシでlocal80番(OSX の apchae)に飛ばす
    //     }
    //   }
    // }
  },

  module: {
    rules: [
        {
          test: /\.js$/,          // 省略可能拡張子： .js の場合
          use: [
            {
              loader: 'babel-loader',
              options: {          //optionsに設定できる項目一覧         ：https://babeljs.io/docs/usage/api/#options
                presets: [        //presetsオプションに設定できる項目一覧 ：https://babeljs.io/docs/plugins/#presets
                                  // env を指定することで最小限のES5へのフォールバック変換。
                                  // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                                  // webpack の Tree Shaking 機能が使えない
                  ['env', {'modules': false}]     // 'es2015',   All you need to compile ES2015 to ES5
                ]                                 // 'react',    Strip flow types and transform JSX into createElement calls.
              }
            }
          ],
                                  // node_modules、bower_components は除外する
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,         // 今回はScssを使うので.scss。 cssを直接使う場合は.cssとして、loadersからsassを除く
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {                          // 画像とフォントのローダー
          test: /\.(gif|png|jpg|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
        }, 
        {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'url-loader'
        },
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //       loader: 'expose-loader',
      //       options: '$'
      //   }]
      // }
    ]
  },
  plugins: [
    // 本来、main.jsとかに「import jQuery from 'jquery';const $ = jQuery;」とすれば
    // 以下のプラグ・インの設定は不要だが、上手くいかないケースも有るようで念のためこれも加えておく
    // （個別JSファイル内だけでなくWebPack管理下全体に＄とjQuery変数を行き渡らせる意味がある）
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),

    // npmモジュールのjqueryをグローバルの’jQuery’としてさらす
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   // 'window.jQuery': 'jquery'
    //
    // }),

    // JSファイルのminifyを実行する・・・これはwebpackの’-p’オプションで行う
    // new webpack.optimize.UglifyJsPlugin({
    //   // minify時でもソースマップを利用する
    //   sourceMap: false,
    //   // warningsは圧縮しない
    //   compress: {
    //       warnings: false
    //   }
    // }),

    //既に十分に圧縮されている場合にも詳細にコードを分析し共通化できそうな箇所はまとめてより積極的にコードを圧縮する
    // new webpack.optimize.AggressiveMergingPlugin(),

    //必要な言語を指定する。 en, ja, ... 後続のファイル先頭の日付コメント用momentで無駄なlocaleを省いている
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ja|.../),

    // 出力ファイル（複数でも）の先頭にコメント付与
    new webpack.BannerPlugin(
      {
        banner:"This was built " + date + ".",
        raw: false,
        entryOnly: true
      }
    ),

    // ライブラリ間で依存するモジュールの重複した出力を排除することで、ファイルサイズを効果的に減らす
    // new webpack.optimize.DedupePlugin(),   これはWebPackから除外された（自動でツリーシェイキングされるので）

    // モジュール利用頻度による並び替え後のビルド
    new webpack.optimize.OccurrenceOrderPlugin(),

    // このプラグインは最終的なバンドルの全てのJavaScriptコードを 圧縮(minify)します。デバッグ／本番の分岐はコメントでしかできないか・・・
    // ちなみにこのUglyfyするとソースマップも出力されない
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle:   true,
    //   compress: {
    //     warnings: false,         // uglificationの警告を隠します
    //   },
    //   output: {
    //    comments: require('uglify-save-license'),          // falseで全部消す：require('uglify-save-license')でコメントは消すがライセンスは残す
    //  }
    // }),

    // WebPackの’require’に関するランタイム部分を別ファイルに分離し使いまわす事ができる
    // これを実行する時はoutputは[name].bundle.jsとファイル名を個別になるようにすること
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // })
  ]

};
