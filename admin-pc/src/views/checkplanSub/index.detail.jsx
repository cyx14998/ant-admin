/**
 * 检查子表编辑页面
 */
import React from 'react';

import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
    Radio
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import {
    MyToast
} from '../../common/utils';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
const performers = [
    { tableId: 1, theName: '张某' },
    { tableId: 2, theName: '李某' },
    { tableId: 3, theName: '王某' }
]
import {
    getWasteSolidDetail,
    getWastesolidUpdate,
    getWastesolidAdd,
} from '../../common/api/api.customer.plus.js';

class CheckplanDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        var tableId = this.props.editId;
        if (!tableId) {
            localStorage.setItem("wastewaterDischargeIsShow", "none");
            return;
        }
        localStorage.setItem("wastewaterDischargeIsShow", "block");
        getWasteSolidDetail({ tableId: tableId }).then(res => {
            console.log('getCheckplanDetail res ---', res);
            if (res.data.result !== 'success') {
                MyToast(res.data.info)
                return;
            }
            this.setState({ data: res.data.wasteSolid })
        }).catch(err => {
            MyToast('接口调用失败')
        })
    }
    selectPerformer(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    // 基本信息保存
    saveDetail(e) {
        e.preventDefault();
        const {
            form
        } = this.props;

        form.validateFields((err, values) => {
            if (err) return;
            var tableId = this.props.editId;
            if (tableId) {
                getWastesolidUpdate({
                    ...values,
                    tableId: tableId
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("保存成功")
                    localStorage.setItem("wastewaterDischargeIsShow", "block");
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            } else {
                // 新增
                getWastesolidAdd({
                    ...values,
                }).then(res => {
                    if (res.data.result !== 'success') {
                        MyToast(res.data.info)
                        return;
                    }
                    MyToast("新增成功")
                    localStorage.setItem("wastewaterDischargeIsShow", "block");
                }).catch(err => {
                    MyToast('接口调用失败')
                });
            }
        })
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="yzy-tab-content-item-wrap">
                <Form onSubmit={this.saveDetail.bind(this)}>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="反馈单下载地址">
                                    {getFieldDecorator('feedbackSheetURL', {
                                        initialValue: this.state.data.feedbackSheetURL,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="编号" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="检查记录下载地址">
                                    {getFieldDecorator('regulatoryRecordURL', {
                                        initialValue: this.state.data.regulatoryRecordURL,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="编号" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="备注">
                                    {getFieldDecorator('theRemarks', {
                                        initialValue: this.state.data.theRemarks,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="危险废物名称" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div className="yzy-block-center">
                        <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
                    </div>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">检查计划子表信息详情</h2>
                      
                    </div>
                </Form>
            </div >
        )
    }
}

ReactDOM.render(<CheckplanDetail />, document.getElementById('root'));
