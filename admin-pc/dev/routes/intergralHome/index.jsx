import React from 'react';
import ReactDOM from 'react-dom';
import { List, NavBar, Toast, Stepper } from 'antd-mobile';
import $db from '../../common/dal.js';
import './index.less';
const Item = List.Item;
import fruit from '../../assets/product.png';
import store from '../../models/detail';

class IntergralHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [
                //     {
                //     "InnerID": "fgghh",
                //     "CouponId": "em201708281832123",
                //     "CouponType": 0,
                //     "CodeNotes": "备注",
                //     "Price": 5.0,
                //     "PerMax": 5,
                //     "OrderAmount": 100.0,
                //     "ResidueCount": null,
                //     "Discount": null,
                //     "Num": 1000,
                //     "StartTime": "2017-08-28T18:33:49",
                //     "EndTime": "2017-08-31T18:33:54",
                //     "Prompt": 0, "NeedIntegral": 100,
                //     "CouponName": "测试"
                // }
            ]
        }
    }
    //render 之前调用的方法
    componentWillMount() {
        
    }
    getQuery(key) {
        var url = window.location.href;
        var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
    //render 之后调用的方法
    componentDidMount() {
        // 触发
        var that = this;
        Toast.loading('loading...')
        $db.getAllCoupon(null, function (data) {
            Toast.hide();
            if (data && data.code && data.code == 1) {
                that.setState({ result: data.result });
            }
        })
    }

    leftIcon() {
        window.history.go(-1)
    }
    exchange(item) {
        var CouponId = item.CouponId;
        var openId = localStorage.getItem('WXopenId');
        var param = {
            CouponId: CouponId,
            MemberID: openId
        }
        Toast.loading('loading...')
        $db.addMemberCoupon(param, function (data) {
            Toast.hide();
            if (data && data.code && data.code == 1) {
                Toast.info('兑换成功', 1)
            } else {
                Toast.info(data.result, 1)
            }
        })
    }
    renderContent() {
        var self = this;
        var cell = (this.state.result && this.state.result.length) ? this.state.result.map(function (item, index) {
            return <div className="item" key={index}>
                <div className="intergral-money">
                    <p>{item.Price}<span>元</span></p>
                </div>
                <div className="intergral-detail">
                    <div className='intergral-use'>
                        {item.NeedIntegral}积分兑换
                                    </div>
                    <p className={item.OrderAmount > 0 ? '' : 'none'}>满{item.OrderAmount}元使用</p>
                </div>
                <div className="intergral-change">
                    <p onClick={self.exchange.bind(self, item)}>兑换</p>
                </div>
            </div>
        }) : ''
        return cell;
    }
    render() {
        return <div className="container">
            <NavBar
                mode="light"
                onLeftClick={this.leftIcon.bind(this)}>积分商城</NavBar>
            <div className="top-img">

            </div>
            <div className="content">
                <div className="list">
                    {this.renderContent()}
                </div>
            </div>
        </div>
    }
}

const render = () => {
    ReactDOM.render(
        <IntergralHome></IntergralHome>,
        document.getElementById('reactwrapper')
    );
};

render();
store.subscribe(render);