/**
 * 我的信息
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import {
    NavBar,
    Icon,
    List,
    Toast,
    WingBlank,
    WhiteSpace,
    Button
} from 'eui-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import './index.less';

import userImg from '../../assets/index_customer.png';

import { getUserInfoApi } from '../../common/api/api.wx.js'
class MyInfoTabBar3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '我的信息',
            data: {
                userName: '徐晓丽',
                userImg: userImg,
                department: '企划部',
                identityCard: '320123000000001222',
                phone: '13600000000',
                email: '13600000000@qq.com',
                address: '江苏省苏州市工业园区星湖街',
            }
        };
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    componentDidMount() {
        this.getUserInfo({});
    }
    //获取用户信息--无
    getUserInfo() {
        var data = {};
        getUserInfoApi(data).then(res => {
            console.log('getUserInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败',2);
                return;
            }
            this.setState({
                data: res.data.UserInfo
            });
        }).catch(err => {
            Toast.info('服务器繁忙',2);
            console.log(err)
        })
    }
    render() {
        var data = this.state.data;
        return (
            <div className="content" >
                <NavBar mode="light">{this.state.title}</NavBar>

                <WhiteSpace />
                <List>
                    <Item className="userImgBox"
                        thumb={data.userImg}
                        multipleLine>
                        {data.userName} <Brief>{data.department}</Brief>
                    </Item>
                </List>

                <WhiteSpace />
                <List>
                    <Item extra={data.identityCard}>身份证</Item>
                    <Item extra={data.phone}>手机号</Item>
                    <Item extra={data.email}>邮箱</Item>
                </List>

                <WhiteSpace />
                <List>
                    <Item extra={data.address}>地址</Item>
                </List>
                
                <WingBlank>
                    <Button className="exitBtn" type="primary">退出登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default MyInfoTabBar3;
