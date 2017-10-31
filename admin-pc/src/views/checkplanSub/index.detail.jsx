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

            recordEdit: this.props.recordEdit || '',//新增子表返回的子表id用来显示底面的员工列表
        });
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (self.state.recordEdit !== nextProps.recordEdit) {
            console.log('编辑')
            self.setState({
                recordEdit: nextProps.recordEdit
            })
            //图片
            if (nextProps.recordEdit.feedbackSheetURL) {
                self.setState({
                    prodImgUrl: nextProps.recordEdit.feedbackSheetURL
                });
            } else {
                self.setState({
                    prodImgUrl: ''
                });
            }
            if (nextProps.recordEdit.regulatoryRecordURL) {
                self.setState({
                    positionImgUrl: nextProps.recordEdit.regulatoryRecordURL
                });
            } else {
                self.setState({
                    positionImgUrl: ''
                });
            }
        }

    }
    componentDidMount() {
        var self = this;
        console.log(self.props.recordEdit);
        self.setState({
            recordEdit: self.props.recordEdit
        });
    }
    render() {
        var recordEdit = this.state.recordEdit;
        var prodImgUrl = recordEdit.feedbackSheetURL;
        var positionImgUrl=recordEdit.regulatoryRecordURL;
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                    <Row>
                        <Col span={2}> 企业名称：</Col>
                        <Col span={8}>{recordEdit.customer ? recordEdit.customer.customerName : ''}</Col>
                        <Col span={2}>备注：</Col>
                        <Col span={8}>{recordEdit.theRemarks ? recordEdit.theRemarks : '无'}</Col>
                    </Row>
                    <h2 className="yzy-tab-content-title">反馈单下载</h2>
                    <a href={prodImgUrl} style={{ marginLeft: 8 }}>{prodImgUrl?prodImgUrl:'无'}</a>
                    <h2 className="yzy-tab-content-title">检查记录下载</h2>
                    <a href={positionImgUrl} style={{ marginLeft: 8 }}>{positionImgUrl?positionImgUrl:'无'}</a>
                    <h2 className="yzy-tab-content-title">附件下载</h2>
                    <a href="#" style={{ marginLeft: 8 }}>附件下载地址</a>
            </div>
            </div >
        )
    }
}

export default CheckplanSubDetail;
