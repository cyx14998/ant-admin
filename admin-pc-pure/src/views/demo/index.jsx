/**
 * yzy-ui
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Icon,
  Row, 
  Col, 
  Input,
  Form,
} from 'antd';
const FormItem = Form.Item;


class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false
    }
  }

  handleSearch(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
      });
    }

    handleReset() {
      this.props.form.resetFields();
    }

    toggle() {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields() {
      const count = this.state.expand ? 10 : 6;
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
      };
      const children = [];
      for (let i = 0; i < 4; i++) {
        children.push(
          <Col span={12} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem {...formItemLayout} label={`Field ${i * 100}`}>
              {getFieldDecorator(`field-${i}`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
        );
      }
      return children;
    }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-form-wrap">
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch.bind(this)}>
            <Row gutter={40}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">Search</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
                  Clear
                </Button>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle.bind(this)}>
                  Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col>
            </Row>
          </Form>
          <div className="yzy-form-btns-wrap">

          </div>
        </div>
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">

          </div>
        </div>
      </div>
    )
  }
}

const RcDemo = Form.create()(Demo);

ReactDOM.render(<RcDemo />, document.getElementById('root'));