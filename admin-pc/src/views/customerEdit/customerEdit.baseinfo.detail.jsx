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
  message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { getLocQueryByLabel } from '../../common/utils';

import {
    getCustomerInfoById
} from '../../common/api/api.customer';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

class CustomerEditBaseinfoDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch data from api for FormItem initialValue
    var cusId = getLocQueryByLabel('id');

    if (!cusId) return;

    getCustomerInfoById(cusId).then(res => {
        console.log('getCustomerInfoById res', res)
        
    }).catch(err => console.log(err))
  }

  saveDetail(e) {
    e.preventDefault();
    const {
      form
    } = this.props;

    form.validateFields((err, values) => {
      if (err) return;

      console.log('when saveDetail ---', values)
    })
  }

  render() {
    let {
      getFieldDecorator
    } = this.props.form;

    return (
      <div className="yzy-tab-content-item-wrap">
        
        <Form onSubmit={this.saveDetail.bind(this)}>
          <div className="baseinfo-section">
            <h2 className="yzy-tab-content-title">基本信息</h2>
            <Row>
                <Col span={8}>
                    <FormItem {...formItemLayout} label="企业名称">
                        {getFieldDecorator('customerName', {
                            initialValue: '',
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
                            initialValue: '',
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
                            initialValue: '',
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
                            initialValue: 'latitude',
                            rules: [{ required: true, message: 'Please input your Game!' },
                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label="中心经度">
                        {getFieldDecorator('longitude', {
                            initialValue: 'longitude',
                            rules: [{ required: true, message: 'Please input your Game!' },
                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label="邮政编码">
                        {getFieldDecorator('postalCode', {
                            initialValue: 'postalCode',
                            rules: [{ required: true, message: 'Please input your Game!' },
                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                  <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="联系人">
                      {getFieldDecorator('contactPerson', {
                          initialValue: 'contactPerson',
                          rules: [{ required: true, message: 'Please input your Game!' },
                          {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                          ],
                      })(
                          <Input />
                          )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="电话">
                      {getFieldDecorator('phoneNumber', {
                          initialValue: 'phoneNumber',
                          rules: [{ required: true, message: 'Please input your Game!' },
                          {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                          ],
                      })(
                          <Input />
                          )}
                  </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem {...formItemLayout} label="传真">
                        {getFieldDecorator('fax', {
                            initialValue: 'fax',
                            rules: [{ required: true, message: 'Please input your Game!' },
                            {/* { pattern: /^[0-9]*$/, message: '编号为纯数字!' } */ }
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Col>
            </Row>

            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="行业类别">
                      {getFieldDecorator('industryCategory', {
                          initialValue: '行业类别',
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
                          initialValue: '企业规模',
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
              <Col span={5} style={{marginRight: '10px'}}>
                <FormItem labelCol={{span: 13}} wrapperCol={{span: 11}} label="企业地址">
                      {getFieldDecorator('address', {
                          initialValue: '企业地址',
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

              <Col span={3} style={{marginRight: '10px'}}>
                <FormItem>
                    {getFieldDecorator('address2', {
                        initialValue: '企业地址',
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

              <Col span={3} style={{marginRight: '10px'}}>
                <FormItem>
                    {getFieldDecorator('address3', {
                        initialValue: '企业地址',
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

              <Col span={3} style={{marginRight: '10px'}}>
                <FormItem>
                    {getFieldDecorator('address4', {
                        initialValue: '企业地址',
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
                          initialValue: '行业类别',
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
                      {getFieldDecorator('enterpriseScale222', {
                          initialValue: '企业规模',
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
          </div>

          <div className="yzy-block-center">
            <Button type="primary" style={{padding: '0 40px'}} htmlType="submit">保存</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CustomerEditBaseinfoDetail);