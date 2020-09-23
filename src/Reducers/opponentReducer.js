import King from "../Components/classes/king/king.js";

export default function opponentReducer(state, action) {
    switch(action.type) {
      case "ATTACKED":       
        return { ...state, hp: state.hp - action.payload}
      // case "rename":
      //   return {...state, name: action.payload}
      case "SET_ATTACKING_STATUS": 
        return { ...state, is_attacking: action.payload}
      case "RESET":
        return new King();
      default: 
        return {...state};
    }
  }