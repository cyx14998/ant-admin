var router = require('koa-router')();
var Razor = require('../modules/koa-razor');
var http = require("http");
var conf = require("../config.js");
var koabody = require("koa-body")();
const wechatApi = require("../common/wechat");

var defaultInfo = { username: "游客", deptname: "大度假" };
var Demo = {
    // demo: function* () {
    //     yield Razor({ root: '/Demo/', path: './views/Demo/' }, { baseurl: conf.uibaseurl });
    // },
    demo: async (ctx, next) => {
        //  ctx.body = "not found 啊啊啊";
        // ctx.body = await new Promise(function (resolve, reject) {
        //     resolve(1);
        // });
        console.log("userid:" + ctx.session.userid);
        await Razor({ root: '/demo/', path: './views/demo/' })(ctx);
    },
    // admin: function* () {
    //     if (!this.session.userinfo) {
    //         yield Razor({ fullpath: './Views/Home/helplogin' }, {});
    //         return;
    //     }
    //     yield Razor({ root: '/admin/', path: './Views/admin/' }, { userinfo: this.session.userinfo || defaultInfo });
    // },
    login: function* () {
        this.session.userinfo = null;
        this.redirect('/Home/login');
    },
    redirect: async (ctx, next) => {
        //   const user = await Users.getById(this.session.user_id);
        //   await next();
        ctx.body = "not found";
    },
    admin: async (ctx, next) => {
        await Razor({ root: '/admin/', path: './views/admin/' }, conf.pathConfig.dev)(ctx);
    },
    //会员信息
    user: async (ctx, next) => {
        var model = "";
        var data = {};
        var code = ctx.request.query.code;
        var memberid = ctx.request.query.memberid;
        model = (ctx.session && ctx.session.info && typeof ctx.session.info != "string") ? ctx.session.info : '';
        if (!model) {
            //判断code 
            if (code) {
                if (ctx.session.code != code) {
                    ctx.session.code = code;
                    data = JSON.parse(await wechatApi.getCodeToken(code));
                    model = await wechatApi.getMember(data);
                    ctx.session.info = model;
                    // console.log("更新的session=" + ctx.session.info);
                }
            }
            if (memberid) {
                //模拟微信接口
                model = await wechatApi.getMember(memberid);
                ctx.session.info = model;
            }
        }
        await Razor({ root: '/user/', path: './Views/user/' }, conf.pathConfig.dev)(ctx);
    }

};



router
    // .get('/', Demo.redirect)
    // .get(/^\/demo\//i, Demo.demo)
    .get(/^\/demo\//i, Demo.demo)
    .get(/^\/admin\//i, Demo.admin)
    .get(/^\/user\//i, Demo.user)
    .get(/^\/help\//, Razor({ root: '/help/', path: './Views/help/' }, {}))
    .get(/^\/workflow\//i, Razor({ root: '/workflow/', path: './Views/workflow/' }, { baseurl: conf.uibaseurl }))
    .get(/^\/react\//, Razor({ root: '/react/', path: './Views/react/' }, {}))
    .get(/^\/apidoc\//, Razor({ root: '/apidoc/', path: './Views/apidoc/' }, conf.pathConfig.dev));


// Razor({root:'/',path:'./Views/'},{})

module.exports = router;