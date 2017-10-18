// 新增/编辑地址页面
import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, List, InputItem, TextareaItem, Picker, Switch, Modal, Toast } from 'antd-mobile';
import './editaddress.less';
const Item = List.Item;
import back from '../../assets/back.png';
import { createForm } from 'rc-form';
import store from '../../models/addEditaddress';
import addJson from '../../common/address';
import arrayTreeFilter from 'array-tree-filter';
const alert = Modal.alert;

const getQuery = function (key) {
    var url = window.location.href;
    var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : svalue;
}
const editOrAdd = getQuery('editOrAdd');  //从编辑/新增按钮进来


//显示的是label
const data1 = [{
    "value": "江苏省",
    "label": "江苏省",
    "children": [{
        "value": "苏州市",
        "label": "苏州市",
        "children": [{
            "value": "吴中区",
            "label": "吴中区",
            "children": []
        }, {
            "value": "相城区",
            "label": "相城区",
            "children": []
        }, {
            "value": "姑苏区",
            "label": "姑苏区",
            "children": []
        }, {
            "value": "高新区",
            "label": "高新区",
            "children": []
        }, {
            "value": "吴江区",
            "label": "吴江区",
            "children": []
        }, {
            "value": "工业园区",
            "label": "工业园区",
            "children": []
        },]

    }]
},]

const data2 = [{
    label: '娄葑街道',
    value: '111',
}, {
    label: '观前街',
    value: '112',
}]
class EditAddress extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var manageaddress = localStorage.getItem("manageaddress");
        if (manageaddress) {
            var manageaddressToJsoon = JSON.parse(manageaddress);
            setTimeout(() => {
                store.dispatch({
                    manageaddress: manageaddressToJsoon,
                    type: 'EDITADDRESS'
                });
            }, 0)
        } else {
            setTimeout(() => {
                store.dispatch({
                    manageaddress: {},
                    type: 'EDITADDRESS'
                });
            }, 0)
        }
    }
    save() {
        if (!store.getState().name) {
            Toast.info('请输入姓名', 2, null, false);
            return;
        }
        if (!store.getState().mobile) {
            Toast.info('请输入电话号码', 2, null, false);
            return;
        }
        if (!store.getState().province) {
            Toast.info('请选择地区', 2, null, false);
            return;
        }
        if (!store.getState().address) {
            Toast.info('请输入详细地址', 2, null, false);
            return;
        }
        var data = {
            address: store.getState(),
        }

        console.log(store.getState());
        // window.history.go(-1)
        //  $.post("", data,function(result){
        //     // console.log(result);
        // });
    }
    delete() {
        var data = store.getState().id;
        console.log(data);
        alert('删除', '是否删除?', [{
            text: '取消',
            onPress: () => console.log('取消返回')
        },
        {
            text: '确定',
            onPress: () => window.history.go(-1)
        },
        ])
    }
    onOk(value) {
        var label = this.getSel(value);
        console.log(label, value);
        //把城市编码code和地区信息存起来
        store.dispatch({
            code: value,
            area: label,
            type: 'EDITAREA'
        })
    }
    //根据value的地区码获取选取的地区中文label
    getSel(value) {
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(addJson, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label)
    }
    //返回
    goBack() {
        alert('返回', '是否放弃此次编辑?', [
            { text: '取消', onPress: () => console.log('取消返回') },
            { text: '确定', onPress: () => window.history.go(-1) },
        ])
    }
    //
    addressForCheck(){
        store.dispatch({
            type: 'ADDRESSCHECK'
        })
    }
    render() {
        var name = store.getState().name;
        var mobile = store.getState().mobile;
        var province = store.getState().province;
        var city = store.getState().city;
        var area = store.getState().area;
        var regionCode = localStorage.getItem("manageaddress") ? JSON.parse(localStorage.getItem("manageaddress")).regionCode : [];
        var address = store.getState().address;
        var checked = store.getState().checked;

        const { getFieldProps } = this.props.form;
        return (
            <div className="container">
                <NavBar
                    mode="light" leftContent={<img src={back} width="40px" height="40px" alt="123" />} iconName={false}
                    onLeftClick={this.goBack.bind(this)}
                    rightContent={<p onClick={this.save.bind(this)}>保存</p>}
                >{(editOrAdd && editOrAdd == 'edit' ? '编辑地址' : '新增地址')}</NavBar>
                <div className="content">
                    <List>
                        <InputItem placeholder={name ? name : '请输入姓名'} onChange={(value) => { store.dispatch({ name: value, type: 'EDITPERSON' }); }}>姓名</InputItem>
                        <InputItem
                            {...getFieldProps('phone') }
                            type="phone"
                            value={mobile}
                            placeholder={mobile ? mobile : '请输入电话号码'}
                            onChange={(value) => { store.dispatch({ phone: value, type: 'EDITPHONE' }); }}
                        >电话</InputItem>
                        <Picker data={addJson} title="选择地区" {...getFieldProps('addJson', { initialValue: regionCode }) } onOk={this.onOk.bind(this)}>
                            <Item arrow="horizontal">地区</Item>
                        </Picker>
                        <TextareaItem rows={3} value={address} placeholder='请输入详细地址' onChange={(value) => { store.dispatch({ address: value, type: 'EDITPOSITION' }); }} />
                    </List>
                    <Item className={localStorage.getItem("manageaddress") ? 'delete' : 'none'} onClick={this.delete.bind(this)}><p className="red">删除</p></Item>
                    <Item className={!localStorage.getItem("manageaddress") ? 'margin_T' : 'none'} extra={
                        <Switch
                            checked={checked}
                            onClick={this.addressForCheck.bind(this)} />}
                    >设为默认</Item>
                </div>
            </div>
        );
    }
}


const EditAddressForm = createForm()(EditAddress);
const render = () => {
    ReactDOM.render(
        <EditAddressForm></EditAddressForm>, document.getElementById('reactwrapper'));
}
render();
store.subscribe(render);