
export default function playerReducer(state, action) {
    switch(action.type) {
      case "ATTACKED":     
        return { ...state, hp: state.hp - action.payload}
      case "SET_ATTACKING_STATUS": 
        return { ...state, is_attacking: action.payload}
      case "PLAYER_ATTACK/HP_RESET": // NEEDS TO BE RENAMED APPROPRIATELY. HP NO LONGER RESETS.
        return { ...state, is_attacking: action.payload.is_attacking} //PRCR - PR CLEANUP REQUIRED WHERE THIS IS DEFINED - HP REMOVED
      case "PLAYER_DIED":
        return {...state, hp: action.payload.hp, is_attacking: action.payload.is_attacking, money: state.money - action.payload.death_penalty}
      case "FIGHT_WIN_REWARDS_GRANTED":
        return { ...state, 
          money: state.money + action.payload.addition, 
          experience: state.experience + action.payload.experience, 
          is_attacking: action.payload.is_attacking, // PRCR HP
          level: action.payload.level} 
      case "PENALTY_DEDUCTED":
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