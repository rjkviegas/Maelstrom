export const attack = (player, value = 10) => {
    return {
        type: 'attack',
        payload: value,
        player
    }
} 

export const rename = (name, player) => {
    console.log(name + " at the rename method")
    return {
        type: 'rename',
        payload: name,
        player
    }
}