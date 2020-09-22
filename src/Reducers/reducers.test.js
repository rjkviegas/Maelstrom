import playerReducer from './playerReducer.js';

describe('player reducer', () => {
  it('should return the initial state', () => {
    const mockCallBack = jest.fn();
    playerReducer(undefined, mockCallBack)
    expect(playerReducer(undefined, mockCallBack)).toBeTruthy();
    expect(playerReducer(undefined, {})).toEqual({});
    
  });

});






