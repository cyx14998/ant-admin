import React from 'react';
import ReactDOM from 'react-dom';
import store from '../../models/orderDetail';
import $db from '../../common/dal.js';
import './index.less';
import icon from '../../assets/icon.png';
import product from '../../assets/product.png';
import {
    List,
    NavBar,
    Toast
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class OrderDetail extends React.Component {
    componentDidMount() {
        var orderId = $db.getQuery('orderId');
        Toast.loading('Loading...', 0);
        $db.getOrderByID(orderId, function (data) {
            if (data && data.code && data.code == 1) {
                Toast.hide();
                store.dispatch({
                    type: 'ADD_DATA',
                    StatusCode: data.result.StatusCode,
                    Consignee: data.result.Consignee,
                    CreatedTime: data.result.CreatedTime,
                    Address: data.result.Address,
                    Phone: data.result.Phone,
                    RealTotalPrice: data.result.RealTotalPrice,
                    OrderID: data.result.OrderID,

                    OrderInfo: data.result.OrderInfo,
                })
            }else{
                Toast.offline('发生了不可预知的错误，请稍后再试 !', 2);
            }
        })
    }
    //返回功能
    leftIcon() {
        window.location.href = window.history.go(-1);
    }
    //去支付
    goPay(){
        Toast.loading('请稍后...', 0);
        var orderId = $db.getQuery('orderId');
        if(orderId){
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
                                    window.location.href = '/user/mall/paySuccess?orderId=' + orderId;
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
    }
    //确认收货
    goConfirm(){
        //确认收货时从url带个参数过去。
        window.location.href = '/paySuccess?isFromPay=0'
    }
    render() {
        return (
            <div className={store.getState().dataLoaded ? 'container': 'none'}>
                <NavBar
                    mode="light"
                    onLeftClick={this.leftIcon.bind(this)}>订单详情</NavBar>
                <div className="content">
                    {/* 订单的3种状态 */}
                    <div className={store.getState().StatusCode == 1 ? "orderState" : "none"}>
                        <p>等待买家付款</p>
                        <p>剩2小时自动关闭</p>
                    </div>
                    <div className={store.getState().StatusCode == 2 ? "orderState" : "none"}>
                        <p>买家已付款</p>
                    </div>
                    <div className={store.getState().StatusCode == 3 ? "orderState" : "none"}>
                        <p>卖家已发货</p>
                        <p>还剩1天自动确认</p>
                    </div>
                    <Item
                        className={store.getState().StatusCode == 3 ? "express" : "none"}
                        arrow="horizontal"
                        multipleLine
                        wrap
                        onClick={() => { }}
                        platform="android">
                        <p className="receiver">快递已签收，感谢使用顺丰快递</p>
                        <p>{store.getState().CreatedTime.replace(/T/g,' ')}</p>
                    </Item>
                    <div className="userInfo">
                        <p>收货人：{store.getState().Consignee} {store.getState().Phone}</p>
                        <p className="address">收货地址： {store.getState().Address}</p>
                    </div>

                    <div className="block">
                        {/* <div className="pro-head">
                                        <img src={icon} alt="" />
                                        <div className="pro-title">优质水果</div>
                                    </div> */}
                        {(store.getState().OrderInfo && store.getState().OrderInfo.length) ? store.getState().OrderInfo.map(function (item, index) {
                            return <div className="product" key={index}>
                                        <img src={item.ThumbnailsUrl} alt="" />
                                        <p className="productM">{item.Summary}</p>
                                        <div className="originPrice">
                                            <p>￥  {item.SalePrice.toFixed(2)}</p>
                                            <p className="proNum">X  {item.Quantity}</p>
                                        </div>
                                    </div>
                        }) : ''}

                        <Item className="listItem clear">实付: <span>￥{store.getState().RealTotalPrice} </span> (免运费)</Item>
                    </div>

                    <div className="orderDetail">
                        <p>订单编号: {store.getState().OrderID}</p>
                        <p>支付方式: 微信支付</p>
                        <p>下单时间: {store.getState().CreatedTime.replace(/T/g,' ')}</p>

                        <p className={store.getState().StatusCode == 3 ? "" : "none"}>付款时间:</p>
                        <p className={store.getState().StatusCode == 3 ? "" : "none"}>发货时间:</p>
                        <p className={store.getState().StatusCode == 3 ? "" : "none"}>成交时间:</p>
                    </div>
                    <div className={store.getState().StatusCode == 1 ? "button" : "none"}>
                        <input type="button" className="f_right red" onClick={this.goPay} value="去支付" />
                        {/* <input type="button" className="f_right" value="删除订单" /> */}
                    </div>
                    <div className={store.getState().StatusCode == 3 ? "button" : "none"}>
                        <input type="button" className="f_right red" onClick={this.goConfirm} value="确认收货" />
                    </div>
                </div>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <OrderDetail></OrderDetail>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);