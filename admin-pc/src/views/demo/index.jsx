/**
 * yzy-ui
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Row, 
  Col, 
  Input,
  Form,
  Table,
  Alert,
  Layout, Menu, Breadcrumb, Icon
} from 'antd';
const FormItem = Form.Item;
const { Header, Sider, Content, Footer } = Layout;


import WasteWaterDemoSection from '../customerEdit/customerEdit.wastewater.demosection';

import SiderMenu from './sidermenu';

import { MyToast } from '../../common/utils';

import {
  getCustomerList,
  postTest,
  postTest2
} from '../../common/api/api.customer';

import imgCircle from './../../media/1.png';

import '../../theme/antd.fix.less';
import './index.less';

const dataBlob = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '企业名称',
    name: 'companyName',
  }, {
    type: 'input',
    label: '社会信用代码',
    name: 'socialCode',
  }, {
    type: 'select',
    label: '单位类别',
    name: 'companyType',
    options: [{
      label: '国企',
      value: 'gq'
    }, {
      label: '私企',
      value: 'sq'
    }]
  }, {
    type: 'select',
    label: '行业类别',
    name: 'socialType',
    options: [{
      label: '服务业',
      value: 'fwy'
    }, {
      label: '诈骗业',
      value: 'zpy'
    }]
  }]
}

import RcSearchForm from '../../components/rcsearchform';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Edit',
  dataIndex: 'edit',
  render: (text, record) => (
    <div>
      <Button type="primary" onClick={() => alert(record.name)}>编辑</Button>
    </div>)
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};



class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      customerList: [],

      collapsed: false
    }
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  onMenuChange(menu) {
    console.log('onMenuChange----', menu)
  }

  handleSearch(values) {
    console.log('handleSearch ---------', values)
  }


  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse.bind(this)}
          width={240}
          className="yzy-menu-wrap">
          <div className="yzy-menu-top-wrap">
              <div className='title'>友通环保CRM管理系统</div>
              <MenuTop></MenuTop>
          </div>
          <SiderMenu onMenuChange={this.onMenuChange.bind(this)} />
        </Sider>
        <Content>
          <BreadcrumbMap className="yzy-breadcrumb" />
          <div className="yzy-page">
            hello world
          </div>
        </Content>
      </Layout>
    );

    return (
      <WasteWaterDemoSection />
    )

    return (
      <div className="yzy-page" id="yzy-page">
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...dataBlob} 
            handleSearch={this.handleSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary">导出excel</Button>
            <Button type="primary" style={{marginLeft: 8}}>新增</Button>
          </div>
          <Table
            columns={columns} 
            dataSource={data}
            rowSelection={rowSelection} />
        </div>
      </div>
    )
  }
}

const BreadcrumbMap = () => (
  <Breadcrumb>
    <Breadcrumb.Item>客户管理</Breadcrumb.Item>
    <Breadcrumb.Item>客户管理编辑</Breadcrumb.Item>
  </Breadcrumb>
);

//头像
class MenuTop extends React.Component {
    render() {
        return (
            <div className="yzy-avatar-wrap">
                <img src={imgCircle} alt="" className="avatar" />
                <div className="avatar-info">
                    <span>友通管理员</span>
                    <div className="controls">
                      <span className="username">游客</span>
                      <span className="split">|</span>
                      <a className="logout">退出</a>
                    </div>
                </div>
            </div>
        )
    }
}

// const RcDemo = Form.create()(Demo);

ReactDOM.render(<Demo />, document.getElementById('root'));