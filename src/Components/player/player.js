import React,{ useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import { wizardAttack } from '../characterAnimation/wizard/wizard_attack.js';
import { wizardIdle } from '../characterAnimation/wizard/wizard_idle.js'
import { Wizard } from '../playerCharacters/classes.js';

const starting_hitpoints = 100;
class player extends Wizard {

  constructor() {
    super();
    this.action = 'idle'
    this.name = 'placeholder'
    this.hp = starting_hitpoints
    this.MAX_HP = starting_hitpoints
    this.is_attacking = false
    this.current_avatar = wizardIdle
    this.current_avatar_text = function() {
      if (this.current_avatar === wizardIdle ) { return "wizard idle" } else { return "wizard attacking"}
    }
    this.toggleAttack = function() {
      return this.is_attacking = !this.is_attacking
    }
    this.setAction = function(action) { return this.action = action;}
/*     this.render = function(){
      return (
        <div>
        <div data-testid="player_name" id="player_name">{ this.hp }</div>
        <div data-testid="player_hp" id="player_hp"> {this}</div>
      </div>
      )
    } */
  }


}

export default player;

export function Player() { 
  const { PlayerObj }  = useContext(PlayerContext)
  return (
    <div>
      <div data-testid="player_name" id="player_name">{ PlayerObj.name }</div>
      <div data-testid="player_hp" id="player_hp"> {PlayerObj.hp}</div>
    </div>
  )
}


