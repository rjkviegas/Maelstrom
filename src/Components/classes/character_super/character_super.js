const STARTING_HITPOINTS = 100;
const DEFAULT_BASE_DAMAGE = 15;
const DEFAULT_BASE_EXPERIENCE = 10;

export default class Character {

  constructor(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY){
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.idleImage = idleImage
    this.attackImage = attackImage
    this.deathImage = deathImage
    this.deathFrameNumber = deathFrameNumber
    this.idleSourceY = idleSourceY
    this.deathSourceY = deathSourceY
    this.attackSourceY = attackSourceY
    this.baseDamage = DEFAULT_BASE_DAMAGE
    this.experience = DEFAULT_BASE_EXPERIENCE
    this.money = 0

    this.nextLevel = () => { 
      return Math.round((4 * (this.level**3))/5) 
    }; 
    this.calculateLevel = () => {
      return Math.floor(Math.cbrt(((5 * this.experience)/4)))
    };  this.level = this.calculateLevel();

    this.isDead = () => { return this.hp <= 0}
  }

}



