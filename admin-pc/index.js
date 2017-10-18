var koa = require("koa");
var app = new koa();
// var router = require('koa-router')();
var serve = require('koa-static');
// var csproxy = require('./csproxy.js');
var view = require('./routes/views');

app.use(view.routes());

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