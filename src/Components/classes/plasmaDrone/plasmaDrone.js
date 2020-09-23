import { plasmaDroneAttack } from "../../characterAnimation/plasmaDrone/plasmaDrone_attack.js";
import { plasmaDroneDead } from "../../characterAnimation/plasmaDrone/plasmaDrone_dead.js";
import { plasmaDroneIdle } from "../../characterAnimation/plasmaDrone/plasmaDrone_idle.js";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 100;

class PlasmaDrone extends Character{
  constructor(idleImage = plasmaDroneIdle, attackImage = plasmaDroneAttack, deathImage = plasmaDroneDead, deathFrameNumber = 8, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = 0
  }
}

export default PlasmaDrone;