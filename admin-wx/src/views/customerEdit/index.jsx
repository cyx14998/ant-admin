/**
 * 首页
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    List,
    NavBar,
    Icon,
    WhiteSpace,
    Toast,
} from 'eui-mobile';
const Item = List.Item;


import './index.less';

import envImg from '../../assets/customerInfo_env.png';
import extraImg from '../../assets/customerInfo_extra.png';
import stateImg from '../../assets/customerInfo_state.png';
import contactImg from '../../assets/customerInfo_contact.png';

import { getCustomerInfoApi } from '../../common/api/api.wx.js'
import { getLocQueryByLabel, } from '../../common/utils/index';


class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: getLocQueryByLabel('tableId') || '',
            activeTab: '1',
            title: '企业详情',
            data: {
                // customerName: '上海友通科技有限公司',
                // address: '江苏省苏州市工业园区星湖街文萃广场888号江苏省苏州市工业园区星湖街文萃广场888号',
                // //经营状态
                // uniformSocialCreditCode: '统一社会信用代码',
                // unitCategory: '单位类别',
                // industryCategory: '行业类别',
                // enterpriseScale: '企业规模',
                // longitude: '经度',
                // latitude: '纬度',
                // openingDate: '投产日期',
                // gridNumber: '网格号',
                // //联系方式
                // legalPersonName: '法人代表',
                // legalPersonPhone: '电话',
                // contactPerson: '联系人',
                // phoneNumber: '电话',
                // fax: '传真',
                // email: '邮箱',
                // postalCode: '邮政编码',
                // //其他
                // affiliation: '隶属关系',
                // priorityLevel: '重点级别',
                // priorityType: '重点类型',
                // isCentralEnterprises: '是否央企',
                // centralEnterprisesName: '央企名称',
                // //环保信息
                // isMoreThan30PowerEnterprise: '是否30万千瓦以上',
                // isGasPowerPlant: '是否燃气电厂',
                // wastewaterDischargePorts: '废水排放口数量',
                // exhaustEmissionsPorts: '废气排放口数量',
                // aiChemicalOxygenDemand: '化学需氧量',
                // aiAmmoniaNitrogen: '氮氧',
                // aiNitrogenOxide: '氮氧化物',
                // aiSmoke: '烟尘',
                // aiSulfurDioxide: '二氧化硫',
                // aiSuspendedSolids: '悬浮物',
                // aiOther: '其他',
            },
        };
        this.getCustomerInfo = this.getCustomerInfo.bind(this);
    }

    componentDidMount() {
        this.getCustomerInfo({ tableId: this.state.tableId });
    }
    //获取企业详情信息 --无
    getCustomerInfo(params) {
        getCustomerInfoApi(params).then(res => {
            console.log('getCustomerInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var data = res.data.customer;
            data.isCentralEnterprises = data.isCentralEnterprises ? '是' : '否';
            data.isGasPowerPlant = data.isGasPowerPlant ? '是' : '否';
            data.isMoreThan30PowerEnterprise = data.isMoreThan30PowerEnterprise ? '是' : '否';

            this.setState({
                data: data,
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err);
        })
    }

    //切换tab
    onClickTab(index) {
        this.setState({
            activeTab: index
        });
    }

    render() {
        var data = this.state.data;
        return (
            <div className="content" >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => history.back()}
                >{this.state.title}</NavBar>

                <div className="top">
                    <div className="textBoxCenter">
                        <div className="customerNameBox">{data.customerName}</div>
                        <div className="addressBox"><span>地址：</span><div>{data.address}</div></div>
                    </div>
                    <div className="tabsBox">
                        <span className={this.state.activeTab == 1 ? 'baseInfoTab activeTab' : 'baseInfoTab'} onClick={this.onClickTab.bind(this, 1)}>基本信息</span>
                        <span className={this.state.activeTab == 2 ? 'extraInfoTab activeTab' : 'extraInfoTab'} onClick={this.onClickTab.bind(this, 2)}>其他信息</span>
                    </div>
                </div>
                <div className="infoList">
                    {this.state.activeTab == 1 ?
                        <div>
                            {/* -------------------------------------基本信息 tab1------------------------------- */}
                            <WhiteSpace />
                            <List>
                                <Item className="blockTitleBox" thumb={stateImg}>经营状态</Item>

                                <Item extra={data.uniformSocialCreditCode}>统一社会信用代码</Item>
                                <Item extra={data.unitCategory}>单位类别</Item>
                                <Item extra={data.industryCategory}>行业类别</Item>
                                <Item extra={data.enterpriseScale}>企业规模</Item>
                                <Item extra={data.longitude}>经度</Item>
                                <Item extra={data.latitude}>纬度</Item>
                                <Item extra={data.openingDate}>投产日期</Item>
                                <Item extra={data.gridNumber}>网格号</Item>
                            </List>
                            <WhiteSpace />
                            <List>
                                <Item className="blockTitleBox" thumb={contactImg}>联系方式</Item>

                                <Item extra={data.legalPersonName}>法人代表</Item>
                                <Item extra={data.legalPersonPhone}>电话</Item>
                                <Item extra={data.contactPerson}>联系人</Item>
                                <Item extra={data.phoneNumber}>电话</Item>
                                <Item extra={data.fax}>传真</Item>
                                <Item extra={data.email}>邮箱</Item>
                                <Item extra={data.postalCode}>邮政编码</Item>
                            </List>
                        </div>
                        :
                        <div>
                            {/* -------------------------------------其他信息 tab2------------------------------- */}
                            <WhiteSpace />
                            <List>
                                <Item className="blockTitleBox" thumb={extraImg}>  其他</Item>

                                <Item extra={data.affiliation}>隶属关系</Item>
                                <Item extra={data.priorityLevel}>重点级别</Item>
                                <Item extra={data.priorityType}>重点类型</Item>
                                <Item extra={data.isMoreThan30PowerEnterprise}>是否央企</Item>
                                <Item extra={data.centralEnterprisesName}>央企名称</Item>
                            </List>

                            <WhiteSpace />
                            <List>
                                <Item className="blockTitleBox" thumb={envImg}>环保信息</Item>

                                <Item extra={data.isCentralEnterprises}>是否30万千瓦以上</Item>
                                <Item extra={data.isGasPowerPlant}>是否燃气电厂</Item>
                                <Item extra={data.wastewaterDischargePorts}>废水排放口数量</Item>
                                <Item extra={data.exhaustEmissionsPorts}>废气排放口数量</Item>
                                <Item extra={data.aiChemicalOxygenDemand}>化学需氧量</Item>
                                <Item extra={data.aiAmmoniaNitrogen}>氮氧</Item>
                                <Item extra={data.aiNitrogenOxide}>氮氧化物</Item>
                                <Item extra={data.aiSmoke}>烟尘</Item>
                                <Item extra={data.aiSulfurDioxide}>二氧化硫</Item>
                                <Item extra={data.aiSuspendedSolids}>悬浮物</Item>
                                <Item extra={data.aiOther}>其他</Item>
                            </List>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<CustomerInfo />,
    document.getElementById('root')
)