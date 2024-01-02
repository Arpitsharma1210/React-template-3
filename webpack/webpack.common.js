const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    hot: true,
    open:true,
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // --------- Webpack 5 rule for images ---------
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // --------- Webpack 5 rule for svg's and fonts ---------
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/assets/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets/images",
          to: "assets/images/[name][ext]",
          toType: "template",
        },
        {
          from: "src/assets/site.webmanifest",
          to: "assets/site.webmanifest",
          toType: "template",
        },
      ],
    }),
    new CleanWebpackPlugin({
      // Use !negative patterns to exclude files
      // default: []
      cleanAfterEveryBuildPatterns: ["static*.*", "!static1.js"],
      // Write Logs to Console
      // (Always enabled when dry is true)
      // default: false
      verbose: true,
    }),

  ],
};
