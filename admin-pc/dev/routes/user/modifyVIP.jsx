import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, List, InputItem, Toast } from 'antd-mobile';
import './modifyVIP.less';
import $db from '../../common/dal.js';
import userImg from '../../assets/back.png';


const Item = List.Item;

class ModifyVIP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAll: {
                NickName: ''
            },
            NickName: ''
        }
    }
    componentDidMount() {
        var self = this;
        $db.getLoginUserInfo(null, function (data) {
            // console.log(data);
            if (data && data.code != -100) {
                self.setState({
                    dataAll: data,
                    NickName: data.NickName,
                });
            } else {
                // alert("获取用户信息失败");
            }
        });
    }
    onChange(value) {
        this.setState({ NickName: value });
    }
    save() {
        var self = this;
        self.state.dataAll.NickName = self.state.NickName;
        var data1 = {
            // NickName: self.state.NickName,
            dataAll: self.state.dataAll,
        }
        // alert(JSON.stringify(data1.dataAll.NickName));
        $db.upData(data1, function (result) {
            // alert(JSON.stringify(result));
            if (result.code == 1) {
                Toast.info('保存成功', 2);
            } else {
                Toast.info('保存失败', 2);
            }

        });
    }
    render() {
        var NickName = this.state.dataAll.NickName;
        return (
            <div className="container">
                <NavBar
                    mode="light" leftContent={<img src={userImg} width="40px" height="40px" alt="123" />} iconName={false}
                    onLeftClick={() => { window.history.back(-1); }}
                    rightContent={<p onClick={this.save.bind(this)}>保存</p>}
                >修改昵称</NavBar>
                <div className="content">
                    <InputItem placeholder={NickName} onChange={this.onChange.bind(this)}></InputItem>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ModifyVIP></ModifyVIP>, document.getElementById('reactwrapper'));