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
  
  it('should handle ATTACKED', () => {
    expect(playerReducer({hp: 1000}, {
        type: "ATTACKED",
        payload: 10
      })).toEqual({
        hp: 990
      })
  });

  it('should handle set_attack', () => {
    expect(playerReducer({is_attacking: false}, {
      type: 'SET_ATTACKING_STATUS',
      payload: true
    })).toEqual({
      is_attacking: true
    })
  });
  
  it('should handle RESET', () => {
    expect(playerReducer({hp: 2, MAX_HP: 100}, {
      type: 'RESET',
    })).toEqual({
      hp: 100,
      MAX_HP:100
    })
  });

  it('should handle MONEY_ADDED', () => {
    expect(playerReducer({money: 100}, {
      type: "MONEY_ADDED",
      payload: 50
    })).toEqual({
      money: 150
    })
  })

  it('should handle MONEY_ADDED', () => {
    expect(playerReducer({money: 100}, {
      type: "MONEY_DEDUCTED",
      payload: 50
    })).toEqual({
      money: 50
    })
  })

  it('should handle PLAYER_RENAMED', () => {
    expect(playerReducer({name: "Big Ry"}, {
      type: "PLAYER_RENAMED",
      payload: "Big Ry BJJ Champion of the World"
    })).toEqual({
      name: "Big Ry BJJ Champion of the World"
    })
  })

  it('should handle default', () => {
    expect(playerReducer({attribute: "value"}, {
      type: "default",
    })).toEqual({
      attribute: "value"
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
  
  it('should handle ATTACKED', () => {
    expect(opponentReducer({hp: 1000}, {
        type: "ATTACKED",
        payload: 10
      })).toEqual({
        hp: 990
      })
  });

  it('should handle SET_ATTACKING_STATUS toggle to true', () => {
    expect(opponentReducer({is_attacking: false}, {
      type: 'SET_ATTACKING_STATUS',
      payload: true
    })).toEqual({
      is_attacking: true
    })
  });

  it('should handle SET_ATTACKING_STATUS toggle to false', () => {
    expect(opponentReducer({is_attacking: true}, {
      type: "SET_ATTACKING_STATUS",
      payload: false
    })).toEqual({
      is_attacking: false
    })
  });
  
  it('should handle RESET', () => {
    expect(opponentReducer({hp: 2, MAX_HP: 100}, {
      type: 'RESET',
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
  
  it('should handle ADVANCED_ROUND', () => {
    expect(fightRoundsReducer({round: 1}, {
        type: "ADVANCED_ROUND",
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