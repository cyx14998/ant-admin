var koa = require("koa");
var app = new koa();
var router = require('koa-router')();
var serve = require('koa-static');


app.use(require('./routes/views').routes());

app.use(async(ctx, next) => {
    // ctx.session.userid = Math.round(Math.random()*1000,0);
    // console.log(ctx.session.userid);
    //   await next();
    ctx.body = "网站正在建设中";
});



app.listen(8001, () => {
    console.log("服务端口8001");
});