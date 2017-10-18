import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './customer.less';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

//添加与编辑页面Modal

const dataSource = [{
  key: '1',
  NickName: '胡彦斌',
  WechatID: 32,
  Favicon: '西湖区湖底公园1号'
}, {
  key: '2',
  NickName: '胡彦斌',
  WechatID: 32,
  Favicon: '西湖区湖底公园1号'
}];


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    }
  }
  // handleSearch(e) {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     store.dispatch({
  //       NickName: values.NickName,
  //       StatusCode: values.StatusCode,
  //       UnitID: values.UnitID,
  //       WechatID: values.WechatID,
  //       type: "SEARCH"
  //     });
  //     this.props.handleSearch(1);
  //   });
  // }
  // handleReset() {
  //   this.props.form.resetFields();
  // }
  // toggle() {
  //   const { expand } = this.state;
  //   this.setState({ expand: !expand });
  // }
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const titles = [{
      title: "公众号名称",
      eng: "NickName"
    }, {
      title: "公众号原始id",
      eng: "WechatID"
    }, {
      title: "所属单位编号",
      eng: "UnitID"
    }, {
      title: "状态",
      eng: "StatusCode"
    }]
    const children = [];
    for (let i = 0; i < titles.length; i++) {
      children.push(
        <Col span={12} key={i}>
          <FormItem {...formItemLayout} label={titles[i].title}>
            {getFieldDecorator(titles[i].eng)(
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
      <Form
        className="ant-advanced-search-form"
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }}>
              清除
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const Searchs = Form.create()(Search);

//列表页面
class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  changeParentState() {
    console.log('parent------------', parent.window.myPageRouter)
  }

  
  render() {
    const columns = [{
      title: '公众号名称',
      dataIndex: 'NickName',
      key: 'NickName',
    }, {
      title: '公众号原始ID',
      dataIndex: 'WechatID',
      key: 'WechatID',
    }, {
      title: '地址',
      dataIndex: 'Favicon',
      key: 'Favicon',
    }, {
      title: '编辑',
      key: 'action',
      render: (text, index) => <div key={index}>
        <Button type="primary" onClick={this.changeParentState.bind(this)}>编辑</Button>
      </div>
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
      <div className="divBorder">
        <div className="divHeader">
          <Searchs></Searchs>
          {/* <Button className="editable-add-btn f_right" onClick={this.showModal}>Add</Button> */}
        </div>
        <Table
          rowKey='InnerID'
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          pagination={false}
          loading={this.state.loading}
        />
        <Pagination showQuickJumper defaultCurrent={1} current={1} total={11} />
      </div>
    )
  }
}

ReactDOM.render(<GoodsList/>, document.getElementById('customerreactwrapper'));