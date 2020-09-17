import React, { useContext } from "react";
import OpponentContext from '../../config/opponentContext.js'

const starting_hitpoints = 125;
const opponent = {
  name: 'Opponent_Placeholder',
  hp: starting_hitpoints,
  MAX_HP: starting_hitpoints,
}

export default opponent;

export function Opponent() { 
  const { OpponentObj }  = useContext(OpponentContext)
  return (
    <div>
      <div data-testid="opponent_name" id="opponent_name">{ OpponentObj.name }</div>
      <div data-testid="opponent_hp" id="opponent_hp"> {OpponentObj.hp}</div>
    </div>
  )
}