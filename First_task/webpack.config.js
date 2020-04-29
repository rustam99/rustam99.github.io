const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let isDev = process.env.NODE_ENV === 'develpment';
let isProd = !isDev;

function optimization() {
	const config = {
		splitChunks: {
			chunks: 'all',
		}
	}

	if (isProd) {
		config.minimizer = [
			new optimizeCssAssetsWebpackPlugin(),
			new terserWebpackPlugin(),
		]
	}

	return config;
}

function sourceMAP() {
	return isDev ? 'eval-sourcemap' : false;
}


const conf = {
	entry: {
		bundle: ['@babel/polyfill', './assets/app.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].[hash].js',
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, 'assets'),
			'@dir': path.resolve(__dirname, ''),
		}
	},
	optimization: optimization(),
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin([
			{from: './assets/img/', to: path.resolve(__dirname, 'dist/img')},
		]),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						]
					}
				},
			},
		]
	},
	devtool: sourceMAP(),
	devServer: {
		overlay: true,
	}
}

module.exports = conf;
