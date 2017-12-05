import { createStore } from 'redux';
import $db from '../../dal/goods.js';
const initialState = {
    dataReady: false, // 数据是否加载完成
    searchPage: false,//是否在搜索页
    focus: 'focus',//搜索框是否聚焦
    keyWords: '',//搜索关键词
    tabTop: 0, // tab离顶部的距离
    fixed: false, //tab 是否需要fixed

    choice: [], // 首页实惠好货产品
    newproduct: [],// 首页新品上架产品
    pricerite: [],// 首页精品推荐产品
    searchPro: [], // 搜索出来的产品

    history: [], // 搜索历史

    otherPros: {
        img: '',
        product: []
    }, // 其他tabs产品
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA': 
        return Object.assign({}, state, {
            dataReady: action.dataReady,
            choice: action.choice,
            newproduct: action.newproduct,
            pricerite: action.pricerite
        });
    case 'SEARCHFOCUS': 
        return Object.assign({}, state, {
            history: localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [],
            searchPage: true,
            focus: null
        });
    case 'SEARCHINPUT': 
        return Object.assign({}, state, {
            keyWords: action.keyWords,
            searchPro: action.searchPro
        })
    case 'SEARCHCANCEL':
        return Object.assign({}, state, {
            focus: 'focus',
            searchPage: false,
        });
    case 'TABTOP':
        return Object.assign({}, state, {
            tabTop: action.tabTop
        });
    case 'ISFIXED':
        return Object.assign({}, state, {
            fixed: true
        });
    case 'NOFIXED':
        return Object.assign({}, state, {
            fixed: false
        });
    case 'CLEARHISTORY': 
        return Object.assign({}, state, {
            history: []
        });
    case 'GETOTHERPRO':
        return Object.assign({}, state, {
             otherPros: action.products
        });
    default: return state;
  }
};
const store = createStore(reducer);
module.exports = store;