/**
 * 合同详情 -- 审批
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
    getContractInfoApi,
    flowHistoryListApi,
    contractPassApi,
    contractRejectApi,
} from '../../common/api/api.flow.js';

class ContractInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '合同详情',
            tableId: '1', //id

            flowOrderStateId: '1',
            theContent: '',
            dataMs: {},
            dataDt: [],
            // data: {
            //     flowOrderStateId: '', //id---获取审核记录
            //     isPass: false,
            //     serialNumber: '合同编号',
            //     theName: '合同名称',
            //     firstParty: '甲方名称',
            //     secondParty: '乙方名称',
            //     signDatetime: '签订日期',
            //     totalAmount: '总金额',
            //     payWay: '付款方式',
            // },
            checkList: [], //审核记录
        };
        this._getContractInfo = this._getContractInfo.bind(this);
        this._checkRecordList = this._checkRecordList.bind(this);
    }

    componentDidMount() {
        this._getContractInfo({ tableId: this.state.tableId });
    }
    //获取合同信息
    _getContractInfo(params) {
        getContractInfoApi(params).then(res => {
            console.log('getContractInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.contract;
            var dt = res.data.filesList;
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
        contractPassApi(data).then(res => {
            console.log('contractPassApi res', res)
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
        contractRejectApi(data).then(res => {
            console.log('contractRejectApi res', res)
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
                    <Item extra={dataMs.serialNumber}>合同编号</Item>
                    <Item extra={dataMs.theName}>合同名称</Item>
                    <Item extra={dataMs.firstParty}>甲方名称</Item>
                    <Item extra={dataMs.secondParty}>乙方名称</Item>
                </List>

                <WhiteSpace />
                <List>
                    <Item extra={dataMs.signDatetime}>签订日期</Item>
                    <Item extra={dataMs.totalAmount}>总金额</Item>
                    <Item extra={dataMs.payWay}>付款方式</Item>
                </List>
                <WhiteSpace />

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

ReactDOM.render(<ContractInfo />,
    document.getElementById('root')
)
