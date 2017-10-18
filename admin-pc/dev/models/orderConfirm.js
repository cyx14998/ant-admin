import { createStore } from 'redux';
const initialState = {
    is_WX: false, // 判断是否是微信浏览器
    isFromDetail: true, // 是否从详情页进来的
    unitPrice: 0, // 产品总价
    Phone: 13007286681,//手机号
    Consignee: '张某',
    Address: '江苏省苏州市吴中区工业园区星湖街218号生物纳米园',

    proList: []

};
//判断是否是从详情页进来
var isFromDetail = localStorage.getItem('isFromDetail');

const count = (state = initialState) => {
    var unitPrice = 0;
    (state.proList && state.proList.length) ? state.proList.map(function(item, index){
        unitPrice += item.SalePrice * item.Quantity;
    }) : '';
    state.unitPrice = unitPrice;
}

//产品列表
var proList = localStorage.getItem('proList') ? JSON.parse(localStorage.getItem('proList')) : [];
initialState.proList = proList;
if(isFromDetail && isFromDetail == "true"){
    initialState.isFromDetail = true;
    initialState.unitPrice = proList[0].SalePrice * proList[0].Quantity;
}else{
    initialState.isFromDetail = false;
    count();
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGENUM': 
        state.proList[action.index].Quantity = action.Quantity;
        count();
        return state;
    //微信浏览器打开，去除导航
    case 'ISWX':
        state.is_WX = true;
        return state;
    default: return state;
  }
};
const store = createStore(reducer);
module.exports = store;