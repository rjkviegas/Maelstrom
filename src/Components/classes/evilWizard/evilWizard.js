import { evilWizardAttack } from "../../classes/evilWizard/evilWizard_attack.js";
import { evilWizardDead } from "../../classes/evilWizard/evilWizard_dead.js";
import { evilWizardIdle } from "../../classes/evilWizard/evilWizard_idle.js";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 70;
const DIVIDER = 5;
const REWARD_MONEY = 10;
const DEFAULT_BASE_DAMAGE = 20;

class EvilWizard extends Character{
  constructor(idleImage = evilWizardIdle, attackImage = evilWizardAttack, deathImage = evilWizardDead, deathFrameNumber = 4, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Evil Wizard'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.attackSound = new Audio("https://opengameart.org/sites/default/files/audio_preview/foom_0.wav.mp3")
    this.deathSound = new Audio("https://opengameart.org/sites/default/files/8.mp3")
    this.is_attacking = false;
    this.money = REWARD_MONEY;
    this.experience = STARTING_HITPOINTS/DIVIDER;
    this.level = this.calculateLevel();
    this.baseDamage = DEFAULT_BASE_DAMAGE;
  }
}

export default EvilWizard;
export {STARTING_HITPOINTS};