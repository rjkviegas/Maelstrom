import React, { useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import { Player } from '../../Components/player/player.js'
import { Opponent } from '../../Components/opponent/opponent.js'

export default function Fight() {
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const {  OpponentObj, dispatchOpp } = useContext(OpponentContext)
    return (
    <div>
        <div style={{visibility: (OpponentObj.isDead()) ? "hidden" : "visible"}} ><button onClick={() => 
          dispatchOpp({type: 'attack', payload: 10})} 
          >Attack</button>
            <Player/>
            <Opponent/>
        </div>
        <div data-testid="attack_button" style={{visibility: (OpponentObj.hp <= 0) ? "visible" : "hidden" }}>
          <h1 data-testid="h1">YOU WIN</h1>
        </div>
    </div>
    )
}
