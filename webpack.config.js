const webpack = require("webpack")
const dotenv = require("dotenv").config({})
const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              data: '@import "./src/config/scss/main.scss";'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      favicon: "./src/config/img/favicon.ico"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        REACT_APP_API_KEY: JSON.stringify(dotenv.parsed.REACT_APP_API_KEY),
        REACT_APP_API_URL: JSON.stringify(dotenv.parsed.REACT_APP_API_URL),
        REACT_APP_DB_URL: JSON.stringify(dotenv.parsed.REACT_APP_DB_URL),
        REACT_APP_ENABLE_SITE: dotenv.parsed.REACT_APP_ENABLE_SITE
      }
    })
  ]
}
