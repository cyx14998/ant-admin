import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    count: 1,
    keyWord: '',
    pageNumber: 1,
    StatusCode: '',
    DataAll: [{
            ExchangeID: '114456222556622115',
            exchanger: '张某1',
            integral: 50,
            ticketType: 0,
            startTime: '2017-08-07 08:12:12',
            endTime: '2017-08-12 08:08:08',
            StatusCode: 0,
        },
        // {
        //     CodeNotes: "备注",
        //     CouponId: "em201708281832123",
        //     CouponName: "测试",
        //     CouponType: 0,
        //     Discount: null,
        //     EndTime: "2017-08-31T18:33:54",
        //     InnerID: "fgghh",
        //     NeedIntegral: 100,
        //     Num: 1000,
        //     OrderAmount: 100,
        //     PerMax: 5,
        //     Price: 5,
        //     Prompt: 0,
        //     ResidueCount: null,
        //     StartTime: "2017-08-28T18:33:49"
        // }
    ],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //获取游戏列表全部数据
        case 'DATAALL':
            state.DataAll = action.value;
            //总页码
            if (action.count) {
                state.count = action.count;
            }
            //     //查看详情取出单个游戏数据
            // case 'EDIT_DATA':
            //     state.Data = action.value;
            //     // console.log(state);
            //     return state;
            //     //详情INNDERID
            // case 'ORDERID':
            //     state.OrderID = action.value;
            //     // console.log(state);
            //     return state;
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
            //     //发货状态搜索
            // case 'STATUSCODE':
            //     state.StatusCode = action.value;
            //     // console.log(state.keyWord);
            //     return state;
            //     //列表页面数据更改跳转
            // case 'PUSH':
            //     var arr = [];
            //     state.DataAll.map((item, index) => {
            //         // console.log(action.value)
            //         if (index != action.value) {
            //             arr.push(item);
            //         }
            //     });
            // state.DataAll = arr;
            // return state;
            // case 'VISIBLE':
            //     state.Visible = action.value;
            //     // console.log(state);
            //     return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;