
export default function playerReducer(state, action) {
    // console.log(state, action)
    switch(action.type) {
      case "attack":      
        return { ...state, action: action.payload}
      case "idle": 
        return { ...state, action: action.payload} 
      case "run":
          return { ...state, action: action.payload}
      case "rename":
        return {...state, name: action.payload}
      case "attackAnimation": 
        return { ...state, is_attacking: action.payload}
      case "newAction":
        return { ...state, action: action.payload}   
      default: 
        return {...state};
    }
  }