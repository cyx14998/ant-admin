import { createStore } from 'redux';
const initialState = {
    dataLoaded: false,//数据是否获取到
    StatusCode: 1, // 订单状态 1:待付款 2:已付款  3:已发货
    Consignee: '',//姓名
    CreatedTime: '', // 下单时间
    Address: '',// 地址 
    Phone: 1,// 手机号
    RealTotalPrice: 1,// 总价格
    OrderID: '',// 订单Id

    OrderInfo: [],// 订单产品信息

};
initialState.orderStatus = 3;
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            return Object.assign({}, state, {
                dataLoaded: true,
                StatusCode: action.StatusCode,
                Consignee: action.Consignee,
                CreatedTime: action.CreatedTime,
                Address: action.Address,
                Phone: action.Phone,
                RealTotalPrice: action.RealTotalPrice,
                OrderID: action.OrderID,

                OrderInfo: action.OrderInfo,
            });
        default: return state;
    }
};
const store = createStore(reducer);
module.exports = store;