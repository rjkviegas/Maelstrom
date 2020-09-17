import React, { useContext, useState, useReducer } from 'react'
import playerReducer from '../../Reducers/playerReducer.js'
import PlayerContext from '../../config/playerContext.js'

export default function Fight() {
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    return (
    <div>
        <div>{PlayerObj.name} HP: {PlayerObj.hp}</div>
        <button onClick={() => dispatch({type: 'attack', payload: 10})}>Attack</button>
    </div>
    )
}
