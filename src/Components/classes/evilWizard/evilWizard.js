import { evilWizardAttack } from "../../characterAnimation//evilWizard/evilWizard_attack.js";
import { evilWizardDead } from "../../characterAnimation/evilWizard/evilWizard_dead.js";
import { evilWizardIdle } from "../../characterAnimation/evilWizard/evilWizard_idle.js";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 70;

class EvilWizard extends Character{
  constructor(idleImage = evilWizardIdle, attackImage = evilWizardAttack, deathImage = evilWizardDead, deathFrameNumber = 4, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = 0
  }
}

export default EvilWizard;