// 失效的优惠券

import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Toast } from 'antd-mobile';
import $db from '../../common/dal.js';
import './index.less';

class NoUseCoupon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [
                // {
                    // "InnerID":"36cba7a7-a9d3-4ec4-b25d-b92104864b23",
                    // "MemberId":"oYJG0wRhaaENBUzzFlCaFOeCXBKk",
                    // "CouponId":"em201708281832123",
                    // "CouponType":0,
                    // "Price":5.00,
                    // "Discount":null,
                    // "StartTime":"2017-08-28T18:33:49",
                    // "EndTime":"2017-08-31T18:33:54",
                    // "OrderAmount":100.0,"Remark":null,
                    // "CreatedTime":"2017-08-29T16:54:04",
                    // "CreaterID":null
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
        var memberID = localStorage.getItem('WXopenId')
        $db.getOverdueCouponByMemberID(memberID, function (data) {
            Toast.hide();
            if (data && data.code && data.code == 1) {
                if (data.result && data.result.length) {
                    data.result.map(function (item, index) {
                        item.StartTime = item.StartTime.replace('T', ' ');
                        item.EndTime = item.EndTime.replace('T', ' ');
                    })
                    that.setState({
                        result: data.result
                    })
                }
            }
        })
    }

    leftIcon() {
        window.history.go(-1)
    }

    renderContent() {
        var self = this;
        var cell = (this.state.result && this.state.result.length) ? this.state.result.map(function (item, index) {
            return <div className="item" key={index}>
                <div className="intergral-money">
                    <p>{item.Price}</p>
                </div>
                <div className="intergral-detail">
                    <div className='intergral-use'>
                        {item.StartTime}~{item.EndTime}
                    </div>
                    <p className={item.OrderAmount > 0 ? '' : 'none'}>满{item.OrderAmount}元使用</p>
                </div>
            </div>
        }) : '';
        return cell;
    }
    render() {
        return <div className="container">
            <NavBar
                mode="light"
                onLeftClick={this.leftIcon.bind(this)}>优惠券</NavBar>
            <div className="content">
                <div className="list">
                    {this.renderContent()}
                </div>
            </div>
        </div>
    }
}
ReactDOM.render(
    <NoUseCoupon></NoUseCoupon>,
    document.getElementById('reactwrapper'))