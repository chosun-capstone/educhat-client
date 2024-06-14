const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
  },
  output: {
	  filename: "[name].js", // [app].js (엔트리의 키가 app이므로)
	  path: path.resolve(__dirname, "dist")
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
  plugins: [
	new HtmlWebpackPlugin({
			// 빌드시 html에 값을 전달, html 변경 & html 코드 압축(공백, 주석제거) & webpack으로 빌드한 번들 파일을 자동으로 html에 추가
		template: "./src/index.html", // index.html 파일을 템플릿으로 씁니다.
		templateParameters: {
				// 해당 템플릿에 전달하는 인자들
		env: "",
		},
		minify: {
						collapseWhitespace: true,
						removeComments: true,
					},
		}),
    new CleanWebpackPlugin()
  ],
};
