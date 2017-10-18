import {
    createStore
} from 'redux';
const initialState = {
    Visible: false,
    InnerID: '',
    // 列表数据
    DataAll: [
        // {
        // //     StartDate: '',
        // //     EndDate: '',
        // //     AwardList: [{
        // //         key: 0,
        // //         CampaignID: '1',
        // //         ReturnCode: '一等奖',
        // //         MessageName: '1',
        // //         RuleCode: 'RuleCode',
        // //         AwardID: 'AwardID',
        // //         SendMsg: 'SendMsg',
        // //         MaxCount: 'MaxCount',
        // //         EvTimeMaxCount: 'EvTimeMaxCount',
        // //         DiffCoeff: 'DiffCoeff',
        // //     }, ],
        // //     Title: 'Title',
        // //     KeyWord: 'KeyWord',
        // //     ImagesID: 'ImagesID',
        // //     StartTime: 'StartTime',
        // //     EndTime: 'EndTime',
        // //     GameID: '酷跑',
        // //     GameType: '0',
        //     // OpeningMode: 0,
        // //     GameFrequency: 'GameFrequency',
        // //     Duration: 'Duration',
        // //     FlagCode: 'FlagCode',
        // //     Remark: 'Remark',
        // //     WeChatID: 'WeChatID',
        // //     AccountID: 'AccountID',
        // //     GameUrl: 'GameUrl',
        // //     ApiUrl: 'ApiUrl',
        // }
    ],
    // 弹窗数据
    Data: {
        tmplId: '',
        AwardList: [],
        // CampaignID: '1',
        // ReturnCode: '一等奖',
        // MessageName: '1',
        // RuleCode: 'RuleCode',
        // AwardID: 'AwardID',
        // SendMsg: 'SendMsg',
        // MaxCount: 'MaxCount',
        // EvTimeMaxCount: 'EvTimeMaxCount',
        // DiffCoeff: 'DiffCoeff',
        // AwardList: [{
        // //         key: 0,
        // //         CampaignID: '1',
        // //         ReturnCode: '一等奖',
        // //         MessageName: '1',
        // //         RuleCode: 'RuleCode',
        // //         AwardID: 'AwardID',
        // //         SendMsg: 'SendMsg',
        // //         MaxCount: 'MaxCount',
        // //         EvTimeMaxCount: 'EvTimeMaxCount',
        // //         DiffCoeff: 'DiffCoeff',
        // //     }, ],
        OpeningMode: 0,
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
                // console.log(action.imgUrl)
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
                state.Data.AwardList = [];
            }
            state.Data.tmplId = action.tmplId;
            // console.log(state.Data);
            return state;
            //弹窗InnerID
        case 'INNERID':
            return Object.assign({}, state, {
                InnerID: action.value,
            })
            //列表删除
        case 'DELETE':
            var arr = [];
            state.DataAll.map((item, index) => {
                if (index != action.index) {
                    arr.push(item);
                }
            });
            state.DataAll = arr;
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
            //图片ID
        case 'IMAGESID':
            state.Data.tmplId = action.value;
            // state.Data.ImagesID = action.value
            return state;
            // 编辑页面底部
        case 'CAMPAIGNID':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.CampaignID = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'RETURNCODE':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.ReturnCode = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'MESSAGENAME':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.MessageName = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'RULECODE':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.RuleCode = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'AWARDID':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.AwardID = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'SENDMSG':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.SendMsg = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'MAXCOUNT':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.MaxCount = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'EVTIMEMAXCOUNT':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.EvTimeMaxCount = action.value;
                    item = action.index;
                }
            })
            return state;
        case 'DIFFCOEFF':
            state.Data.AwardList.map(function (item, index) {
                if (item.key == action.index.key) {
                    action.index.DiffCoeff = action.value;
                    item = action.index;
                }
            })
            return state;
            // 编辑页面底部删除
        case 'DATASOURSE':
            var arr = [];
            state.Data.AwardList.map((item, index) => {
                if (index != action.index) {
                    arr.push(item);
                }
            });
            state.Data.AwardList = arr;
            return state;
            // 编辑页面底部增加
        case 'ADD_DATA':
            // console.log(action.AwardList);
            state.count++;
            state.Data.AwardList.push(action.AwardList);
            return state;
            //Modal是否可见
        case 'VISIBLE':
            state.Visible = action.value;
            // console.log(state.Visible);
            return state;
            //图片列表
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