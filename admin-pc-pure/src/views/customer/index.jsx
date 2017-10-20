/**
 * 企业列表
 */

import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { Table, Icon, Form, Row, Col, Input, Button, Pagination, Modal, Select, Popconfirm, Upload, message, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {
  getCustomerList
} from '../../common/api/api.customer'

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
      loading: true,
      customerList: [],
    }
  }

  componentDidMount() {
    getCustomerList({}).then(res => {
      console.log('getCustomerList ---', res)
      if (res.data.result !== 'success') {
        alert(res.data.info || '接口失败')
        return;
      }

      this.setState({
        loading: false,
        customerList: res.data.customerList.map((item, i) => {
          item.key = i;
          return item;
        })
      })
    }).catch(err => {
      alert(res.data.info || '接口失败')
    })
  }

  changeParentState(id) {
    parent.window.iframeHook.changePage('/customerEdit.html?id=' + id)
  }

  
  render() {
    const columns = [{
      title: '组织机构代码',
      dataIndex: 'postalCode',
      key: 'postalCode',
    }, {
      title: '企业名称',
      dataIndex: 'customerName',
      key: 'customerName',
    }, {
      title: '单位地址',
      dataIndex: 'unitAddress',
      key: 'unitAddress',
    }, {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson'
    }, {
      title: '联系人手机',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    }, {
      title: '编辑',
      key: 'action',
      render: (text, record) => (<div>
        <Button className="yzy-btn-primary" type="primary" onClick={this.changeParentState.bind(this, record.tableId)}>编辑</Button>
      </div>)
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
        <div id="customerRoot">

      <div className="divBorder">
        <div className="divHeader">
          <Searchs></Searchs>
          {/* <Button className="editable-add-btn f_right" onClick={this.showModal}>Add</Button> */}
        </div>
        <Table
          dataSource={this.state.customerList}
          columns={columns}
          rowSelection={rowSelection}
          pagination={false}
          loading={this.state.loading}
        />
        <Pagination showQuickJumper defaultCurrent={1} current={1} total={11} />
        <Button type="primary" onClick={this.changeParentState.bind(this)}>编辑</Button>
      </div>
        </div>
    )
  }
}

ReactDOM.render(<GoodsList/>, document.getElementById('root'));