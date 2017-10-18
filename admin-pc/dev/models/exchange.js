import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    count: 1,
    keyWord: '',
    pageNumber: 1,
    CouponId: '',
    // 列表数据
    DataAll: [
        {
            CouponId: 0,
            // "CouponType": 1, //优惠券类型 
            // "CodeNotes": "sample string 3", //备注
            // "Price": 1.0, //价格
            // "PerMax": 1, //最大可领取数量
            // "OrderAmount": 1.0, //满多少可用

            // "Discount": 1, //折扣 满减是不用传
            // "Num": 1, //发行张数
            // "StartTime": "2017-08-29T15:01:27.8920378+08:00", //开始时间
            // "EndTime": "2017-08-29T15:01:27.8920378+08:00", //结束时间
            // "Prompt": 1, //限时时间
            // "NeedIntegral": 1, //兑换需要积分
            // "CouponName": "sample string 4" //优惠券名称
        }
    ],
    // 弹窗数据
    Data: {
        // CouponId: 0,
        // "CouponType": 1, //优惠券类型 
        // "CodeNotes": "sample string 3", //备注
        // "Price": 1.0, //价格
        // "PerMax": 1, //最大可领取数量
        // "OrderAmount": 1.0, //满多少可用

        // "Discount": 1, //折扣 满减是不用传
        // "Num": 1, //发行张数
        // "StartTime": "2017-08-29 15:01:27", //开始时间
        // "EndTime": "2017-08-29 15:01:37", //结束时间
        // "Prompt": 1, //限时时间
        // "NeedIntegral": 1, //兑换需要积分
        // "CouponName": "sample string 4" //优惠券名称
    },
    count: 1,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //列表数据
        case 'DATAALL':
            state.DataAll = action.value;
            //总页码
            if (action.count) {
                state.count = action.count;
            }
            return state;
            // 弹窗数据
        case 'EDIT_DATA':
            state.Data = action.value;
            // console.log(state);
            return state;
            //弹窗优惠券CouponId
        case 'COUPONID':
            state.CouponId = action.value;
            // console.log(state);
            return state;
            //当前页码
        case 'PAGENUMBER':
            state.pageNumber = action.value;
            // console.log(state);
            return state;
            //当前搜索关键字
        // case 'KEYWORD':
        //     state.keyWord = action.value;
        //     // console.log(state.keyWord);
        //     return state;
            //编辑页面优惠券类型
        case 'COUPONTYPE':
            // console.log(action.value)
            state.Data.CouponType = action.value;
            // console.log(state.Data)
            return state;
            //时间
        case 'STARTDATE':
            state.Data.StartDate = action.value
            return state;
        case 'ENDDATE':
            state.Data.EndDate = action.value
            return state;
        case 'STARTT':
            state.Data.StartT = action.value
            return state;
        case 'ENDT':
            state.Data.EndT = action.value
            return state;
        case 'STARTTIME':
            state.Data.StartTime = action.value
            return state;
        case 'ENDTIME':
            state.Data.EndTime = action.value
            return state;
            //弹窗底部删除
        case 'DELETE':
            var arr = [];
            state.DataAll.map((item, index) => {
                if (index != action.index) {
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