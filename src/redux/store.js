import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
