const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: 'cheap-module-eval-source-map',  // 配置生成Source Maps，选择合适的选项
	entry: {
		index: "./src/index.js",
		vendors: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'static/js/[name].bundle.js',
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
			  use: 'eslint-loader'
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
	      test: /\.(png|jpe?g|gif|svg|bmp)$/,
	      include: path.resolve(__dirname, 'src'),
	      use: {
	      	loader: 'url-loader',
		      options: {
		        limit: 10000,
		        name: 'static/media/[name].[ext]',
		      }
	      }
	    }
    ]
	},
	plugins: [
	  new HtmlWebpackPlugin({
	  	template: path.resolve(__dirname, 'src/index.html'),
	  	inject: 'body'  // 脚本注入到body，样式注入到head
	  }),
	  // 分离entry.vendors
	  new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendors',
	  })
	],

	resolve: {
	  extensions: ['.js', '.jsx', '.json']
	}
}