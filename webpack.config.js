const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    main: './src/scripts/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader' },
          { loader: "ts-loader" }
        ],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js'
  }
};