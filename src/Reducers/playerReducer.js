
export default function playerReducer(state, action) {
    switch(action.type) {
      case "ATTACKED":     
        return { ...state, hp: state.hp - action.payload}
      case "SET_ATTACKING_STATUS": 
        return { ...state, is_attacking: action.payload}
      case "RESET":
        return { ...state, hp: state.MAX_HP}
      case "MONEY_ADDED":
        return { ...state, money: state.money + action.payload} 
      case "MONEY_DEDUCTED":
        return {...state, money: Math.floor(state.money - action.payload.deduction), escapes: state.escapes + action.payload.escapes} 
      case "PLAYER_RENAMED":
        return {...state, name: action.payload}
      case "ADD_STRENGTH":
        return {...state, strength: state.strength + action.payload}
      case "ADD_DEFENCE":
        return {...state, defence: state.defence + action.payload}
      case "DEDUCT_MONIES":
        return {...state, money: state.money - action.payload}
      default: 
        return {...state};
    }
  }