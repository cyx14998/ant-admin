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
    MobileHistory
} from 'eui-mobile';
const Item = List.Item;

import './index.less';
import userImg from '../../assets/index_customer.png';

import {
    getLeaveInfoApi,
    flowHistoryListApi,
    leavePassApi,
    leaveRejectApi,
} from '../../common/api/api.flow.js';
const leaveType = ['事假', '病假', '年假', '调休', '其他'];

class LeaveInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '请假单详情',
            tableId: '1', //id

            flowOrderStateId: '1',
            theContent: '',
            dataMs: {},
            // dataDt: [],
            // data: {
            //     flowOrderStateId: '', //id---获取审核记录
            //     isPass: false,

            //     member: '请假人',
            //     phoneNumber: '电话号码',
            //     theType: '请假单类型',
            //     beginDatetime: '开始时间',
            //     endDatetime: '结束时间',
            //     theHoure: '时长(h)'
            // },
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
            Toast.info('审核已通过'), 2;;
            _checkRecordList({ flowOrderStateId: this.state.flowOrderStateId });

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
            Toast.info('审核已驳回'), 2;;
            _checkRecordList({ flowOrderStateId: this.state.flowOrderStateId });

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
        // var dataDt = this.state.dataDt;
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
                    <Item extra={dataMs.member && dataMs.member.realName}>请假人</Item>
                    <Item extra={dataMs.phoneNumber}>电话号码</Item>
                    <Item extra={dataMs.theType}>请假单类型</Item>
                    <Item extra={dataMs.beginDatetime}>开始时间</Item>
                    <Item extra={dataMs.endDatetime}>结束时间</Item>
                    <Item extra={dataMs.theHoure}>时长(h)</Item>

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

ReactDOM.render(<LeaveInfo />,
    document.getElementById('root')
)
