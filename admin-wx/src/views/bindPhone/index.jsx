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
} from '../../common/api/api.wx.js';


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

        if (self.state.click) {
            if (phone != '' && phone.length == 11) {

                // 禁止重复点击
                self.setState(prev => ({
                    click: false
                }));

                window.clearInterval(InterValObj);

                var count = 60; //间隔函数，1秒执行
                var curCount; //当前剩余秒数
                curCount = count;

                InterValObj = window.setInterval(() => {
                    // alert(curCount); 
                    if (curCount == 0) {
                        window.clearInterval(InterValObj); //停止计时器
                        self.setState({
                            getCodeClick: true,
                            click: true,
                            time: "重新发送",
                        });
                    } else {
                        curCount--;
                        self.setState({
                            click: false,
                            getCodeClick: true,
                            time: curCount + "秒",
                        });
                    }
                }, 1000); //启动计时器，1秒执行一次

                getPhoneCodeApi({
                    account: phone,
                    businessType: '7'
                }).then(res => {
                    console.log('getPhoneCodeApi res', res);
                    if (res.data.result !== 'success') {
                        Toast.info(res.data.info || '接口失败', 2);
                        return;
                    }
                    Toast.info("发送成功", 2);
                }).catch(err => {
                    window.clearInterval(InterValObj);
                    self.setState(prev => ({
                        click: true
                    }));

                    Toast.info(err || '获取验证码接口调用失败', 2)
                })
            } else {
                Toast.info('请输入正确的手机号', 2);
            }
        } else {
            Toast.info('验证码发送中', 2);
        }

    }
    // 点击按钮进行绑定
    clickBind() {
        var self = this;
        var code = self.state.code;
        var phone = self.state.phone;
        // alert(self.state.dataAll.phone);
        if (phone != '' && phone.length == 11) {
            if (self.state.getCodeClick) {
                if (code == '') {
                    Toast.info('请输入收到的短信验证码', 2);
                } else {
                    bindPhoneApi({
                        phoneNumber: phone,
                        iCode: code,
                        openId_WeiXin: '123',
                    }).then(res => {
                        console.log('bindPhoneApi res', res)
                        if (res.data.result !== 'success') {
                            Toast.info(res.data.info || '接口失败', 2);
                            return;
                        }
                        window.location.replace("/index.html");

                    }).catch(err => {

                        Toast.info(err || '调用用户授权信息接口失败')
                    })
                }
            } else {
                Toast.info('请获取验证码', 2);
            }
        } else {
            Toast.info('手机号不能为空或不正确', 2);
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