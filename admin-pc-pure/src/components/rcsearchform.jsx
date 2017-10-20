/**
 * RcSearchForm
 */

import React, { Component } from 'react';
import {
  Button,
  Icon,
  Row, 
  Col, 
  Input,
  Form,
} from 'antd';
const FormItem = Form.Item;


class SearchForm extends Component {
  constructor(props) {
    super(props)
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {
      form,
      handleSearch
    } = this.props;

    form.validateFields((err, values) => {
      if (err) return;

      handleSearch(values);
    })
  }


  render() {
    const {
      colspan=2,
      fields,
      handleSearch,
      form,
    } = this.props;

    const {
      getFieldDecorator,
      resetFields
    } = form;

    const formItemLayout =  {
      labelCol: { span: 24 / (colspan * 2) },
      wrapperCol: { span: (24 - (24 / (colspan * 2))) },
    };

    var items = fields.map((item, i) => {
      return (
        <Col span={parseInt(24 / colspan)} key={i}>
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator(item.name, {
              rules: item.rules || [],
            })(
              <Input placeholder={item.placeholder || item.label} />
            )}
          </FormItem>
        </Col>
      )
    });


    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.onFormSubmit.bind(this)}>
        <Row gutter={40} style={{textAlign: 'right'}}>{items}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }}>
              清除
            </Button>
          </Col>
        </Row>
      </Form>
    )

  }
}

const RcSearchForm = Form.create()(SearchForm);

export default RcSearchForm;