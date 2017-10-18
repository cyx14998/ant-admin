// 优惠券列表

import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Toast } from 'antd-mobile';
import $db from '../../common/dal.js';
import './index.less';

class CouponDetail extends React.Component {
    constructor(props) {
        super(props);
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

    }

    leftIcon() {
        window.history.go(-1)
    }

    render() {
        return <div className="container">
            <NavBar
                mode="light"
                onLeftClick={this.leftIcon.bind(this)}>优惠券</NavBar>
            <div className="top-time">
                <p>剩余时间: 1天2小时2分</p>
            </div>
            <div className="content">
                <div className="list">
                    <div className="item">
                        <div className="inner-item">
                            <div className="hearder">
                                <p>优惠券</p>
                                <p>VOUCHER</p>
                            </div>
                            <div className="price-tag">
                                <p className="price">15</p>
                                <p className="value">VALUE</p>
                            </div>
                            <div className="detail">
                                <p className="detail-content">全场8.5折起，水果类满100减10.............................</p>
                                <p className="detail-time">2017.03.21~2017.04.21 23:59</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(
    <CouponDetail></CouponDetail>,
    document.getElementById('reactwrapper')
);