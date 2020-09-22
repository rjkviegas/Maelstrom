import React,{ useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import { wizardAttack } from '../characterAnimation/wizard/wizard_attack.js';
import { wizardDead } from '../characterAnimation/wizard/wizard_dead.js';
import { wizardIdle } from '../characterAnimation/wizard/wizard_idle.js'

const starting_hitpoints = 100;
class player {

  constructor(idleImage = wizardIdle, attackImage = wizardAttack, deathImage = wizardDead, deathFrameNumber = 7) {
    this.name = 'placeholder'
    this.hp = starting_hitpoints
    this.MAX_HP = starting_hitpoints
    this.is_attacking = false
    this.money = 0;
    this.idleImage = idleImage
    this.attackImage = attackImage
    this.deathImage = deathImage
    this.deathFrameNumber = deathFrameNumber
    this.isDead = () => { return this.hp <= 0}
  }

}

export default player;
