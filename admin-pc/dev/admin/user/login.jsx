import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Form, Icon, Input, Button, Checkbox } from 'antd';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
import './login.less';
import $db from '../../common/dal.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="login">
                <div className="login-top">
                    <span>宇之逸管理平台</span>
                </div>
                <div className="login-main">
                    <LoginForm></LoginForm>
                </div>
            </div>
        )
    }
}


class LoginForms extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(values.remember==true){
                localStorage.setItem("username",values.userName);
            }
            console.log(values);
            if (!err) {
                $db.getAdminLogin(values, function (result) {
                    console.log(result);
                    if(result.code==1){
                        console.log(result.message);
                        window.location = "/admin/index";
                    }else{
                        console.log(result.message);
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const username = localStorage.getItem("username");
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '用户名不能为空' }],
                        initialValue: username==''?'':username,
                    })(
                        <Input placeholder="请输入用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空' }],
                    })(
                        <Input type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>

                    <div className="remember">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住用户名</Checkbox>
                            )}
                    </div>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
          </Button>
                    {/* <div className=" register">
            没有账号？<a href="#">立即注册</a>
          </div> */}
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(LoginForms);

ReactDOM.render(<Login></Login>, document.getElementById('reactwrapper'));