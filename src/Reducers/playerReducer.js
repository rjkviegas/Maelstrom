
export default function playerReducer(state, action) {
    switch(action.type) {
      case "attack":
          //console.log((((state.hp - action.payload)/state.MAX_HP)*100)+ '%')          
        return { ...state, hp: state.hp - action.payload}
      case "rename":
        return {...state, name: action.payload}
      default: 
        return {...state};
    }
  }

/* export let currentPlayer = { 
    hp: 100,
    name: 'placeholder'
}

const playerReducer = ( player = currentPlayer, action ) => {
    console.log("from player reducer")
    switch(action.type){
        case "attack":
            let newHp = player.hp - 10;
            return player = { hp: newHp, name: player.name }  
        case "rename": 
            let newName = action.payload
            return player = { hp: player.hp, name: newName} 
        default:
            return player;
    }
}

export default playerReducer; */