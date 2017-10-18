// 新增/编辑地址页面
import {
	createStore
} from 'redux';
const initialState = [{
	id: 1,
	name: '张某',
	mobile: '177****1034',
	province: '江苏省',
	city: '苏州市',
	regionCode: [],
	area: '吴中区',
	address: '星湖街星湖街星湖街218号生物纳米园',
}]
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDITADDRESS':
			var manageaddress = action.manageaddress;
			return Object.assign({}, state, {
				id: manageaddress.id,
				name: manageaddress.name,
				mobile: manageaddress.mobile,
				province: manageaddress.province,
				city: manageaddress.city,
				area: manageaddress.area,
				address: manageaddress.address,
			});
		case 'EDITPERSON':
			return Object.assign({}, state, {
				name: action.name,
			});
		case 'EDITPHONE':
			return Object.assign({}, state, {
				mobile: action.phone,
			});
		case 'EDITAREA':
			return Object.assign({}, state, {
				area: action.area,
			});
		case 'EDITPOSITION':
			return Object.assign({}, state, {
				address: action.address,
			});
		case 'EDITAREA':
			return Object.assign({}, state, {
				regionCode: action.regionCode,
				province: action.area[0],
				city: action.area[1],
				area: action.area[2],
			});
		case 'ADDRESSCHECK':
			return Object.assign({}, state, {
				checked: !state.checked,
			});
		default:
			return state;
	}
};
const store = createStore(reducer);
module.exports = store;