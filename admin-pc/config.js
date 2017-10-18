module.exports = {
	runpoint: 80,
	common: [//通用配置
		{ host: 'http://192.168.2.213', route: /^\/emapi*/i },
		// { host: 'http://10.101.42.14:8003', route: /^\/jqmodule*/i },
		// { host: 'http://10.101.44.27:8002', route: /^\/api*/i },
		// { host: 'http://10.101.42.47:6100', route: /^\/Crm*/i }
	],
	special: [//特例配置
		{ path: '/api/home/test', apihost: 'http://10.101.44.11:8060' },
		{ path: '/api/home/test', apihost: 'http://10.101.44.12:8060' }
	],
	uibaseurl:"http://10.101.42.69:8003/",//ui框架脚本配置
	routebaseurl: '192.168.2.213',//nodejs调接口的url
	devpath:"./dev",
	outjspath:"./public/js",
	outcsspath:"./public/css",
	dbconfig: {
		host: '10.168.1.165',
		port: 3306,
		database: 'em_eat',
		user: 'admin',
		password: 'server2017@yzy'
	},
	pathConfig:{
		dev:{
			jsPath:"http://192.168.2.250:8000/public/",
			cssPath:"http://192.168.2.250:8000/public/",
			assetsPath:"http://192.168.2.250:8000/public/",
		}
	}
};
