/**
 * 权限编辑页面
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Table
} from 'antd';
const FormItem = Form.Item;

import {
    getLocQueryByLabel, MyToast
} from '../../common/utils';
import DraggableModal from '../../components/modal.draggable';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

import {
    uRoleList,
} from '../../common/api/api.flowStep';


const flowStepColumns = [
    {
        title: '编号',
        dataIndex: 'tableId',
    }, {
        title: '角色名称',
        dataIndex: 'theName',
    }, {
        title: '创建时间',
        dataIndex: 'createDatetime',
    },
]

class AuthoritySubDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: {},
            checkedKeys: [],
            uFlowRoleList: [],
            flowStepModalVisible: false, // 
            flowStepRowKeysArr: [],
        });
    }
    componentDidMount() {
        var self = this;

        uRoleList({}).then(res => {
            if (res.data.result !== 'success') {
                MyToast(res.data.info || '接口失败')
                return;
            }

            var data = res.data.flowRoleList;
            this.setState({
                loading: false,
                uFlowRoleList: data
            });
        }).catch(err => {
            MyToast(err || '接口失败')
        });
    }
    // 确定
    saveDetail() {
        var self = this;
        var form = this.props.form;
        form.validateFields((err, values) => {
            console.log(values);
        });
    }

    onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    flowListModalOk() {

    }

    render() {
        var self = this;
        let { getFieldDecorator } = this.props.form;
        var flowStepRowKeysArr = this.state.flowStepRowKeysArr;

        const flowStepRowSelection = {
            flowStepRowKeysArr,
            type: 'radio',
            onChange(selectedRowKeys) {
                console.log(`purOrdSelectedRowKeys changed: ${selectedRowKeys}`);
            },
            onSelect(record, selected, selectedRows) {
                self.setState({
                    flowStepRowKeysArr: selectedRows
                })
                console.log('---------------------record', record, '------------selected', selected, '------------------selectedRows', selectedRows);
            }
        };
        return (
            <div className="yzy-tab-content-item-wrap">
                <div className="baseinfo-section">
                    <Form>
                        <Row>
                            
                        </Row>
                    </Form>
                    <div className="actions-btns">
                        <Button type="primary" onClick={this.saveDetail.bind(this)}>保存</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(AuthoritySubDetail);
