/**
 * 员工详情（新增及编辑）
 */
import React from 'react';

import {
  Form,
  Row,
  Col,
  Input,
  Button
} from 'antd';
const FormItem = Form.Item;

import {
  MyToast
} from '../../common/utils';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

class StaffDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  saveDetail(values) {

  }

  render() {
    let { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.saveDetail.bind(this)}>
          <div className="baseinfo-section">
            <h2 className="yzy-list-content-title">员工基本信息</h2>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="排水口编号">
                  {getFieldDecorator('serialNumber', {
                    initialValue: this.state.data.serialNumber,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="排水口编号" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="排放口名称">
                  {getFieldDecorator('theName', {
                    initialValue: this.state.data.theName,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="排放口名称" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="排放口位置">
                  {getFieldDecorator('outletLocation', {
                    initialValue: this.state.data.outletLocation,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="排放口位置" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="经度">
                  {getFieldDecorator('longitude', {
                    initialValue: this.state.data.longitude ? this.state.data.longitude + "" : "",
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="经度" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="维度">
                  {getFieldDecorator('latitude', {
                    initialValue: this.state.data.latitude ? this.state.data.latitude + "" : "",
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="维度" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="排放口去向">
                  {getFieldDecorator('emissionDestination', {
                    initialValue: this.state.data.emissionDestination,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="排放口去向" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="水体名称">
                  {getFieldDecorator('nameOfWaterBody', {
                    initialValue: this.state.data.nameOfWaterBody,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="水体名称" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="污水排放规律">
                  {getFieldDecorator('dischargeLaw', {
                    initialValue: this.state.data.dischargeLaw,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="污水排放规律" />
                    )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="功能区类别">
                  {getFieldDecorator('functionalAreaCategory', {
                    initialValue: this.state.data.functionalAreaCategory,
                    rules: [{ required: true },
                    {/* { pattern: /^[0-9]*$/ } */ }
                    ],
                  })(
                    <Input placeholder="功能区类别" />
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

export default Form.create()(StaffDetails);
