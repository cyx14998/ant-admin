var host = 'http://192.168.2.213/emapi'
var wxShare = {
    init: function(obj,func){
        console.log('分享信息' + JSON.stringify(obj))
        var self = this;
        $.ajax({
            url: host + '/wechat/WeChatShareSDK?url=' + encodeURIComponent(window.location.href),
            type: 'get',
            dataType: 'json',
            success: function(data){
                if(data && data.code && data.code == 1 && data.result){
                    wx.config({
                        debug: false,
                        appId: data.result.appid,
                        timestamp: data.result.timestamp,
                        nonceStr: data.result.nonceStr,
                        signature: data.result.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ]
                    });
                }
            },
            error: function(err){
                console.log(err);
            }
        })
        wx.ready(function(){
            //隐藏按钮
            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:favorite", //收藏
                    "menuItem:share:facebook",
                    "menuItem:share:QZone",
                    "menuItem:copyUrl",
                    "menuItem:openWithQQBrowser",
                    "menuItem:openWithSafari"
                ]
            });
            wx.onMenuShareAppMessage({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    // alert('用户点击发送给朋友');
                },
                success: function (res) {
                    func && func.call(self,func);
                },
                cancel: function (res) {
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
            // wx.error(function (res) {
            //     alert('wx.error: '+JSON.stringify(res));
            // });
        })
    }
}