/**
 * 入库单详情 -- 审批
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
    getPurHousingInfoApi,
    flowHistoryListApi,
    purHousingPassApi,
    purHousingRejectApi,
} from '../../common/api/api.flow.js';

class PurHousingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '入库单详情',
            tableId: '1', //id

            flowOrderStateId: '1',
            theContent: '',
            dataMs: {},
            dataDt: [],
            // data: {
            //     flowOrderStateId: '', //id---获取审核记录
            //     isPass: false,
            //     storageInMember: '入库人',
            //     storageInDatetime: '入库日期',
            //     serialNumber: '采购单编号',
            //     finallyAcount: '入库单总计',
            //     purHousingDtList: [{
            //         theName: '品名',
            //         theSpecifications: '规格型号',
            //         manufacturerName: '厂商',
            //         theQuantity: '出库数量',
            //     }, {
            //         theName: '品名1',
            //         theSpecifications: '规格型号1',
            //         manufacturerName: '厂商1',
            //         theQuantity: '出库数量1',
            //     }],
            // },
            checkList: [], //审核记录
        };
        this._getPurHousingInfo = this._getPurHousingInfo.bind(this);
        this._checkRecordList = this._checkRecordList.bind(this);
    }

    componentDidMount() {
        this._getPurHousingInfo({ tableId: this.state.tableId });
    }
    //获取入库单信息
    _getPurHousingInfo(params) {
        getPurHousingInfoApi(params).then(res => {
            console.log('getPurHousingInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.storageInRecordMst;
            var dt = res.data.storageInRecordDtlList;
            this.setState({
                dataMs: ms,
                dataDt: dt,
                flowOrderStateId: ms.flowOrderState.tableId,
            });
        this._checkRecordList({ flowOrderStateId: ms.flowOrderState.tableId });            
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
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
        purHousingPassApi(data).then(res => {
            console.log('purHousingPassApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已通过'), 2;;
            this._checkRecordList({ flowOrderStateId: this.state.flowOrderStateId });

        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
        })
    }
    //审核驳回
    checkReject() {
        var data = {
            tableId: this.state.tableId,
            theContent: this.state.theContent
        };
        purHousingRejectApi(data).then(res => {
            console.log('purHousingRejectApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已驳回'), 2;;
            this._checkRecordList({ flowOrderStateId: this.state.flowOrderStateId });

        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
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
            console.log(err)
        })
    }

    //入库单明细列表---<div></div>
    purHousingDetails(detailsList) {
        return (
            <div>
                {detailsList && detailsList.map((item, index) =>
                    <div key={index}>
                        <WhiteSpace />
                        <List>
                            <Item extra={item.theName}>品名</Item>
                            <Item extra={item.theSpecifications}>规格型号</Item>
                            <Item extra={item.theQuantity}>出库数量</Item>
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
                    <Item extra={dataMs.storageInMember && dataMs.storageInMember.realName}>入库人</Item>
                    <Item extra={dataMs.storageInDatetime}>入库日期</Item>
                    <Item extra={dataMs.serialNumber}>采购单编号</Item>
                </List>

                {this.purHousingDetails(dataDt)}
                <WhiteSpace />

                {/* <List>
                    <Item extra={dataMs.finallyAcount}>入库单总计</Item>
                </List> */}

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

ReactDOM.render(<PurHousingInfo />,
    document.getElementById('root')
)
