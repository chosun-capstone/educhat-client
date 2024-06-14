const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./",
    disableHostCheck: true,
    allowedHosts: ["educhat.yeongmin.kr"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
