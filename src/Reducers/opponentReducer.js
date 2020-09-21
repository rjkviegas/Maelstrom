import opponent from "../Components/opponent/opponent";

export default function opponentReducer(state, action) {
    switch(action.type) {
      case "attacked":
          //console.log((((state.hp - action.payload)/state.MAX_HP)*100)+ '%')          
        return { ...state, hp: state.hp - action.payload, attacked: true}
      case "rename":
        return {...state, name: action.payload}
      case "reset":
        return action.payload;
      default: 
        return {...state};
    }
  }