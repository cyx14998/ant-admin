import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, List, ImagePicker, Toast } from 'antd-mobile';
import './selfdata.less';
import userImg from '../../assets/back.png';

const Item = List.Item;
import Upload from 'rc-upload';
import $db from '../../common/dal.js';

class SelfData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // userId: '1',
            src: 'http://wx.qlogo.cn/mmopen/uibdIargxMsQuqPnDnAScnOCwXJ4LQ4kPrt5LmibTOdQweHNJKfAn0QCL1Eiat5zn2g8mia5zKb2CXSEwZ1klBYg55ugufcOGiaQa/0',
            result: '',
            // userImage: <img src='http://wx.qlogo.cn/mmopen/uibdIargxMsQuqPnDnAScnOCwXJ4LQ4kPrt5LmibTOdQweHNJKfAn0QCL1Eiat5zn2g8mia5zKb2CXSEwZ1klBYg55ugufcOGiaQa/0' alt="" />,
            NickName: '',
            Sex: '男',
            Phone: '',
            clicked: 'none',
        }
    }
    componentDidMount() {
        var self = this;
        $db.getLoginUserInfo(null, function (data) {
            // console.log(data);
            if (data && data.code != -100) {
                self.setState({
                    result: data,
                    src: data.HeadPortait,
                    NickName: data.NickName,
                    Sex: (data.Sex == 2) ? '女' : '男',
                    Phone: data.Phone,
                });
            } else {
                Toast.fail('获取用户信息失败,请稍后再试', 0, null, true);
            }
        });
    }
    beforeUpload(e) {
        console.log(e.size);
        if (e.size > 1048576) {
            Toast.info('图片过大，应小于 1M', 2);
            return false;
        }
    }
    onSuccess(e, s) {
        var self = this;
        console.log("success", e.result);
        // var keyCode = { key: e.result };
        var key = e.result;
        // console.log(key);
        $db.upLoad(key, function (data) {
            console.log(data);
            if (data && data.code != -100) {
                var modifyImg = 'data:image/jpeg; base64,' + data;
                self.setState({
                    src: modifyImg,
                });
            }
        })
    }
    render() {
        var userImage = this.state.userImage;
        var src = this.state.src;
        var NickName = this.state.NickName;
        var Sex = this.state.Sex;
        var Phone = this.state.Phone;
        var uploadurl = $db.baseUrl + "/emapi/emfiles/postfile";
        return (<div className="container">
            <NavBar
                mode="light" leftContent={<img src={userImg} width="40px" height="40px" alt="123" />} iconName={false}
                onLeftClick={() => { window.history.back(-1); }}
            >个人资料</NavBar>
            <div className="content">
                <List>
                    <Item extra={
                        <Upload action={uploadurl} className="upload" style={{ width: "$rem * 2.4", height: "$rem * 0.6", display: "block", position: "relative" }}
                            onSuccess={(e, s) => this.onSuccess(e, s)} onError={(e) => { console.log("error", e); }} beforeUpload={(e) => this.beforeUpload(e)}
                        ><img src={src} alt="头像" /></Upload>
                    } arrow="horizontal" >头像</Item>
                    <Item extra={NickName} arrow="horizontal" onClick={() => { window.location.href = "/user/modifyVIP" }}>昵称</Item>
                    <Item extra={Sex} arrow="horizontal" onClick={() => { window.location.href = "/user/sex"; }}>性别</Item>
                    <Item extra={Phone} arrow="horizontal" onClick={() => { window.location.href = "/user/bindphone"; }}>手机号</Item>
                </List>
            </div>
        </div>);
    }
}


ReactDOM.render(<SelfData></SelfData>, document.getElementById('reactwrapper'));