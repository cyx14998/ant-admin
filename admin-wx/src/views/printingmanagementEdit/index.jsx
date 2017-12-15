/**
 * 用印详情 -- 审批
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
    getPrintingInfoApi,
    flowHistoryListApi,
    printingPassApi,
    printingRejectApi,
} from '../../common/api/api.flow.js';
import { getLocQueryByLabel, } from '../../common/utils/index';

class PrintingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '用印详情',
            tableId: getLocQueryByLabel('tableId') || '', //id

            flowOrderStateId: '',
            theContent: '',
            dataMs: {},
            dataDt: [],
           
            checkList: [], //审核记录
        };
        this._getPrintingInfo = this._getPrintingInfo.bind(this);
        this._checkRecordList = this._checkRecordList.bind(this);
    }

    componentDidMount() {
        this._getPrintingInfo({ tableId: this.state.tableId });
    }
    //获取用印信息
    _getPrintingInfo(params) {
        getPrintingInfoApi(params).then(res => {
            console.log('getPrintingInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.officialSeal;
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
        printingPassApi(data).then(res => {
            console.log('printingPassApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已通过', 2);

            this._getPrintingInfo({ tableId: this.state.tableId });
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
        printingRejectApi(data).then(res => {
            console.log('printingRejectApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('审核已驳回', 2);

            this._getPrintingInfo({ tableId: this.state.tableId });
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
            data && data.map((item, index) => {
                var tp = {};
                tp.realName = item.member && item.member.realName;
                tp.userImg = item.member && item.member.userImg;
                tp.time = item.createDatetime;
                tp.theContent = item.theContent;
                tp.status = item.theFlowResult ? '1' : '0';
                return temp.push(tp);
            })
            console.log(temp)
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
        var dataDt = this.state.dataDt;
        var checkList = this.state.checkList;
        // var checkList = [{
        //     realName: '123',
        //     time: '2017-10-10',
        //     status: '1',
        //     userImg: userImg,
        // }];

        return (
            <div className="content" >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => history.back()}
                >{this.state.title}</NavBar>
                <WhiteSpace />
                <List>
                    <Item extra={dataMs.serialNumber}>用印编号</Item>
                    <Item extra={dataMs.applyDepart && dataMs.applyDepart.theName}>申请部门</Item>
                    <Item extra={dataMs.applyDatetime}>申请日期</Item>
                </List>

                <List renderHeader={() => '附件（下载）'}>
                    {/* {dataDt.length==0?
                     <Flex>
                        {dataDt.map((item, index) => {
                            return <Flex.Item className={index % 2 == 1 ? 'loadItem borderLR' : 'loadItem'} key={index}><a download="附件" href={item.filePath} className="loadItem"><s></s>{item.filePath ? <div className="fontCol">附件{index + 1}</div> : <div className="fontColNo">无</div>}</a></Flex.Item>
                        })}
                    </Flex>:
                    <Item>无</Item>} */}
                    {dataDt.length > 0 ?
                        <div>
                            {dataDt.map((item, index) => {
                                return <Item className="loadItem" key={index}>
                                    <a download="附件" href={item.filePath} className="loadItem">
                                        <s></s>
                                        {
                                            item.filePath ?
                                                <div className="fontCol">{item.theName ? item.theName : <div>附件{index + 1}</div>}</div>
                                                :
                                                <div className="fontColNo">无</div>
                                        }
                                    </a>
                                </Item>
                            })}
                        </div> :
                        <Item>无</Item>}
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

ReactDOM.render(<PrintingInfo />,
    document.getElementById('root')
)
