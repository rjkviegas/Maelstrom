import { slimeAttack } from "../../characterAnimation/slime/slime_attack";
import { slimeDeath } from "../../characterAnimation/slime/slime_death";
import { slimeIdle } from "../../characterAnimation/slime/slime_idle";

const STARTING_HITPOINTS = 50;

export default class Slime {

    constructor(idleImage = slimeIdle, attackImage = slimeAttack, deathImage = slimeDeath, deathFrameNumber = 6){
        this.name = 'Opponent_Placeholder'
        this.hp = STARTING_HITPOINTS
        this.MAX_HP = STARTING_HITPOINTS
        this.is_attacking = false;
        this.money = 0
        this.idleSourceY = 0
        this.deathSourceY = 2
        this.attackSourceY = 1
        this.idleImage = idleImage
        this.attackImage = attackImage
        this.deathImage = deathImage
        this.deathFrameNumber = deathFrameNumber
        this.isDead = () => { return this.hp <= 0}
      }

}