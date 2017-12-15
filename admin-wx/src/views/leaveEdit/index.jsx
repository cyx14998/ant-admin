/**
 * 请假单详情 -- 审批
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
    MobileHistory,
    Modal
} from 'eui-mobile';
const Item = List.Item;
const alert = Modal.alert;

import './index.less';
import userImg from '../../assets/index_customer.png';

import {
    getLeaveInfoApi,
    flowHistoryListApi,
    leavePassApi,
    leaveRejectApi,
} from '../../common/api/api.flow.js';
import { getLocQueryByLabel, } from '../../common/utils/index';

const leaveType = ['事假', '病假', '年假', '调休', '其他'];

class LeaveInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '请假单详情',
            tableId: getLocQueryByLabel('tableId') || '', //id

            flowOrderStateId: '',
            theContent: '',
            dataMs: {},
            
            checkList: [], //审核记录
        };
        this._getLeaveInfo = this._getLeaveInfo.bind(this);
        this._checkRecordList = this._checkRecordList.bind(this);
    }

    componentDidMount() {
        this._getLeaveInfo({ tableId: this.state.tableId });
    }
    //获取请假单信息
    _getLeaveInfo(params) {
        getLeaveInfoApi(params).then(res => {
            console.log('getLeaveInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.leaveApplication;
            // var dt = res.data.storageInRecordDtlList;
            leaveType.map((item, index) => {
                if (ms.theType == index) {
                    ms.theType = item;
                }
            });
            this.setState({
                dataMs: ms,
                // dataDt: dt,
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
        leavePassApi(data).then(res => {
            console.log('leavePassApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已通过', 2);

            this._getLeaveInfo({ tableId: this.state.tableId });
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
        leaveRejectApi(data).then(res => {
            console.log('leaveRejectApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已驳回', 2);

            this._getLeaveInfo({ tableId: this.state.tableId });
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
            var data = res.data.flowHistoryList;
            var temp = [];
            data && data.length > 0 && data.map((item, index) => {
                var tp = {};
                tp.realName = item.member && item.member.realName;
                tp.userImg = item.member && item.member.userImg;
                tp.time = item.createDatetime;
                tp.theContent = item.theContent;
                tp.status = item.theFlowResult ? '1' : '0';
                return temp.push(tp);
            });
            this.setState({
                checkList: temp,
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
        })
    }

    render() {
        var dataMs = this.state.dataMs;
        // var dataDt = this.state.dataDt;
        var checkList = this.state.checkList;

        return (
            <div className="content" >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => history.back()}
                >{this.state.title}</NavBar>
                <WhiteSpace />
                <List>
                    <Item extra={dataMs.member && dataMs.member.realName}>请假人</Item>
                    <Item extra={dataMs.member && dataMs.member.phoneNumber}>电话号码</Item>
                    <Item extra={dataMs.theType}>请假单类型</Item>
                    <Item extra={dataMs.beginDatetime}>开始时间</Item>
                    <Item extra={dataMs.endDatetime}>结束时间</Item>
                    <Item extra={dataMs.theHoure}>时长(h)</Item>

                </List>

                {dataMs.couldEditFLow &&
                    <div>
                        <WhiteSpace />
                        <TextareaItem className="textAreaInput textAreaBd" placeholder="说点审核意见吧" rows={5} onChange={this.onOpinionText.bind(this)} />
                        <WhiteSpace />
                        <WingBlank>
                            <WhiteSpace />
                            <Button className="checkBtn btnColor" type="primary"
                                onClick={() => alert('', '确定审核通过？', [
                                    { text: 'Cancel', onPress: () => console.log('cancel') },
                                    { text: 'Ok', onPress: this.checkPassBtn.bind(this) },
                                ])}>通过</Button>
                            <WhiteSpace />
                            <Button className="checkBtn" type="warning" onClick={() => alert('', '确定审核驳回？', [
                                { text: 'Cancel', onPress: () => console.log('cancel') },
                                { text: 'Ok', onPress: this.checkReject.bind(this) },
                            ])}>驳回</Button>
                        </WingBlank>
                    </div>
                }
                <div className="checkFlow">
                    <MobileHistory datasource={checkList} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<LeaveInfo />,
    document.getElementById('root')
)
