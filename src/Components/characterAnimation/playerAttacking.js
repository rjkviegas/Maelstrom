import { wizardAttack } from './wizard/wizard_attack.js';
import { wizardIdle } from './wizard/wizard_idle.js'
import { banditIdle } from './bandit/bandit_idle.js';
import { banditAttack } from './bandit/bandit_attack.js';

const framespersecond = 16
let animation; 
let animation_time;
let count = 1;

export default function PlayerAttackAnimation(PlayerObj, OpponentObj, canvas, ctx) {
  const endFrame = 7;
  let bothAttacked = false;
  let finalTurnCompleted = false;
  let deathAnimSwitch = false;
  let finalSwing = false;
  let character;
  let opponent; 
  
  if (animation) { window.cancelAnimationFrame(animation)}

  function drawFrame(img, frameX, frameY, canvasX, canvasY) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const scale = 1; 
      const scaledWidth = img.width*img.resizeXScale || img.width*scale;
      const scaledHeight = img.height*img.resizeYScale || img.height*scale;

      ctx.drawImage(img,
                      (frameX * img.width), (frameY * img.height), img.width, img.height,
                      canvasX+img.xOffset, canvasY+img.yOffset, scaledWidth, scaledHeight);
        
  }

  let currentLoopIndex = 0;
  var fpsInterval, startTime, now, then, elapsed;

 
  const loadOne = () => { OpponentObj.idleImage.onload = loadTwo() }
  const loadTwo = () => { PlayerObj.idleImage.onload = loadThree()}
  const loadThree = () => { OpponentObj.attackImage.onload = loadFour();}
  const loadFour = () => { PlayerObj.deathImage.onload = loadFive() }
  const loadFive = () => { 
    character = (PlayerObj.is_attacking || OpponentObj.is_attacking) ? wizardAttack : "idle"; 
    opponent = (PlayerObj.is_attacking || OpponentObj.is_attacking) ? banditIdle : "idle"; 
    OpponentObj.deathImage.onload = init(framespersecond)
  }
  PlayerObj.attackImage.onload = loadOne()

  function renderPlayerDead() {
    drawFrame(PlayerObj.deathImage, PlayerObj.deathImage.cycleLoop[currentLoopIndex], PlayerObj.deathSourceY, 0, 0); // DEAD PLAYER
  }

  function renderPlayerIdle() {
    drawFrame(PlayerObj.idleImage, PlayerObj.idleImage.cycleLoop[currentLoopIndex], PlayerObj.idleSourceY, 0, 0); // IDLE PLAYER
  }

  function renderOpponentIdle(){
    drawFrame(OpponentObj.idleImage, OpponentObj.idleImage.cycleLoop[currentLoopIndex], OpponentObj.idleSourceY, 0, 0); // OPPONENT IDLE
  }

  function renderPlayerAttack(){
    drawFrame(PlayerObj.attackImage, PlayerObj.attackImage.cycleLoop[currentLoopIndex], PlayerObj.attackSourceY, 0, 0);// ATTACKING PLAYER
    PlayerObj.attackSound.volume = 0.2;
    PlayerObj.attackSound.play();
  }
  function renderOpponentDead(){
    drawFrame(OpponentObj.deathImage, OpponentObj.deathImage.cycleLoop[currentLoopIndex], OpponentObj.deathSourceY, 0, 0); // DEAD OPPONENT   
  }

  function renderOpponentAttack() {
    drawFrame(OpponentObj.attackImage, OpponentObj.attackImage.cycleLoop[currentLoopIndex], OpponentObj.attackSourceY, 0, 0); // ATTACKING OPPONENT
    if(OpponentObj.attackSound){OpponentObj.attackSound.play()}
  }

  function renderOpponentDeathFrame() {
    drawFrame(OpponentObj.deathImage, OpponentObj.deathFrameNumber, OpponentObj.deathSourceY, 0, 0);
    
  }

  function renderPlayerDeathFrame() {
    drawFrame(PlayerObj.deathImage, PlayerObj.deathFrameNumber, PlayerObj.deathSourceY, 0, 0); // DEAD PLAYER    
  }

  function playPlayerDeathSound() {
    if(PlayerObj.deathSound) PlayerObj.deathSound.play();
  }

  function playOpponentDeathSound() {
    if(OpponentObj.deathSound) OpponentObj.deathSound.play();
  }

  function anyDead() {
    return (PlayerObj.hp <= 0 || OpponentObj.hp <= 0)
  }

  function playerDead() {
    return (PlayerObj.hp <= 0)
  }

  function opponentDead() {
    return (OpponentObj.hp <= 0)
  }
  
  function bothAlive() {
    return (PlayerObj.hp > 0 && OpponentObj.hp > 0)
  }

  function incrementFrame() {
    currentLoopIndex++;
  }
  

  function render() {
    if (animation) {
      window.cancelAnimationFrame(animation)
    }

    now = Date.now();
    elapsed = now - then;
    
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

    
          if (playerDead()) { // player is dead
            if (!deathAnimSwitch && !finalSwing) {
              if(currentLoopIndex >= endFrame) { deathAnimSwitch = true; finalSwing = true;}

              renderPlayerDead();
              renderOpponentAttack(); // attacking bandit 
              playPlayerDeathSound()
            } else {
              renderOpponentIdle(); // bandit idle
              renderPlayerDeathFrame(); // Wizard Dead Frame
            }
          } else if (opponentDead()) { // opponent is dead
            if(!deathAnimSwitch && !finalSwing) {
              if(currentLoopIndex >= endFrame) { deathAnimSwitch = true; finalSwing = true;}
              
              renderPlayerAttack();
              renderOpponentDead();
              playOpponentDeathSound();
            } else {
              renderPlayerIdle(); // Wizard Idle
              renderOpponentDeathFrame(); // Bandit dead frame          
            }         
          }
        


          if (character === "idle" && opponent === "idle" && bothAlive()) {
            renderPlayerIdle();
            renderOpponentIdle();
          }
          if (bothAlive()){
            if(currentLoopIndex >= endFrame && character === wizardAttack && opponent === banditIdle) { character = wizardIdle}
            if(character === wizardAttack && opponent === banditIdle) {
              if (currentLoopIndex <= endFrame) {
                renderOpponentIdle(); //idle bandit
                renderPlayerAttack(); //attacking wizard
              }
            }

            if(currentLoopIndex >= endFrame && character === wizardIdle && opponent === banditIdle) { character = wizardIdle; opponent = banditAttack}
            if (character === wizardIdle && opponent === banditIdle) {
              if(currentLoopIndex <= endFrame){
                renderPlayerIdle();              
                renderOpponentIdle(); // idle bandit
              } 
            }

            if(character === wizardIdle  && opponent === banditAttack) {
              if(!bothAttacked) {
                if(!finalTurnCompleted) { currentLoopIndex = 0; finalTurnCompleted = true; } 
                renderPlayerIdle();
                renderOpponentAttack(); // attacking bandit 
                if(currentLoopIndex === endFrame && finalTurnCompleted === true) {bothAttacked = true}
              } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                renderPlayerIdle();
                renderOpponentIdle(); // idle bandit
              }
            }
        }
          
        if (currentLoopIndex >= endFrame) { currentLoopIndex = 0}
        incrementFrame();
        animation_time++; 
    }
    
    animation = window.requestAnimationFrame(render);

  }

  //define framespersecond and begin animation
  function init(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    render()
    }

  return () => {
    count += 1
    window.cancelAnimationFrame(animation)
  } 
}


