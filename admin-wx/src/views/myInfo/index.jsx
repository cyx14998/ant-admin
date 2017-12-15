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

import {
    getUserInfoApi,
    // exitOutApi,
} from '../../common/api/api.wx.js';
import { getLocQueryByLabel, } from '../../common/utils/index';

class MyInfoTabBar3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '我的信息',
            tableId: getLocQueryByLabel('tableId') || '',

            data: {
                realName: '',
                headImagePath: userImg,
                department: {
                    tableId: '',
                    theName: '',
                },
                idCard: '',
                phoneNumber: '',
                email: '',
                address: '',
            }
        };
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    componentDidMount() {
        this.getUserInfo({});
    }
    //获取用户信息
    getUserInfo() {
        var data = { openId_WeiXin: '' };
        getUserInfoApi(data).then(res => {
            console.log('getUserInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2, null, false);
                return;
            }
            this.setState({
                data: res.data.member
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2, null, false);
            console.log(err)
        })
    }
    //退出Btn --无
    // onExitBtn() {
    //     var data = {};
    //     exitOutApi(data).then(res => {
    //         console.log('exitOutApi res', res)
    //         if (res.data.result !== 'success') {
    //             Toast.info(res.data.info || '接口失败', 2, null, false);
    //             return;
    //         }

    //     }).catch(err => {
    //         Toast.info('服务器繁忙', 2, null, false);
    //         console.log(err)
    //     })
    // }
    render() {
        var data = this.state.data;
        return (
            <div className="content" >
                <NavBar mode="light">{this.state.title}</NavBar>

                <WhiteSpace />
                <List>
                    <Item className="userImgBox"
                        thumb={data.headImagePath}
                        multipleLine>
                        {data.realName} <Brief>{data.department ? data.department.theName:'暂无部门信息'}</Brief>
                    </Item>
                </List>

                <WhiteSpace />
                <List>
                    <Item extra={data.idCard}>身份证</Item>
                    <Item extra={data.phoneNumber}>手机号</Item>
                    <Item extra={data.email}>邮箱</Item>
                </List>

                <WhiteSpace />
                <List>
                    <Item extra={data.address}>地址</Item>
                </List>

                {/* <WingBlank>
                    <Button className="exitBtn" type="primary" onClick={this.onExitBtn.bind(this)}>退出登录</Button>
                </WingBlank> */}
            </div>
        )
    }
}

export default MyInfoTabBar3;
