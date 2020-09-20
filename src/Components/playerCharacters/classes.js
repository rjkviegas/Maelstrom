
const images = {}
images.wizard = new Image();
images.bandit = new Image();

const canvas = document.getElementById('canvas') // DIFFERENT CANVAS THAN THE FIGHT CANVAS!
const ctx = canvas.getContext('2d');

class Character {

  constructor(type, imageSrc, actionArg, characterWidth, characterHeight, startPosX = 0, startPosY = 0, imageForward, imageReverse, imageRun, imageRunback, imageAttack, imageDie, imageIdle) {
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
      this.frameX = 0
      this.x = startPosX; // starting point (on the canvas)
      this.y = startPosY; // starting point (on the canvas)
      this.speed = 4;
      this.runStartCoord = this.x + 200;
      this.runDistanceLeft = 50; //  SMALLER THE GREATER DISTANCE RUN LEFT!
      this.runDistanceRight = 1500;
      this.testOffset = this.runStartCoord; // distance to travel
      this.endFrame = 7;
      this.action = actionArg
      this.deathFrame = 7

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
      this.getFrameYValues()

    this.draw = function(animation) {
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

    this.setAction = function(action){
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

class Bandit extends Character {
  runDistanceLeft = 50;
  deathFrame = 7;

  getFrameYValues() {
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

  update() {
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

export class Wizard extends Character {

    constructor(){
        super()
        this.runDistanceRight = 50;
        this.deathFrame = 6;
        this.getFrameYValues = function() {
            this.frameY = 0;
        }
        this.getFrameYValues();
        this.update = function() {
            console.log(this.action)
            switch(this.action){
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
                    if (this.testOffset > this.runStartCoord) this.testOffset -= this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset <= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
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

const characters = {};

// Create instance with syntax [IMAGE, METHOD, FRAMESIZEX, FRAMESIZEY, STARTING POSITION X, STARTING POSITION Y, ASSET SHEET WHEN FACING FORWARD, ASSET SHEET REVERSED ...]
// ... ASSET SHEET RUN, ASSET SHEET ATTACK, ASSET SHEET RUN_BACK, ASSET SHEET IDLE, ASSET SHEET DIE]
characters.opponent = new Bandit('bandit', images.bandit, 'idle', 48, 48, 0, 95, 'assets/characterSprites/bandit/HeavyBandit.png', 'assets/characterSprites/bandit/HeavyBanditReverse.png'); //, new Character('idle', 48, 48)

characters.player = new Wizard('wizard', images.wizard, 'idle', 250, 250, -250, -25, 
'assets/characterSprites/EvilWizard/Idle.png', 
'assets/characterSprites/EvilWizard/Run.png', 
'assets/characterSprites/EvilWizard/Run.png', 
'assets/characterSprites/EvilWizard/RunReverse.png',
'assets/characterSprites/EvilWizard/Attack1.png',
'assets/characterSprites/EvilWizard/Death.png');
// img = image =>  sX, sY, sW, sH = area we want to draw => dx, dY, dW, dH = destination on the canvas

// sX, the distance of the frame from the left in the X plane
// sY, distance of the frame from the top in Y plane
// sW, the width of frame on the source image
// sH, the height of the frame on the source image
// dx, x coordinate to draw frame on canvas
// dy, y coordinate to draw frame on canvas
// dW, the width of the drawn image
// dH, the height of the drawn image

// function drawSprite(img, sX, sY, sW, sH, dx, dY, dW, dH) {
//     ctx.drawImage(img, sX, sY, sW, sH, dx, dY, dW, dH)
// }