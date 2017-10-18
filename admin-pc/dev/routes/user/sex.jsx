import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, List, Toast, Radio } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
import './sex.less';
import $db from '../../common/dal.js';
import userImg from '../../assets/back.png';

class Sex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAll: {
            },
            value: 1,
        }
    }
    componentDidMount() {
        var self = this;
        $db.getLoginUserInfo(null, function (data) {
            // console.log(data);
            if (data && data.code != -100) {
                self.setState({
                    dataAll: data,
                    value: data.Sex,
                });
            } else {
                // alert("获取用户信息失败");
            }
        });
    }
    onChange(value) {
        // console.log(value);
        this.setState({
            value: value,
        });
        // alert(value);
    };
    leftIcon() {
        var self = this;
        self.state.dataAll.Sex = self.state.value;
        // alert( self.state.dataAll.value);
        var data1 = {
            dataAll: self.state.dataAll,
        }
        // alert(JSON.stringify(data1.dataAll.Sex));
        $db.upData(data1, function (result) {
            // console.log(data);
            if (result.code == 1) {
                window.history.back(-1);
            } else {
                alert('保存失败');
                window.history.back(-1);
            }
        });
    }
    render() {
        const { value } = this.state;
        const data = [
            { value: 1, label: '男' },
            { value: 2, label: '女' },
        ];
        return (
            <div className="container">
                <NavBar
                    mode="light" leftContent={<img src={userImg} width="40px" height="40px" alt="123" />} iconName={false}
                    onLeftClick={this.leftIcon.bind(this)}
                >性别</NavBar>
                <div className="content">
                    {/* <List>   */}
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onClick={() => this.onChange(i.value)}>
                            {/* console.log(i.value) */}
                            {i.label}
                        </RadioItem>
                    ))}
                    {/* </List>    */}
                </div>
            </div>
        );
    }
}



ReactDOM.render(<Sex></Sex>, document.getElementById("reactwrapper"));
