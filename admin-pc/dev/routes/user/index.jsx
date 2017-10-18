import React, { component } from 'react';
import ReactDOM from 'react-dom';
import {Toast, Flex, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
import './index.less';
import $db from '../../common/dal.js';
import sexM from '../../assets/sexM.png';
import sexW from '../../assets/sexW.png';
import userOrder from '../../assets/user_order.png';
import userExpress from '../../assets/user_express.png';
import userAddress from '../../assets/user_address.png';
import userRecipe from '../../assets/user_recipe.png';
import userHealth from '../../assets/user_health.png';


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // userImage: <img src='http://wx.qlogo.cn/mmopen/uibdIargxMsQuqPnDnAScnOCwXJ4LQ4kPrt5LmibTOdQweHNJKfAn0QCL1Eiat5zn2g8mia5zKb2CXSEwZ1klBYg55ugufcOGiaQa/0' alt="" />,
            src: '',
            NickName: "",
            Sex: 0,
            userSex: '',
            userLevel: "商城会员",
            intergal: 0, //积分
        }
    }
    componentDidMount() {
        var param = {
            code: this.getQuery('code')
        }
        $db.getLoginUserInfo(param, function (data) {
            // alert(JSON.stringify(data.UserID));
            if (data && data.code != -100) {
                this.setState({
                    src: data.HeadPortait,
                    NickName: data.NickName,
                    userSex: (data.Sex == 0) ? sexM : sexW,
                    intergal: data.AvailableIntegrals ? data.AvailableIntegrals : 0

                });
            } else {
                Toast.fail('获取用户信息失败', 0, null, false);
            }
        }.bind(this))
    }
    getQuery(key) {
        var url = window.location.href;
        var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
    goIntergral(){
        window.location.href = 'mall/intergralHome';
    }
    gocoupon(){
        window.location.href = 'mall/coupon';
    }
    render() {
        var src = this.state.src;
        // var userImage = this.state.userImage;
        var NickName = this.state.NickName;
        var userSex = this.state.userSex;
        var userLevel = this.state.userLevel;
        var src = this.state.src;
        var intergal = this.state.intergal;
        return (
            <div className="container">
                <div className="top">
                    <div className="topT" onClick={() => { window.location.href = "/user/selfdata"; }}>
                        <div className="userImage">
                            {/* {userImage} */}
                            <img src={src} alt="" />
                        </div>
                        <div className="userInfo">
                            <p>{NickName} <img className="userSex" src={userSex} alt="性别" /></p>
                            <p>{userLevel}</p>
                        </div>
                    </div>
                    <Flex className="topB">
                        <Flex.Item className="backg"><a href="javascript: 0"><p className="pay">0</p>余额</a></Flex.Item>
                        <Flex.Item className="backg" onClick={()=>{window.location.href = 'mall/coupon'}}><a href="javascript: 0"><p className="goodsOut">0</p>优惠券</a></Flex.Item>
                        <Flex.Item className="backg" onClick={()=>{window.location.href = 'mall/intergralHome'}}><a href="javascript: 0"><p className="goodsIn" >{intergal}</p>积分</a></Flex.Item>
                    </Flex>
                </div>
                <div className="content">
                    {/* <div className="order">
                        <p>我的订单</p>
                        <img src="/muser/assets/user_orderRight.png" alt="" />
                    </div> */}
                    {/* <Flex className="orderInfo">
                        <Flex.Item><a href="#"><i className="pay"></i>待付款</a></Flex.Item>
                        <Flex.Item><a href="#"><i className="goodsOut"></i>待发货</a></Flex.Item>
                        <Flex.Item><a href="#"><i className="goodsIn" ></i>待收货</a></Flex.Item>
                        <Flex.Item><a href="#"><i className="evaluate"></i>待评价</a></Flex.Item>
                        <Flex.Item><a href="#"><i className="payAfter"></i>售后</a></Flex.Item>                            
                    </Flex>  */}
                    <List className="list">
                        <Item thumb={userOrder} onClick={() => { window.location.href = "/user/mall/orderList"; }} arrow="horizontal">我的订单</Item>
                        <Item className="borderB" thumb={userExpress} onClick={() => { Toast.info('正在开发中。。。', 1); }} arrow="horizontal">我的快递</Item>
                        <Item thumb={userAddress} onClick={() => { window.location.href = "/user/manageaddress"; }} arrow="horizontal">收货地址</Item>
                        <Item thumb={userRecipe} onClick={() => { Toast.info('正在开发中。。。', 1); }} arrow="horizontal">个人食谱</Item>
                        <Item thumb={userHealth} onClick={() => { Toast.info('正在开发中。。。', 1); }} arrow="horizontal">健康档案</Item>
                    </List>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<User></User>, document.getElementById('reactwrapper'));
