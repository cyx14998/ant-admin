import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, List, Button, Toast, Checkbox, Modal } from 'antd-mobile';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
import './manageAddress.less';
import back from '../../assets/back.png';
import store from '../../models/manageAddress';
const alert = Modal.alert;

class ManageAddress extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange(index) {
        //当前已经是默认地址时，直接返回
        if(store.getState()[index].checked){
            return;
        }
        store.dispatch({ index: index, type: 'CHECKED' });
    }
    addDel(id) {
        alert('删除', '是否删除?', [
            { text: '取消', onPress: () => console.log('取消删除') },
            { 
                text: '确定', 
                onPress: function (){ 
                    var self = this;
                    var data = {
                        id: id
                    };
                    // $.post('', data, function (result) {
                    //     Toast.info('删除成功', 1);
                    // }) 
                    console.log(data);
                }
            },
        ])
        
    }
    render() {
        return (
            <div className="container">
                <NavBar
                    mode="light" leftContent={<img src={back} width="40px" height="40px" alt="123" />} iconName={false}
                    onLeftClick={() => {
                        window.history.go(-1)
                    }}>收货地址管理</NavBar>
                <div className="content">
                    {
                        store.getState().map((item, index) => {
                            var checked = item.checked;
                            return <div className="block clear" key={index}>
                                <Item extra={item.mobile}>{item.name}</Item>
                                <Item className="address" wrap>{item.province+item.city+item.area+item.address}</Item>
                                <div className="editBox clear">
                                    <CheckboxItem className="f_left checkBox" checked={checked} onChange={() => this.onChange(index)}>默认地址</CheckboxItem>
                                    <div className="f_right editItem" onClick={this.addDel.bind(this,item.id)}>
                                        <i className="f_left delete"></i>
                                        <p className="f_left">删除</p>
                                    </div>
                                    <div
                                        className="f_right editItem"
                                        onClick={() => {
                                            localStorage.setItem("manageaddress", JSON.stringify(item));  
                                            window.location.href = '/user/addEditaddress?editOrAdd=edit'; 
                                        }}>
                                        <i className="f_left edit"></i>
                                        <p className="f_left">编辑</p>
                                    </div>
                                </div>
                                <Button
                                    className="btn clear"
                                    type="primary"
                                    onClick={() => {
                                        localStorage.removeItem("manageaddress");  
                                        window.location.href = "/user/addEditaddress?editOrAdd=add";
                                    }}>添加新地址</Button>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <ManageAddress></ManageAddress>, document.getElementById('reactwrapper'));
}
render();
store.subscribe(render);