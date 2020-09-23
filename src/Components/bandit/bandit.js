import { banditAttack } from "../../characterAnimation/bandit/bandit_attack.js";
import { banditDead } from "../../characterAnimation/bandit/bandit_dead.js";
import { banditIdle } from "../../characterAnimation/bandit/bandit_idle.js";


const STARTING_HITPOINTS = 125;

class opponent {

  constructor(idleImage = banditIdle, attackImage = banditAttack, deathImage = banditDead, deathFrameNumber = 7){
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = 0
    this.idleSourceY = 0
    this.deathSourceY = 3
    this.attackSourceY = 2
    this.idleImage = idleImage
    this.attackImage = attackImage
    this.deathImage = deathImage
    this.deathFrameNumber = deathFrameNumber
    this.isDead = () => { return this.hp <= 0}
  }
}

export default opponent;
