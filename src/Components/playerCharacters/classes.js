
const images = {}
images.wizard = new Image();
images.wizard.src = 'assets/characterSprites/EvilWizard/Idle.png';
images.bandit = new Image();
images.bandit.src = 'assets/characterSprites/bandit/HeavyBandit.png';

class Character {
    constructor(type, imageSrc, actionArg, characterWidth, characterHeight, startPosX, startPosY, offsetX, imageForward, imageReverse, imageRun, imageRunback, imageAttack, imageDie, imageIdle) {

        this.type = type;
        this.imageSrc = imageSrc
        this.imageForward = imageForward
        this.imageReverse = imageReverse
        this.imageRun = imageRun || imageForward;
        this.imageRunback = imageRunback || imageReverse;
        this.imageAttack = imageAttack || imageForward;
        this.imageIdle = imageIdle || imageForward;
        this.imageDie = imageDie || imageReverse;
        this.width = characterWidth;
        this.height = characterHeight;
        this.frameX = 0;
        this.x = startPosX; // starting point (on the canvas)
        this.y = startPosY; // starting point (on the canvas)
        this.speed = 4;
        this.runStartCoord = this.x + offsetX;
        this.runDistanceLeft = 50; //  SMALLER THE GREATER DISTANCE RUN LEFT!
        this.runDistanceRight = 1500;
        this.testOffset = this.runStartCoord; // distance to travel
        this.endFrame = 7;
        this.action = actionArg;
        this.deathFrame = 7;

        this.isDead = function() {
            return this.hp <= 0
        }

        this.isAlive = function() {
            return this.hp > 0
        }
    
        this.toggleAttack = function () {
            return this.is_attacking = !this.is_attacking
        }
    
        this.getFrameYValues = function () {
            switch(this.action){
                case 'attack':
                    this.frameLimit = 7;
                    return this.frameY = 2;
                case 'run':
                    return this.frameY = 1;
                case 'run_back':
                    return this.frameY = 1;  
                case 'die':
                    return this.frameY = 4;
                case 'idle':
                    return this.frameY = 0;
                default:
                    return this.frameY = 0;   
            }
        }
        this.getFrameYValues()

        this.draw = function (animation, ctx) {
            if (animation) {
                window.cancelAnimationFrame(animation)
            }
            // const [posX, posY] = [200, 100] // Controls the location of the sprite on canvas

            ctx.drawImage(this.imageSrc, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.testOffset, this.y, this.width, this.height);

            // [this.endFrame, this.speed] = (this.action === 'idle') ? [3, 5] : [7, 20]   // parallel deconstruction + ternary to conditionally determine speed.
            this.endFrame = (this.action === 'idle') ? 3 : 7; // ternary  to determine where the frame ends
            this.endFrame = (this.action === 'die') ? this.deathFrame : this.endFrame
            if (this.frameX < this.endFrame)
                this.frameX++;
            else if (this.action === 'die' && this.frameX >= this.endFrame) {
                return;
            }
            else this.frameX = 0;
        }

        this.setAction = function (action) {
            this.frameX = 0
            this.action = action
        }
        // difference between offset and the rundistance is the actual distance. Once express condition is met, execute the next sequence. e.g. run -> attack, attack -> run_back
        this.update = function() {
            switch(this.action){
                case 'run':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageForward

                    if (this.testOffset > this.runDistanceLeft)
                        this.testOffset -= this.speed;
                    else 
                        this.testOffset = this.runStartCoord;

                    if (this.testOffset <= this.runDistanceLeft) { 
                        this.action = 'attack';
                        this.frameX = 0;
                    }
                    break;
                case 'attack':
                    this.frameY = 2;
                    this.imageSrc.src  = this.imageAttack;
                    if(this.frameX === 7) this.action = 'run_back';
                    break; 
                case 'run_back':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageRunback;
                    if (this.testOffset < this.runStartCoord) this.testOffset += this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset >= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
                    this.imageSrc.src = this.imageIdle;
                    this.frameY = 0; 
                    break;
                case 'die':
                    this.imageSrc.src = this.imageDie;
                    this.endFrame = 3;
                    this.frameY = 3;
                    break;  
                default:
                    this.imageSrc.src = this.imageIdle;
                    this.action = 'idle';
                    break;    
            }
        }
    }
}


const bandit_starting_hitpoints = 150;
const bandit_run_distance_left = 50;
const bandit_death_frame = 7;
const bandit_width = 48;
const bandit_height = 48;
const bandit_starting_position_X = 0
const bandit_starting_position_Y = 98;
export class Bandit extends Character {
    constructor(type = 'bandit', imageSrc = images.bandit, actionArg = 'idle', characterWidth = bandit_width, characterHeight = bandit_height, startPosX = 80, startPosY = 95, offsetX = 150, imageForward = 'assets/characterSprites/bandit/HeavyBandit.png', imageReverse = 'assets/characterSprites/bandit/HeavyBanditReverse.png') {
        super(type, imageSrc, actionArg, characterWidth, characterHeight, startPosX, startPosY, offsetX, imageForward, imageReverse)
        this.name = 'Opponent_Placeholder'
        this.runDistanceLeft = bandit_run_distance_left;
        this.deathFrame = bandit_death_frame;
        this.hp = bandit_starting_hitpoints
        this.MAX_HP = bandit_starting_hitpoints
        this.getFrameYValues = function() {
            switch(this.action){
                case 'attack':
                    this.frameLimit = 7;
                    return this.frameY = 2;
                case 'run':
                    return this.frameY = 1;
                case 'run_back':
                    return this.frameY = 1;  
                case 'die':
                    return this.frameY = 4;
                case 'idle':
                    return this.frameY = 0;
                default:
                    return this.frameY = 0;   
            }
        }

        this.update = function() {
            switch(this.action){
                case 'run':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageRun
      
                    if (this.testOffset > this.runDistanceLeft)
                        this.testOffset -= this.speed;
                    else 
                        this.testOffset = this.runStartCoord;
      
                    if (this.testOffset <= this.runDistanceLeft) { 
                        this.action = 'attack';
                        this.frameX = 0;
                    }
                    break;
                case 'attack':
                    this.frameY = 2;
                    this.imageSrc.src  = this.imageAttack;
                    if(this.frameX === 7) this.action = 'run_back';
                    break;
                case 'run_back':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageRunback;
                    if (this.testOffset < this.runStartCoord) this.testOffset += this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset >= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
                    this.imageSrc.src = this.imageIdle;
                    this.frameY = 0; 
                    break;
                case 'die':
                    this.imageSrc.src = this.imageDie;
                    this.endFrame = 3;
                    this.frameY = 3;
                    break;  
                default:
                    this.imageSrc.src = this.imageIdle;
                    this.action = 'idle';
                    break;    
            }
        }
    } 
}



const wizard_starting_hitpoints = 50;
const wizard_run_right_distance = 50;
const wizard_death_frame = 6;

export class Wizard extends Character {
    constructor(type = 'wizard', imageSrc = images.wizard, actionArg ='run', characterWidth = 250, characterHeight = 250, startPosX = 0, startPosY = -25, offsetX = -80, imageForward = 'assets/characterSprites/EvilWizard/Run.png', imageReverse = 'assets/characterSprites/EvilWizard/RunReverse.png', imageRun = 'assets/characterSprites/EvilWizard/Run.png', imageRunback = 'assets/characterSprites/EvilWizard/RunReverse.png' , imageAttack = 'assets/characterSprites/EvilWizard/Attack1.png', imageDie = 'assets/characterSprites/EvilWizard/Death.png', imageIdle = 'assets/characterSprites/EvilWizard/Idle.png'){
        super(type, imageSrc, actionArg, characterWidth, characterHeight, startPosX, startPosY, offsetX, imageForward, imageReverse, imageRun, imageRunback, imageAttack, imageDie, imageIdle)

        console.log(actionArg)
        
        // REFACTOR OUT INTO SUPER AFTER SEPARATED INTO OWN FILES
        this.action = actionArg
        this.name = 'placeholder'
        this.hp = wizard_starting_hitpoints
        this.MAX_HP = wizard_starting_hitpoints
        this.is_attacking = false
        this.toggleAttack = function() {
            return this.is_attacking = !this.is_attacking
        }
        // REFACTOR END

        this.runDistanceRight = wizard_run_right_distance;
        this.deathFrame = wizard_death_frame;
        this.getFrameYValues = function() {
            this.frameY = 0;
        }
        this.getFrameYValues();
        this.update = function () {
            console.log(this.action, actionArg)
            switch (this.action) {
                case 'run':
                    this.frameY = 0;
                    this.imageSrc.src = this.imageRun
                    if (this.testOffset < this.runDistanceRight)
                        this.testOffset += this.speed;
                    else 
                        this.testOffset = this.runStartCoord;
        
                    if (this.testOffset >= this.runDistanceRight) { 
                        this.action = 'attack';
                        this.frameX = 0;
                    }
                    break;
                case 'attack':
                    this.frameY = 0;
                    this.imageSrc.src  = this.imageAttack;
                    if(this.frameX === 7) this.action = 'run_back';
                    break;
                case 'run_back':  
                    this.frameY = 0;
                    this.imageSrc.src = 'assets/characterSprites/EvilWizard/RunReverse.png'
                    if (this.testOffset > this.runStartCoord)
                        this.testOffset -= this.speed;
                    else
                        this.testOffset = this.runStartCoord;
                    if (this.testOffset <= this.runStartCoord)
                        this.action = 'idle';
                    break;
                case 'idle':
                    console.log("i am idle wizard")
                    this.imageSrc.src = this.imageIdle;
                    this.frameY = 0; 
                    break;
                case 'die':
                    this.endFrame = this.deathFrame;
                    this.frameY = 0;
                    this.imageSrc.src = this.imageDie;
                    break;  
                default:
                    this.imageSrc.src = this.imageIdle;
                    this.action = 'idle';
                    break;    
            } 
        }
    }  
}

export const banditPlayer = new Bandit(); //, new Character('idle', 48, 48)

export const wizardPlayer = new Wizard();