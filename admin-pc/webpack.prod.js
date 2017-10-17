const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		index: "./src/index.js",
		vendors: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'static/js/[name].[chunkhash:8].js',
		publicPath: '/' // fetch resource base on localhost
	},
	module: {
		rules: [
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

			// compile less -> autoprefixer -> css
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								minimize: true,
                sourceMap: true,
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
				})
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
		new webpack.LoaderOptionsPlugin({
		    minimize: true,
		    debug: false
		}),

		// Generates an `index.html` file with the <script> injected.
	  new HtmlWebpackPlugin({
	  	template: path.resolve(__dirname, 'src/index.html'),
	  	inject: 'body',  // 脚本注入到body，样式注入到head
	  	minify: {
	  	  removeComments: true,
	  	  collapseWhitespace: true,
	  	  removeRedundantAttributes: true,
	  	  useShortDoctype: true,
	  	  removeEmptyAttributes: true,
	  	  removeStyleLinkTypeAttributes: true,
	  	  keepClosingSlash: true,
	  	  minifyJS: true,
	  	  minifyCSS: true,
	  	  minifyURLs: true,
	  	},
	  	filename: 'index.html'
	  }),

	  // 分离entry.vendors
	  new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendors',
	    filename: 'static/js/vendors.bundle.js'
	  }),

	  // Minify the code.
	  new webpack.optimize.UglifyJsPlugin({
	    compress: {
	      warnings: false,
	      // Disabled because of an issue with Uglify breaking seemingly valid code:
	      // https://github.com/facebookincubator/create-react-app/issues/2376
	      // Pending further investigation:
	      // https://github.com/mishoo/UglifyJS2/issues/2011
	      comparisons: false,
	    },
	    output: {
	      comments: false,
	    },
	    sourceMap: true,
	  }),

	  // 分离css
	  new ExtractTextPlugin({
	  	filename: 'static/css/[name].[contenthash:8].css'
	  }),

	  // copy favicon.ico
	  new CopyWebpackPlugin([{
	  	from: 'src/favicon.ico',
	  	to: 'favicon.ico' // base on output.path
	  }])
	],

	// 自动解析后缀，比如 import App from './app'
	resolve: {
	  extensions: ['.js', '.jsx', '.json']
	}
}