var router = require('koa-router')();
var http = require("http");
var $fn = require("../common/common");

var koabody = require("../modules/koa-body")();
var xml2js = require('xml2js');
var sha1 = require('sha1');
var request = require('request');
const wechatApi = require("../common/wechat");
const httpclient = require("../common/httputility");
// var API = require('wechat-api');
// const wechatApi = require("../common/wechat");
// var raw = require('raw-body');
// var inflate = require('inflation');



var Wechat = {
    init: async function (ctx, next) {
        console.log(ctx.request.query);
        // config = config || {};
        var q = ctx.request.query;
        var token = "em_wechat";
        var signature = q.signature; //微信加密签名  
        var nonce = q.nonce; //随机数  
        var timestamp = q.timestamp; //时间戳  
        var echostr = q.echostr; //随机字符串  
        /* 
            1）将token、timestamp、nonce三个参数进行字典序排序 
            2）将三个参数字符串拼接成一个字符串进行sha1加密 
            3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信 
        */
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (sha == signature) {
            ctx.body = echostr;
        } else {
            ctx.body = 'err';
        }

        // next();
    },
    server: async function (ctx, next) {
        var q = ctx.request.query;
        var w = ctx.request.body;
        var wechat_accseeToken = await wechatApi.getAccessToken();
        // var b =new xml2js.Builder({ xmldec: { 'version': "1.0", 'encoding': 'utf-8' } });
        // var wxjson = b.buildObject(w);
        xml2js.parseString(w, function (err, wxjson) {

            console.log('FromUserName=' + wxjson.xml.FromUserName[0]);
            console.log('wxjson' + wxjson.xml);
            var msgtype = wxjson.xml.MsgType[0];
            var openid = wxjson.xml.FromUserName[0];
            if (msgtype == "event") {
                var data = wxjson.xml;
                console.log('data=' + data);
                $fn.post({
                    hostname: '127.0.0.1',
                    port: 80,
                    path: '/emapi/wechat/WeChatEvent',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify(data),//处理数据给后台
                    json: true,     
                    callback:function (msg) {
                        console.log(msg)
                    }
                });
                // var xml = '<xml><ToUserName><![CDATA['+openid+']]></ToUserName><FromUserName><![CDATA['+wxjson.xml.ToUserName[0]+']]></FromUserName><CreateTime>'+1348831860+'</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[this is a test]]</Content></xml>';
                // ctx.body = xml;
                console.log('event');
            }
        });
        console.log("query", q);
        console.log("body", w);
        ctx.body = '';
    },
    getAccessToken: async function (ctx, next) {
        ctx.body = await wechatApi.getAccessToken();
        // ctx.body ="123";
    },
    /**
     * 创建自定义菜单接口
    */
    setMenu: async function (ctx, next) {
        var wechat_accseeToken = await wechatApi.getAccessToken();
        var menujson = require("../common/menu.json");
        var url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + wechat_accseeToken;
        var option = { url: url, json: true, body: menujson };
        var result = await httpclient.asyncpost(option);
        ctx.body = result;
    },

}


router
    .get(/^\/wechat\/api/i, Wechat.init)
    .post(/^\/wechat\/api/i, koabody, Wechat.server)
    .get("/api/wechat/getaccesstoken", Wechat.getAccessToken)
    .get("/api/wechat/setMenu", Wechat.setMenu);


// Razor({root:'/',path:'./Views/'},{})

module.exports = router;
