import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    count: 0,
    keyWord: '',
    //列表数据
    DataAll: [],
    // 弹窗数据
    Data: {
        tmplId: '',
        // "InnerID": "1", //编号         ---
        // "MenuID": "1", //菜单编号
        // "KeyWord": "1", //关键字
        // "ImageId": "1", //图片
        // "Contents": "1", //内容
        // "VersionInfo": "1", //规格型号
        // "Url": , //url
        // "Hits": 1, //查看次数----
        // "OrderNum": 1, //排序（置顶用，空的默认最后）
        // "Tags": "1", //标签
        // "Remark": "1", //备注详情
        // "StatusCode": 1, //状态
        // "CreatedTime": "2017-07-19T17:11:49", //创建时间         ---
        // "CreaterID": null, //创建人             ----
        // "ModifiedTime": null, //修改时间             -----
        // "ModifierID": null //修改人             -----
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
            if (action.count) {
                state.count = action.count;
            }
            return state;
            // 列表页面删除
        case 'DELETE':
            var arr = [];
            state.DataAll.map((item, index) => {
                if (index != action.index) {
                    arr.push(item);
                }
            });
            state.DataAll = arr;
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
            }
            state.Data.tmplId = action.tmplId;
            return state;
            //弹窗INNDERID
        case 'INNERID':
            state.InnerID = action.value;
            return state;
            //编辑图片
        case 'IMAGEID':
            state.Data.tmplId = action.value;
            // state.ProPic = action.value;
            return state;
            //当前页码            
        case 'PAGENUMBER':
            state.pageNumber = action.value;
            return state;
            //当前关键字
        case 'KEYWORD':
            state.keyWord = action.value;
            return state;
            //Modal是否可见
        case 'VISIBLE':
            state.Visible = action.value;
            return state;
            //图片上传修改功能
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