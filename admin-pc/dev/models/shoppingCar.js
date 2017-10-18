import {
    createStore
} from 'redux';
// import icon from '../assets/icon.png';

//下面注释部分为多商家产品数据格式，先放着
// const initialState = {
//     checked: false,
//     totalPrices: 0,
//     total: 0,
//     data: [{
//             icon: icon,
//             category: '优质水果',
//             checked: false,
//             product: [{
//                     productimg: icon,
//                     information: '丰县大沙河红富士苹果18只/箱82大果径产地直供 新鲜直发',
//                     price: '50.00',
//                     count: 1,
//                     checked: false,
//                 },
//                 {
//                     productimg: icon,
//                     information: '丰县大沙河红富士苹果18只/箱82大果径产地直供 新鲜直发',
//                     price: '50.00',
//                     count: 1,
//                     checked: false,
//                 },
//                 {
//                     productimg: icon,
//                     information: '丰县大沙河红富士苹果18只/箱82大果径产地直供 新鲜直发',
//                     price: '50.00',
//                     count: 1,
//                     checked: false,
//                 }
//             ]
//         },
//         {
//             icon: icon,
//             category: '优质水果',
//             checked: false,
//             product: [{
//                     productimg: icon,
//                     information: '丰县大沙河红富士苹果18只/箱82大果径产地直供 新鲜直发',
//                     price: '50.00',
//                     count: 1,
//                     checked: false,
//                 },
//                 {
//                     productimg: icon,
//                     information: '丰县大沙河红富士苹果18只/箱82大果径产地直供 新鲜直发',
//                     price: '50.00',
//                     count: 1,
//                     checked: false,
//                 }
//             ]
//         }
//     ]
// };

// const count = (state = iinitialState) => {
//     var total = 0;
//     var totalPrice = 0;
//     state.data.map((item,index)=>{
//         item.product.map((o,i) => {
//             if(o.checked){
//                 total++;
//                 totalPrice += o.price*o.count;
//             }
//         })
//     })
//     state.totalPrices = totalPrice;
//     state.total = total;
//     if(total==5){
//         state.checked = true;
//     }else{
//         state.checked = false;
//     }
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'supChecked':
//             state.data[action.pIndex].product[action.cIndex].checked = !state.data[action.pIndex].product[action.cIndex].checked;
//             var checked = 0;
//             for(var i=0;i<state.data[action.pIndex].product.length;i++){
//                 var item = state.data[action.pIndex].product[i];
//                 if(item.checked){
//                     checked++;
//                 }
//             }
//             count();
//             if(checked==state.data[action.pIndex].product.length){
//                 state.data[action.pIndex].checked = true;
//             }else{
//                 state.data[action.pIndex].checked = false;
//             }
//             return state;
//         case 'totalChecked':
//             state.data[action.index].checked = !state.data[action.index].checked;
//             state.data[action.index].product.map((item,index)=>{
//                 if(state.data[action.index].checked){
//                     item.checked = true;
//                 }else{
//                     item.checked = false;
//                 }
//             })
//             count();
//             return state;
//         case 'allChecked':
//             state.checked = !state.checked;
//             state.data.map((item,index)=>{
//                 if(state.checked){
//                     item.checked = true;
//                     item.product.map((o,i) => {
//                         o.checked = true;
//                     })
//                 }else{
//                     item.checked = false;
//                     item.product.map((o,i) => {
//                         o.checked = false;
//                     })
//                 }
//             })
//             count();
//             return state;
//         case 'changeStep':
//             state.data[action.pIndex].product[action.cIndex].count = action.count;
//             count();
//             return state;
//         case 'totalPrice':
//             state.data.map((item,index)=>{
//                 item.product.map((o,i) => {
//                     if(o.checked){
//                         state.totalPrice += o.price*o.count; 
//                     }
//                 })
//             })
//             return state;
//         //删除一个产品
//         case 'DELONE':
//             state.data[action.pIndex].product.splice(action.index,1);
//             if(!state.data[action.pIndex].product.length){
//                 state.data.splice(action.pIndex,1);
//             }
//             count();
//             return state;
//         default:
//             return state;
//     }
// };
// const store = createStore(reducer);
// module.exports = store;


const initialState = {
    checked: false,
    totalPrices: 0,
    total: 0,
    data: [
        // {
        //     "InnerID": "sample string 1",
        //     "UserID": "sample string 2",//会员Id
        //     "Quantity": 1,//购买数量
        //     "SalePrice": 1.0,//销售价
        //     "ProductName": "sample string 3",//商品名称
        //     "ProType": "sample string 4",//类型
        //     "ProductID": "sample string 5",//商品ID
        //     "ThumbnailsUrl": icon,//图片
        //     "Summary": "",//摘要
        //     "StatusCode": true,//状态
        //     checked: false,
        // }
    ]
};


const count = (state = initialState) => {
    var total = 0;
    var totalPrice = 0;
    state.data.map((item, index) => {
        if (item.checked) {
            total++;
            totalPrice += item.SalePrice * item.Quantity;
        }
    })
    state.totalPrices = totalPrice;
    state.total = total;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            state.data = action.result;
            state.data.map(function (item, index) {
                item.checked = false;
            })
            return state;
        //每个子项目点击
        case 'supChecked':
            state.data[action.index].checked = !state.data[action.index].checked;
            var checked = 0;
            for (var i = 0; i < state.data.length; i++) {
                var item = state.data[i];
                if (item.checked) {
                    checked++;
                }
            }
            count();
            if (checked == state.data.length) {
                state.checked = true;
            } else {
                state.checked = false;
            }
            // count();
            return state;
        //全选
        case 'allChecked':
            state.checked = !state.checked;
            state.data.map((item, index) => {
                if (state.checked) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            })
            count();
            return state;
        //改变产品数量
        case 'changeStep':
            state.data[action.index].Quantity = action.Quantity;
            count();
            return state;
        //删除一个产品
        case 'DELONE':
            state.data.splice(action.index, 1);
            count();
            return state;
        //删除所有产品
        case 'DELAll':
            console.log(state);
            var newDate = [];
            state.data.map(function (item, index) {
                if (!item.checked) {
                    newDate.push(item);
                }
            })
            state.data = newDate;
            return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;
