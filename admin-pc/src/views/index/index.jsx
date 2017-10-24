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

/**
 * iframe 调用钩子
 */
window.iframeHook = {};

const MenuTop = () => (
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
);

// 面包屑
const BreadcrumbMap = () => (
  <Breadcrumb>
    <Breadcrumb.Item>客户管理</Breadcrumb.Item>
    <Breadcrumb.Item>客户信息</Breadcrumb.Item>
  </Breadcrumb>
);

import SiderMenu from './sidermenu';



// 布局
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: "/customer.html",
        }
    }

    componentDidMount() {
        var self = this;

        // change iframe url
        window.iframeHook.changePage = function (url) {
            self.setState({
                url
            })
        }
    }

    onCollapse(collapsed) {
      this.setState({ collapsed });
    }

    onMenuChange(menu) {
      console.log('onMenuChange----', menu)
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
                        <MenuTop />
                    </div>
                    <SiderMenu onMenuChange={this.onMenuChange.bind(this)} />
                </Sider>
                <Content>
                    <BreadcrumbMap className="yzy-breadcrumb" />
                    <iframe id='innerFrame' src={this.state.url} frameBorder="0" style={{ width: '100%', height: '100%', borderLeft: '1px solid #e9e9e9' }}></iframe>
                </Content>
            </Layout>
        );

        
    }
}

// //内容
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

ReactDOM.render(<Page />, document.getElementById('root'))
