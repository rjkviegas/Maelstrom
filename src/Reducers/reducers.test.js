import playerReducer from './playerReducer.js';

describe('player reducer', () => {
  it('should return the initial state', () => {
    const mockCallBack = jest.fn();
    playerReducer(undefined, mockCallBack)
    expect(playerReducer(undefined, mockCallBack)).toBeTruthy();
    expect(playerReducer(undefined, {})).toEqual({});
  });
  
  it('should handle attacked', () => {
    expect(playerReducer({hp: 1000}, {
        type: "attacked",
        payload: 10
      })).toEqual({
        hp: 990
      })
  });

  it('should handle set_attack', () => {
    expect(playerReducer({is_attacking: false}, {
      type: "set_attack",
      payload: true
    })).toEqual({
      is_attacking: true
    })
  });

  it('should handle unset_attack', () => {
    expect(playerReducer({is_attacking: true}, {
      type: "unset_attack",
      payload: false
    })).toEqual({
      is_attacking: false
    })
  });
  
  it('should handle reset', () => {
    expect(playerReducer({hp: 2, MAX_HP: 100}, {
      type: "reset",
    })).toEqual({
      hp: 100,
      MAX_HP:100
    })
  });
});
