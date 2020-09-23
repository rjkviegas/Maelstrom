import { slimeAttack } from "../../characterAnimation/slime/slime_attack";
import { slimeDeath } from "../../characterAnimation/slime/slime_death";
import { slimeIdle } from "../../characterAnimation/slime/slime_idle";

const STARTING_HITPOINTS = 50;

export default class Slime {

    constructor(idleImage = slimeIdle, attackImage = slimeAttack, deathImage = slimeDeath, deathFrameNumber = 6, idleSourceY = 0, deathSourceY = 2, attackSourceY = 1){
        this.name = 'Opponent_Placeholder'
        this.hp = STARTING_HITPOINTS
        this.MAX_HP = STARTING_HITPOINTS
        this.is_attacking = false;
        this.money = 0
        this.idleSourceY = idleSourceY
        this.deathSourceY = deathSourceY
        this.attackSourceY = attackSourceY
        this.idleImage = idleImage
        this.attackImage = attackImage
        this.deathImage = deathImage
        this.deathFrameNumber = deathFrameNumber
        this.isDead = () => { return this.hp <= 0}
      }

}