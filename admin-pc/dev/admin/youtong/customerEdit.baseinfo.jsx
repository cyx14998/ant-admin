import React from 'react';

import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
const formItemLayoutInner = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
}
class AM extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return null;
    }
}

const CustomerEditBaseinfo = ({
  baseinfo,
    handleChange,
    handleSubmit,
    getFieldDecorator
}) => (
        <div className=" pollutersBox">
            <Form onSubmit={() => handleSubmit('CustomerEditBaseinfo')} hideRequiredMark>
                <div className="baseInfoBox">
                    <div className="baseInfoTitle">基本信息 {baseinfo.info}</div>
                </div>
                <Row>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="企业名称">
                            {getFieldDecorator('name', {
                                initialValue: '企业名称',
                                rules: [{ required: true },
                                { pattern: /^[0-9]*$/ }
                                ],
                            })(
                                <Input size="small" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="社会信用代码">
                            {getFieldDecorator('GameCode1', {
                                initialValue: '社会信用代码',
                                rules: [{ required: true, message: 'Please input your GameCode!' },
                                { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                ],
                            })(
                                <Input size="small" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="单位类别">
                            {getFieldDecorator('GameCode2', {
                                initialValue: '单位类别',
                                rules: [{ required: true, message: 'Please input your GameCode!' },
                                { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                ],
                            })(
                                <Input size="small" />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="中心维度">
                            {getFieldDecorator('Game', {
                                initialValue: '中心维度',
                                rules: [{ required: true, message: 'Please input your Game!' },
                                { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                ],
                            })(
                                <Row >
                                    <Col span={6}><Input size="small" /></Col>
                                    <Col span={2}>度</Col>
                                    <Col span={6}><Input size="small" /></Col>
                                    <Col span={2}>分</Col>
                                    <Col span={6}><Input size="small" /></Col>
                                    <Col span={2}>秒</Col>
                                </Row>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="中心经度">
                            {getFieldDecorator('Game1', {
                                initialValue: '中心经度',
                                rules: [{ required: true, message: 'Please input your Game!' },
                                { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                ],
                            })(
                                <Row gutter={10}>
                                    <Col span={6}><Input size="small" /></Col>
                                    <Col span={2}>度</Col>
                                    <Col span={6}><Input size="small" /></Col>
                                    <Col span={2}>分</Col>
                                    <Col span={6}><Input size="small" /></Col>
                                    <Col span={2}>秒</Col>
                                </Row>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="邮政编码">
                            {getFieldDecorator('Game2', {
                                initialValue: '邮政编码',
                                rules: [{ required: true, message: 'Please input your Game!' },
                                { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                ],
                            })(
                                <Input size="small" />
                                )}
                        </FormItem>
                    </Col>
                </Row>

                <Button type="submit" onClick={() => handle('handle form submit')}>submit</Button>
            </Form>
        </div>
    );


export default CustomerEditBaseinfo;





