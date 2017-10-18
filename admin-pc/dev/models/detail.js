import { createStore } from 'redux';
const initialState = {
    isFixed: false, // tabs是否fixed
    desPos: true, // 是否点击滚动到商品简介
    paramPos: false, //是否点击滚动到商品参数
    otherPos: false, //是否点击滚动到关于其他
    tabTop: 0, // tabs与页面顶部的距离
    desTop: 0, // 商品简介与页面顶部的距离
    paramTop: 0, // 商品参数与页面顶部的距离
    otherTop: 0, // 关于其他与页面顶部的距离
    OrderNum: 1, //选择的产品数量
    maskWrapper: false, // 是否是有mask面板出现

    ProPic: '', // 详情图片
    Price: '', // 价格
    Summary: '', // 摘要
    Introduction: '', // 简介
    InnerID: '', // id

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
        return Object.assign({}, state, {
            ProPic: action.ProPic,
            Price: action.Price,
            Summary: action.Summary, 
            Introduction: action.Introduction, 
            InnerID: action.InnerID, 
            VersionInfo: action.VersionInfo,
            ProductName: action.ProductName,
            ProType: action.ProType,
            Tags: action.Tags
        });
    case 'SETPARAM': 
        return Object.assign({}, state, {
            tabTop: action.tabTop,
            desTop: action.desTop,
            paramTop: action.paramTop,
            otherTop: action.otherTop
        });
    case 'FIX': 
        return Object.assign({}, state, {
            isFixed: true
        });
    case 'NOFIX':
        return Object.assign({}, state, {
            isFixed: false
        });
    case 'DESPOS': 
        return Object.assign({}, state, {
            isFixed: true,
            desPos: true,
            paramPos: false, 
            otherPos: false
        });
    case 'PARAMPOS': 
        return Object.assign({}, state, {
            isFixed: true,
            paramPos: true,
            desPos: false, 
            otherPos: false
        });
    case 'OTHERPOS': 
        return Object.assign({}, state, {
            isFixed: true,
            otherPos: true,
            desPos: false, 
            paramPos: false
        });
    case 'DEFAULTPOS':
        return Object.assign({}, state, {
            isFixed: false, 
            desPos: false, 
            paramPos: false,
            otherPos: false,
        });
    case 'OrderNum':
        return Object.assign({}, state, {
            OrderNum: action.OrderNum
        });
    case 'OPENMASK':
        return Object.assign({}, state, {
            maskWrapper: true
        });
    case 'CLOSEMASK':
        return Object.assign({}, state, {
            maskWrapper: false
        });
    default: return state;
  }
};
const store = createStore(reducer);
module.exports = store;