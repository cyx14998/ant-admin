import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
import './index.less';

import md5 from 'crypto-js/md5';

import {
    setCookie
} from '../../common/utils';

import {
    login
} from '../../common/api/api.login';

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


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: localStorage.getItem("phoneNumber") ? localStorage.getItem("phoneNumber") : null,
            password: '',
            remember: true,
        };
    }
    // 输入用户名
    changePhoneNum(e) {
        this.setState({ phoneNumber: e.target.value.slice(0, 11) });
    }
    //输入密码
    changePsd(e) {
        this.setState({ password: e.target.value });
    }
    //记住用户名
    remember() {
        this.setState({ remember: !this.state.remember })
    }
    handleSubmit() {
        console.log('handlesubmit')
        var self = this;
        if (self.state.phoneNumber && self.state.password) {
            var pwd = '' + md5(self.state.password)
            var data = {
                phoneNumber: self.state.phoneNumber,
                password: pwd
            }


            login(data).then(res => {
                console.log('get login res', res)
                if (res.result !== 'success') {
                    return 
                }
                
                if (self.state.remember == true) {
                    localStorage.setItem("phoneNumber", self.state.phoneNumber);
                }
                // set token
                localStorage.setItem("token", res.data.token)

                window.location = "/admin/index"
            }).catch(err => {
                console.log(err)
            })
            
        } else {
        }
    }
    render() {
        // console.log(phoneNumber);
        return (
            <div className="login-form">
                <Input value={this.state.phoneNumber} addonAfter={<Icon type="user" style={{ fontSize: 20 }} />} onChange={this.changePhoneNum.bind(this)} />
                <Input type="password" placeholder="请输入密码" addonAfter={<Icon type="lock" style={{ fontSize: 20, backgroundCor: '#000', }} />} onChange={this.changePsd.bind(this)} />
                <div className="remember">
                    <Checkbox onChange={this.remember.bind(this)} checked={this.state.remember}>记住用户名</Checkbox>
                </div>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)} className="login-form-button">
                    登录
                </Button>
                {/* <div className=" register">
            没有账号？<a href="#">立即注册</a>
          </div> */}
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('root'));