import React, { useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import { Player } from '../../Components/player/player.js'
import { Opponent } from '../../Components/opponent/opponent.js'

export default function Fight() {

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const {  OpponentObj, dispatchOpp } = useContext(OpponentContext)

    const handleAttack = () => {
      dispatchOpp({type: 'attack', payload: 10});
      dispatch({type: 'attackAnimation', payload: true})
      dispatch({type: 'newAction', payload: 'attack'})
      // changeAnimation(2000);
    }

    // const changeAnimation = (delay) => {
    //   dispatch({type: 'attackAnimation', payload: true})
    //   setTimeout(() => {
    //       console.log("Changing Animation");
    //       dispatch({type: 'attackAnimation', payload: false})
    //       }, delay)
    // }

    return (
    <div>
        <div style={{visibility: ((PlayerObj.hp > 0 && OpponentObj.hp <= 0)) ? "hidden" : "visible"}} ><button onClick={() => 
          handleAttack()
        }
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