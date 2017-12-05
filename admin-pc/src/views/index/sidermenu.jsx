import React, { Component } from 'react';

import {
  Layout, Menu, Breadcrumb, Icon
} from 'antd';

import { getMenuList } from '../../common/api/index';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

/** 
 * menu
 */

const menuList = getMenuList();

var menuConfig = [];
menuList.map((item, index) => {
  if (item.menuList && item.menuList.length) {
    var obj = {
      sub: item.theName,
      link: item.theLink,
      icon: item.icon,
      key: item.theName,
    }
    var objArr = [];
    item.menuList.map((inner) => {
      var innerObj = {
        theName: inner.theName + '|' + inner.theLink + '||' + inner.tableId,
        menuId: inner.tableId,
      }
      objArr.push(innerObj);
    });
    obj.items = objArr;
    menuConfig.push(obj);
  } else {
    var obj = {
      sub: item.theName,
      menuId: item.tableId,
      link: item.theLink,
      icon: item.icon,
      name: item.theLink,
      key: item.theName + '|' + item.theLink + '||' + item.tableId
    }
    menuConfig.push(obj);
  }
});
// const menuConfig = [
//   {
//     sub: '客户管理',
//     icon: 'team',
//     name: 'customer',
//     key: '客户管理|/customer.html||{menuId}'
//   }, {
//     sub: '计划管理',
//     icon: 'schedule',
//     name: 'checkplan',
//     key: '计划管理|/checkplan.html||{menuId}'
//   }, {
//     sub: '我的任务',
//     icon: 'solution',
//     name: 'checkplanmy',
//     key: '我的任务|/checkplanmy.html||{menuId}'
//   }, {
//     sub: '人力资源管理',
//     icon: 'contacts',
//     key: '人力资源管理',
//     items: ['员工管理|/staffmanagement.html||{menuId}', '请假管理|/leavemanagement.html||{menuId}', '用印管理|/printingmanagement.html||{menuId}'],
//   }, {
//     sub: '部门管理',
//     icon: 'fork',
//     name: 'department',
//     key: '部门管理|/department.html||{menuId}',
//   }, {
//     sub: '审批流程管理',
//     icon: 'fork',
//     name: 'flow',
//     key: '审批流程管理|/flow.html',
//   },
//   // {
//   //   sub: '导航测试',
//   //   icon: 'home',
//   //   key: '导航测试',
//   //   items: ['客户检查计划管理|/checkplan.html||{menuId}', '员工管理|/staffmanagement.html||{menuId}',]

//   // }
//   {
//     sub: '采购管理',
//     icon: 'home',
//     key: ' 采购管理',
//     items: ['采购单管理|/purchaseorders.html||{menuId}',
//       '入库单管理|/purchaseorderswarehousing.html||{menuId}',
//       '出库单管理|/purchaseordersoutbound.html||{menuId}',
//       '付款单管理|/purchaseorderspayment.html||{menuId}',
//       '库存管理|/stock.html||{menuId}',
//        '仓库管理|/housingmanagement.html||{menuId}',
//     ]
//     // '入库单管理|/staffmanagement.html||{menuId}',stock
//   }, {
//     sub: '行政管理',
//     icon: 'bell',
//     key: '行政管理',
//     items: ['公告管理|/noticemanagement.html||{menuId}', '合同管理|/contractmanagement.html||{menuId}', '用印管理|/printingmanagement.html||{menuId}'],
//   }, {
//     sub: '系统管理',
//     icon: 'setting',
//     key: '系统管理',
//     items: ['角色管理|/rolemanagement.html||{menuId}', '菜单管理|/menumanagement.html||{menuId}'],
//   },
// ];

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
                <Menu.Item key={item.theName}>
                  <span>{item.theName.split('|')[0]}</span>
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
      menuConfig.length &&
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