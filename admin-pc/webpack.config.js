// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展
var mypath = require('./map.js');
var path = require('path');
const pxtorem = require('postcss-pxtorem');

module.exports = function (webpackConfig) {
	webpackConfig.entry = mypath;
	webpackConfig.output = {
		filename: '[name].js',
		// chunkFilename: '[id].chunk.js',
		path: path.join(__dirname, '/public/'),
		publicPath: '/'
	};
	// webpackConfig.externals = ['react', 'react-dom', 'jquery'];
	const svgDirs = [
		require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
		// path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
	];
	webpackConfig
		.babel
		.plugins
		.push('transform-runtime');
	webpackConfig
		.babel
		.plugins
		.push([
			'import', [{
				libraryName: 'antd-mobile',
				style: true
			}, {
				libraryName: 'antd',
				style: true
			}]
		]);
	webpackConfig.module.loaders.forEach(loader => {
		if (loader.test && typeof loader.test.test === 'function' && loader.test.test('.svg')) {
			loader.exclude = svgDirs;
		}
	});
	// 配置 webpack SVG loader
	webpackConfig.module.loaders.unshift({
		test: /\.(svg)$/i,
		loader: 'svg-sprite',
		include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
	});
	// 这个是高清方案设置的配置,配置后业务代码可以直接用px，这边会自动转成rem 
	// 参考地址:https://github.com/ant-design/ant-design-mobile/wiki/antd-mobile-0.8-%E4%BB%A5%E4%B8%8A%E7%89%88%E6%9C%AC%E3%80%8C%E9%AB%98%E6%B8%85%E3%80%8D%E6%96%B9%E6%A1%88%E8%AE%BE%E7%BD%AE
	// webpackConfig.postcss.push(pxtorem({
	// 	rootValue: 100,
	// 	propWhiteList: [],
	// }));
	return webpackConfig;
};
