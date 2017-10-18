import {
    createStore
} from 'redux';
const initialState = {
    tabKey: 1,
    pageNumber: 1,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //存储tab的key
        case 'TABKEY':
            if (action.value) {
                state.tabKey = action.value;
            } else if (action.activeKeyRight) {
                state.activeKeyRight = action.activeKeyRight;
                state.disabled = true;
                state.picAllChecked = false;
            }
            return state;
            //图片上传返回的key
        case 'PICITEM':
            var panes = state.dataAll[1].panes;
            if (panes[parseInt(state.activeKeyRight)] && panes[state.activeKeyRight].picKey) {
                panes.picKey = panes[state.activeKeyRight].picKey.push(action.value);
                panes[state.activeKeyRight].count++;
            } else {
                panes[state.activeKeyRight].picKey = [];
            }
            return state;
            // 页数
        case 'PAGENUMBER':
            state.pageNumber = action.value;
            return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;