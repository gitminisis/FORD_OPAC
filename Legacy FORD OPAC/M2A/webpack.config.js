module.exports = {
  entry: ["babel-polyfill", "./src/index"],
  watch: true,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":src"]
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|svg|mp4|mp3)$/,
        loader: "url-loader",
        options: {
          limit: 1024 * 5000,
          name: "m2a/dist/[hash].[ext]"
        }
      }
    ]
  }
};
