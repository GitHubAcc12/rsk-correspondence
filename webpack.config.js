module.exports = {
  mode: "development",
  entry: {
    entry: "./js/index.js",
  },
  output: {
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
