/**
 * 公告编辑页面
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    TimePicker,
    Popconfirm,
    Select,
    Table,
    Button,
    Affix
} from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const downloadUrl = BaseConfig.qiniuPath;

import '../../ueditor/ueditor.config';
import '../../ueditor/ueditor.all.min';
import '../../ueditor/lang/zh-cn/zh-cn';

import {
    getLocQueryByLabel,
    MyToast
} from '../../common/utils';
import DraggableModal from '../../components/modal.draggable';

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
}

const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const formItemLayout3 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
}

import {
    uProclamationDetail,// 详情
    uProclamationAdd,   // 新增
    uProclamationUpdate,// 编辑
    uProclamationCancel,// 作废
    uProclamationPass,  // 送审/审核
    uProclamationReject // 退回
} from '../../common/api/api.noticemanagement';

import {
    getCheckRecordList
} from '../../common/api/api.purchaseorderswarehousing';

import QiniuUpload from '../../components/qiniu.upload.js';

/**
 * table head
 */
const columns = [{
    title: '审核日期',
    dataIndex: 'createDatetime',
}, {
    title: '审核人',
    dataIndex: 'realName',
}, {
    title: '审核意见',
    dataIndex: 'theContent',
}];


class NoticeManagementSubDetail extends React.Component {
    constructor(state) {
        super(state);
        this.state = ({
            tableId: getLocQueryByLabel('tableId') || '',
            flowOrderStateId: '', // 单据审核记录ID
            flowHistoryList: [], // 单据审核记录列表
            prodFileList: [], //附件上传
            noticeData: {},   //详情数据
            suggestModalVisible: false,
            type: '',         // pass 审核 reject 退回

            suggestContent: '', // 审核意见

        });

        this.getData = this.getData.bind(this);
    }
    componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        UE.delEditor(this.state.id);
    }
    componentDidMount() {
        var self = this;
        // console.log('did-------------------', self.state.noticeData);
        self.setState({
            noticeData: self.state.noticeData,
        });
        this.ueditorInit();

        if (this.state.tableId) {
            this.getData({
                tableId: this.state.tableId
            });
        }

    }

    ueditorInit() {
        var editor = UE.getEditor('noticeEdit', {
            //工具栏
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                // 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                // 'simpleupload',
                'horizontal', 'date', 'time',
            ]]
            , lang: "zh-cn"
            //字体
            , 'fontfamily': [
                { label: '', name: 'songti', val: '宋体,SimSun' },
                { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' },
                { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' },
                { label: '', name: 'heiti', val: '黑体, SimHei' },
                { label: '', name: 'lishu', val: '隶书, SimLi' },
                { label: '', name: 'andaleMono', val: 'andale mono' },
                { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' },
                { label: '', name: 'arialBlack', val: 'arial black,avant garde' },
                { label: '', name: 'comicSansMs', val: 'comic sans ms' },
                { label: '', name: 'impact', val: 'impact,chicago' },
                { label: '', name: 'timesNewRoman', val: 'times new roman' }
            ]
            //字号
            , 'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36]
            , enableAutoSave: false
            , autoHeightEnabled: false
            , initialFrameHeight: '400'
            , initialFrameWidth: '100%'
            , readonly: false
        });
        this.editor = editor;
        var self = this;
        editor.ready(function (ueditor) {
            var value = self.state.noticeData && self.state.noticeData.theContent ? self.state.noticeData.theContent : '在这里填写公告正文';
            editor.setContent(value);
        });
    }

    getData(params) {
        uProclamationDetail(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取详情信息失败');
            }

            var noticeData = res.data.proclamation;
            if (noticeData.fileList && noticeData.fileList.length) {
                noticeData.map(item => {
                    item = {
                        uid: Math.random(0, 1),
                        url: item.theLink,
                        name: item.theName,
                        status: 'done',
                    }
                });
            }

            this.setState({
                noticeData
            });

            //文件初始化
            if (res.data.filesList.length) {
                var tempFileList = [];
                res.data.filesList.map((item, index) => {
                    tempFileList.push({
                        uid: index,
                        name: item.theName,
                        size: item.theSize,
                        url: item.filePath,
                    });
                })
                this.setState({
                    prodFileList: tempFileList
                });
            } else {
                this.setState({
                    prodFileList: [],
                });
            }

            var flowOrderStateId = res.data.proclamation.flowOrderState ? res.data.proclamation.flowOrderState.tableId : '';
            if (flowOrderStateId) {
                this.setState({
                    flowOrderStateId
                });
                this._getCheckRecordList({
                    flowOrderStateId
                });
            }
        }).catch(err => MyToast('获取详情信息失败'));
    }

    _getCheckRecordList(flowOrderStateId) {
        getCheckRecordList(flowOrderStateId).then(item => {
            if (item.data.result !== 'success') {
                MyToast(item.data.info || '接口失败');
                return;
            }
            var flowHistoryList = item.data.flowHistoryList;

            flowHistoryList.length ?
                flowHistoryList.map(item => {
                    item.realName = item.member.realName;
                }) : '';

            this.setState({
                flowHistoryList
            })
        }).catch(err => MyToast('接口失败'));
    }


    handleProdFileList({ fileList }) {
        // console.log('附件上传----------------', fileList);
        this.setState({
            prodFileList: fileList,
        });
    }
    // 确定
    saveDetail() {
        var self = this;
        var form = this.props.form;
        form.validateFields((err, values) => {
            if (err) return;

            var tableId = self.state.tableId;
            var menuId = localStorage.getItem('uMenuId') || '';  // 新增时传menuId;

            // 时间格式处理--------------------
            // var publishDate = values.publishDate ? values.publishDate.format().split('T')[0] : (new Date()).toLocaleDateString();
            // var publishTime = values.publishDateTime ? values.publishDateTime.format().split('T')[1].split('+')[0] : '00:00:00';
            var theDate = values.theDate ? values.theDate.format().split('T')[0] : (new Date()).toLocaleDateString();
            // var theTime = values.theDateTime ? values.theDateTime.format().split('T')[1].split('+')[0] : '00:00:00';

            // 附件处理--------------------
            var prodFile = self.state.prodFileList;
            var data = [];
            if (!prodFile.length) {
                prodFile = [];
            } else {
                prodFile.map(item => {
                    var fileObj = {};
                    var url = '';
                    
                    if (!item.url) {
						url = item.response.filePath;
					}
					if (url.indexOf(downloadUrl) === -1) {
						url = downloadUrl + url;
                    }
                    
                    fileObj = {
                        filePath: url,
                        theName: item.name,
                        theSize: item.size,
                    }
                    data.push(fileObj);
                })
            }

            var params = { ...values };
            params.theContent = this.editor.getContent();
            // data.publishDatetime = publishDate + ' ' + publishTime;
            params.theDatetime = theDate;
            params.data = data;

            // tableId存在时为编辑--------------------
            if (tableId) {
                params.tableId = tableId;
                uProclamationUpdate(params).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '更新失败');
                        return;
                    }
                    MyToast('成功');
                    // setTimeout(() => {
                    //     parent.window.iframeHook.backPage({
                    //         url: '/noticemanagement.html',
                    //     });
                    // }, 500);
                }).catch(err => MyToast('更新失败'))
            } else {
                params.menuId = menuId;
                uProclamationAdd(params).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info || '新增失败');
                        return;
                    }
                    MyToast('成功');
                    self.setState({
                        tableId: res.data.tableId,
                        flowOrderStateId: res.data.flowOrderStateId
                    });
                    // setTimeout(() => {
                    //     parent.window.iframeHook.backPage({
                    //         url: '/noticemanagement.html',
                    //     });
                    // }, 500);
                }).catch(err => MyToast('新增失败'))
            }
        });
    }

    // 作废
    noticeCancel() {
        var tableId = this.state.tableId;
        uProclamationCancel({
            tableId
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '作废失败');
                return;
            }
            MyToast('成功');
            // setTimeout(() => {
            //     parent.window.iframeHook.backPage({
            //         url: '/noticemanagement.html',
            //     });
            // }, 500);
        }).catch(err => MyToast('作废失败'));
    }

    // 退回
    noticeReject() {
        var tableId = this.state.tableId;
        var theContent = this.state.suggestContent;
        uProclamationReject({
            tableId,
            theContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '退回失败');
                return;
            }
            MyToast('成功');
            this.suggestModalCancel();
            // setTimeout(() => {
            //     parent.window.iframeHook.backPage({
            //         url: '/noticemanagement.html',
            //     });
            // }, 500);
        }).catch(err => MyToast('退回失败'));
    }

    // 审核
    noticePass() {
        var tableId = this.state.tableId;
        var theContent = this.state.suggestContent;
        uProclamationPass({
            tableId,
            theContent
        }).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '审核失败');
                return;
            }
            MyToast('成功');
            this.suggestModalCancel();
            this._getCheckRecordList({
                flowOrderStateId: this.state.flowOrderStateId
            });
        }).catch(err => MyToast('审核失败'));
    }

    // onchange审核意见
    setSuggestContent(e) {
        this.setState({
            suggestContent: e.target.value
        });
    }

    // 审核意见弹窗关闭
    suggestModalCancel() {
        this.setState({
            suggestModalVisible: false,
        })
    }

    // 审核意见弹窗打开
    suggestModalShow(type) {
        this.setState({
            type,
            suggestModalVisible: true,
        });
    }

    // 审核弹窗确定操作
    suggestConfirm() {
        var type = this.state.type;
        if (type == 'reject') {
            this.noticeReject();
        } else if (type == 'pass') {
            this.noticePass();
        }
    }

    render() {
        var self = this;
        let { getFieldDecorator } = this.props.form;
        var noticeData = this.state.noticeData;
        if (noticeData.isPass) {
            noticeData.theState = '已审核';
        } else {
            if (noticeData.theState == 0) {
                noticeData.theState = '审核中';
            } else if (noticeData.theState == 1) {
                noticeData.theState = '已作废';
            }
        }
        // var publishDate = noticeData.publishDatetime ? noticeData.publishDatetime.split(' ')[0] : new Date();
        // var publishDateTime = noticeData.publishDatetime ? noticeData.publishDatetime.split(' ')[1] : '00:00:00';
        var theDate = noticeData.theDatetime ? noticeData.theDatetime : new Date();
        // var theDateTime = noticeData.theDatetime ? noticeData.theDatetime.split(' ')[1] : '00:00:00';
        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap">
                    <div className="yzy-tab-content-item-wrap">
                        <div className="actions-btns">
                            <Button type="primary" onClick={this.saveDetail.bind(this)}>保存</Button>
                            <Button type="primary" onClick={this.suggestModalShow.bind(this, 'pass')}>审核</Button>
                            <Popconfirm title='是否作废' onConfirm={this.noticeCancel.bind(this)} okText="确定" cancelText="取消">
                                <Button type="primary" className="btn-cancel">作废</Button>
                            </Popconfirm>
                            <Button type="primary" className="btn-reject" onClick={this.suggestModalShow.bind(this, 'reject')}>退回</Button>
                        </div>
                        <DraggableModal
                            visible={this.state.suggestModalVisible}
                            title={this.state.type == 'pass' ? '审核意见' : '退回意见'}
                            width='70%'
                            okText=''
                            footer={null}
                            onCancel={this.suggestModalCancel.bind(this)}
                            className='modal editModal'
                        >
                            <div className="suggestModal">
                                <TextArea rows={6} onChange={this.setSuggestContent.bind(this)} placeholder='请输入意见' />
                                <Button type="primary" onClick={self.suggestConfirm.bind(self)}>确定</Button>
                            </div>
                        </DraggableModal>
                        <Form>
                            <h2 className="yzy-tab-content-title">基本信息</h2>
                            <Row>
                                <FormItem {...formItemLayout} label="编号：">
                                    <Input placeholder="编号" value={noticeData ? noticeData.tableId : ''} disabled />
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem {...formItemLayout} label="主题：">
                                    {getFieldDecorator('theTitle', {
                                        initialValue: noticeData.theTitle,
                                        rules: [
                                            { required: true }
                                        ],
                                    })(
                                        <Input placeholder="主题" />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem {...formItemLayout} label="公司：">
                                    {getFieldDecorator('publishCompany', {
                                        initialValue: noticeData.publishCompany,
                                    })(
                                        <Input placeholder="公司" />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem {...formItemLayout} label="部门：">
                                    {getFieldDecorator('publishDepart', {
                                        initialValue: noticeData.publishDepart,
                                    })(
                                        <Input placeholder="部门" />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem {...formItemLayout} label="公告日期：">
                                    {getFieldDecorator('theDate', {
                                        initialValue: theDate ? moment(theDate, dateFormat) : moment(),
                                    })(
                                        <DatePicker style={{ width: '100%' }} format={dateFormat} placeholder="日期" />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem {...formItemLayout} label="审核状态：">
                                    <Input placeholder="审核状态" value={noticeData.theState} disabled />
                                </FormItem>
                            </Row>
                            <script id='noticeEdit' name="content" type="text/plain"></script>

                            <Row>
                                <Col className="upload-section">
                                    <FormItem {...formItemLayout} label="附件上传">
                                        <QiniuUpload
                                            uploadTitle="图片"
                                            maxLength={5}
                                            uploadedFileList={this.state.prodFileList}
                                            handleUploadedFileList={this.handleProdFileList.bind(this)}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <h2 className="yzy-tab-content-title">审核记录</h2>
                        <Table
                            columns={columns}
                            dataSource={this.state.flowHistoryList}
                            rowKey="tableId"
                            loading={this.state.loading}
                            rowClassName={(record, index) => {
                                if (index % 2 !== 0) {
                                    return 'active'
                                }
                            }} />
                    </div>
                </div>
            </div>
        )
    }
}

const NoticeEdit = Form.create()(NoticeManagementSubDetail);
ReactDOM.render(<NoticeEdit />, document.getElementById('root'));