import { createStore } from 'redux';
const initialState = {
    dataLoaded: false,//数据是否获取到
    dataAll: [],//全部订单信息
    data1: [],//待付款信息
    data2: [],//待发货信息
    data3: [],//待收货信息
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            return Object.assign({}, state, {
                dataLoaded: true,
                dataAll: action.dataAll,
                data1: action.data1,
                data2: action.data2,
                data3: action.data3
            });
        default: return state;
    }
};
const store = createStore(reducer);
module.exports = store;