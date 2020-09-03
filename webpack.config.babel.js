const { join } = require("path");

const include = join(__dirname, "src");

module.exports = {
  entry: "./src/index",
  output: {
    path: join(__dirname, "dist"),
    libraryTarget: "umd",
    library: "perfAnalyticLibrary",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", include }],
  },
};
