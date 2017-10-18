var sha1 = require('sha1');
var $fn = require("../common/common");
const rediskey = "wechat_accseeToken";
const https = require('https');
const httpclient = require("../common/httputility");
const memberkey = "members"; // 会员信息key
const memberintegralkey = 'memberintegral'; // 会员积分key
//var appid="wxe10561b84579f0d3";//宇逸工作室
var appid = "wx4a567d38d5275a12";//逸享优食
//var appsect="356c7086b82a025b8cb46cf8e93a5eb0";//宇逸工作室
var appsect = "544084b33f9bb17d1f62145a3108026e";//逸享优食
const baseConfig = require("../config");
var WX = {};

WX.checkSignature = function (signature, nonce, timestamp, echostr) {
    // config = config || {};
    // var q = req.query;
    var token = "em_wechat";
    // var signature = q.signature; //微信加密签名  
    // var nonce = q.nonce; //随机数  
    // var timestamp = q.timestamp; //时间戳  
    // var echostr = q.echostr; //随机字符串  
    /* 
        1）将token、timestamp、nonce三个参数进行字典序排序 
        2）将三个参数字符串拼接成一个字符串进行sha1加密 
        3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信 
    */
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    if (sha == signature) {
        res.send(echostr + '')
    } else {
        res.send('err');
    }
}

/**
 * 获取token，从redis取出
 */
WX.getAccessToken = async function () {
    var token = "";
    //判断redis
    token = await global.RedisClient.getValue(rediskey);
    if (!token) {
        token = await WX.createAccessToken();
    }
    return token;
};

/**
 * 创建token
 */
WX.createAccessToken = async function () {
    var opt = {
        method: 'GET',
        hostname: 'api.weixin.qq.com',
        path: "/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + appsect,
        httptype: "https",
        port: 443
    };

    var result = await $fn.asyncget(opt);
    var token = JSON.parse(result).access_token;
    global.RedisClient.setValue(rediskey, token, 3600);
    return token;

    //存入redis 
    // wechat_accseeToken = JSON.stringify(result.access_token)
    // client.set(rediskey, wechat_accseeToken, redis.print);
    // client.expire('wechat_accseeToken', 7120);
    // console.log('口令：' + result.access_token);
},
/**
 * 获取网页授权token 
 */
WX.getCodeToken = async function (code) {
    console.log(code);
    var code = code;
    var opt = {
        method: 'GET',
        hostname: 'api.weixin.qq.com',
        path: "/sns/oauth2/access_token?appid=wx4a567d38d5275a12&secret=544084b33f9bb17d1f62145a3108026e&code=" + code + "&grant_type=authorization_code",
        httptype: "https",
        port: 443
    };
    var data = await $fn.asyncget(opt);
    console.log('data=' + data);
    return data;
},
/**
*获取member信息
*/
WX.getMember = async function (ctx, next) {
    var openid = ctx.openid;
    console.log('openid=' + openid);
    var memberInfo = '';
    var interInfo = '';
    var result = '';
    var key = memberkey + openid;
    var interkey = memberintegralkey + openid;
    memberInfo = await global.RedisClient.getValue(key);
    interInfo = await global.RedisClient.getValue(interkey);
    if (interInfo) {
        result = (memberInfo + interInfo).replace('}{', ',');
    } else {
        result = memberInfo;
    }
    console.log('result=' + result);
    if (!result) {
        result = await WX.pullMember(ctx);
    }
    return result;
}
/**
 * 拉取member数据 存入session和redis
 */
WX.pullMember = async function (ctx, next) {
    var data = ctx;
    var openid = data.openid;
    var key = memberkey + openid;
    console.log(openid);
    var opt = {
        method: 'GET',
        hostname: baseConfig.routebaseurl,
        port: 80,
        path: '/emapi/emmember/getmemberbyid?openid=' + openid,
    }
    var model = await $fn.asyncget(opt);
    var result = (typeof model === 'object') ? model.result : JSON.parse(model).result;
    var code = (typeof model === 'object') ? model.result : JSON.parse(model).code;
    if (code == 1) {
        // global.RedisClient.setValue(key, result);
        ctx.session.info = result;
        return result;
    }
},

module.exports = WX;