export default function fightRoundsReducer(state, action) {
    switch(action.type) {
      case "next_round":
          return {...state, round: state.round + action.payload}
      default: 
        return {...state};
    }
  }