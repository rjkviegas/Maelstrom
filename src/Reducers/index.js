import loggedReducer from './isLogged';
import playerReducer from './playerReducer.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loggedReducer,
    player: playerReducer,
})

export default allReducers;