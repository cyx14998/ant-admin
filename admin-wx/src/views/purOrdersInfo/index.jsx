/**
 * 采购单详情 -- 审批
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import {
    Toast,
    NavBar,
    List,
    Icon,
    WingBlank,
    WhiteSpace,
    Button,
    TextareaItem,
    MobileHistory
} from 'eui-mobile';
const Item = List.Item;

import './index.less';
import userImg from '../../assets/index_customer.png';

import {
    getPurOrdersInfoApi,
    flowHistoryListApi,
    purOrdersPassApi,
    purOrdersRejectApi,
} from '../../common/api/api.flow.js';

// 基本信息---采购类型（固定资产    工程材料   办公用品   劳防用品  其他）
const purOrderType = [
    {
        label: '固定资产',
        value: '1'
    }, {
        value: '2',
        label: '工程材料'
    }, {
        value: '3',
        label: '办公用品'
    }, {
        value: '4',
        label: '劳防用品'
    }, {
        value: '5',
        label: '其他'
    },
]

class PurOrdersInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '采购单详情',
            tableId: '1', //id

            flowOrderStateId: '1',
            theContent: '',            
            dataMs: {},
            dataDt: [],
            // data: {
            //     flowOrderStateId: '', //id---获取审核记录
            //     isPass: true,
            //     department: '采购部门',
            //     manufacturerName: '申请人',
            //     theType: '采购类型',
            //     orderTime: '采购日期',
            //     finallyAcount: '采购单总计',
            //     purOrdersDtList: [{
            //         theName: '品名',
            //         theSpecifications: '规格型号',
            //         manufacturerName: '厂商',
            //         theQuantity: '数量',
            //         thePrice: '单价',
            //         totalAmount: '合计',
            //     }, {
            //         theName: '品名1',
            //         theSpecifications: '规格型号1',
            //         manufacturerName: '厂商1',
            //         theQuantity: '数量1',
            //         thePrice: '单价1',
            //         totalAmount: '合计1',
            //     }],
            // },
            checkList: [], //审核记录
        };
        this._getPurOrdersInfo = this._getPurOrdersInfo.bind(this);
        this._checkRecordList = this._checkRecordList.bind(this);
    }

    componentDidMount() {
        this._getPurOrdersInfo({ tableId: this.state.tableId });
    }
    //获取采购单信息
    _getPurOrdersInfo(params) {
        getPurOrdersInfoApi(params).then(res => {
            console.log('getPurOrdersInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.purchaseRecordMst;
            var dt = res.data.purchaseRecordDtlList;
            
            purOrderType.map((item, index) => {
                if (item.value == ms.theType) {
                    ms.theType = item.label;
                }
            })
            this.setState({
                dataMs: ms,
                dataDt: dt,
                flowOrderStateId: ms.flowOrderState.tableId,
            });
        this._checkRecordList({ flowOrderStateId: ms.flowOrderState.tableId });
            
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err);
        })
    }
    //审核意见
    onOpinionText(values) {
        console.log(values);
        this.setState({
            theContent: values,
        });
    }
    //审核通过 
    checkPassBtn() {
        var data = {
            tableId: this.state.tableId,
            theContent: this.state.theContent
        };
        purOrdersPassApi(data).then(res => {
            console.log('purOrdersPassApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已通过', 2);
            this._checkRecordList({ flowOrderStateId: this.state.flowOrderStateId });

        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err);
        })
    }
    //审核驳回
    checkReject() {
        var data = {
            tableId: this.state.tableId,
            theContent: this.state.theContent
        };
        purOrdersRejectApi(data).then(res => {
            console.log('purOrdersRejectApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已驳回', 2);
            this._checkRecordList({ flowOrderStateId: this.state.flowOrderStateId });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err);
        })
    }
    //审核记录列表
    _checkRecordList(params) {
        flowHistoryListApi(params).then(res => {
            console.log('flowHistoryListApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            this.setState({
                checkList: res.data.flowHistoryList
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err);
        })
    }

    //采购单明细列表---<div></div>
    purOrdersDetails(detailsList) {
        return (
            <div>
                {detailsList && detailsList.map((item, index) =>
                    <div key={index}>
                        <WhiteSpace />
                        <List>
                            <Item extra={item.theName}>品名</Item>
                            <Item extra={item.theSpecifications}>规格型号</Item>
                            <Item extra={item.theQuantity}>数量</Item>
                            <Item extra={item.thePrice}>单价</Item>
                            <Item extra={item.totalAmount}>合计</Item>
                        </List>
                    </div>
                )}
            </div>
        );
    }
    render() {
        var dataMs = this.state.dataMs;
        var dataDt = this.state.dataDt;
        var checkList = [{
            realName: '123',
            time: '2017-10-10',
            status: '1',
            userImg: userImg,
        }];
        return (
            <div className="content" >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => window.history.back(-1)}
                >{this.state.title}</NavBar>
                <WhiteSpace />
                <List>
                    <Item extra={dataMs.department && dataMs.department.theName}>采购部门</Item>
                    <Item extra={dataMs.manufacturerName}>厂商名称</Item>
                    <Item extra={dataMs.theType}>采购类型</Item>
                    <Item extra={dataMs.orderTime}>采购日期</Item>
                </List>

                {this.purOrdersDetails(dataDt)}
                <WhiteSpace />

                <List>
                    <Item extra={dataMs.finallyAcount}>采购单总计</Item>
                </List>

                <WhiteSpace />
                <TextareaItem className={!dataMs.isPass ? 'textAreaInput textAreaBd' : 'textAreaInput'} editable={!dataMs.isPass} placeholder="说点审核意见吧" rows={5} onChange={this.onOpinionText.bind(this)} />
                <WhiteSpace />
                {!dataMs.isPass && <WingBlank>
                    <WhiteSpace />
                    <Button className="checkBtn btnColor" type="primary" onClick={this.checkPassBtn.bind(this)}>通过</Button>
                    <WhiteSpace />
                    <Button className="checkBtn" type="warning" onClick={this.checkReject.bind(this)}>驳回</Button>
                </WingBlank>}
                <div className="checkFlow">
                    <MobileHistory datasource={checkList} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<PurOrdersInfo />,
    document.getElementById('root')
)
