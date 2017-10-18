// 本文件是对多个商家处理的jsx文件，暂不删除。
import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Checkbox, List, Button, Stepper } from 'antd-mobile';

import store from '../../models/shoppingCar';
import './index.less';
import cartDelete from '../../assets/cart_delete.png';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

class BindPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtbl: 'false',
        };
    }
    onChangeListChecked(index) {
        store.dispatch({
            index: index,
            type: 'totalChecked'
        })
    }
    onChangeProductChecked(pIndex, cIndex) {
        store.dispatch({
            pIndex: pIndex,
            cIndex: cIndex,
            type: 'supChecked'
        })
    }
    onChangeAllChecked() {
        store.dispatch({
            type: 'allChecked'
        })
    }
    onChangeStep(pIndex, cIndex, count) {
        store.dispatch({
            type: 'changeStep',
            count: count,
            pIndex: pIndex,
            cIndex: cIndex,
        })
    }
    onClick() {
        this.setState({ txtbl: !this.state.txtbl });
    }

    //批量删除
    delAll() {
        console.log(store.getState());
    }

    //单个删除
    delOne(item, index, pIndex) {
        console.log(item);
        store.dispatch({
            pIndex: pIndex,
            index: index,
            type: 'DELONE'
        });
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
                            store.getState().data.map((item, index) => {
                                return <div key={index}>
                                    <CheckboxItem key={index} className="list-check" checked={item.checked} onChange={() => this.onChangeListChecked(index)}>
                                        <Item thumb={item.icon}><p>{item.category}</p></Item>
                                    </CheckboxItem>
                                    {
                                        item.product.map((o, i) => {
                                            return <CheckboxItem key={i} className="list" checked={o.checked} onChange={() => this.onChangeProductChecked(index, i)}>
                                                <div className="product">
                                                    <img src={o.productimg} className="img-products" />
                                                    <div>
                                                        <p>{o.information}</p>
                                                        <div className="product-price">
                                                            <p>￥{o.price}</p>
                                                            <div>
                                                                <div id={this.state.txtbl ? "" : "disnone"}>
                                                                    <Stepper
                                                                        style={{ width: '100%', minWidth: '2rem' }}
                                                                        showNumber
                                                                        max={10}
                                                                        min={1}
                                                                        value={o.count}
                                                                        onChange={this.onChangeStep.bind(this, index, i)}
                                                                        useTouch={false}
                                                                    />
                                                                </div>
                                                                <img src={cartDelete} id={this.state.txtbl ? "disnone" : ""} onClick={this.delOne.bind(this, o, i, index)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CheckboxItem>
                                        })
                                    }
                                </div>
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
                        <Button id={this.state.txtbl ? "" : "disnone"}>去结算 ({store.getState().total})</Button>
                        <Button id={this.state.txtbl ? "disnone" : "delete"} onClick={this.delAll.bind(this)}>删除</Button>
                    </div>
                </div>
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(<BindPhone></BindPhone>, document.getElementById('reactwrapper'))
};

render();
store.subscribe(render);
