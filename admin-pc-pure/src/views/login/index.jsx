import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
import './index.less';

import md5 from 'crypto-js/md5';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="login">
                <div className="loginInput">
                    <div className="login-top">
                        <span>友通环保后台管理系统</span>
                        <div style={{ fontSize: 6 }}>
                            You Tong Huan Bao Hou Tai Guan Li Xi Tong
                        </div>
                    </div>
                    <div className="login-main">
                        <div>用户登录:</div>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        )
    }
}


class LoginForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: localStorage.getItem("phoneNumber") ? localStorage.getItem("phoneNumber") : null,
            password: '',
            remember: true,
            visible: false,
        };
    }
    // 输入用户名
    changePhoneNum(e) {
        console.log(e.target.value);
        this.setState({ phoneNumber: e.target.value });
    }
    //输入密码
    changePsd(e) {
        // console.log(e.target.value);
        this.setState({ password: e.target.value });
    }
    //记住用户名
    remember() {
        this.setState({ remember: !this.state.remember })
    }
    //提示框不可见
    changeVisible() {
        this.setState({ visible: false });
    }
    handleSubmit() {
        var self = this;
        if (self.state.phoneNumber && self.state.password) {
            var data1 = "phoneNumber=" + self.state.phoneNumber + "&password=" + md5(self.state.password);
            console.log(data1)
            // $db.getAdminLogin(data1, function (result) {
            //     console.log(result);
            //     if (result.result == 'success') {
            //         if (self.state.remember == true) {
            //             localStorage.setItem("phoneNumber", self.state.phoneNumber);
            //         }
            //         console.log(result.message);
            //         window.location = "/admin/index";
            //     } else {
            //         console.log(result.message);
            //     }
            // });
        } else {
            self.setState({ visible: true });
        }
    }
    render() {
        // console.log(phoneNumber);
        return (
            <div className="login-form">
                <Input value={this.state.phoneNumber} addonAfter={<Icon type="user" style={{ fontSize: 20 }} />} onChange={this.changePhoneNum} />
                <Input type="password" placeholder="请输入密码" addonAfter={<Icon type="lock" style={{ fontSize: 20, backgroundCor: '#000', }} />} onChange={this.changePsd} />
                <div className="remember">
                    <Checkbox onChange={this.remember} checked={this.state.remember}>记住用户名</Checkbox>
                </div>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} className="login-form-button">
                    登录
                </Button>
                <Modal
                    title="错误提示"
                    visible={this.state.visible}
                    onOk={this.changeVisible}
                    onCancel={this.changeVisible}
                >
                    <p>用户名或密码错误</p>
                </Modal>
                {/* <div className=" register">
            没有账号？<a href="#">立即注册</a>
          </div> */}
            </div>
        );
    }
}

const LoginForm = Form.create()(LoginForms);

ReactDOM.render(<Login></Login>, document.getElementById('root'));