/**
 * node server
 */
const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router')();
// const Razor = require('koa-razor');

const app = new koa();

// router.get('/admin/', async (ctx, next) => {
//   await Razor({ root: '/admin/', path: './public/admin/' })(ctx);
// });

// app.use(router.routes());

app.use(static('public'));

app.use(async(ctx, next) => {
    // ctx.session.userid = Math.round(Math.random()*1000,0);
    // console.log(ctx.session.userid);
    //   await next();
    ctx.body = "网站正在建设中";
});



app.listen(8001, () => {
    console.log("服务端口8001");
});