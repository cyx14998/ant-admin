module.exports = {
	runpoint: 80,
	common: [//通用配置
		{ host: 'http://192.168.2.213:80', route: /^\/emapi*/i },
		// { host: 'http://10.101.42.14:8003', route: /^\/jqmodule*/i },
		// { host: 'http://10.101.44.27:8002', route: /^\/api*/i },
		// { host: 'http://10.101.42.47:6100', route: /^\/Crm*/i }
	],
	special: [//特例配置
		{ path: '/api/home/test', apihost: 'http://10.101.44.11:8060' },
		{ path: '/api/home/test', apihost: 'http://10.101.44.12:8060' }
	],
	uibaseurl: "http://10.101.42.69:8003/",//ui框架脚本配置
	routebaseurl: 'http://wx.yuzhiyi.cc',//nodejs调接口的url
	devpath: "./dev",
	outjspath: "./public/js",
	outcsspath: "./public/css",
	wxConfig: {
		appid: "wxb5a23ba17e52b09e",
		appsecret: "ebb2d9eb271bce9f4ef9a979f146c48f"
	},
	dbconfig: {
		host: '10.168.1.165',
		port: 3306,
		database: 'wxddd',
		user: 'admin',
		password: 'server2017@yzy'
		// host: 'rm-bp1n759v8219i0r9lo.mysql.rds.aliyuncs.com',
		// port: 3306,
		// database: 'wxddd',
		// user: 'yzyadmin',
		// password: 'mysql_#yzy1104'
	},
	pathConfig: {
		dev: {
			jsPath: "http://127.0.0.1:8080/",
			cssPath: "http://127.0.0.1:8080/",
			assetsPath: "http://127.0.0.1:8080/",
			webApiPath:"/",
			wsApiPath:  "ws://192.168.2.213:4321"  // 调后台接口配置
		},
		pub: {
			jsPath: "/",
			cssPath: "/",
			assetsPath: "/",
			webApiPath:"/",
			wsApiPath: "ws://wx.yuzhiyi.cc:4321" // 调后台接口配置
		}
	},
	apiConfig: {
		host: "127.0.0.1",
		port: 80
	},
	redisConfig: {
		RDS_PORT: 6379,
		RDS_HOST: '10.168.1.165',
		RDS_PWD: '123456'
	},
	runModel:"dev"
};
