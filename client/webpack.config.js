var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './client.js');
var BUILD_PATH = path.resolve(__dirname, '../public');

module.exports = {
	entry: {
		main: ['babel-polyfill', APP_PATH]
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.min.js'
	},
	module: {
		loaders: [{
			test: /\.js[x]?$/,
			exclude: /(node_modules|bower_components)/,
			loaders: ['babel-loader?presets[]=es2015,presets[]=react']
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		}, {
			test: /\.(png|jpg)$/,
			loader: 'file-loader'
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader?limit=10000&mimetype=application/octet-stream"
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file"
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader?limit=10000&mimetype=image/svg+xml"
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	]
}