import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, List, InputItem, Toast } from 'antd-mobile';
const Item = List.Item;
import './bindphone.less';
import $db from '../../common/dal.js';
import userImg from '../../assets/back.png';

class BindPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Phone: '',
            code: '',
            dataAll: {},
            time: '获取验证码',
            click: true,
        };
    }
    componentDidMount() {
        var self = this;
        $db.getLoginUserInfo(null, function (data) {
            // console.log(data);
            if (data && data.code != -100) {
                self.setState({
                    dataAll: data,
                });
            } else {
            }
        });
    }
    onChange(value) {
        const self = this;
        if (value.length > 11) {
            // console.log(value.length);
            alert('请输入正确的手机号');
        } else {
            self.setState({
                Phone: value,
            });
        }
        self.setState({
            Phone: value,
        });
    }
    getCode() {
        var self = this;
        if (self.state.click) {
            var Phone = self.state.Phone;
            if (Phone != '' && Phone.length == 11) {
                var count = 10; //间隔函数，1秒执行
                var curCount;//当前剩余秒数
                curCount = count;
                var data1 = { Phone: Phone };
                $db.getCode(data1, function (result) {
                    if (result.code == 1) {
                        var InterValObj = window.setInterval(() => {
                            // alert(curCount); 
                            if (curCount == 0) {
                                window.clearInterval(InterValObj);//停止计时器
                                self.setState({
                                    click: true,
                                    time: "重新发送",
                                });
                            } else {
                                curCount--;
                                console.log(self.state.time);
                                console.log(curCount);
                                self.setState({
                                    click: false,
                                    time: curCount + "秒内有效",
                                });
                            }
                        }, 1000); //启动计时器，1秒执行一次
                        Toast.info('发送成功', 2);
                    } else {
                        Toast.info('发送失败', 2);
                    }
                });
            } else {
                alert('请输入正确的手机号');
            }
        } else {
            Toast.info('验证码发送中，注意查收', 2);

        }
    }
    save() {
        var self = this;
        var code = self.state.code;
        var Phone = self.state.Phone;
        self.state.dataAll.Phone = Phone;
        // alert(self.state.dataAll.Phone);
        if (Phone != '') {
            if (code == '') {
                Toast.info('验证码不能为空', 2);                
            } else {
                var data1 =
                    {
                        Phone: Phone,
                        dataAll: self.state.dataAll,
                        code: code,
                    };
                // alert(data1.dataAll);
                $db.isCode(data1, function (result) {
                    // console.log(data1);
                    if (result.code == 1) {                       
                        Toast.info('保存成功', 2);
                    } else {
                        Toast.info('保存失败，请输入正确的验证码', 2);                        
                    }
                });
            }
        } else {
                Toast.info('手机号不能为空', 2);                            
        }
    }
    render() {
        var code = this.state.code;
        var time = this.state.time;
        return (
            <div className="container"> 
                <NavBar
                    mode="light" leftContent={<img src={userImg} width="40px" height="40px" alt="123" />} iconName={false}
                    onLeftClick={() => { window.history.back(-1); }}
                    rightContent={<p onClick={this.save.bind(this)}>保存</p>}
                >换绑手机号</NavBar>
                <div className="content">
                    <List renderHeader={() => ''}>
                        <InputItem placeholder="手机号" type="number" onChange={this.onChange.bind(this)}></InputItem>
                        <InputItem className="getCode" placeholder="请输入验证码" onChange={(value) => { this.setState({ code: value }); }} extra={time} onExtraClick={this.getCode.bind(this)}></InputItem>
                    </List>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<BindPhone></BindPhone>, document.getElementById("reactwrapper"));