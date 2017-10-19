import React, { component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import $db from '../../common/dal.js';
import imgCircle from './assets/1.png';
import user_icon from './assets/1.png';
import pro_icon from './assets/1.png';
import game_icon from './assets/1.png';
import activity_icon from './assets/1.png';
import order_icon from './assets/1.png';
import exchange_icon from './assets/1.png';
import setting_icon from './assets/1.png';

import { Menu, Icon, Layout, Dropdown, Tabs, Button, TabPane, Breadcrumb } from 'antd';
// var $db = require("../../common/dal.js");
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


/**
 * 通用数据处理方法
 */
import utils from '../../common/utils.youtong';

console.log(utils.serialize({name: 'lucy', age: 20}));

window.myPageRouter = function () {
    alert('myPageRouter')
}

// 面包屑
class BreadcrumbMap extends React.Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>{this.props.title.title}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.title.secondTitle}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.title.thirdTitle}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

// 布局
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            title: arr[0].bigMenu,
            secondTitle: arr[0].smallMenu[0],
            thirdTitle: arr[0].smallMenu.bigMenu,
            url: "/admin/customer",
        }

        alert('page')
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    componentDidMount() {
        var self = this;
        window.modules={
            changePage: function () {
                alert(self.state.url)
            }
        }
    }
    componentWillMount() {
        if (localStorage.getItem("username") == '') {
            window.location = '/admin/login';
        }

        // this.handleSelect('会员查询');
    }

    /**
     * render to iframe, 
     * substitute for ng-view or react-router
     * the inner router
     */
    handleSelect(e) {

        if (e.key === '客户信息查询') {
            this.setState({url: '/admin/customer'})
        }

        this.setState({
            title: e.keyPath[e.keyPath.length - 1],
            secondTitle: e.keyPath[e.keyPath.length - 2],
            thirdTitle: e.keyPath[e.keyPath.length - 3],
        })
    }
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width={240}
                >
                    <div className="logo">
                        <div className='company_name'>友通环保后台系统</div>
                        <MenuTop></MenuTop>
                    </div>
                    <SiderMenu handleSelect={this.handleSelect.bind(this)}></SiderMenu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 105, "minWidth": 1200 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle.bind(this)}
                        />
                        <div className="header-right">
                            <input type="text" placeholder="请输入您要查找的内容..." />
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="icon icon-bell"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="icon icon-envelope"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/login">
                                        <i className="icon icon-exit"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="headnext" style={{ background: '#fff', padding: 0, height: 40 }}>
                            <BreadcrumbMap title={this.state}></BreadcrumbMap>
                            {/*<Tab></Tab>*/}
                            {/* <Dropdown overlay={menu2} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    关闭操作 &nbsp;&nbsp;<Icon type="caret-down" style={{ fontSize: 8 }} />
                                </a>
                            </Dropdown> */}
                        </div>
                    </Header>
                    <Content>
                        <div id="page">
                            <iframe id='innerFrame' src={this.state.url} frameBorder="0" style={{ width: '100%', height: '100%', borderLeft: '1px solid #e9e9e9' }}></iframe>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="#">个人资料</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="#">修改头像</a>
        </Menu.Item>
    </Menu>
)

const menu2 = (
    <Menu>
        <Menu.Item key="0">
            <i></i>
            <a href="#">刷新当前</a>
        </Menu.Item>
        <Menu.Item key="1">
            <i></i>
            <a href="#">关闭当前</a>
        </Menu.Item>
        <Menu.Item key="2">
            <i></i>
            <a href="#">关闭所有</a>
        </Menu.Item>
    </Menu>
)
//头像
class MenuTop extends React.Component {
    render() {
        return (
            <div className="lefter">
                <span>
                    <img src={imgCircle} alt="" className="img-circle" />
                </span>
                <div className="dropdown">
                    <span>友通管理员</span><br />
                    <div className="lb_username"> 游客&nbsp;&nbsp; <span className="split">|</span> &nbsp;&nbsp;<a href="#" className="lb_exit">退出</a> </div>
                </div>
            </div>
        )
    }
}
const arr = [
    {
        bigMenu: "客户管理",
        smallMenu: ["客户信息查询"],
        icon: 'user'
    },
    
];
//侧边栏导航菜单
class SiderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
        };
    }
    //控制只打开一个菜单
    onOpenChange(openKeys) {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        // const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        // if (latestCloseKey) {
        //     nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        // }
        this.setState({ openKeys: nextOpenKeys });
    }
    //当存在3级菜单时，需要把3级菜单的openKeys列出来
    getAncestorKeys(key) {
        const map = {
            用户信息3: ['用户信息3'],
        };
        return map[key] || [];
    }
    render() {
        return (
            <Menu onClick={this.props.handleSelect}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange.bind(this)}
                mode="inline">
                {
                    arr.map((item, index) => {
                        {/* if(item.smallMenu[0]!==""){  */}
                            return  <SubMenu key={item.bigMenu} title={<span><Icon type={item.icon} /><span>{item.bigMenu}</span></span>}>
                                {
                                    item.smallMenu.map((o, i) => {
                                        if (o instanceof Object) {
                                            return <SubMenu key={o.bigMenu} title={<span>{o.bigMenu}</span>}>
                                                {
                                                    o.smallMenu.map((j, k) => {
                                                        return <Menu.Item key={j}><a>{j}</a></Menu.Item>
                                                    })
                                                }
                                            </SubMenu>
                                        } else {
                                            return <Menu.Item key={o}>
                                                <a>{o}</a>
                                            </Menu.Item>
                                        }
                                    })
                                }
                            </SubMenu>
                         {/* }else{
                            return <Menu.Item key={item.bigMenu}>
                                <a href="#">{item.bigMenu}</a>
                            </Menu.Item>
                        }  */}
                    })
                }
            </Menu>
        );

    }

}
//内容
class MyContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="lefter">
                <div className="lefter-top">
                    {this.props.data.collapsed}
                    {this.props.data.title}/{this.props.data.secondTitle}{this.props.data.thirdTitle ? '/' + this.props.data.thirdTitle : ''}
                </div>
            </div>
        )
    }

}

ReactDOM.render(<Page></Page>, document.getElementById('reactwrapper'))
