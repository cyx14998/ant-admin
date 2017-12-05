/**
 * 公告详情 -- 审批
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
    getNoticeInfoApi,
    flowHistoryListApi,
    noticePassApi,
    noticeRejectApi,
} from '../../common/api/api.flow.js';

class NoticeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '公告详情',
            tableId: '1', //id

            flowOrderStateId: '1',
            theContent: '',
            dataMs: {},
            dataDt: [],
            // data: {
            //     flowOrderStateId: '', //id---获取审核记录
            //     isPass: false,

            //     theTitle: '主题',
            //     publishDatetime: '发布时间',
            //     theContent: '首先请注意。公众号可通过下述接口来获取网页授权access_token。如果网页授权的作用域为snsapi_base，则本步骤中获取到网页授权access_token的同时，也获取到了openid，snsapi_base式的网页授权流程即到此为止。尤其注意：由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也必须从服务器发起。',
            // },
            checkList: [], //审核记录
        };
        this._getNoticeInfo = this._getNoticeInfo.bind(this);
        this._checkRecordList = this._checkRecordList.bind(this);
    }

    componentDidMount() {
        this._getNoticeInfo({ tableId: this.state.tableId });
    }
    //获取公告信息 
    _getNoticeInfo(params) {
        getNoticeInfoApi(params).then(res => {
            console.log('getNoticeInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.proclamation;
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
        noticePassApi(data).then(res => {
            console.log('noticePassApi res', res)
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
        noticeRejectApi(data).then(res => {
            console.log('noticeRejectApi res', res)
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
                    <Item extra={dataMs.theTitle}>主题</Item>
                    <Item extra={dataMs.publishDatetime}>发布时间</Item>
                </List>
                <TextareaItem editable={false} rows={5} value={dataMs.theContent} autoHeight={true} />
                <WhiteSpace />
                <TextareaItem className={!dataMs.isPass ? 'textAreaInput textAreaBd' : 'textAreaInput'} editable={!dataMs.isPass} placeholder="说点审核意见吧" onChange={this.onOpinionText.bind(this)} />
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

ReactDOM.render(<NoticeInfo />,
    document.getElementById('root')
)
