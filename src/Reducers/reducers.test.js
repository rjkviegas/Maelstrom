import playerReducer from './playerReducer.js';
import opponentReducer from './opponentReducer.js';
import fightRoundsReducer from './fightRoundsReducer.js';
import King from "../Components/classes/king/king.js";

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

describe('opponent reducer', () => {
  it('should return the initial state', () => {
    const mockCallBack = jest.fn();
    opponentReducer(undefined, mockCallBack)
    expect(opponentReducer(undefined, mockCallBack)).toBeTruthy();
    expect(opponentReducer(undefined, {})).toEqual({});
  });
  
  it('should handle attacked', () => {
    expect(opponentReducer({hp: 1000}, {
        type: "attacked",
        payload: 10
      })).toEqual({
        hp: 990
      })
  });

  it('should handle set_attack', () => {
    expect(opponentReducer({is_attacking: false}, {
      type: "set_attack",
      payload: true
    })).toEqual({
      is_attacking: true
    })
  });

  it('should handle unset_attack', () => {
    expect(opponentReducer({is_attacking: true}, {
      type: "unset_attack",
      payload: false
    })).toEqual({
      is_attacking: false
    })
  });
  
  it('should handle reset', () => {
    expect(opponentReducer({hp: 2, MAX_HP: 100}, {
      type: "reset",
    })).toBeInstanceOf(
     King
    )
  });

  it('should handle default', () => {
    expect(opponentReducer({hp: 100}, {
      type: "default",
    })).toEqual({
      hp: 100
    })
  });
});

describe('fightRounds reducer', () => {
  it('should return the initial state', () => {
    const mockCallBack = jest.fn();
    fightRoundsReducer(undefined, mockCallBack)
    expect(fightRoundsReducer(undefined, mockCallBack)).toBeTruthy();
    expect(fightRoundsReducer(undefined, {})).toEqual({});
  });
  
  it('should handle next_round', () => {
    expect(fightRoundsReducer({round: 1}, {
        type: "next_round",
        payload: 1
      })).toEqual({
        round: 2
      })
  });

  it('should handle default', () => {
    expect(opponentReducer({round:1}, {
      type: "default",
    })).toEqual({
      round: 1
    })
  });
})