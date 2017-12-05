/**
 * 任务详情
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
    ImagePicker
} from 'eui-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import './index.less';

import custaddress from '../../assets/task_custaddress.png';
import custname from '../../assets/task_custname.png';
import custnum from '../../assets/task_custnum.png';
import custperson from '../../assets/task_custperson.png';
import custphone from '../../assets/task_custphone.png';
import iconh from '../../assets/task_iconh.png';
import num from '../../assets/task_num.png';
import custstate from '../../assets/task_custstate.png';


import {
    getTaskInfoApi,
    getQiNiuTokenApi,
    qiNiuUploadApi
} from '../../common/api/api.wx.js';

import {
    getFileKey
} from '../../common/utils/index';

const picData = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class TaskInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: picData,
            title: '任务详情',

            dataMs: {},
            uptoken: '',
            // data: {
            //     planDateEnd: '2017-10-10',

            //     lotNumber: '任务批号',
            //     customerName: '企业名称',
            //     uniformSocialCreditCode: '统一社会信用代码',
            //     address: '江苏省苏州市工业园区星湖街888号', //暂定
            //     phoneNumber: '电话',
            //     performer: '检查人',

            // }
        };
        this._getTaskInfo = this._getTaskInfo.bind(this);
        this._getQiNiuToken = this._getQiNiuToken.bind(this);
    }

    componentDidMount() {
        this._getTaskInfo({ tableId: this.state.tableId });
        this._getQiNiuToken();
    }
    //获取token
    _getQiNiuToken() {
        getQiNiuTokenApi({}).then(res => {
            console.log(res)
            if (!res.data || !res.data.uptoken) {
                MyToast('getqiniuyun uptoken error');
                return;
            }

            this.setState({
                uptoken: res.data.uptoken
            });

        }).catch(err => console.log(err));
    }
    //获取任务信息
    _getTaskInfo(params) {
        getTaskInfoApi(params).then(res => {
            console.log('getTaskInfoApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            this.setState({
                dataMs: res.data.inspectionPlanDtlList[0]
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
        })
    }
    onChangeImg(files, type, index) {
        console.log(files, type, index);
        this.setState({
            files,
        });
        var uploadFiles = files[files.length - 1].file;
        var key = getFileKey(uploadFiles.type, uploadFiles.name);
        // files.uptoken = this.state.uptoken;
        qiNiuUploadApi({
            files: uploadFiles,
            uptoken: this.state.uptoken,
            key,
            callback: (response) => {
                console.log(response);
            }
        })
    }
    render() {
        var dataMs = this.state.dataMs;
        const { files } = this.state;
        return (
            <div className="content" >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ color: '#619a2c' }} />}
                    onLeftClick={() => window.history.back(-1)}
                >{this.state.title}</NavBar>

                <WhiteSpace />
                <List>
                    <Item className="userImgBox"
                        thumb={custstate}
                        extra={dataMs.planDateEnd}
                        align="top"
                        multipleLine>
                        任务未完成 <Brief>注意截止日期哦!</Brief>
                    </Item>
                </List>

                <div className="contentList">
                    <WhiteSpace />
                    <List>
                        <Item thumb={num} thumb={num} extra={dataMs.inspectionPlanMst && dataMs.inspectionPlanMst.lotNumber}>任务批号</Item>
                        <Item thumb={custname} extra={dataMs.customer && dataMs.customer.customerName}>企业名称</Item>
                        <Item thumb={custnum} extra={dataMs.customer && dataMs.customer.uniformSocialCreditCode}>统一社会信用代码</Item>
                    </List>

                    <WhiteSpace />
                    <List>
                        <Item
                            thumb={custaddress}
                            multipleLine>
                            地址 <Brief>{dataMs.address}</Brief>
                        </Item>
                    </List>

                    <WhiteSpace />
                    <List>
                        <Item thumb={custphone} extra={dataMs.phoneNumber}>电话</Item>
                        <Item thumb={custperson} extra={dataMs.performer}>检查人员</Item>
                    </List>

                    <List renderHeader={() => '附件（下载）'}>
                        <Flex>

                            <Flex.Item className="loadItem"><a download="反馈单" href={dataMs.feedbackSheetURL}><s></s>{dataMs.feedbackSheetURL ? <div className="fontCol">反馈单</div> : <div className="fontColNo">无</div>}</a></Flex.Item>
                            <Flex.Item className="loadItem borderLR"><a target="_blank" download="检查记录" href={dataMs.regulatoryRecordURL}><s></s>{dataMs.regulatoryRecordURL ? <div className="fontCol">检查记录</div> : <div className="fontColNo">无</div>}</a></Flex.Item>
                            <Flex.Item className="loadItem"><a target="_blank" download="整改报告" href={dataMs.rectificationReportURL}><s></s>{dataMs.rectificationReportURL ? <div className="fontCol">整改报告</div> : <div className="fontColNo">无</div>}</a></Flex.Item>
                        </Flex>
                    </List>

                    <List renderHeader={() => '图片上传'}>
                        <ImagePicker
                            files={files}
                            onChange={this.onChangeImg.bind(this)}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 4}
                            multiple={true}
                        />
                    </List>
                </div>

                <WingBlank>
                    <Button className="saveBtn btnColor" type="primary">保存</Button>
                </WingBlank>
            </div>
        )
    }
}

ReactDOM.render(<TaskInfo />,
    document.getElementById('root')
)