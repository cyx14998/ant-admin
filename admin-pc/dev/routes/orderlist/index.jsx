import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Toast, List, Tabs, Button } from 'antd-mobile';
import $db from '../../common/dal.js';
import store from '../../models/orderList';
import './index.less';
const Item = List.Item;
const TabPane = Tabs.TabPane;
import icon from '../../assets/icon.png';

class OrderAll extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        Toast.loading('Loading...', 0);
        var code = this.getQuery('code');
        var getopenIdParam = {};
        if (code) {
            getopenIdParam.code = code;
        }
        $db.getLoginUserInfo(getopenIdParam, function (data) {
            // alert(JSON.stringify(data.UserID));
            if (data && data.UserID) {
                localStorage.setItem('WXopenId', data.UserID);
                var param = {
                    "UserID": data.UserID,//用户ID（必填项）
                }
                $db.getAllOrderByID(param, function (data) {
                    Toast.hide();
                    if (data && data.code && data.code == 1) {
                        var dataAll = data.result;
                        var data1 = [], data2 = [], data3 = [];
                        if (data.result && data.result.length) {
                            data.result.map(function (item, index) {
                                if (item.StatusCode == 1) {
                                    data1.push(item);
                                } else if (item.StatusCode == 2) {
                                    data2.push(item);
                                } else if (item.StatusCode == 3) {
                                    data3.push(item);
                                }
                            })
                        }
                        store.dispatch({
                            type: 'ADD_DATA',
                            dataAll: dataAll,
                            data1: data1,
                            data2: data2,
                            data3: data3
                        })
                    } else {
                        Toast.fail('发生了不可预知的错误，请稍后再试 !', 2);
                    }

                })
            } else {
                Toast.fail('获取用户信息失败,请稍后再试', 0, null, false);
            }
        }.bind(this))
        // var UserID = localStorage.getItem('WXopenId');
        // var param = {
        //     "UserID": UserID,//用户ID（必填项）
        // }
        // $db.getAllOrderByID(param, function (data) {
        //     Toast.hide();
        //     if (data && data.code && data.code == 1) {
        //         var dataAll = data.result;
        //         var data1 = [], data2 = [], data3 = [];
        //         if (data.result && data.result.length) {
        //             data.result.map(function (item, index) {
        //                 if (item.StatusCode == 1) {
        //                     data1.push(item);
        //                 } else if (item.StatusCode == 2) {
        //                     data2.push(item);
        //                 } else if (item.StatusCode == 3) {
        //                     data3.push(item);
        //                 }
        //             })
        //         }
        //         store.dispatch({
        //             type: 'ADD_DATA',
        //             dataAll: dataAll,
        //             data1: data1,
        //             data2: data2,
        //             data3: data3
        //         })
        //     } else {
        //         Toast.offline('发生了不可预知的错误，请稍后再试 !', 2);
        //     }
        // })
    }

    getQuery(key) {
        var url = window.location.href;
        var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
    //后退操作
    leftIcon() {
        window.location.href = '/user/index';
    }
    //点击订单进订单详情页
    goOrderDetail(orderid) {
        window.location.href = '/user/mall/orderDetail?orderId=' + orderid;
    }
    //列表信息渲染
    // 0: 全部  1: 待付款  2: 待发货  3: 待收货
    renderContent(data) {
        var param = [];
        var that = this;
        if (data == 0) {
            param = store.getState().dataAll;
        } else if (data == 1) {
            param = store.getState().data1;
        } else if (data == 2) {
            param = store.getState().data2;
        } else if (data == 3) {
            param = store.getState().data3;
        }
        var cells = (param && param.length) ? param.map((item, index) => {
            var toalPriceTxt = "实付: ￥" + item.RealTotalPrice + " (免运费)";
            var statusTxt = '';
            if (item.StatusCode == 1) {
                statusTxt = '待付款'
            } else if (item.StatusCode == 2) {
                statusTxt = '待发货'
            } else if (item.StatusCode == 3) {
                statusTxt = '待收货'
            }
            return <div className="block" key={index}>
                <Item className="listItem  borderB" thumb={icon} onClick={() => { }} extra={<p className="red">{statusTxt}</p>}><p>优质水果</p></Item>
                {
                    (item.OrderInfo && item.OrderInfo.length) ? item.OrderInfo.map(function (pro, i) {
                        return <div className="product clear" key={i} onClick={that.goOrderDetail.bind(this, pro.OrderID)}>
                            <img className="f_left" src={pro.ThumbnailsUrl} alt="" />
                            <p className="f_left productM">{pro.Summary}</p>
                            <div className="f_left originPrice">
                                <p>￥{pro.SalePrice}</p>
                                <p>x {pro.Quantity}</p>
                            </div>
                        </div>
                    }) : ''
                }
                <Item className="listItem clear" extra={toalPriceTxt}> </Item>
                {that.butStatus(item)}
            </div>
        }) : '';
        return cells;
    }
    //每个订单的按钮状态
    //
    //
    //
    //
    //支付
    goPay(orderId) {
        console.log(orderId);
        Toast.loading('请稍后...', 0);
        $db.getJsApiPay(orderId, function (data) {
            Toast.hide();
            if (data.code && data.code == 1) {
                var dataToJson = JSON.parse(data.result);
                function onBridgeReady() {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": dataToJson.appId,     //公众号名称，由商户传入     
                            "timeStamp": dataToJson.timeStamp,         //时间戳，自1970年以来的秒数     
                            "nonceStr": dataToJson.nonceStr, //随机串     
                            "package": dataToJson.package,
                            "signType": dataToJson.signType,         //微信签名方式：     
                            "paySign": dataToJson.paySign //微信签名 
                        },
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                window.location.href = '/user/mall/paySuccess?orderId=' + data.result;
                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                        }
                    );
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            }

        })
    }

    goConfirm(orderId){
        Toast.loading('确认收货...', 0);
        window.location.href = '/paySuccess?isFromPay=0'
        // $db.getJsApiPay(orderId, function (data) {
        //     Toast.hide();
        // })
    }

    butStatus(data) {
        switch (data.StatusCode) {
            case 1:
                return <div className="button clear">
                    {/* <input type="button" className="f_right" value="取消订单" /> */}
                    <input type="button" className="f_right red_B" onClick={this.goPay.bind(this, data.OrderID)} value="去支付" />
                </div>
            case 3:
                return <div className="button clear">
                    {/* <input type="button" className="f_right" value="取消订单" /> */}
                    <input type="button" className="f_right red_B" onClick={this.goConfirm.bind(this, data.OrderID)} value="确认收货" />
                </div>
            default:
                return <div className="button clear">
                    <input type="button" className="f_right" onClick={this.buyAgain.bind(this, data)} value="再次购买" />
                    {/* <input type="button" className="f_right" onClick={this.orderDel.bind(this, data)} value="删除订单" /> */}
                </div>

        }
    }
    //删除订单
    orderDel(data) {
        console.log('删除订单' + JSON.stringify(data))
    }
    //再次购买
    buyAgain(data) {
        console.log('再次购买' + JSON.stringify(data))
    }
    // callback(key) {
    //     console.log('onChange', key);
    // }
    // handleTabClick(key) {
    //     console.log('onTabClick', key);
    // }
    render() {
        return (
            <div className={store.getState().dataLoaded ? "container" : 'none'}>
                <NavBar
                    mode="light"
                    onLeftClick={this.leftIcon.bind(this)}
                >我的订单</NavBar>
                <div className="content">
                    {/* <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick}> */}
                    <Tabs defaultActiveKey="0" swipeable={false}>
                        <TabPane tab="全部" key="0">
                            {this.renderContent(0)}
                        </TabPane>
                        <TabPane tab="待付款" key="1">
                            {this.renderContent(1)}
                        </TabPane>
                        <TabPane tab="待发货" key="2">
                            {this.renderContent(2)}
                        </TabPane>
                        <TabPane tab="待收货" key="3">
                            {this.renderContent(3)}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(
        <OrderAll></OrderAll>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);