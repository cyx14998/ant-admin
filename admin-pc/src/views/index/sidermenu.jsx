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
    icon: 'user',
    iframeUrl: '/customer.html'
  }, {
    sub: '客户检查计划管理',
    icon: 'bars',
    
  }, {
    sub: '员工管理',
    icon: 'user-add',
    
  }
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
      // submenu
      if (menu.item && menu.item.length > 0) {
        return (
          <SubMenu
            key={menu.sub}
            title={<span><Icon type={menu.icon} /><span>{menu.sub}</span></span>}>
            {
              menu.item.map(item => (
                <Menu.Item key={item}>
                  {item}
                </Menu.Item>
              ))
            }
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={menu.sub}>
          <Icon type={menu.icon} />
          <span>{menu.sub}</span>
        </Menu.Item>
      )
    });

    return (
      <Menu 
        onClick={onMenuChange}
        defaultSelectedKeys={['1']} 
        mode="inline">
          {
            menus
          }
      </Menu>
    )
  }
};

export default SiderMenu;