var router = require('koa-router')();
var http = require("http");
var $fn=require("../common/common");
var koabody = require("koa-body")();
var defaultInfo = { username: "游客", deptname: "大度假" };



var Demo = {
    sendcode: async(ctx, next) => {
        var code = "1234";
        await Razor({ root: '/demo/', path: './views/demo/' })(ctx);
    },
    user: async(ctx, next) => {
        //  ctx.body = "not found 啊啊啊";
        // ctx.body = await new Promise(function (resolve, reject) {
        //     resolve(1);
        // });
        var opt={
            host:""
        }
        var result=await $fn.asyncpost(opt);

        var userinfo = { sex: 17, group: "dsada" };
        var model = { username: "张三", info: userinfo };
        await Razor({ root: '/user/', path: './views/user/' }, model)(ctx);
    },
    // admin: function* () {
    //     if (!this.session.userinfo) {
    //         yield Razor({ fullpath: './Views/Home/helplogin' }, {});
    //         return;
    //     }
    //     yield Razor({ root: '/admin/', path: './Views/admin/' }, { userinfo: this.session.userinfo || defaultInfo });
    // },
    login: function*() {
        this.session.userinfo = null;
        this.redirect('/Home/login');
    },
    redirect: async(ctx, next) => {
        //   const user = await Users.getById(this.session.user_id);
        //   await next();
        ctx.body = "not found";
    },
    
    
};



router
    .get(/^\/sms\//i, Razor({ root: '/demo/', path: './views/demo/' }))
    
    

;


// Razor({root:'/',path:'./Views/'},{})

module.exports = router;