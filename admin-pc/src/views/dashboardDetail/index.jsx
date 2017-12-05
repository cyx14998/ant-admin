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
} from '../../common/api/api.noticemanagement';

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
            filesList: [],    //附件
            noticeData: {},   //详情数据
        });

        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData({
            tableId: this.state.tableId
        });
    }

    getData(params) {
        uProclamationDetail(params).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '获取详情信息失败');
            }

            var noticeData = res.data.proclamation;
            this.setState({
                noticeData,
                filesList: res.data.filesList
            });
        }).catch(err => MyToast('获取详情信息失败'));
    }

    render() {
        var self = this;
        var noticeData = this.state.noticeData;
        return (
            <div className="yzy-page">
                <div className="yzy-list-wrap">
                    <div className="yzy-tab-content-item-wrap clearfix">
                        <h1>关于{noticeData.theTitle}的通告</h1>
                        <div className="dash-content" dangerouslySetInnerHTML={{
                            __html: noticeData.theContent
                        }} >
                        </div>
                        <div className="company-info">
                            <div className="name">{noticeData.publishCompany}</div>
                            <div className="time">{noticeData.theDatetime}</div>
                        </div>
                    </div>
                </div>
                <div className={self.state.filesList.length ? 'fileList' : 'none'}>
                    {
                        self.state.filesList.length ?
                            self.state.filesList.map((item, index) => {
                                return <div key={index} className="clearfix">
                                    <a target="_blank" href={item.filePath} title={item.theName}>{item.theName}</a>
                                </div>
                            }) : ''
                    }
                </div>
            </div>
        )
    }
}

const NoticeEdit = Form.create()(NoticeManagementSubDetail);
ReactDOM.render(<NoticeEdit />, document.getElementById('root'));