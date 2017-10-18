var router = require('koa-router')();
var http = require("http");
var koabody = require("koa-body")();
var $fn = require("../common/common");
const baseConfig = require("../config");
var Demo = {
    sendsms: async (ctx, next) => {
        var Mobile = ctx.request.body.Phone;// body为post取参，requery为get取参 前端用户传的数据里含mobile
        var numcode = Math.round(Math.random() * 1000000, 0);
        var num = await global.RedisClient.getValue(Mobile);
        if (!num) {
            num = 0;
        }
        //判断用户登录信息
        if (ctx.session.info) {
            var openid = JSON.parse(ctx.session.info).UserID;
            if (num < 20) {
                var data = { Mobile: Mobile, Content: numcode };
                var opt = {
                    hostname: baseConfig.routebaseurl,
                    port: 80,
                    path: '/emapi/sms/sms',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify(data),//处理data数据给后台
                    json: true
                }
                var result = await $fn.asyncpost(opt);
                //redis
                if (JSON.parse(result).code == 1) {
                    console.log("numcode="+numcode);
                    num = num++;
                    global.RedisClient.setValue(Mobile, num, 60);
                    var key = 'sms_register_' + Mobile;
                    global.RedisClient.setValue(key, numcode, 60);
                    ctx.body = result;
                }

            }
        } else {
            ctx.body = '未登录';
        }

    },
    //接收验证码进行对比
    iscode: async function (ctx, next) {
        var num = ctx.request.body.code;// code前端用户传的数据里含验证码数字
        var mobile = ctx.request.body.Phone;
        var data = ctx.request.body.dataAll;
        if (ctx.session.info) {
            var key = 'sms_register_' + mobile;
            var dbcode = await global.RedisClient.getValue(key);
            if (dbcode == num) {
                console.log(mobile);
                var opt = {
                    hostname: baseConfig.routebaseurl,
                    port: 80,
                    path: '/emapi/emmember/SaveMember',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify(data),//处理data数据给后台
                    json: true
                }
                var result = await $fn.asyncpost(opt);
                var openid = JSON.parse(ctx.session.info).UserID;
                var key = 'members' + openid;
                ctx.session.info = await global.RedisClient.getValue(key);
                // console.log("sms更新数据="+ctx.session.info);
                ctx.body = { code: 1 };
            } else {
                ctx.body = { code: 0 };
            }
        } else {
            ctx.body = '未登录';
        }


    },
    testda: async (ctx, next) => {
        //  ctx.body = "not found 啊啊啊";
        // ctx.body = await new Promise(function (resolve, reject) {
        //     resolve(1);
        // });
        // console.log(req);

        var data = {
            userName: '',
            sex: 2,
            pageSize: '10',
            pageIndex: '1',
        };
        var opt = {
            hostname: baseConfig.routebaseurl,
            port: 80,
            path: '/emapi/user/getuserview',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: JSON.stringify(data),//处理data数据给后台
            json: true
        }
        var result = await $fn.asyncpost(opt);
        console.log(result);
        ctx.body = result;
    },
};



router
    .post("/api/sms/sendsms", koabody, Demo.sendsms)
    .post("/api/sms/iscode", koabody, Demo.iscode)
    .post("/api/sms/testda", koabody, Demo.testda);

// Razor({root:'/',path:'./Views/'},{})

module.exports = router;