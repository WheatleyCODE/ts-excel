const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebPuckPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loader = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {}
    },
    'css-loader'
  ];

  if (extra) {
    loader.push(extra);
  }

  return loader;
};

const jsLoader = () => [
  {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.ts'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[hash][ext]'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@html': path.resolve(__dirname, 'src/html'),
      '@http': path.resolve(__dirname, 'src/http'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@wquery': path.resolve(__dirname, 'src/wquery'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@waxios': path.resolve(__dirname, 'src/waxios'),
      '@services': path.resolve(__dirname, 'src/services')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: !isDev,
    minimizer: [new CssMinimizerPlugin(), new TerserWebPuckPlugin()]
  },
  devServer: {
    port: 4200,
    static: path.resolve(__dirname, 'dist'),
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/icon.ico'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.scss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      }
    ]
  }
};
