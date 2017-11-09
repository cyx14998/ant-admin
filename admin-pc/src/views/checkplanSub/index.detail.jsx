/**
 * 检查子表编辑页面
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Row,
    Col,
    Input,
    Upload,
    Icon,
    Modal,
} from 'antd';

import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
);

import {
    getCheckplanSubAdd,
    getCheckplanSubEdit,
    getCheckplanSubPerformer,
    getCheckplanSubDetail
} from '../../common/api/api.checkplan';


class CheckplanSubDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {},
            prodImgUrl: '',
            positionImgUrl: '',
            reportUrl: '',

            recordEdit: this.props.recordEdit || {},//新增子表返回的子表id用来显示底面的员工列表
        });
        this.resetFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            self.setState({
                recordEdit: nextProps.recordEdit
            })
            console.log('will-------------', nextProps.recordEdit);
            self.resetFile();

        }

    }
    componentDidMount() {
        var self = this;
        console.log('did-------------------', self.props.recordEdit);
        self.setState({
            recordEdit: self.props.recordEdit
        });
        self.resetFile();
    }
    //文件重置
    resetFile() {
        var self = this;
        var recordEdit = self.state.recordEdit;
        console.log('recordEdit详情-----------',recordEdit)

        if (recordEdit.feedbackSheetURL) {
            self.setState({
                prodImgUrl: recordEdit.feedbackSheetURL
            });
        } else {
            self.setState({
                prodImgUrl: ''
            });
        }
        if (recordEdit.regulatoryRecordURL) {
            self.setState({
                positionImgUrl: recordEdit.regulatoryRecordURL
            });
        } else {
            self.setState({
                positionImgUrl: ''
            });
        }
        if (recordEdit.rectificationReportURL) {
            self.setState({
                reportUrl: recordEdit.rectificationReportURL
            });
        } else {
            self.setState({
                reportUrl: ''
            });
        }
    }

    render() {
        var recordEdit = this.state.recordEdit;
        var prodImgUrl = this.state.prodImgUrl;
        var positionImgUrl = this.state.positionImgUrl;
        var reportUrl = this.state.reportUrl
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                    <Row style={{fontSize: 12}}>
                        <Col span={2}> 企业名称：</Col>
                        <Col span={8}>{recordEdit.customer ? recordEdit.customer.customerName : ''}</Col>
                        <Col span={2}>备注：</Col>
                        <Col span={8}>{recordEdit.theRemarks ? recordEdit.theRemarks : '无'}</Col>
                    </Row>
                    <h2 className="yzy-tab-content-title">反馈单下载</h2>
                    <a target="_blank" download="图片" href={prodImgUrl} style={{ marginLeft: 8 }}>{prodImgUrl ? '点击下载' : '无'}</a>
                    <h2 className="yzy-tab-content-title">检查记录下载</h2>
                    <a target="_blank" download="图片" href={positionImgUrl} style={{ marginLeft: 8 }}>{positionImgUrl ? '点击下载' : '无'}</a>
                    <h2 className="yzy-tab-content-title">整改报告</h2>
                    <a target="_blank" download="图片" href={reportUrl} style={{ marginLeft: 8 }}>{reportUrl ? '点击下载' : '无'}</a>
                </div>
            </div>
        )
    }
}

export default CheckplanSubDetail;
