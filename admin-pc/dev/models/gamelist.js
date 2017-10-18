import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    InnerID: '',
    // 列表数据
    DataAll: [
        //     {
        //     key: 0,
        //     GameCode: '1',
        //     GameName: '酷跑',
        //     GameType: 0,
        //     GameUrl: 'url',
        //     ApiUrl: 'api',
        //     ImagesID: 'http://wx.qlogo.cn/mmopen/uibdIargxMsQuqPnDnAScnOCwXJ4LQ4kPrt5LmibTOdQweHNJKfAn0QCL1Eiat5zn2g8mia5zKb2CXSEwZ1klBYg55ugufcOGiaQa/0',
        //     RuleList: [{
        //         key: 0,
        //         ReturnCode: '1',
        //         MessageName: '一等奖',
        //         DiffCoeff: '1'
        //     }]
        // }, {
        //     key: 1,
        //     GameCode: '2',
        //     GameName: '酷跑1',
        //     GameType: 1,
        //     GameUrl: 'url',
        //     ImagesID: 'http://wx.qlogo.cn/mmopen/uibdIargxMsQuqPnDnAScnOCwXJ4LQ4kPrt5LmibTOdQweHNJKfAn0QCL1Eiat5zn2g8mia5zKb2CXSEwZ1klBYg55ugufcOGiaQa/0',
        //     RuleList: [{
        //         key: 0,
        //         ReturnCode: '1',
        //         MessageName: '二等奖',
        //         DiffCoeff: '1'
        //     }]
        // }
    ],
    // 弹窗数据
    Data: {
        // key: 0,
        // ReturnCode: '1',
        // MessageName: '一等奖',
        // DiffCoeff: '1',
        tmplId: '',
        RuleList: []
    },
    // 图片列表
    fileList: [],
    previewVisible: false,
    previewImage: '',
    count: 0
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //列表数据
        case 'DATAALL':
            state.DataAll = action.value;
            // console.log(state);
            return state;
            //弹窗数据
        case 'EDIT_DATA':
            if (action.value) {
                state.Data = action.value;
                state.fileList.push({
                    uid: Math.random(0, 1),
                    name: 'pic',
                    status: 'done',
                    url: action.imgUrl,
                })
            } else {
                // 
                state.Data = {};
                state.Data.RuleList = [];
            }
            state.Data.tmplId = action.tmplId;
            return state;
            //查看详情的InnerID
        case 'INNERID':
            return Object.assign({}, state, {
                InnerID: action.value,
            })
            // 列表删除
        case 'DELETE':
            var arr = [];
            state.DataAll.map((item, index) => {
                if (index != action.index) {
                    arr.push(item);
                }
            });
            state.DataAll = arr;
            return state;
            //编辑页面图片
        case 'IMAGESID':
            state.Data.tmplId = action.value;
            // state.Data.ImagesID = action.value;
            return state;
            //编辑页面底部
        case 'RETURNCODE':
            // console.log(action.index, action.value)
            state.Data.RuleList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.ReturnCode = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'MESSAGENAME':
            state.Data.RuleList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.MessageName = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'DIFFCOEFF':
            state.Data.RuleList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.DiffCoeff = action.value;
                    item = action.index;
                }
            })
            return state;
            //编辑页面底部删除            
        case 'DATASOURSE':
            var arr = [];
            state.Data.RuleList.map((item, index) => {
                if (index != action.index) {
                    arr.push(item);
                }
            });
            state.Data.RuleList = arr;
            return state;
            //编辑页面底部增加
        case 'ADD_DATA':
            // console.log(action.RuleList);
            state.count++;
            state.Data.RuleList.push(action.RuleList);
            return state;
            //Modal是否可见
        case 'VISIBLE':
            state.Visible = action.value;
            // console.log(state.Visible);
            return state;
            //图片上传列表
        case 'FILELIST':
            state.fileList = action.value;
            return state;
            // 图片预览
        case 'PICPREVIEW':
            state.previewImage = action.previewImage,
                state.previewVisible = action.previewVisible
            return state;
            //关闭modal时清空数据
        case 'EMPTYDATA':
            state.fileList = [];
            state.Data.AwardList = [];
            return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;