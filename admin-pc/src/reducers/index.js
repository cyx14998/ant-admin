/**
 * combine root reducer
 */
import { combineReducers } from 'redux';

import usersReducer from './user';

const reducers = combineReducers({
	user: usersReducer
})

export default reducers;