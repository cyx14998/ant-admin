/**
 * 排污单位基本情况 -- 详情模块
 */
import React from 'react';
import {
    Form,
    Table,
    Icon,
    Input,
    Button,
    Select,
    Popconfirm,
    Upload,
    Menu,
    Alert,
    message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { getLocQueryByLabel } from '../../common/utils';

import {
    getCustomerInfoById,
    saveCustomerInfoById,
    getProductBaseInfoList
} from '../../common/api/api.customer';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const formItemLayoutInner = {
    labelCol: { span: 16 },
    wrapperCol: { span: 8 },
}

class CustomerEditBaseinfoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            customer: {}
        })
    }

    componentDidMount() {
        // fetch data from api for FormItem initialValue
        var cusId = getLocQueryByLabel('id');

        if (!cusId) return;
        //获取基本信息
        getCustomerInfoById(cusId).then(res => {
            console.log('getCustomerInfoById res', res);
            if (res.data.result !== 'success') {
                return
            }
            // console.log(res.data.customer)
            this.setState({
                customer: res.data.customer
            })
        }).catch(err => console.log(err));
        // 获取产品信息列表
        getProductBaseInfoList({ id: cusId }).then(res => {
            if (res.data.result !== 'success') {
                return
            }
            console.log(res)
            //  this.setState({
            //     productInfo: res.data.customer
            // })
        }).catch(err => console.log(err))
    }
    // 基本信息保存
    saveDetail(e) {
        e.preventDefault();
        const {
      form
    } = this.props;

        form.validateFields((err, values) => {
            if (err) return;
            console.log('when saveDetail ---', values);

            // address
            var data = { ...values };

            saveCustomerInfoById(data).then(res => {
                console.log('saveCustomerInfoById res', res);
                if (res.data.result !== 'success') {
                    return
                    console.log('success');
                }
            }).catch(err => console.log(err))
        })
    }

    render() {
        let {
      getFieldDecorator
    } = this.props.form;
        var customer = this.state.customer;
        return (
            <div className="yzy-tab-content-item-wrap">
                <Form onSubmit={this.saveDetail.bind(this)}>
                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">基本信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业名称">
                                    {getFieldDecorator('customerName', {
                                        initialValue: customer.customerName,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="企业名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="社会信用代码">
                                    {getFieldDecorator('uniformSocialCreditCode', {
                                        initialValue: customer.uniformSocialCreditCode,
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="社会信用代码" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="单位类别">
                                    {getFieldDecorator('unitCategory', {
                                        initialValue: customer.unitCategory ? customer.unitCategory : '单位类别',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
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
                                        initialValue: customer.latitude ? customer.latitude + "" : '',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="中心纬度" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="中心经度">
                                    {getFieldDecorator('longitude', {
                                        initialValue: customer.longitude ? customer.longitude + "" : '',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="中心经度" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="邮政编码">
                                    {getFieldDecorator('postalCode', {
                                        initialValue: customer.postalCode ? customer.postalCode + "" : '',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="邮政编码" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="联系人">
                                    {getFieldDecorator('contactPerson', {
                                        initialValue: customer.contactPerson,
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="联系人" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="电话">
                                    {getFieldDecorator('phoneNumber', {
                                        initialValue: customer.phoneNumber,
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="电话" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="传真">
                                    {getFieldDecorator('fax', {
                                        initialValue: customer.fax,
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="传真" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="行业类别">
                                    {getFieldDecorator('industryCategory', {
                                        initialValue: customer.industryCategory ? customer.industryCategory : '行业类别',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业规模">
                                    {getFieldDecorator('enterpriseScale', {
                                        initialValue: customer.enterpriseScale ? customer.enterpriseScale : '企业规模',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
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
                            <Col span={5} style={{ marginRight: '10px' }}>
                                <FormItem labelCol={{ span: 13 }} wrapperCol={{ span: 11 }} label="企业地址">
                                    {getFieldDecorator('address', {
                                        initialValue: '123',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={3} style={{ marginRight: '10px' }}>
                                <FormItem>
                                    {getFieldDecorator('address2', {
                                        initialValue: '123',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={3} style={{ marginRight: '10px' }}>
                                <FormItem>
                                    {getFieldDecorator('address3', {
                                        initialValue: '123',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={3} style={{ marginRight: '10px' }}>
                                <FormItem>
                                    {getFieldDecorator('address4', {
                                        initialValue: '12',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    {getFieldDecorator('addr', {
                                        initialValue: 'addr',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="详细地址" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>

                    <div className="baseinfo-section">
                        <h2 className="yzy-tab-content-title">其他信息</h2>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="行业类别">
                                    {getFieldDecorator('industryCategory', {
                                        initialValue: customer.industryCategory ? customer.industryCategory : '行业类别',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="企业规模">
                                    {getFieldDecorator('enterpriseScale', {
                                        initialValue: customer.enterpriseScale ? customer.enterpriseScale : '企业规模',
                                        rules: [{ required: true, message: 'Please input your Game!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="投产日期">
                                    {getFieldDecorator('openingDate', {
                                        initialValue: customer.openingDate,
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="投产日期" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="隶属关系">
                                    {getFieldDecorator('affiliation', {
                                        initialValue: customer.affiliation ? customer.affiliation : '隶属关系',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="重点级别">
                                    {getFieldDecorator('priorityLevel', {
                                        initialValue: customer.priorityLevel,
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="重点级别" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="重点类型">
                                    {getFieldDecorator('unitCategory', {
                                        initialValue: customer.unitCategory ? customer.unitCategory : '重点类型',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
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
                                <FormItem {...formItemLayout} label="废气排放口数量">
                                    {getFieldDecorator('exhaustEmissionsPorts', {
                                        initialValue: customer.exhaustEmissionsPorts ? customer.exhaustEmissionsPorts + "" : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="废气排放口数量" addonAfter="个" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="废水排放口数量">
                                    {getFieldDecorator('wastewaterDischargePorts', {
                                        initialValue: customer.wastewaterDischargePorts ? customer.wastewaterDischargePorts + "" : '',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="废水排放口数量" addonAfter="个" />
                                        )}
                                </FormItem></Col>
                            <Col span={8}>
                                <Col span={12}>
                                    <FormItem {...formItemLayoutInner} label="是否燃气电厂">
                                        {getFieldDecorator('isGasPowerPlant', {
                                            initialValue: (customer.isGasPowerPlant + "") ? (customer.isGasPowerPlant + "") : 'true',
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                            ],
                                        })(
                                            <Select>
                                                <Option value="true">是</Option>
                                                <Option value="false">否</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem {...formItemLayoutInner} label="是否央企">
                                        {getFieldDecorator('isCentralEnterprises', {
                                            initialValue: (customer.isCentralEnterprises + "") ? (customer.isCentralEnterprises + "") : 'true',
                                            rules: [{ required: true, message: 'Please input your GameCode!' },
                                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                            ],
                                        })(
                                            <Select>
                                                <Option value="true">是</Option>
                                                <Option value="false">否</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="是否30万千瓦以上电力">
                                    {getFieldDecorator('isMoreThan30PowerEnterprise', {
                                        initialValue: (customer.isMoreThan30PowerEnterprise + "") ? (customer.isMoreThan30PowerEnterprise + "") : 'true',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Select>
                                            <Option value="true">是</Option>
                                            <Option value="false">否</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="化学需氧量">
                                    {getFieldDecorator('aiChemicalOxygenDemand', {
                                        initialValue: customer.aiChemicalOxygenDemand ? customer.aiChemicalOxygenDemand + "" : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="化学需氧量" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="氮氧">
                                    {getFieldDecorator('aiAmmoniaNitrogen', {
                                        initialValue: customer.aiAmmoniaNitrogen ? customer.aiAmmoniaNitrogen + "" : '',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="氮氧" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="氮氧化物">
                                    {getFieldDecorator('aiNitrogenOxide', {
                                        initialValue: customer.aiNitrogenOxide ? customer.aiNitrogenOxide + "" : '',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="氮氧化物" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="烟尘">
                                    {getFieldDecorator('aiSmoke', {
                                        initialValue: customer.aiSmoke ? customer.aiSmoke + "" : '',
                                        rules: [{ required: true },
                                        {/* { pattern: /^[0-9]*$/ } */ }
                                        ],
                                    })(
                                        <Input placeholder="烟尘" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="二氧化硫">
                                    {getFieldDecorator('aiSulfurDioxide', {
                                        initialValue: customer.aiSulfurDioxide?customer.aiSulfurDioxide + "":'',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="二氧化硫" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="悬浮物">
                                    {getFieldDecorator('aiSuspendedSolids', {
                                        initialValue: customer.aiSuspendedSolids ? customer.aiSuspendedSolids + "" : '',
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="悬浮物" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="其他">
                                    {getFieldDecorator('aiOther', {
                                        initialValue: customer.aiOther,
                                        rules: [{ required: true, message: 'Please input your GameCode!' },
                                        {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                                        ],
                                    })(
                                        <Input placeholder="其他" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>

                    <div className="yzy-block-center">
                        <Button type="primary" style={{ padding: '0 40px' }} htmlType="submit">保存</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Form.create()(CustomerEditBaseinfoDetail);