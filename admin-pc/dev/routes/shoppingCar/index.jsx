import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Modal, Toast, Checkbox, List, Button, Stepper } from 'antd-mobile';

import store from '../../models/shoppingCar';
import $db from '../../common/dal.js';
import './index.less';
import cartDelete from '../../assets/cart_delete.png';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;

class ShoppingCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtbl: 'false',
        };
    }
    componentDidMount() {
        var openId = localStorage.getItem('WXopenId');
        Toast.loading('Loading...', 0);
        $db.getAllShoppingCart(openId, function (data) {
            Toast.hide();
            if (data && data.code && data.code == 1) {
                store.dispatch({
                    type: 'ADD_DATA',
                    result: data.result
                })
            }
        })
    }
    onChangeProductChecked(index) {
        store.dispatch({
            index: index,
            type: 'supChecked'
        })
    }
    onChangeAllChecked() {
        store.dispatch({
            type: 'allChecked'
        })
    }
    onChangeStep(index, count) {
        Toast.loading('Loading...', 0);
        var param = {
            "InnerID": store.getState().data[index].InnerID,//购物车Id
            "Quantity": count
        }
        $db.saveShoppingCart(param, function (data) {
            Toast.hide();
            if (data && data.code && data.code == 1) {
                store.dispatch({
                    type: 'changeStep',
                    Quantity: count,
                    index: index,
                })
            }else{
                Toast.fail('增加数量失败,请稍后再试!',2);
            }
        })
    }
    onClick() {
        this.setState({ txtbl: !this.state.txtbl });
    }

    //批量删除
    delAll() {
        //Modal弹窗
        alert('删除', '确定删除么?', [
            {
                text: '取消', onPress: () => console.log('取消删除操作')
            },
            {
                text: '确定', onPress: function () {
                    Toast.loading('Loading...', 0);
                    var param = {};
                    var arr = [];
                    store.getState().data.map(function (item, index) {
                        if (item.checked) {
                            var delId = {
                                "InnerID": item.InnerID
                            }
                            arr.push(delId);
                        }
                    })
                    param.CartInfo = arr;
                    $db.deleteShopingCart(param, function (data) {
                        Toast.hide();
                        if (data && data.code && data.code == 1) {
                            store.dispatch({
                                type: 'DELAll'
                            });
                        }
                    })
                }
            },
        ])

    }

    //单个删除
    delOne(item, index) {
        //Modal弹窗
        alert('删除', '确定删除么?', [
            {
                text: '取消', onPress: () => console.log('取消删除操作')
            },
            {
                text: '确定', onPress: function () {
                    Toast.loading('Loading...', 0);
                    console.log(item);
                    var delId = {
                        "InnerID": item.InnerID
                    }
                    var param = {};
                    var arr = [];
                    arr.push(delId);
                    param.CartInfo = arr;
                    $db.deleteShopingCart(param, function (data) {
                        Toast.hide();
                        if (data && data.code && data.code == 1) {
                            store.dispatch({
                                index: index,
                                type: 'DELONE'
                            });
                        }
                    })
                }
            }
        ])

    }

    //去结算
    goConfirm() {
        localStorage.setItem('isFromDetail', "false");
        var proList = [];
        (store.getState().data && store.getState().data.length) ? store.getState().data.map(function (item, index) {
            if (item.checked) {
                proList.push(item);
            }
        }) : '';
        if (proList.length) {
            localStorage.setItem('proList', JSON.stringify(proList));
            window.location.href = '/user/mall/orderconfirm';
        }

    }
    render() {

        return (
            <div className="container">
                <NavBar
                    mode="light"
                    onLeftClick={() => { window.history.go(-1); }}
                    rightContent={<p onClick={this.onClick.bind(this)}>{this.state.txtbl ? "编辑" : "完成"}</p>}
                >购物车({store.getState().total})</NavBar>
                <div className="content">
                    <div className="lists">
                        {
                            store.getState().data.map((o, i) => {
                                return <CheckboxItem key={i} className="list" checked={o.checked} onChange={() => this.onChangeProductChecked(i)}>
                                    <div className="product">
                                        <img src={o.ThumbnailsUrl} className="img-products" />
                                        <div>
                                            <p>{o.Summary}</p>
                                            <div className="product-price">
                                                <p>￥{o.SalePrice}</p>
                                                <div className="changeNumOrDel">
                                                    <div id={this.state.txtbl ? "" : "disnone"}>
                                                        <Stepper
                                                            style={{ width: '100%', minWidth: '2rem' }}
                                                            showNumber
                                                            max={100}
                                                            min={1}
                                                            value={o.Quantity}
                                                            onChange={this.onChangeStep.bind(this, i)}
                                                            useTouch={false}
                                                        />
                                                    </div>
                                                    <img src={cartDelete} id={this.state.txtbl ? "disnone" : ""} onClick={this.delOne.bind(this, o, i)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CheckboxItem>
                            })
                        }
                    </div>
                    <div className="account">
                        {/* className={this.state.txtbl?"list-check disblock":"disnone"} */}
                        <CheckboxItem key={0} className="account-check" id={this.state.txtbl ? "" : "disnone"} checked={store.getState().checked} onChange={() => this.onChangeAllChecked()}>
                            <div className="acount-content">
                                <div className="acount-money">
                                    全选
                                    <span className="acount-total">合计: </span>
                                    <span className="acount-price">￥{store.getState().totalPrices.toFixed(2)}</span>
                                    (免运费)
                                </div>
                            </div>
                        </CheckboxItem>
                        <Button id={this.state.txtbl ? "" : "disnone"} onClick={this.goConfirm.bind(this)}>去结算 ({store.getState().total})</Button>
                        <Button id={this.state.txtbl ? "disnone" : "delete"} onClick={this.delAll.bind(this)}>删除</Button>
                    </div>
                </div>
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(<ShoppingCar></ShoppingCar>, document.getElementById('reactwrapper'));
};

render();
store.subscribe(render);
