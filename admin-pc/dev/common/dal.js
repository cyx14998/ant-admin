var $db = {};
var axios = require('axios');
var baseUrl = "http://192.168.2.213";
var adminUrl = "http://192.168.2.213/emapi";
//获取图片
$db.imgUrl = 'http://192.168.2.213/emapi/emfiles/GetImg?key=';
// 上传游戏、活动图片
$db.uploadImg = "http://192.168.2.213/emapi/emfiles/PostGameImg";
// 上传商品图片
$db.uploadProImg = "http://192.168.2.213/emapi/emfiles/PostProductImg";

var $fn = {
    post: function (url, data, cb) {
        axios.post(url, data)
            .then(function (response) {
                cb(response.data);
            })
            .catch(function (error) {
                console.log(error);
                cb({
                    code: -100,
                    message: error
                })
            });
    },
    get: function (url, cb) {
        axios.get(url)
            .then(function (response) {
                cb(response.data);
            })
            .catch(function (error) {
                console.log(error);
                cb({
                    code: -100,
                    message: error
                })
            });
    },
}

$db.getQuery = function (key) {
    var url = window.location.href;
    var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : svalue;
}
//判断是否在微信浏览器
$db.is_WX = function (){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
/**
 * 
 */
$db.getMemberByID = function (req, res) {
    $fn.get(baseUrl + "api/member/getmember?id=" + req.id, function (data) {
        res(data);
    });
}

//获取会员信息
$db.GetMemberView = function (req, res) {
    $fn.post(adminUrl + "/emmember/getmemberview", req, function (data) {
        res(data);
    })
}
//获取粉丝信息
$db.GetFansView = function (req, res) {
    $fn.post(adminUrl + "/wechatfans/GetFansView", req, function (data) {
        res(data);
    })
}
//商品查询
$db.getproductview = function (req, res) {
    $fn.post(adminUrl + "/emproduct/getproductview", req, function (data) {
        res(data);
    })
}
//管理员登录
$db.getAdminLogin = function (req, res) {
    var data = {
        userName: "gjx",
        password: "123456",
    };

    if (req.userName == data.userName && data.password == req.password) {
        var result = {
            code: 1,
            message: "登录成功",
        }
        res(result);
    } else {
        var result = {
            code: 2,
            message: "用户名或密码错误",
        }
        res(result);
    }
}

//测试专用
$db.test = function (req, res) {
    $fn.post("http://192.168.2.213/emapi/emfiles/getimg?id=129c9e9d-def8-4175-a8f6-444b342aa2b6", req, function (data) {
        // console.log("aaaa");
        res(data);
    });
}
//获取用户信息
$db.getLoginUserInfo = function (req, res) {
    $fn.post("/api/user/getLoginUserInfo", req, function (data) {
        res(data);
    });
}
//获取验证码
$db.getCode = function (req, res) {
    $fn.post("/api/sms/sendsms", req, function (data) {
        res(data);
    });
}
//验证验证码
$db.isCode = function (req, res) {
    $fn.post("/api/sms/iscode", req, function (data) {
        res(data);
    });
}
//更改用户信息
$db.upData = function (req, res) {
    $fn.post("/api/user/update", req, function (data) {
        res(data);
    });
}
//获取--头像的key
// export var uploadurl = "http://192.168.2.213/emapi/emfiles/postfile";
//获取头像
$db.upLoad = function (req, res) {
    $fn.get(adminUrl + "/api/user/getimage?key=" + req, function (data) {
        res(data);
    });
}
//产品添加
$db.goods = function (req, res) {
    $fn.post(adminUrl + "/emproduct/saveproduct", req, function (data) {
        res(data);
    });
}
//产品删除(暂无删除)
$db.deleteGoods = function (req, res) {
    $fn.get(adminUrl + "/emproduct/DeleteProduct?innerID=" + req, function (data) {
        res(data);
    });
}
//产品首页获取数据
$db.getHomePage = function (req, res) {
    $fn.get(adminUrl + "/emproduct/gethomepage", function (data) {
        res(data);
    });
}
//产品首页获取数据（模糊查询）
$db.PostProductQuery = function (req, res) {
    $fn.post(adminUrl + "/emproduct/PostProductQuery", req, function (data) {
        res(data);
    });
}
//产品首页tab切换获取数据
$db.PostProductClass = function (req, res) {
    $fn.post(adminUrl + "/emproduct/PostProductClass", req, function (data) {
        res(data);
    });
}
//产品详情页获取数据(InnerID)
$db.getproductbyid = function (req, res) {
    $fn.get(adminUrl + "/emproduct/getproductbyid?inerID=" + req, function (data) {
        res(data);
    });
}
//订单后台管理模块
//订单列表
$db.GetAllOrder = function (req, res) {
    $fn.post(adminUrl + "/emorder/GetAllOrder", req, function (data) {
        res(data);
    });
}
//修改订单状态
$db.UpdateOrderStasus = function (req, res) {
    $fn.post(adminUrl + "/emorder/UpdateOrderStasus", req, function (data) {
        res(data);
    });
}
//编辑订单信息
$db.UpdateOrder = function (req, res) {
    $fn.post(adminUrl + "/emorder/UpdateOrder", req, function (data) {
        res(data);
    });
}
//订单详情页获取数据(orderID)
$db.GetOrderByID = function (req, res) {
    $fn.get(adminUrl + "/emorder/GetOrderByID?orderID=" + req, function (data) {
        res(data);
    });
}

//编辑订单
$db.SaveOrder = function (req, res) {
    $fn.post(adminUrl + "/emorder/SaveOrder", req, function (data) {
        res(data);
    });
}
//优惠券列表
$db.GetAllCoupon = function (req, res) {
    $fn.get(adminUrl + "/emcoupon/GetAllCoupon", function (data) {
        res(data);
    });
}
//优惠券列表删除
$db.DeleteCouponInfo = function (req, res) {
    $fn.post(adminUrl + "/emcoupon/DeleteCouponInfo", req, function (data) {
        res(data);
    });
}
//优惠券配置增加
$db.AddCoupon = function (req, res) {
    $fn.post(adminUrl + "/emcoupon/AddCoupon", req, function (data) {
        res(data);
    });
}

//产品购物车获取数据
$db.getAllShoppingCart = function (req, res) {
    $fn.get(adminUrl + "/emproduct/GetAllShoppingCart?UserID=" + req, function (data) {
        res(data);
    });
}

//产品购物车获取数据
$db.saveShoppingCart = function (req, res) {
    $fn.post(adminUrl + "/emproduct/SaveShoppingCart", req, function (data) {
        res(data);
    });
}

//产品购物车删除单个数据
$db.deleteShopingCart = function (req, res) {
    $fn.post(adminUrl + "/emproduct/DeleteShopingCart", req, function (data) {
        res(data);
    });
}
//产品购物车修改产品数量数据
$db.saveShoppingCart = function (req, res) {
    $fn.post(adminUrl + "/emproduct/SaveShoppingCart", req, function (data) {
        res(data);
    });
}

//下单接口
$db.saveOrder = function (req, res) {
    $fn.post(adminUrl + "/emorder/SaveOrder", req, function (data) {
        res(data);
    });
}

//支付接口
$db.getJsApiPay = function (req, res) {
    $fn.get(adminUrl + "/WeChatPay/JsApiPay?orderId=" + req, function (data) {
        res(data);
    });
}

//分享接口jssdk
$db.getWeChatShareSDK = function (req, res) {
    $fn.get(adminUrl + "/wechat/WeChatShareSDK?url=" + req, function (data) {
        res(data);
    });
}

//订单详情查询接口
$db.getOrderByID = function (req, res) {
    $fn.get(adminUrl + "/emorder/GetOrderByID?orderID=" + req, function (data) {
        res(data);
    });
}
//订单列表查询接口
$db.getAllOrderByID = function (req, res) {
    $fn.post(adminUrl + "/emorder/GetAllOrderByID", req, function (data) {
        res(data);
    });
}

//积分商城
//积分商城首页
$db.getAllCoupon = function (req, res) {
    $fn.get(adminUrl + "/emcoupon/GetAllCoupon", function (data) {
        res(data);
    });
}
//积分商城兑换优惠券
$db.addMemberCoupon = function (req, res) {
    $fn.post(adminUrl + "/emcoupon/AddMemberCoupon", req, function (data) {
        res(data);
    });
}
//积分商城用户优惠券列表
$db.getCouponByMemberID = function (req, res) {
    $fn.get(adminUrl + "/emcoupon/GetCouponByMemberID?MemberID=" + req, function (data) {
        res(data);
    });
}

//积分商城用户过期优惠券列表
$db.getOverdueCouponByMemberID = function (req, res) {
    $fn.get(adminUrl + "/emcoupon/GetOverdueCouponByMemberID?MemberID=" + req, function (data) {
        res(data);
    });
}

//游戏界面
//游戏图片获取
$db.getImg = function (req, res) {
    $fn.get(adminUrl + "/emfiles/getimg?key=" + req, function (data) {
        res(data);
    });
}
//游戏配置
$db.submitGame = function (req, res) {
    $fn.post(adminUrl + "/WeiAPPGame/AddGamesInfo", req, function (data) {
        res(data);
    });
}
//游戏列表
$db.getGameList = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/GetGamesList", req, function (data) {
        res(data);
    });
}
//游戏列表删除
$db.deleteGame = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/DelGamesInfo", req, function (data) {
        res(data);
    });
}

//获取游戏编辑页面信息(innerID)
$db.getGameEdit = function (req, res) {
    $fn.get(adminUrl + "/weiappgame/GetGamesInfoByID/" + req, function (data) {
        res(data);
    });
}
//游戏信息编辑提交
$db.editGame = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/EditGamesInfo", req, function (data) {
        res(data);
    });
}

//活动配置
$db.submitActivity = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/AddCampaignInfo", req, function (data) {
        res(data);
    });
}
//活动列表
$db.getActivityList = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/GetCampaignInfoList", req, function (data) {
        res(data);
    });
}
//列表删除
$db.deleteActivity = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/DelCampaignInfo", req, function (data) {
        res(data);
    });
}
//活动编辑页面信息(innerID)
$db.getActivityEdit = function (req, res) {
    $fn.get(adminUrl + "/weiappgame/GetCampaignInfoByID/" + req, function (data) {
        res(data);
    });
}
//活动信息编辑提交
$db.editActivity = function (req, res) {
    $fn.post(adminUrl + "/weiappgame/EditCampaignInfo", req, function (data) {
        res(data);
    });
}

//文章管理 获取列表接口
$db.getArticlesView = function (req, res) {
    $fn.post(baseUrl + "/emapi/wechatarticles/GetArticlesView", req, function (data) {
        res(data);
    });
}
//文章管理 保存/修改接口
$db.saveArticles = function (req, res) {
    $fn.post(baseUrl + "/emapi/wechatarticles/SaveArticles", req, function (data) {
        res(data);
    });
}
//文章管理 删除接口
$db.delArticlesByID = function (req, res) {
    $fn.get(baseUrl + "/emapi/wechatarticles/DelArticlesByID?InnerId=" + req, function (data) {
        res(data);
    });
}

//支付管理 保存/修改接口
$db.saveWeChatPayConfig = function (req, res) {
    $fn.post(baseUrl + "/emapi/WeChatPay/SaveWeChatPayConfig", req, function (data) {
        res(data);
    });
}
//支付管理 查询接口
$db.getAllWeCahtPay = function (req, res) {
    $fn.post(baseUrl + "/emapi/WeChatPay/GetAllWeCahtPay", req, function (data) {
        res(data);
    });
}
//支付管理 删除接口
$db.delWeCahtPay = function (req, res) {
    $fn.get(baseUrl + "/emapi/WeChatPay/DelWeCahtPay?InnerId=" + req, function (data) {
    })
}
//公众号管理
//录入
$db.SetWeChatAccount = function(req,res) {
    $fn.post(adminUrl + "/wechat/SetWeChatAccount", req, function(data){
        res(data);
    })
}
//查询
$db.GetAllWeChatAccount = function(req,res) {
    $fn.post(adminUrl + "/wechat/GetAllWeChatAccount", req, function(data){
        res(data);
    })
}
//公众号管理详情页获取数据(InnerID)
$db.GetWeChatAccount = function (req, res) {
    console.log("sss",req);
    $fn.get(adminUrl + "/wechat/GetWeChatAccount?innerID=" + req, function (data) {
        res(data);
    });
}
module.exports = $db;