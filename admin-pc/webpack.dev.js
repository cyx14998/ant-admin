const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 规制目录入口
const glob = require('glob');

// 获取指定路径下的入口文件
function getEntries(globPath) {
	var files = glob.sync(globPath),
		entries = {};

	files.forEach(function (filepath) {
		// 取倒数第二层(view下面的文件夹)做包名
		var split = filepath.split('/');
		var name = split[split.length - 2];

		entries[name] = './' + filepath;
	});

	return entries;
}

const entries = getEntries('src/views/**/index.jsx');

const htmlPlugins = Object.keys(entries).map(function (name) {
	// 需要用百度地图的页面
	if (name == 'mapList' || name == 'customerEdit') {
		return new HtmlWebpackPlugin({
			// 生成出来的html文件名
			filename: name + '.html',
			// 每个html的模版，这里多个页面使用同一个模版
			template: './src/mapTemplate.html',
			// 自动将引用插入html
			inject: true,
			// 每个html引用的js模块，也可以在这里加上vendor等公用模块
			chunks: ['vendors', name]
		});
	}
	return new HtmlWebpackPlugin({
		// 生成出来的html文件名
		filename: name + '.html',
		// 每个html的模版，这里多个页面使用同一个模版
		template: './src/template.html',
		// 自动将引用插入html
		inject: true,
		// 每个html引用的js模块，也可以在这里加上vendor等公用模块
		chunks: ['vendors', name]
	});
});

const webpackConfig = {
	devtool: 'source-map',  // 配置生成Source Maps，选择合适的选项
	entry: Object.assign({}, entries, {
		vendors: ['react', 'react-dom']
	}),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'assets/js/[name].bundle.js',
		publicPath: '/'  // fetch resource base on localhost
	},
	module: {
		rules: [
			// First, run the linter.
			// It's important to do this before Babel processes the JS.
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				include: path.resolve(__dirname, 'src'),
				// use: 'eslint-loader'
			},

			// Process JS with Babel.
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: true
					}
				}
			},

			{
				test: /\.css$/,
				use: [
					'style-loader', 'css-loader'
				]
			},

			// fucking for antd
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('postcss-flexbugs-fixes'),
								require('autoprefixer')({
									browsers: [
										'>1%',
										'last 6 versions',
										'Firefox ESR',
										'not ie < 9', // React doesn't support IE8 anyway
									],
									flexbox: 'no-2009',
								})
							]
						}
					},
					'less-loader'
				]
			},
			// "url" loader works like "file" loader except that it embeds assets
			// smaller than specified limit in bytes as data URLs to avoid requests.
			// A missing `test` is equivalent to a match.
			{
				test: /\.(png|jpe?g|gif|bmp)$/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'assets/media/[name].[ext]',
					}
				}
			}
		]
	},
	plugins: [
		// 分离entry.vendors
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
		}),

		// copy koa
		new CopyWebpackPlugin([
			{
				from: 'src/config',
				to: 'config/'
			},
			{
				from: 'src/ueditor',
				to: 'ueditor/'
			}
		]),

	],

	resolve: {
		extensions: ['.web.js', '.js', '.jsx', '.json']
	}
};

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

module.exports = webpackConfig;