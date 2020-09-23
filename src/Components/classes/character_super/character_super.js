const STARTING_HITPOINTS = 100;

export default class Character {

  constructor(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY){
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = 0
    this.idleImage = idleImage
    this.attackImage = attackImage
    this.deathImage = deathImage
    this.deathFrameNumber = deathFrameNumber
    this.idleSourceY = idleSourceY
    this.deathSourceY = deathSourceY
    this.attackSourceY = attackSourceY
    this.isDead = () => { return this.hp <= 0}
  }

}



