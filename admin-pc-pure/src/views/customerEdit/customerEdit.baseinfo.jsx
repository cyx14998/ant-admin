import React from 'react';

import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
// const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
// const cityOptions = customerBaseinfo.cities.map(city => <Option key={city}>{city}</Option>);
// const countyOptions = customerBaseinfo.thirdCounty.map(county => <Option key={county}>{county}</Option>);
// const townOptions = customerBaseinfo.forthTown.map(town => <Option key={town}>{town}</Option>);

// class AM extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return null;
//     }
// }

const CustomerEditBaseinfo = ({
    baseinfo,
    handleProvinceChange,
    onSecondCityChange,
    onCountyChange,
    onTownChange,
    handleChange,
    handleSubmit,
    getFieldDecorator
}) => (
        <div className="baseInfoBox">
            {
                console.log(baseinfo)
            }
            <Form onSubmit={() => handleSubmit('CustomerEditBaseinfo')} hideRequiredMark>
                <div className="baseInfoFormBox">
                    <div className="baseInfoFormTitle">基本信息</div>
                    <Row>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="企业名称">
                                {getFieldDecorator('customerName', {
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
                                {getFieldDecorator('uniformSocialCreditCode', {
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
                                {getFieldDecorator('unitCategory', {
                                    initialValue: 'lucy',
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                    ],
                                })(
                                    <Select size="small" >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="中心纬度">
                                {getFieldDecorator('latitude', {
                                    initialValue: '中心纬度',
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
                            <FormItem {...formItemLayout} label="中心经度">
                                {getFieldDecorator('longitude', {
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
                                {getFieldDecorator('postalCode', {
                                    initialValue: '邮政编码',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                    ],
                                })(
                                    <Input size="small" style={{ width: 260 }} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Col span={1}></Col>
                            <Col span={11}>
                                <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="联系人">
                                    {getFieldDecorator('contactPerson', {
                                        initialValue: '联系人',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                        ],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="电话">
                                    {getFieldDecorator('phoneNumber', {
                                        initialValue: '电话',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                        ],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="传真">
                                {getFieldDecorator('fax', {
                                    initialValue: '传真',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="行业类别">
                                {getFieldDecorator('industryCategory', {
                                    initialValue: '行业类别',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                    ],
                                })(
                                    <Select size="small" >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Col span={24}>
                                <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="企业地址">
                                    {getFieldDecorator('address', {
                                        initialValue: '企业地址',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                        ],
                                    })(
                                        <div>
                                            <Col span={14}>
                                                {/* <Select size="small" defaultValue={provinceData[0]} style={{ width: 91 }} onChange={this.handleProvinceChange}>
                                                    {provinceOptions}
                                                </Select>
                                                <Select size="small" value={this.state.secondCity} style={{ width: 91 }} onChange={this.onSecondCityChange}>
                                                    {cityOptions}
                                                </Select>
                                                <Select size="small" value={this.state.thirdCounty} style={{ width: 91 }} onChange={this.onCountyChange}>
                                                    {countyOptions}
                                                </Select>
                                                <Select size="small" value={this.state.forthTown} style={{ width: 91 }} onChange={this.onTownChange}>
                                                    {townOptions}
                                                </Select> */}
                                            </Col>
                                            <Col span={10}>
                                                <Input size="small" />
                                            </Col>
                                        </div>
                                        )}
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="企业规模">
                                {getFieldDecorator('enterpriseScale', {
                                    initialValue: '企业规模',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                    ],
                                })(
                                    <Select size="small" >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="otherInfoFormBox">
                    <div className="baseInfoFormTitle">其他信息</div>
                    <Row>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="投产日期">
                                {getFieldDecorator('openingDate', {
                                    initialValue: '投产日期',
                                    rules: [{ required: true },
                                    { pattern: /^[0-9]*$/ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="隶属关系">
                                {getFieldDecorator('affiliation', {
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
                            <FormItem {...formItemLayout} label="重点级别">
                                {getFieldDecorator('priorityLevel', {
                                    initialValue: '重点级别',
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
                            <FormItem {...formItemLayout} label="单位类别">
                                {getFieldDecorator('unitCategory', {
                                    initialValue: 'lucy',
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                    ],
                                })(
                                    <Select size="small" >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Col span={12}>
                                    <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="单位类别">
                                        {getFieldDecorator('unitCategory', {
                                            initialValue: 'lucy',
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                            ],
                                        })(
                                            <Row>
                                                <Col span={20}>
                                                    <Input size="small" />
                                                </Col>
                                                <Col span={4}>个</Col>
                                            </Row>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="单位类别">
                                        {getFieldDecorator('unitCategory', {
                                            initialValue: 'lucy',
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                                            ],
                                        })(
                                            <Row>
                                                <Col span={20}>
                                                    <Input size="small" />
                                                </Col>
                                                <Col span={4}>个</Col>
                                            </Row>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                {/* <Button type="submit" onClick={() => handle('handle form submit')}>submit</Button> */}
            </Form>
        </div>
    );


export default CustomerEditBaseinfo;





