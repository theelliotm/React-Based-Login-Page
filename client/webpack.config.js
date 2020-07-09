module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'postcss-loader'],
        },
        {
          test: /\.jsx?$/,
          use: ['babel-loader', 'astroturf/loader'],
        },
        {
          test: /\.ttf$/,
          loader: "url-loader", // or directly file-loader
          include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
        },
      ]
    }
  }