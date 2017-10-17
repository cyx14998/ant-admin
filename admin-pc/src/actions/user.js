/**
 * redux actions for users
 */

// load action types for users
import {
	LOGIN
} from '../constants';

export function login({phone, password}) {
	return {
		type: LOGIN,
		phone,
		password
	}
};