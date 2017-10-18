import React from 'react';
import ReactDOM from 'react-dom';
import store from '../../models/orderConfirm';
import $db from '../../common/dal.js';
import './index.less';
import { Tabs, List, TextareaItem, Stepper, NavBar, Carousel, Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import icon from '../../assets/icon.png';
import user from '../../assets/user2.png';
import product from '../../assets/product.png';

class OrderConfirm extends React.Component {
    constructor(props) {
        super(props);
        //从微信浏览器打开时
        // if($db.is_WX()){
        //     document.title = '确认订单';
        //     store.dispatch({
        //         type: 'ISWX'
        //     })
        // }
    }
    componentDidMount() {

    }
    leftIcon() {
        window.history.go(-1);
    }
    //改变数量
    onChange(index, val) {
        if (!val) {
            val = 1;
        }
        store.dispatch({
            index, index,
            Quantity: val,
            type: 'CHANGENUM'
        })

    }

    //下单接口
    subOrder() {
        var order = store.getState().proList;
        var param = {
            'Order': order,
            "Address": store.getState().Address,//收货地址
            "Phone": store.getState().Phone,//手机号
            "Consignee": store.getState().Consignee//收货人姓名
        }
        console.log(param);
        Toast.loading('请稍后...', 0);
        $db.saveOrder(param, function (data) {
            Toast.hide();
            if (data && data.code && data.code == 1) {
                console.log('生成订单成功,模拟支付成功，跳支付成功页' + data.result);
                var orderId = data.result;
                $db.getJsApiPay(orderId, function (data) {
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
                // window.location.href = '/user/mall/paySuccess?orderId=' + data.result;
            } else {
                Toast.offline('发生了不可预知的错误，请稍后再试 !', 2);
            }
        });
    }
    render() {
        var that = this;
        return (
            <div className="container">
                <NavBar
                    className = {store.getState().is_WX ? 'none': ''}
                    mode="light"
                    onLeftClick={this.leftIcon.bind(this)}>确认订单</NavBar>
                <div className="content">
                    <Item
                        thumb={user}
                        arrow="horizontal"
                        multipleLine
                        wrap
                        onClick={() => { window.location.href = '/user/manageaddress' }}
                        platform="android">
                        <div className="receiver">
                            <p>收货人：{store.getState().Consignee} </p>
                            <p className="receiver-phone">{store.getState().Phone}</p>
                        </div>
                        <Brief>{store.getState().Address}</Brief>
                    </Item>
                    <div className="payWay">
                        <p className="f_left">支付方式</p>
                        <p className="f_right">微信支付</p>
                    </div>
                    {
                        (store.getState().proList && store.getState().proList.length) ? store.getState().proList.map(function (item, index) {
                            return <div className="orderConfirm-info" key={index}>
                                <List className="prolist">
                                    <div className="pro-item">
                                        {/* <div className="pro-head none">
                                                    <img src={icon} alt=""/>
                                                    <div className="pro-title">优质水果</div>
                                                </div> */}
                                        <div className="product">
                                            <img src={item.ThumbnailsUrl} alt="" />
                                            <div className="productInfo">
                                                <p className="productM">{item.Summary}</p>
                                                <div className="price-info">
                                                    <p className="price">￥{item.SalePrice}</p>
                                                    <p className="pro-num">X {item.Quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </List>
                                <div className={store.getState().isFromDetail}></div>
                                <List className={store.getState().isFromDetail ? '' : 'none'}>
                                    <Item wrap className="clear" extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '2rem' }}
                                            showNumber
                                            value={item.Quantity}
                                            max={100}
                                            min={1}
                                            onChange={that.onChange.bind(this, index)}
                                        />}
                                    >
                                        购买数量
                                            </Item>
                                </List>
                                <List>
                                    <Item onClick={() => { }} extra="￥0"><p>运费</p></Item>
                                </List>
                                <List>
                                    <TextareaItem
                                        title="给卖家留言："
                                        placeholder="对本次交易的说明"
                                        data-seed="logId"
                                        autoHeight
                                    />
                                </List>
                                <div className='pro-total clear'>
                                    <div className="f_right pro-price">
                                        小计: <span>￥{item.SalePrice * item.Quantity}</span>
                                    </div>
                                    <div className="f_right">共{item.Quantity}件商品</div>
                                </div>
                            </div>
                        }) : ''
                    }
                </div>
                <div className="bottom">
                    <div className="f_left pay-for onePxTopLine">应付：<p className="red">￥{store.getState().unitPrice}</p>
                    </div>
                    <div className="f_right sub-order" onClick={this.subOrder.bind(this)}>提交订单</div>
                </div>
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(
        <OrderConfirm></OrderConfirm>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);