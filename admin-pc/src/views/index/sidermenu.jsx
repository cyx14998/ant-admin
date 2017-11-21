import React, { Component } from 'react';

import {
  Layout, Menu, Breadcrumb, Icon
} from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

/** 
 * menu
 */
const menuConfig = [
  {
    sub: '客户管理',
    icon: 'team',
    name: 'customer',
    key: '客户管理|/customer.html'
  }, {
    sub: '计划管理',
    icon: 'schedule',
    name: 'checkplan',
    key: '计划管理|/checkplan.html'
  }, {
    sub: '我的任务',
    icon: 'solution',
    name: 'checkplanmy',
    key: '我的任务|/checkplanmy.html'
  }, {
    sub: '人力资源管理',
    icon: 'contacts',
    key: '人力资源管理',
    items: ['员工管理|/staffmanagement.html', '请假管理|/leavemanagement.html'],
  }, {
    sub: '部门管理',
    icon: 'fork',
    name: 'department',
    key: '部门管理|/department.html',
  }, {
    sub: '审批流程管理',
    icon: 'fork',
    name: 'flow',
    key: '审批流程管理|/flow.html',
  },
  // {
  //   sub: '导航测试',
  //   icon: 'home',
  //   key: '导航测试',
  //   items: ['客户检查计划管理|/checkplan.html', '员工管理|/staffmanagement.html',]

  // }
  {
    sub: '采购管理',
    icon: 'home',
    key: ' 采购管理',
    items: ['采购单管理|/purchaseorders.html',
      '入库单管理|/purchaseorderswarehousing.html',
      '出库单管理|/purchaseordersoutbound.html',
      '付款单管理|/purchaseorderspayment.html',
      '库存管理|/stock.html',
    ]
    // '入库单管理|/staffmanagement.html',stock
  }, {
    sub: '行政管理',
    icon: 'bell',
    key: '行政管理',
    items: ['公告管理|/noticemanagement.html'],
  }, {
    sub: '系统管理',
    icon: 'setting',
    key: '系统管理',
    items: ['角色管理|/rolemanagement.html', '菜单管理|/menumanagement.html'],
  },
];

class SiderMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      onMenuChange,
    } = this.props;

    const menus = menuConfig.map(menu => {
      // has submenu items
      if (menu.items && menu.items.length > 0) {
        return (
          <SubMenu
            key={menu.key}
            title={<span><Icon type={menu.icon} /><span>{menu.sub}</span></span>}>
            {
              menu.items.map(item => (
                <Menu.Item key={item}>
                  <span>{item.split('|')[0]}</span>
                </Menu.Item>
              ))
            }
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={menu.key}>
          <Icon type={menu.icon} />
          <span>{menu.sub}</span>
        </Menu.Item>
      )
    });

    return (
      <Menu
        onClick={onMenuChange}
        defaultSelectedKeys={[menuConfig[0].key]}
        mode="inline">
        {
          menus
        }
      </Menu>
    )
  }
};

export default SiderMenu;