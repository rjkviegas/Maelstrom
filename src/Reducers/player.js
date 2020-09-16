export let currentPlayer = { 
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

export default playerReducer;