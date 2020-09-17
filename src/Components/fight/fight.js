import React, { useContext, useState, useReducer } from 'react'
import playerReducer from '../../Reducers/playerReducer.js'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'

export default function Fight() {
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const {  OpponentObj, dispatchOpp } = useContext(OpponentContext)
    return (
    <div>
        <div style={{visibility: (PlayerObj.hp > 0 && OpponentObj.hp <= 0) ? "hidden" : "visible"}} ><button onClick={() => 
          dispatchOpp({type: 'attack', payload: 10})} 
          >Attack</button>
        </div>
        <div data-testid="attack_button" style={{visibility: (OpponentObj.hp <= 0) ? "visible" : "hidden" }}>
          <h1 data-testid="h1">YOU WIN</h1>
        </div>
    </div>
    )
}
