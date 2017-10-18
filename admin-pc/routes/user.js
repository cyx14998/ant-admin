var router = require('koa-router')();
var $fn = require("../common/common");
var http = require("http");
var koabody = require("koa-body")();
const wechatApi = require("../common/wechat");
const baseConfig = require("../config");

var Demo = {
    index: async (ctx, next) => {
        //  ctx.body = "not found 啊啊啊";
        // ctx.body = await new Promise(function (resolve, reject) {
        //     resolve(1);
        // });
        // console.log(req);

    },

    //修改
    update: async function (ctx, next) {
        try {
            var data = ctx.request.body.dataAll;
            var openid = JSON.parse(ctx.session.info).UserID;
            // console.log("dataall=" + data);
            var opt = {
                hostname: baseConfig.routebaseurl,
                port: 80,
                path: '/emapi/emmember/SaveMember',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(data), //处理data数据给后台
                json: true
            }
            var result = await $fn.asyncpost(opt);
            if (JSON.parse(result).code == 1) {
                var key = 'members' + openid;
                ctx.session.info = await global.RedisClient.getValue(key);
                // console.log("更新的session=" + ctx.session.info);
                ctx.body = { code: 1 };
            }
        } catch (error) {
            console.log("修改出错", error);
        }

        // ctx.body = ctx.session.info;

    },
    getLoginUserInfo: async function (ctx, next) {
        //判断下session里面是否有值
        if (ctx.session && ctx.session.info && ctx.session.info != 'null' && ctx.session.info != '[object Object]') {
            ctx.body = ctx.session.info;
        } else {
            var code = ctx.request.body.code;
            // console.log("getloginuser传的数据=" + ctx.session.info);
            var data = JSON.parse(await wechatApi.getCodeToken(code));
            var model = await wechatApi.getMember(data);

            ctx.body = model;
        }

    },

    getimage: async function (ctx, next) {
        // var guiid = ctx.request.body.id;
        var id = ctx.request.query.key;
        console.log("id=" + id);
        var result = await global.RedisClient.getValue(id);
        // if (!result) {
        //     var opt = {
        //         method: 'GET',
        //         hostname: baseConfig.routebaseurl,
        //         port: 80,
        //         path: '/emapi/emfiles/getimg?key=' + "37d90281-81ae-4bf5-a658-2645d66768b8",
        //     }
        //     var model = await $fn.asyncget(opt);
        //     result = JSON.parse(model).code;

        // }
        console.log("result=" + result);
        ctx.body = result;

    },


};



router
    .post("/api/user/index", koabody, Demo.index)
    .post("/api/user/update", koabody, Demo.update)
    .post("/api/user/getLoginUserInfo", koabody, Demo.getLoginUserInfo)
    .get("/api/user/getimage", koabody, Demo.getimage)

// Razor({root:'/',path:'./Views/'},{})


module.exports = router;