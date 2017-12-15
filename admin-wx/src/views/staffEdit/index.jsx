/**
 * 员工详情
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
    Button,
    Flex,
} from 'eui-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import './index.less';

import custaddress from '../../assets/task_custaddress.png';

import {
    getStaffInfoApi,
    getStaffCerApi,
} from '../../common/api/api.wx.js';
import { getLocQueryByLabel, } from '../../common/utils/index';


class TaskInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '员工详情',
            tableId: getLocQueryByLabel('tableId') || '',

            dataMs: {},
            dataDt: [],
        };
        this._getStaffInfo = this._getStaffInfo.bind(this);
        this._getStaffCerApi = this._getStaffCerApi.bind(this);
    }

    componentDidMount() {
        this._getStaffInfo({ tableId: this.state.tableId });
    }

    //获取员工信息
    _getStaffInfo(params) {
        getStaffInfoApi(params).then(res => {
            console.log('getStaffInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.member;
            ms.sex = ms.sex == 1 ? '男' : '女';

            this.setState({
                dataMs: ms,
            });
            this._getStaffCerApi({ staffId: this.state.tableId });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
        })
    }
    //获取员工证照信息
    _getStaffCerApi(params) {
        getStaffCerApi(params).then(res => {
            console.log('getStaffCerApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var dt = res.data.memberCertificationList;

            this.setState({
                dataDt: dt,
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
        })
    }
    //拨打电话
    onCallBtn() {

    }
    render() {
        var dataMs = this.state.dataMs;
        var dataDt = this.state.dataDt;
        var tel = "tel:" + dataMs.phoneNumber;
        // var dataDt = [
        //     {
        //         filePath: '123',
        //         theName: '123',
        //         expiryDatetime: '2011-10-10'
        //     }, {
        //         filePath: '123',
        //         theName: '123',
        //         expiryDatetime: '2011-10-10'
        //     },
        // ]

        return (
            <div className="content" >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => history.back()}
                >{this.state.title}</NavBar>

                <WhiteSpace />
                <List>
                    <Item className="userImgBox"
                        thumb={dataMs.headImagePath}
                        align="top"
                        multipleLine>
                        {dataMs.realName}
                        <Brief>{dataMs.department? dataMs.department.theName:'暂无部门信息'}</Brief>
                    </Item>
                </List>

                <div className="contentList">
                    <WhiteSpace />
                    <List>
                        <Item extra={dataMs.sex}>性别</Item>
                        <Item extra={dataMs.age}>年龄</Item>
                    </List>
                    <WhiteSpace />
                    <List>
                        <Item extra={dataMs.idCard}>身份证号码</Item>
                        <Item extra={dataMs.phoneNumber}>手机号码（账号）</Item>
                        <Item extra={dataMs.email}>邮箱</Item>
                        <Item extra={dataMs.address}>住址</Item>
                    </List>

                    <List renderHeader={() => '证件'}>
                        {dataDt && dataDt.length > 0 ?
                            dataDt.map((item, index) => {
                                return <div key={index}>
                                    <a download="证件" href={item.filePath} className="loadItem">
                                        {
                                            item.filePath ?
                                                <div className="fontCol">
                                                    <Item extra={item.expiryDatetime + '到期'}>{item.theName}</Item>
                                                </div>
                                                :
                                                <div className="fontColNo">无</div>
                                        }
                                    </a>
                                </div>
                            }) :
                            <Item>无</Item>}
                    </List>

                    <WingBlank>
                        <a href={tel} className="callBtn" onClick={this.onCallBtn.bind(this)}>拨打电话</a>
                    </WingBlank>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<TaskInfo />,
    document.getElementById('root')
)