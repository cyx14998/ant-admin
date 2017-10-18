import React from 'react';

import { Form, Table, Icon, Input, Button, Select, Popconfirm, Upload, Menu, message, Tabs, Dropdown, Checkbox, Pagination, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const TabPane = Tabs.TabPane;


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
  handle,
  getFieldDecorator
}) => (
  <div className=" pollutersBox">
      <Form onSubmit={() => handle('CustomerEditBaseinfo')} hideRequiredMark>
          <div className="baseInfoBox">
              <div className="baseInfoTitle">基本信息</div>
          </div>
          <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('GameCode', {
                          initialValue: '编号',
                          rules: [{ required: true, message: 'Please input your GameCode!' },
                          { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                          ],
                      })(
                          <Input size="small" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('GameCode1', {
                          initialValue: '编号',
                          rules: [{ required: true, message: 'Please input your GameCode!' },
                          { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                          ],
                      })(
                          <Input size="small" />
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('GameCode2', {
                          initialValue: '编号',
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
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('Game', {
                          initialValue: '编号',
                          rules: [{ required: true, message: 'Please input your Game!' },
                          { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                          ],
                      })(
                          <Row gutter={10}>
                              <Col span={8}><Input size="small" /></Col>
                              <Col span={8}><Input size="small" /></Col>
                              <Col span={8}><Input size="small" /></Col>
                          </Row>
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('Game1', {
                          initialValue: '编号',
                          rules: [{ required: true, message: 'Please input your Game!' },
                          { pattern: /^[0-9]*$/, message: '编号为纯数字!' }
                          ],
                      })(
                          <Row gutter={10}>
                              <Col span={8}><Input size="small" /></Col>
                              <Col span={8}><Input size="small" /></Col>
                              <Col span={8}><Input size="small" /></Col>
                          </Row>
                          )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label="编号">
                      {getFieldDecorator('Game2', {
                          initialValue: '编号',
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


export default Form.create()(CustomerEditBaseinfo);





