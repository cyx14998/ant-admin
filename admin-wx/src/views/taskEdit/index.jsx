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
const downloadUrl = BaseConfig.qiniuPath;

import './index.less';

import custaddress from '../../assets/task_custaddress.png';
import custname from '../../assets/task_custname.png';
import custnum from '../../assets/task_custnum.png';
import custperson from '../../assets/task_custperson.png';
import custphone from '../../assets/task_custphone.png';
import iconh from '../../assets/task_iconh.png';
import num from '../../assets/task_num.png';
import custstate from '../../assets/task_custstate.png';
import custstateno from '../../assets/task_custstateno.png'


import {
    getTaskInfoDtApi,
    getQiNiuTokenApi,
    qiNiuUploadApi,
    saveTaskDtApi,
} from '../../common/api/api.wx.js';
import { getLocQueryByLabel, } from '../../common/utils/index';

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
            files: [],
            title: '任务详情',
            tableId: getLocQueryByLabel('tableId') || '',

            dataMs: {},
            uptoken: '',
            filesLength: '', //控制图片不可编辑
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
                Toast.info('getqiniuyun uptoken error');
                return;
            }

            this.setState({
                uptoken: res.data.uptoken
            });

        }).catch(err => console.log(err));
    }
    //获取任务信息
    _getTaskInfo(params) {
        getTaskInfoDtApi(params).then(res => {
            console.log('getTaskInfoDtApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            var ms = res.data.inspectionPlanDtl;
            var fileArr = ms.fileArr ? ms.fileArr.split(',') : [];

            //图片初始化
            var imgData = [];
            fileArr && fileArr.length > 0 && fileArr.map((item, index) => {
                var temp = {};
                temp.id = index + 1;
                temp.url = item;
                imgData.push(temp);
            })

            this.setState({
                dataMs: ms,
                files: imgData,
                filesLength: imgData.length,
            });
        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
        })
    }
    //改变图片
    onChangeImg(files, type, index) {
        var self = this;
        if (type !== 'remove') {
            var uploadFiles = files[files.length - 1].file;
            var key = getFileKey(uploadFiles.type, uploadFiles.name);
            // files.uptoken = this.state.uptoken;
            qiNiuUploadApi({
                files: uploadFiles,
                uptoken: this.state.uptoken,
                key,
                callback: (response) => {

                    files[files.length - 1].filePath = response.filePath;
                    self.setState({
                        files,
                    });
                }
            })
        } else {
            this.setState({
                files,
            });
        }
    }
    //保存btn
    onSaveBtn() {
        var data = {};
        data.tableId = this.state.tableId;

        var files = this.state.files;
        var fileArr = [];
        files && files.length > 0 && files.map(item => {
            var filePath = '';
            if (item.filePath) {
                filePath = item.filePath;
                if (filePath.indexOf(downloadUrl) === -1) {
                    filePath = downloadUrl + filePath;
                }
            } else {
                filePath = item.url;
            }
            fileArr.push(filePath);
        });
        data.fileArr = fileArr.join(',');

        console.log('保存前', data);
        saveTaskDtApi(data).then(res => {
            console.log('saveTaskDtApi res', res)
            if (res.data.result !== 'success') {
                Toast.info(res.data.info || '接口失败', 2);
                return;
            }
            Toast.info('保存成功', 2);
            this._getTaskInfo({ tableId: this.state.tableId });

        }).catch(err => {
            Toast.info('服务器繁忙', 2);
            console.log(err)
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
                    onLeftClick={() => history.back()}
                >{this.state.title}</NavBar>

                <WhiteSpace />
                <List>
                    <Item className="userImgBox"
                        thumb={dataMs.theState ? custstate : custstateno}
                        extra={dataMs.inspectionPlanMst && dataMs.inspectionPlanMst.planDateEnd}
                        align="top"
                        multipleLine>
                        {dataMs.theState ? <div>任务已完成 <Brief>请查看其他任务完成情况!</Brief></div> : <div>任务未完成 <Brief>注意截止日期哦!</Brief></div>}
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
                            地址 <Brief>{dataMs.customer && dataMs.customer.unitAddress}</Brief>
                        </Item>
                    </List>

                    <WhiteSpace />
                    <List>
                        <Item thumb={custphone} extra={dataMs.performer && dataMs.performer.phoneNumber}>电话</Item>
                        <Item thumb={custperson} extra={dataMs.performer && dataMs.performer.realName}>检查人员</Item>
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
                            className={!dataMs.theState ? 'image-upload' : 'image-upload imgDisedit'}
                            files={files}
                            onChange={this.onChangeImg.bind(this)}
                            selectable={files.length < (this.state.filesLength ? this.state.filesLength : '20')}
                            multiple={true}
                        />
                    </List>
                </div>

                {!dataMs.theState &&
                    <WingBlank>
                        <Button className="saveBtn btnColor" type="primary" onClick={this.onSaveBtn.bind(this)}>保存</Button>
                    </WingBlank>}
            </div>
        )
    }
}

ReactDOM.render(<TaskInfo />,
    document.getElementById('root')
)