import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    count: 1,
    keyWord: '',
    pageNumber: 1,
    DataAll: [{
        OrderID: '114456222556622115',
        Consignee: '张某',
        address: '江苏省苏州市',
        Phone: '139****1520',
        StatusCode: 1,
        expressNum: '123456',
    }],
    // Data: {
    //     OrderNum: '114456222556622115',
    //     OrderNum: '456456',
    //     Address: '江苏省苏州市',
    //     Phone: '139****1520',
    //     TotalPrice: '88',
    //     PayWay: '微信',
    //     Pro: [{
    //         ProNum: '1',
    //         ProName: '苹果',
    //         Price: '20',
    //         Num: '2'
    //     },],
    // },
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //获取订单列表全部数据
        case 'DATAALL':
            state.DataAll = action.value;
            //总页码
            if (action.count) {
                state.count = action.count;
            }
            //查看详情取出单个订单数据
        case 'EDIT_DATA':
            state.Data = action.value;
            // console.log(state);
            return state;
            //详情INNDERID
        case 'ORDERID':
            state.OrderID = action.value;
            // console.log(state);
            return state;
            //当前页码
        case 'PAGENUMBER':
            state.pageNumber = action.value;
            // console.log(state);
            return state;
            //当前搜索关键字
        case 'KEYWORD':
            state.keyWord = action.value;
            // console.log(state.keyWord);
            return state;
            //物流状态搜索
        case 'STATUSCODE':
            state.StatusCode = action.value;
            // console.log(state.keyWord);
            return state;
            //列表页面数据更改跳转
        case 'PUSH':
            var arr = [];
            state.DataAll.map((item, index) => {
                // console.log(action.value)
                if (index != action.value) {
                    arr.push(item);
                }
            });
            state.DataAll = arr;
            return state;
            //Modal是否可见
        case 'VISIBLE':
            state.Visible = action.value;
            // console.log(state);
            return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;