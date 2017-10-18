var router = require('koa-router')();
var Razor = require('../modules/koa-razor');
var conf = require("../config.js");

var defaultInfo = { username: "游客", deptname: "大度假" };
var Demo = {   
    redirect: async (ctx, next) => {
        //   const user = await Users.getById(this.session.user_id);
        //   await next();
        ctx.body = "not found";
    },
    admin: async (ctx, next) => {
        await Razor({ root: '/admin/', path: './views/admin/' }, conf.pathConfig.pub)(ctx);
    }
};



router
    .get('/', Demo.redirect)    
    .get(/^\/admin\//i, Demo.admin);
// Razor({root:'/',path:'./Views/'},{})

module.exports = router;