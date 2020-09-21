import playerReducer from './playerReducer.js';
import * as actions from '../Actions/index.js'

actions.attack = jest.fn()

describe('player reducer', () => {
  it('should return the initial state', () => {
    const mockCallBack = jest.fn();
    playerReducer(undefined, mockCallBack)
    expect(playerReducer(undefined, mockCallBack)).toBeTruthy();
    expect(playerReducer(undefined, {})).toEqual({});
    
  });

});






