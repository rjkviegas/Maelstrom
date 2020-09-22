export default function opponentReducer(state, action) {
    switch(action.type) {
      case "attacked":          
        return { ...state, hp: state.hp - action.payload}
      case "rename":
        return {...state, name: action.payload}
      case "set_attack": 
        return { ...state, is_attacking: action.payload}
      case "unset_attack": 
        return { ...state, is_atacking: action.payload}   
      case "reset":
        return action.payload;
      default: 
        return {...state};
    }
  }