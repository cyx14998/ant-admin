import React from 'react';
import ReactDOM from 'react-dom';
import { List, Toast, Stepper } from 'antd-mobile';
import $db from '../../common/dal.js';
import './index.less';
const Item = List.Item;
import fruit from '../../assets/product.png';
import store from '../../models/detail';

var openId = localStorage.getItem('WXopenId');

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: "none"
        };
    }
    getQuery(key) {
        var url = window.location.href;
        var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
    //render 之后调用的方法
    componentDidMount() {
        var inerId = this.getQuery('id');
        $db.getproductbyid(inerId, function (data) {
            if (data && data.code != -100 && data.result) {
                store.dispatch({
                    type: 'GET_DATA',
                    ProPic: $db.imgUrl + data.result.ProPic, // 详情图片
                    Price: data.result.Price, // 价格
                    Summary: data.result.Summary, // 摘要
                    Introduction: data.result.Introduction, // 简介
                    InnerID: data.result.InnerID, // id
                    VersionInfo: data.result.VersionInfo,// 规格型号
                    ProductName: data.result.ProName,//商品名称
                    ProType: data.result.ProType,//类型
                    Tags: data.result.Tags,//标签
                })
            } else {
                Toast.info('获取产品信息失败,请稍后再试', 2, null, true);
            }
            // 触发
            var tabTop = document.getElementById('detail-tabs').offsetTop;
            var tabHeight = document.getElementById('detail-tabs').offsetHeight;
            var desTop = document.getElementById('pro-des').offsetTop;
            var paramTop = document.getElementById('pro-param').offsetTop - tabHeight;
            var otherTop = document.getElementById('pro-other').offsetTop - tabHeight;
            store.dispatch({
                tabTop: tabTop,
                desTop: desTop,
                paramTop: paramTop,
                otherTop: otherTop,
                type: 'SETPARAM'
            });
        })
        window.addEventListener('scroll', this.detailScroll.bind(this));
        this.wxShare();
    }
    wxShare() {
        $db.getWeChatShareSDK(encodeURIComponent(window.location.href), function(data){
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
                title: '逸享优食',
                desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                link: window.location.href,
                imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    // alert('用户点击发送给朋友');
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            // wx.error(function (res) {
            //     alert('wx.error: '+JSON.stringify(res));
            // });
        })
    }
    //页面滚动事件
    detailScroll() {
        var tabTop = store.getState().tabTop;
        var desTop = store.getState().desTop;
        var paramTop = store.getState().paramTop;
        var otherTop = store.getState().otherTop;
        var winTop = window.pageYOffset;
        if (winTop >= tabTop && winTop < desTop) {
            store.dispatch({ type: 'FIX' });
        } else if (winTop >= desTop && winTop < paramTop) {
            store.dispatch({ type: 'DESPOS' });
        } else if (winTop >= paramTop && winTop < otherTop) {
            store.dispatch({ type: 'PARAMPOS' });
        } else if (winTop >= otherTop) {
            store.dispatch({ type: 'OTHERPOS' });
        } else {
            store.dispatch({ type: 'NOFIX' });
        }
    }
    //tab点击事件
    desClick() {
        if (store.getState().desTop > window.screen.height) {
            window.scrollTo(0, store.getState().desTop);
        }
    }
    //tab点击事件
    paramClick() {
        if (store.getState().desTop > window.screen.height) {
            window.scrollTo(0, store.getState().paramTop);
        }
    }
    //tab点击事件
    otherClick() {
        if (store.getState().desTop > window.screen.height) {
            window.scrollTo(0, store.getState().otherTop);
        }
    }
    //放进购物车 数量点击事件
    onChange(val) {
        store.dispatch({
            OrderNum: val,
            type: 'OrderNum'
        })
    }
    //关闭mask
    closeMask() {
        store.dispatch({ type: 'CLOSEMASK' })
    }
    //打开mask
    openMask() {
        store.dispatch({ type: 'OPENMASK' })
    }
    goBuy() {
        if (!openId) {
            this.setState({block: "block"})
            console.log('用户未关注公众号');
            return;
        }
        localStorage.setItem('isFromDetail', "true");
        var proList = [];
        var data = {
            "UserID": localStorage.getItem('WXopenId'),//会员Id
            "Quantity": store.getState().OrderNum,//购买数量
            "SalePrice": store.getState().Price,//销售价
            "ProductName": store.getState().ProductName,//商品名称
            "ProType": store.getState().ProType,//类型
            "ProductID": store.getState().InnerID,//商品ID
            "ThumbnailsUrl": store.getState().ProPic,//图片
            "Summary": store.getState().Summary,//摘要
            "Tags": store.getState().Tags,//标签
        };
        proList.push(data);
        localStorage.setItem('proList', JSON.stringify(proList));
        window.location.href = '/user/mall/orderconfirm';
    }

    //添加商品到购物车
    shoppingCart() {
        if (!openId) {
            store.dispatch({ type: 'CLOSEMASK' })
            console.log('用户未关注公众号');
            this.setState({block: "block"})
            return;
        }
        var param = {
            "UserID": localStorage.getItem('WXopenId'),//会员Id
            "Quantity": store.getState().OrderNum || 1,//购买数量
            "SalePrice": store.getState().Price,//销售价
            "ProductName": store.getState().ProductName,//商品名称
            "ProType": store.getState().ProType,//类型
            "ProductID": store.getState().InnerID,//商品ID
            "ThumbnailsUrl": store.getState().ProPic,//图片
            "Summary": store.getState().Summary,//摘要
            "StatusCode": true,//状态
            "Tags": store.getState().Tags,//标签
        }
        //添加商品到购物车
        $db.saveShoppingCart(param, function (data) {
            if (data && data.code && data.code == 1) {
                Toast.info('添加成功', 1, null, false);
            } else {
                Toast.info('添加到购物车失败,请稍后再试', 2, null, false);
            }
        })
        store.dispatch({ type: 'CLOSEMASK' })
    }

    //点击到购物车
    goShoppingCar() {
        if (!openId) {
            console.log('用户未关注公众号');
            this.setState({block: "block"})
            return;
        }
        window.location.href = '/user/mall/shoppingCar';
    }

    render() {
        return (
            <div className="container">
                <div className="content">
                    <div className="top">
                        <div className="top-pic">
                            <img src={store.getState().ProPic} alt="" />
                        </div>
                        <div className='top-mask'>
                            <div className="textT">
                                <p className="price">￥{store.getState().Price}</p>
                                <p>{store.getState().Summary}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mid">
                        <div className='fixOuter'>
                            <ul className={store.getState().isFixed ? "detail-tabs fixed" : "detail-tabs"} id="detail-tabs">
                                <li className={store.getState().desPos ? "detail-tab active" : "detail-tab"} onClick={this.desClick.bind(this)}>
                                    <span>商品简介</span>
                                </li>
                                <li className={store.getState().paramPos ? "detail-tab active" : "detail-tab"} onClick={this.paramClick.bind(this)}>
                                    <span>商品参数</span>
                                </li>
                                <li className={store.getState().otherPos ? "detail-tab active" : "detail-tab"} onClick={this.otherClick.bind(this)}>
                                    <span>关于其他</span>
                                </li>
                            </ul>
                        </div>
                        <div className="pro-des" id='pro-des'>
                            <div className="des-title">
                                商品简介
                            </div>
                            <div className="des-content">
                                {store.getState().Introduction}
                            </div>
                        </div>
                        <div className="pro-des pro-param" id='pro-param'>
                            <div className="des-title">
                                商品参数
                            </div>
                            <div className="des-content">
                                <div className={store.getState().VersionInfo ? 'param-list' : 'none'}>
                                    <div className="param-item">
                                        <div className="item-title">规格型号</div>
                                        <div className="item-des">{store.getState().Tags}</div>
                                    </div>
                                </div>
                                {/* <div className="param-list">
                                    <div className="param-item">
                                        <div>净含量</div>
                                        <div>5KG</div>
                                    </div>
                                    <div className="param-item">
                                        <div>毛重</div>
                                        <div>5KG</div>
                                    </div>
                                </div>
                                <div className="param-list">
                                    <div className="param-item">
                                        <div>包装方式</div>
                                        <div>5KG</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="pro-des pro-other" id='pro-other' >
                            <div className="des-title">
                                关于其他
                            </div>
                            <div className="des-content">
                                {/* <div className="param-list">
                                    <div className="param-item">
                                        <div className="other-title">净含量</div>
                                        <div className="other-con">5KG</div>
                                    </div>
                                </div>
                                <div className="param-list">
                                    <div className="param-item">
                                        <div className="other-title">净含量</div>
                                        <div className="other-con">包装方式包装方式包装方式包装方式</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="qrcode-container"
                        style={{ display: this.state.block }}
                        onClick={() => this.setState({ block: "none" })}>
                        <div className="qrcodeContent">
                            <div className="main" onClick={(e) => e.stopPropagation()}>
                                <div className='inner'>
                                    <img className="qrcode" src={$db.imgUrl + 'bd438900-ebad-4ae0-94b7-6942e6e84807'} />
                                    <text>长按二维码识别后进入公众号商城后可继续操作</text>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="car" onClick={this.goShoppingCar.bind(this)}>
                            <i></i>
                            <p>购物车</p>
                        </div>
                        <div className="shopCar" onClick={this.openMask.bind(this)}>加入购物车</div>
                        <div className="shopNow" onClick={this.goBuy.bind(this)}>立即购买</div>
                    </div>
                </div>
                <div className={store.getState().maskWrapper ? "mask" : "none"}></div>
                <div className={store.getState().maskWrapper ? "confirm-wrapper" : "none"}>
                    <div className="confirm-body">
                        <div className="confirm-top clear">
                            <img src={store.getState().ProPic ? store.getState().ProPic : fruit} alt="" />
                            <div className="pro-detail">
                                <div className="pro-price">￥{store.getState().Price}</div>
                                <div className="pro-title">{store.getState().Summary}</div>
                            </div>
                            <div className="icon icon-close" onClick={this.closeMask.bind(this)}></div>
                        </div>
                        <div className="confirm-mid">
                            <div className="pro-num">数量</div>
                            <div className="pro-changeNum">
                                <Stepper
                                    style={{ width: '100%', minWidth: '2rem' }}
                                    showNumber
                                    max={100}
                                    min={1}
                                    value={store.getState().OrderNum}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="confirm-bot" onClick={this.shoppingCart.bind(this)}>
                            确定
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <ProductDetails></ProductDetails>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);