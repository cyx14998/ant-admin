/**
 * create redux store
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
	middleware = [...middleware, logger]
}

import reducers from '../reducers'

const store = createStore(
	reducers,
	applyMiddleware(...middleware)
)

export default store;