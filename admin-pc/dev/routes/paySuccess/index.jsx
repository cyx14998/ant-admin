import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from 'antd-mobile';
import store from '../../models/paySuccess';
import $db from '../../common/dal.js';
import './index.less';

class PaySuccess extends React.Component {
    constructor(props){
        super(props);
        var isFromPay = $db.getQuery('isFromPay');
        //从确认收货进的。应该要显示交易成功页面
        if(isFromPay && isFromPay == 0){
            store.dispatch({
                type: 'ISFROMTRADE'
            })
        }
    }
    leftIcon() {
        window.location.href = '/user/mall/home';
    }
    goHome(){
        window.location.href = '/user/mall/home';
    }
    goOrderDetail() {
        var orderID = this.getQuery('orderId');
        window.location.href = '/user/mall/orderdetail?orderId=' + orderID;
    }
    getQuery(key) {
        var url = window.location.href;
        var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
    render() {
        return (
            <div className="container">
                <NavBar
                    className={store.getState().isFromPay ? "paySuccessPage" : "none"}
                    mode="light"
                    onLeftClick={this
                        .leftIcon
                        .bind(this)}>支付成功</NavBar>
                <NavBar
                    className={!store.getState().isFromPay ? "tradeSuccessPage" : "none"}
                    mode="light"
                    onLeftClick={this
                        .leftIcon
                        .bind(this)}>交易成功</NavBar>
                <div className="content">
                    <div className="orderState">
                        <p>买家已支付</p>
                        <p>您的包裹正整装待发</p>
                    </div>
                    <div className="userInfo">
                        <p>收货人：张某 177****1034</p>
                        <p>收货地址：江苏省苏州市吴中区工业园区星湖街生物纳米园</p>
                    </div>
                    <div className="bottom">
                        <div className="orderM margin_L clear">
                            <div className="total-price">
                                总价：<span className="red"> ￥{store.getState().unitPrice}</span>
                            </div>
                        </div>
                    </div>
                    <div className={store.getState().isFromPay ? "btnBox" : "none"}>
                        <div className="btn1">
                            <input className="btn" type="button" value="查看订单"  onClick={this.goOrderDetail.bind(this)}/>
                        </div>
                        <div className="btn2">
                            <input className="btn" type="button" value="返回首页" onClick={this.goHome.bind(this)}/>
                        </div>
                    </div>
                    <div className={!store.getState().isFromPay ? "btnBox" : "none"}>
                        <div className="btn3">
                            <input className="btn" type="button" value="查看订单" onClick={this.goOrderDetail.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <PaySuccess></PaySuccess>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);