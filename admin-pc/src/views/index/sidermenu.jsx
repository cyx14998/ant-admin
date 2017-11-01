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
    sub: '客户检查计划管理',
    icon: 'schedule',
    name: 'checkplan',
    key: '客户检查计划管理|/checkplan.html'
  },{
    sub: '我的检查任务',
    icon: 'solution',
    name: 'checkplanmy',
    key: '我的检查任务|/checkplanmy.html'
  },  {
    sub: '员工管理',
    icon: 'contacts',
    name: 'staffmanagement',
    key: '员工管理|/staffmanagement.html',
  }, {
    sub: '部门管理',
    icon: 'fork',
    name: 'department',
    key: '部门管理|/department.html',
  }, 
  // {
  //   sub: '导航测试',
  //   icon: 'home',
  //   key: '导航测试',
  //   items: ['客户检查计划管理|/checkplan.html', '员工管理|/staffmanagement.html',]

  // }
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