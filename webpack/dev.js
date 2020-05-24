const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./common');

const outputFile = '[name]';
const assetFile = '[name]';
const assetPath = '/';

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  // 指定されていない場合は.env.developmentを使用する
  const envFilePath = env ? `./env/.env.${env.file}` : './env/.env.development';

  return webpackMerge(
    commonConfig({
      outputFile,
      assetFile,
      envFilePath,
      assetPath,
    }),
    {
      mode: 'development',
      devtool: 'inline-source-map',
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../src/public/index.html'),
          // 出力されるファイル名
          filename: 'index.html',
          // headにjsファイルを入れたい場合はheadを指定
          inject: 'body',
          // 読み込むjsファイルを指定
        }),
      ],
      devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        // どのブラウザを自動で立ち上げるか。trueで標準のブラウザ。デフォルトでは立ち上がらない。
        // open: "Google Chrome",
        host: 'localhost',
        compress: true,
        // port番号はデフォルトで8080, 既に使用されている場合は自動で8181になる。指定したい場合はここでする。
        // port: 3000,
        watchOptions: {
          // 差分を検知しないディレクトリ
          ignored: /node_modules/,
        },
      },
    }
  );
};
