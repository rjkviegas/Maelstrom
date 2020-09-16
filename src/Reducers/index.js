import loggedReducer from './isLogged';
import playerReducer from './player.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loggedReducer,
    player: playerReducer,
})

export default allReducers;