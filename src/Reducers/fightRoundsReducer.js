export default function fightRoundsReducer(state, action) {
    switch(action.type) {
      case "ADVANCED_ROUND":
          return {...state, round: state.round + action.payload}
      default: 
        return {...state};
    }
  }