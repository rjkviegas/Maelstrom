import React, { useContext } from "react";
import OpponentContext from '../../config/opponentContext.js'

const starting_hitpoints = 125;
/* const opponent = {
  name: 'Opponent_Placeholder',
  hp: starting_hitpoints,
  MAX_HP: starting_hitpoints,
} */

class opponent {

  constructor(){
    this.name = 'Opponent_Placeholder'
    this.hp = starting_hitpoints
    this.MAX_HP = starting_hitpoints
    this.is_attacking = false;
    this.toggleAttack = function() {
      return this.is_attacking = !this.is_attacking
    }
  }
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