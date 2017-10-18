import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    count: 1,
    keyWord: '',
    pageNumber: 1,
    StatusCode: '',
    // 列表数据
    DataAll: [
        //     {
        //     OrderID: '114456222556622115',
        //     Consignee: '张某',
        //     Address: '江苏省苏州市',
        //     Phone: '139****1520',
        //     RealTotalPrice: '188',
        //     StatusCode: 0,
        // }
    ],
    // 弹窗数据
    Data: {
        expressNum: 111,
        // OrderID: '114456222556622115',
        // Consignee: '张某',
        // Address: '江苏省苏州市',
        // Phone: '139****1520',
        // RealTotalPrice: '188',
        // Pro: [{
        //     ProductID: '1',
        //     ProName: '苹果',
        //     SalePrice: '20',
        //     Quantity: '2',
        //     Summary: "蔬菜新鲜干净卫生、全是自家大棚种植没有化肥农药纯天然有机绿色蔬菜",
        //     ThumbnailsUrl: "http://192.168.2.213/emapi/emfiles/getimg?key=2e4f8fd3-3a60-463a-8e55-e135c1315b03.png"
        // }, {
        //     ID: '2',
        //     ProName: '香蕉',
        //     SalePrice: '20',
        //     Quantity: '2',
        //     Summary: "蔬菜新鲜干净卫生、全是自家大棚种植没有化肥农药纯天然有机绿色蔬菜",
        //     ThumbnailsUrl: "http://192.168.2.213/emapi/emfiles/getimg?key=2e4f8fd3-3a60-463a-8e55-e135c1315b03.png"
        // }, ],
    },
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //列表数据
        case 'DATAALL':
            state.DataAll = action.value;
            if (action.value[0]) {
                state.DataAll.map((item, index) => {
                    if (item.StatusCode == 1) {
                        state.DataAll[index].StatusText = '未支付';
                    } else if (item.StatusCode == 2) {
                        state.DataAll[index].StatusText = '待发货';
                    } else if (item.StatusCode == 3) {
                        state.DataAll[index].StatusText = '已发货';
                    } else if (item.StatusCode == 4) {
                        state.DataAll[index].StatusText = '交易完成';
                    } else {
                        state.DataAll[index].StatusText = '未知';
                    }
                });
            }
            //总页码
            if (action.count) {
                state.count = action.count;
            }
            return state;
            //弹窗数据
        case 'EDIT_DATA':
            state.Data = action.value;
            state.OrderID = action.OrderID;
            state.Data.record = action.record;
            state.Visible = true;
            // console.log(state);
            return state;
            //弹窗OrderID
            // case 'ORDERID':
            //     state.OrderID = action.value;
            //     state.Data.record = action.record;
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
            //发货状态搜索
        case 'HEADINDEX':
            state.headIndex = action.value;
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
            //列表发货状态更改
        case 'STATUSCODE':
            // console.log(state.DataAll[action.record].StatusCode);
            if (action.editStatusCode == 3)
                state.DataAll[action.record].StatusText = '已发货';
            state.DataAll[action.record].StatusCode = action.editStatusCode;
            return state;
            //快递单号
        case 'EXPRESSNUM':
            if (action.value) {
                console.log(1)
                state.Data.expressNum = action.value;
                state.Data.expressNumText = action.value;
            }else {
                console.log(2)
                state.Data.expressNumText = '';
                if(action.empty){
                   state.Data.expressNum = ''; 
                }
            }
            return state;
            //编辑页面发货状态
        case 'EDITSTATUSCODE':
            state.Data.editStatusCode = action.value;
            // console.log(action.value);
            return state;
            //Modal是否可见EXPRESS
        case 'VISIBLE':
            state.Visible = action.value;
            // console.log(state);
            return state;
            //快递编号窗口
        case 'EXPRESSVISIBLE':
            state.Data.expressVisible = action.value;
            // console.log(state);
            return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;