import {
    createStore
} from 'redux';
const initialState = [{
    id: 1,
    name: '张某',
    mobile: '177****1034',
    province: '江苏省',
    city: '苏州市',
    // city: {
    //     id: 1,
    //     name : '苏州市'
    // },
    area: '吴中区',
    address: '星湖街星湖街星湖街218号生物纳米园',
    regionCode: ["32", "3205", "320506"],
    checked: true,
}, {
    id: 2,
    name: '李某',
    mobile: '177****1124',
    province: '江苏省',
    city: '苏州市',
    area: '吴中区',
    address: '星湖街218号生物纳米园',
    regionCode: ['21', '2112', '211221'],
    checked: false,
}]
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECKED':
            state.map(function (item, i) {
                state[i].checked = false;
            });
            state[action.index].checked = !state[action.index].checked;
            return state;
        default:
            return state;
    }
};
const store = createStore(reducer);
module.exports = store;