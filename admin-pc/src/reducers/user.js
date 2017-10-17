/**
 * reducer for users
 */

// load action types for users
import {
	LOGIN
} from '../constants';

const initState = {
	phone: '18888888888',
	password: ''
}

const user = (state = initState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				phone: action.phone,
				password: action.password
			};
			break;

		default:
			return state;
	}
}

export default user;