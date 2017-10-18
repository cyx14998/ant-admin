import { createStore } from 'redux';
const initialState = {
    isFromPay: true, // 是否从去支付进的支付成功页   还有一个是确认收货进的交易成功页
    tradeStatus: 1, // 交易状态 1:交易成功  2：支付成功
    unitPrice: 50, // 产品总价

};
initialState.tradeStatus = 1;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UNITPRICE': 
        return Object.assign({}, state, {
            unitPrice: action.unitPrice
        });
    case 'ISFROMTRADE':
        return Object.assign({}, state, {
            isFromPay: false
        });
    default: return state;
  }
};
const store = createStore(reducer);
module.exports = store;