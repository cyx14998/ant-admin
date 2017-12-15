import React, { component } from 'react';
import ReactDOM from 'react-dom';

import imgCircle from './../../media/1.png';
import user_icon from './../../media/1.png';
import pro_icon from './../../media/1.png';
import game_icon from './../../media/1.png';
import activity_icon from './../../media/1.png';
import order_icon from './../../media/1.png';
import exchange_icon from './../../media/1.png';
import setting_icon from './../../media/1.png';

import { Menu, Icon, Layout, Dropdown, Tabs, Button, TabPane, Breadcrumb } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

import './index.less';
import {
    setMenuId,
    getMenuList
} from '../../common/api/index';

import SiderMenu from './sidermenu';

/**
 * iframe 调用钩子
 */
window.iframeHook = {};
const imgCircleUrl = localStorage.getItem('headImagePath');

function gotoAvatar() {
    window.iframeHook.changePage({
        url: 'staffmanagementEdit.html?staffId=' + '1',
        breadIncrement: '员工信息编辑'
    });
}

const MenuTop = ({
    logout
}) => (
        <div className="yzy-avatar-wrap">
            <img id="userHeadImg" src={imgCircleUrl ? imgCircleUrl : imgCircle} alt="" className="avatar" onClick={gotoAvatar} />
            <div className="avatar-info">
                <span id="userName">{localStorage.getItem('userName') ? localStorage.getItem('userName') : '友通管理员'}</span>
                <div className="controls">
                    <span className="username">{localStorage.getItem('roleName') ? localStorage.getItem('roleName') : '游客'}</span>
                    <span className="split">|</span>
                    <a className="logout" onClick={logout}>退出</a>
                </div>
            </div>
        </div>
    );

// 面包屑
class BreadcrumbMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            breads,
            onBreadClick
        } = this.props;

        return (
            <Breadcrumb>
                {
                    breads.map(bread => {
                        let arrBread = bread.split('|');

                        if (!arrBread[1]) {
                            return (
                                <Breadcrumb.Item key={bread}>
                                    {arrBread[0]}
                                </Breadcrumb.Item>
                            )
                        }

                        return (
                            <Breadcrumb.Item key={bread}>
                                <a onClick={() => onBreadClick(bread, breads)} >{arrBread[0]}</a>
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        );
    }
}





// 布局
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forceUpdate: '',   // 通过设置时间戳触发re-render
            collapsed: false,
            url: "",
            breads: []
        }
    }

    componentDidMount() {
        var self = this;

        /** 
         * 改变iframe url 和 面包屑导航增量
         * @url 
         * @breadIncrement
         * @incrementType    add/replace
         */
        window.iframeHook.changePage = function ({ url, breadIncrement, incrementType = 'add' }) {
            if (!url) return;

            if (url.indexOf('/') == 0) {
                url = url.substring(1, url.length);
            }

            let breadIncrementHadin = self.state.breads.indexOf(breadIncrement) !== -1;

            if (!breadIncrement || breadIncrementHadin) {
                self.setState({
                    url
                });

                return;
            }



            if (incrementType === 'add') {
                self.setState(prev => {
                    prev.breads.push(breadIncrement);

                    return {
                        url,
                        breads: prev.breads
                    }
                });

                return;
            }

            if (incrementType === 'replace') {
                self.setState(prev => {
                    prev.breads.pop();
                    prev.breads.push(breadIncrement);

                    return {
                        url,
                        breads: prev.breads,
                    };
                });

                return;
            }
        }

        window.iframeHook.backToLogin = function () {
            window.location.replace('login.html');
        }

        window.iframeHook.backPage = function ({ url }) {
            if (!url) return;

            self.setState(prev => {
                prev.breads.pop();

                return {
                    url,
                    breads: prev.breads
                }
            });

            return;
        }

        /**
         * fix issues for iframe bug
         */
        window.document.getElementById('root').style.height = '100%';

        // 获取菜单后设置第一个默认选中
        var menuList = getMenuList();
        if (!menuList.length) {
            return;
        }

        var breads = [];
        if (menuList[0].menuList && menuList[0].menuList.length) {
            breads.push(menuList[0].theName);
            breads.push(menuList[0].menuList[0].theName + '|' + menuList[0].menuList[0].theLink + '||' + menuList[0].menuList[0].tableId);
            setMenuId(menuList[0].menuList[0].menuId);  // 初始化menuId----------------------
            this.setState({
                url: menuList[0].menuList[0].theLink,
                breads
            })
        } else {
            breads.push(menuList[0].theName + '|' + menuList[0].theLink + '||' + menuList[0].tableId);
            setMenuId(menuList[0].menuId);              // 初始化menuId----------------------
            this.setState({
                url: menuList[0].theLink,
                breads
            })
        }
    }

    onCollapse(collapsed) {
        this.setState({ collapsed });
    }
    /**
     * SiderMenu
     */
    onMenuChange(menu) {
        var url = menu.key.split('|')[1],
            path = menu.keyPath.reverse(),
            menuId = menu.key.split('||')[1];

        // 点击菜单后 设置menuId.----------------------
        setMenuId(menuId);

        if (url === this.state.url) {
            this.setState({
                url: `${url}#${Math.random()}`
            });
            return;
        }

        this.setState({
            url: url,
            breads: path
        }, () => {
            this.forceUpdate();
        });
    }

    // 面包屑点击事件
    onBreadClick(bread, breads) {
        var url = bread.split('|')[1];

        if (!url) return;

        if (url === this.state.url) return;

        // 后面的面包屑切掉
        var index = 0;
        for (var i = 0, len = breads.length; i < len; i++) {
            if (breads[i] === bread) {
                index = i;
                break;
            }
        }

        this.setState({
            url,
            breads: breads.slice(0, index + 1)
        })
    }

    logout() {
        localStorage.removeItem('token');
        // localStorage.clear();
        window.location.replace('login.html');
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
                        <MenuTop logout={this.logout.bind(this)} />
                    </div>
                    <SiderMenu onMenuChange={this.onMenuChange.bind(this)} />
                </Sider>
                <Layout>
                    <Header>
                        <BreadcrumbMap
                            breads={this.state.breads}
                            onBreadClick={this.onBreadClick.bind(this)}
                            className="yzy-breadcrumb" />
                    </Header>
                    <Content style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                        <iframe
                            id='innerFrame'
                            src={this.state.url}
                            frameBorder="0"
                            style={{ width: '100%', height: '100%', borderLeft: '1px solid #e9e9e9' }}></iframe>
                    </Content>
                </Layout>
            </Layout>
        );


    }
}

ReactDOM.render(<Page />, document.getElementById('root'))
