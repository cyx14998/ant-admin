import React from 'react';

import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;


const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
}
const formItemLayoutSmall = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
}
// class AM extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return null;
//     }
// }
const columns = [{
  title: '主要产品名称',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '计量单位',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '设计年产量',
  dataIndex: 'address',
  key: 'address',
},
//  {
//   title: 'Action',
//   key: 'action',
//   render: (text, record) => (
//     <span>
//       <a href="#">Action 一 {record.name}</a>
//     </span>
//   ),
// }
];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
},{
  key: '4',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
},{
  key: '5',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
},{
  key: '6',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
const CustomerEditBaseinfo = ({
    customerBaseinfo,
    provinceData,
    provinceOptions,
    cityOptions,
    countyOptions,
    townOptions,
    handleProvinceChange,
    onSecondCityChange,
    onCountyChange,
    onTownChange,
    handleChange,
    handleFormSubmit,
    getFieldDecorator
}) => (
        <div className="customerBaseinfoBox">
            <Form onSubmit={handleFormSubmit} hideRequiredMark>
                <div className="baseInfoFormBox">
                    <div className="baseInfoFormTitle">基本信息</div>
                    <Row>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="企业名称">
                                {getFieldDecorator('customerName', {
                                    initialValue: customerBaseinfo.customer.customerName,
                                    rules: [{ required: true },
                                    {/* { pattern: /^[0-9]*$/ } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="社会信用代码">
                                {getFieldDecorator('uniformSocialCreditCode', {
                                    initialValue: customerBaseinfo.customer.uniformSocialCreditCode,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="单位类别">
                                {getFieldDecorator('unitCategory', {
                                    initialValue: customerBaseinfo.customer.unitCategory ? customerBaseinfo.customer.unitCategory : '单位类别',
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
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
                                    initialValue: customerBaseinfo.customer.latitude,
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="中心经度">
                                {getFieldDecorator('longitude', {
                                    initialValue: customerBaseinfo.customer.longitude,
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="邮政编码">
                                {getFieldDecorator('postalCode', {
                                    initialValue: customerBaseinfo.customer.postalCode,
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Col span={3}></Col>
                            <Col span={9}>
                                <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="联系人">
                                    {getFieldDecorator('contactPerson', {
                                        initialValue: customerBaseinfo.customer.contactPerson,
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input size="small" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="电话">
                                    {getFieldDecorator('phoneNumber', {
                                        initialValue: customerBaseinfo.customer.phoneNumber,
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
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
                                    initialValue: customerBaseinfo.customer.fax,
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="行业类别">
                                {getFieldDecorator('industryCategory', {
                                    initialValue: customerBaseinfo.customer.industryCategory ? customerBaseinfo.customer.industryCategory : '行业类别',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
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
                                        initialValue: customerBaseinfo.customer.address ? customerBaseinfo.customer.address : '企业地址',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <div>
                                            <Row gutter={2}>
                                                <Col span={14}>
                                                    <Select size="small" defaultValue={provinceData[0]} style={{ width: 91 }} onChange={handleProvinceChange}>
                                                        {provinceOptions}
                                                    </Select>
                                                    <Select size="small" value={customerBaseinfo.secondCity} style={{ width: 91 }} onChange={onSecondCityChange}>
                                                        {cityOptions}
                                                    </Select>
                                                    <Select size="small" value={customerBaseinfo.thirdCounty} style={{ width: 91 }} onChange={onCountyChange}>
                                                        {countyOptions}
                                                    </Select>
                                                    <Select size="small" value={customerBaseinfo.forthTown} style={{ width: 91 }} onChange={onTownChange}>
                                                        {townOptions}
                                                    </Select>
                                                </Col>
                                                <Col span={10}>
                                                    <Input size="small" />
                                                </Col>
                                            </Row>
                                        </div>
                                        )}
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="企业规模">
                                {getFieldDecorator('enterpriseScale', {
                                    initialValue: customerBaseinfo.customer.enterpriseScale ? customerBaseinfo.customer.enterpriseScale : '企业规模',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
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
                                    initialValue: customerBaseinfo.customer.openingDate,
                                    rules: [{ required: true },
                                    {/* { pattern: /^[0-9]*$/ } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="隶属关系">
                                {getFieldDecorator('affiliation', {
                                    initialValue: customerBaseinfo.customer.affiliation,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="重点级别">
                                {getFieldDecorator('priorityLevel', {
                                    initialValue: customerBaseinfo.customer.priorityLevel,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="重点类型">
                                {getFieldDecorator('priorityType', {
                                    initialValue: customerBaseinfo.customer.priorityType ? customerBaseinfo.customer.priorityType : '重点类型',
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
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
                                    <FormItem labelCol={{ span: 14 }} wrapperCol={{ span: 10 }} label="废气排放口数量">
                                        {getFieldDecorator('exhaustEmissionsPorts', {
                                            initialValue: customerBaseinfo.customer.exhaustEmissionsPorts,
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                            ],
                                        })(
                                            <Input size="small" addonAfter="个" />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem labelCol={{ span: 14 }} wrapperCol={{ span: 10 }} label="废水排放口数量">
                                        {getFieldDecorator('wastewaterDischargePorts', {
                                            initialValue: customerBaseinfo.customer.wastewaterDischargePorts,
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                            ],
                                        })(
                                            <Input size="small" addonAfter="个" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="是否燃气电厂">
                                {getFieldDecorator('isGasPowerPlant', {
                                    initialValue: (customerBaseinfo.customer.isCentralEnterprises + "") ? (customerBaseinfo.customer.isCentralEnterprises + "") : 'true',
                                    rules: [{ required: true, message: 'Please input your Game!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Select size="small" >
                                        <Option value="true">是</Option>
                                        <Option value="false">否</Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Col span={2}></Col>
                            <Col span={9}>
                                <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} label="是否央企">
                                    {getFieldDecorator('isCentralEnterprises', {
                                        initialValue: (customerBaseinfo.customer.isCentralEnterprises + "") ? (customerBaseinfo.customer.isCentralEnterprises + "") : 'true',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select size="small" >
                                            <Option value="true">是</Option>
                                            <Option value="false">否</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={13}>
                                <FormItem labelCol={{ span: 17 }} wrapperCol={{ span: 7 }} label="是否3千万千瓦以上电力">
                                    {getFieldDecorator('isMoreThan30PowerEnterprise', {
                                        initialValue: (customerBaseinfo.customer.isMoreThan30PowerEnterprise + "") ? (customerBaseinfo.customer.isMoreThan30PowerEnterprise + "") : 'true',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select size="small" >
                                            <Option value="true">是</Option>
                                            <Option value="false">否</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={16}>
                            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="央企名称">
                                {getFieldDecorator('centralEnterprisesName', {
                                    initialValue: customerBaseinfo.customer.centralEnterprisesName,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={4}>
                            <FormItem {...formItemLayoutSmall} label="化学需氧量">
                                {getFieldDecorator('aiChemicalOxygenDemand', {
                                    initialValue: customerBaseinfo.customer.aiChemicalOxygenDemand,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...formItemLayoutSmall} label="氮氧">
                                {getFieldDecorator('aiAmmoniaNitrogen', {
                                    initialValue: customerBaseinfo.customer.aiAmmoniaNitrogen,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...formItemLayoutSmall} label="氮氧化物">
                                {getFieldDecorator('aiNitrogenOxide', {
                                    initialValue: customerBaseinfo.customer.aiNitrogenOxide,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...formItemLayoutSmall} label="烟尘">
                                {getFieldDecorator('aiSmoke', {
                                    initialValue: customerBaseinfo.customer.aiSmoke,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...formItemLayoutSmall} label="二氧化硫">
                                {getFieldDecorator('aiSulfurDioxide', {
                                    initialValue: customerBaseinfo.customer.aiSulfurDioxide,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...formItemLayoutSmall} label="悬浮物">
                                {getFieldDecorator('aiSuspendedSolids', {
                                    initialValue: customerBaseinfo.customer.aiSuspendedSolids,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="其他">
                                {getFieldDecorator('aiOther', {
                                    initialValue: customerBaseinfo.customer.aiOther,
                                    rules: [{ required: true, message: 'Please input your GameCode!' },
                                    {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                    ],
                                })(
                                    <Input size="small" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="tableBox">
                    <Row gutter={20}>
                        <Col className="tableItemBox clearfix" span={12}>
                                <div className="baseInfoFormTitle">主要产品基本信息</div>
                                <Button className="addBtn f_right" type="primary" onClick={handleChange}>新增</Button>
                                <Table columns={columns} dataSource={data} scroll={{ y: 180 }}/>
                        </Col>
                        <Col className="tableItemBox clearfix" span={12}>
                                <div className="baseInfoFormTitle">主要产品基本信息</div>
                                <Button className="addBtn f_right" type="primary" onClick={handleChange}>新增</Button>
                                <Table claName="table" columns={columns} dataSource={data} scroll={{ y: 180 }} />
                        </Col>
                    </Row>
                </div>
                <Button type="primary" htmlType="submit">submit</Button>
            </Form>
        </div>
    );


export default CustomerEditBaseinfo;





