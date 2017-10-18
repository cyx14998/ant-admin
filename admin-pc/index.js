var koa = require("koa");
var app = new koa();
// var router = require('koa-router')();
var serve = require('koa-static');
// var csproxy = require('./csproxy.js');
var view = require('./routes/views');
var smsapi = require('./routes/sms');
var wechat = require('./routes/wechat');
var user = require('./routes/user');
var product = require('./routes/product');
const session = require('koa-session');
const proxy = require('koa-proxies')
const HttpsProxyAgent = require('https-proxy-agent')

require("./common/redis");
require("./common/dbcon");

app.keys = ['em-eat'];
const CONFIG = {
    key: 'koa:sess',
    /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

// middleware
// app.use(proxy('/emapi', {
//     target: 'http://localhost/emapi',    
//     changeOrigin: false,
//     agent: new HttpsProxyAgent('http://localhost'),
//     rewrite: path => path.replace(/^\/emapi(\/|\/\w+)?$/, '/emapi'),
//     logs: true
//   }));
app.use(proxy('/emapi', {
    target:'http://localhost',
    changeOrigin: true,
    logs: true
}));


app.use(session(CONFIG, app));



// app.use(csproxy);
app.use(product.routes());
app.use(wechat.routes());
app.use(user.routes());
app.use(view.routes());
app.use(smsapi.routes());

app.use(serve('public'));
app.use(serve('bower_components'));
// app.use(function* () {
//     // yield Razor({ root: '/Demo/', path: './Views/Demo/' }, { baseurl: conf.uibaseurl });
//     this.body = "not found";

// });
app.use(async(ctx, next) => {
    // ctx.session.userid = Math.round(Math.random()*1000,0);
    // console.log(ctx.session.userid);
    //   await next();
    ctx.body = "网站正在建设中";
});



app.listen(8001, () => {
    console.log("服务端口8001");
});