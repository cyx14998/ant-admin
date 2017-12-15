/**
 * 首次绑定
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import {
    NavBar,
    Icon,
    Button,
    Toast,
    Modal
} from 'eui-mobile';
const alert = Modal.alert;

import './index.less';

import {
    getPhoneCodeApi,
    bindPhoneApi,
    login
} from '../../common/api/api.wx.js';

import md5 from 'crypto-js/md5';


class BindPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            time: '获取验证码',
            getCodeClick: false, //提交按钮-判断是否获取验证码
            click: true, //控制获取验证码次数
        };
    }
    //输入手机号
    handlePhone(e) {
        if (!/^[0-9]*$/.test(e.target.value)) {
            Toast.info("手机号为数字", 2);
            return;
        }
        var value = e.target.value;
        if (value.length > 11) {
            value = value.slice(0, 11)
        }

        this.setState({
            phone: value,
        });
    }
    // 输入验证码
    handleCode(e) {
        if (!/^[0-9]*$/.test(e.target.value)) {
            Toast.info("验证码为数字", 2);
            return;
        }
        this.setState({
            code: e.target.value.slice(0, 6),
        });
    }
    // 获得验证码btn
    getCode() {
        var self = this;
        var phone = self.state.phone;

        var InterValObj = null;

    }
    // 点击按钮进行绑定
    clickBind() {
        var self = this;
        var code = self.state.code;
        var phone = self.state.phone;
        var pwd = '' + md5(code)
        // alert(self.state.dataAll.phone);
        if (phone != '' && phone.length == 11) {
            login({
                phoneNumber: phone,
                password: pwd,
            }).then(res => {
                console.log('bindPhoneApi res', res)
                if (res.data.result !== 'success') {
                    Toast.info(res.data.info || '接口失败', 2);
                    return;
                }
                localStorage.setItem("token", res.data.token);
                window.location.replace("index.html");

            }).catch(err => {

                Toast.info(err || '调用用户授权信息接口失败')
            })
        }
    }
    render() {
        return (
            <div className="content" >
                <div className="box">
                    <div className="title">账号绑定</div>
                    <div className="inputBox" >
                        <input placeholder="请输入手机号" value={this.state.phone} onChange={this.handlePhone.bind(this)} />
                    </div>
                    <div className="inputBox codeInput clear">
                        <input className="f_left" placeholder="请输入验证码" value={this.state.code} onChange={this.handleCode.bind(this)} />
                        <Button type="primary" className="f_left getCodBtn" onClick={this.getCode.bind(this)}> {this.state.time} </Button>
                    </div>
                    <Button className="btn" type="primary" onClick={this.clickBind.bind(this)}> 绑定 </Button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<BindPhone />,
    document.getElementById('root')
)