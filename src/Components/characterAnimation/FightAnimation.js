import { wizardAttack } from '../classes/wizard/wizard_attack.js';
import { wizardIdle } from '../classes/wizard/wizard_idle.js'
import { banditIdle } from '../classes/bandit/bandit_idle.js';
import { banditAttack } from '../classes/bandit/bandit_attack.js';
import { animationHelper } from './animationHelper.js'

const framespersecond = 16
let animation; 

export default function PlayerAttackAnimation(PlayerObj, OpponentObj, canvas, ctx) {

  const endFrame = 7;
  let bothAttacked = false;
  let finalTurnCompleted = false;
  let deathAnimSwitch = false;
  let finalSwing = false;
  let character;
  let opponent; 
  
  if (animation) { window.cancelAnimationFrame(animation) };

  function drawFrame(img, frameX, frameY, canvasX, canvasY) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const scale = 1; 
    const scaledWidth = img.width*img.resizeXScale || img.width*scale;
    const scaledHeight = img.height*img.resizeYScale || img.height*scale;

    ctx.drawImage(
      img,
      (frameX * img.width),
      (frameY * img.height),
      img.width,
      img.height,
      canvasX+img.xOffset,
      canvasY+img.yOffset,
      scaledWidth,
      scaledHeight
    );
  }

  let currentLoopIndex = 0;
  let fpsInterval;
  let now;
  let then;
  let elapsed;

  const loadOne = () => { OpponentObj.idleImage.onload = loadTwo(); };
  const loadTwo = () => { PlayerObj.idleImage.onload = loadThree(); };
  const loadThree = () => { OpponentObj.attackImage.onload = loadFour(); };
  const loadFour = () => { PlayerObj.deathImage.onload = loadFive(); };
  const loadFive = () => { 
    character = (PlayerObj.is_attacking || OpponentObj.is_attacking) ? wizardAttack : "idle"; 
    opponent = (PlayerObj.is_attacking || OpponentObj.is_attacking) ? banditIdle : "idle"; 
    OpponentObj.deathImage.onload = init(framespersecond)
  };
  PlayerObj.attackImage.onload = loadOne();

  function renderPlayerDead() {
    drawFrame(
      PlayerObj.deathImage,
      PlayerObj.deathImage.cycleLoop[currentLoopIndex],
      PlayerObj.deathSourceY,
      0,
      0
    );
  }

  function renderPlayerIdle() {
    drawFrame(
      PlayerObj.idleImage,
      PlayerObj.idleImage.cycleLoop[currentLoopIndex],
      PlayerObj.idleSourceY,
      0,
      0
    );
  }

  function renderOpponentIdle(){
    drawFrame(
      OpponentObj.idleImage,
      OpponentObj.idleImage.cycleLoop[currentLoopIndex],
      OpponentObj.idleSourceY,
      0,
      0
    );
  }

  function renderPlayerAttack(){
    drawFrame(
      PlayerObj.attackImage,
      PlayerObj.attackImage.cycleLoop[currentLoopIndex],
      PlayerObj.attackSourceY,
      0,
      0
    );
    PlayerObj.attackSound.volume = 0.2;
    PlayerObj.attackSound.play();
  }

  function renderisOpponentDead(){
    drawFrame(
      OpponentObj.deathImage,
      OpponentObj.deathImage.cycleLoop[currentLoopIndex],
      OpponentObj.deathSourceY,
      0,
      0
    );  
  }

  function renderOpponentAttack() {
    if (isDead(PlayerObj)) { return renderOpponentIdle()};

    drawFrame(
      OpponentObj.attackImage,
      OpponentObj.attackImage.cycleLoop[currentLoopIndex],
      OpponentObj.attackSourceY,
      0,
      0
    );
    if (OpponentObj.attackSound) { OpponentObj.attackSound.play() };
  }

  function renderOpponentDeathFrame() {
    drawFrame(
      OpponentObj.deathImage,
      OpponentObj.deathFrameNumber,
      OpponentObj.deathSourceY,
      0,
      0
    );
  }

  function renderPlayerDeathFrame() {
    drawFrame(
      PlayerObj.deathImage,
      PlayerObj.deathFrameNumber,
      PlayerObj.deathSourceY,
      0,
      0
    );  
  }

  function playPlayerDeathSound() {
    if (PlayerObj.deathSound) {
      PlayerObj.deathSound.play();
    }
  }

  function playOpponentDeathSound() {
    if (OpponentObj.deathSound) {
      OpponentObj.deathSound.play();
    }
  }

  function renderPlayerAttacksOpponent() {
    renderOpponentIdle();
    renderPlayerAttack();
  }

  function renderOpponentKillsPlayer() {
    renderPlayerDead();
    renderOpponentAttack();
    playPlayerDeathSound();
  }

  function renderPlayerKillsOpponent() {
    renderPlayerAttack();
    renderisOpponentDead();
    playOpponentDeathSound();
  }

  function resetLoopIndex() {
    currentLoopIndex = 0;
  }

  function isDead(character) {
    return character.hp <= 0;
  }

  function incrementFrame() {
    currentLoopIndex++;
  }

  function areBothIdle() {
    return (character === "idle" && opponent === "idle");
  }

  function areBothAlive() {
    return (!isDead(PlayerObj) && !isDead(OpponentObj));
  }

  function loopIndexIsEndFrame() {
    return (currentLoopIndex >= endFrame);
  }

  function bothWaitingToAttack() {
    return (areBothAlive() && areBothIdle());
  }

  function renderBothIdle() {
    renderPlayerIdle();
    renderOpponentIdle();
  }

  function render() {
    if (animation) {
      window.cancelAnimationFrame(animation);
    }

    now = Date.now();
    elapsed = now - then;
    
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isDead(PlayerObj)) {
        if (!deathAnimSwitch && !finalSwing) {
          if (loopIndexIsEndFrame()) {
            deathAnimSwitch = true;
            finalSwing = true;
          }
          renderOpponentKillsPlayer();
        } else {
          renderOpponentIdle();
          renderPlayerDeathFrame();
        }
      } else if (isDead(OpponentObj)) {
        if (!deathAnimSwitch && !finalSwing) {
          if (loopIndexIsEndFrame()) { 
            deathAnimSwitch = true; 
            finalSwing = true;
          }
          renderPlayerKillsOpponent();
        } else {
          renderPlayerIdle();
          renderOpponentDeathFrame();         
        }         
      }

      if (bothWaitingToAttack()) {
        renderBothIdle();
      }
      if (areBothAlive()){
        if (loopIndexIsEndFrame() && (character === wizardAttack && opponent === banditIdle)) {
          character = wizardIdle;
        }

        if(character === wizardAttack && opponent === banditIdle) {
          if (currentLoopIndex <= endFrame) {
            renderPlayerAttacksOpponent();
          }
        }

        if(loopIndexIsEndFrame() && character === wizardIdle && opponent === banditIdle) {
          character = wizardIdle; opponent = banditAttack;
        }

        if (character === wizardIdle && opponent === banditIdle) {
          if(currentLoopIndex <= endFrame){
            renderBothIdle();
          } 
        }

        if ((character === wizardIdle && opponent === banditAttack)) {
          if (!bothAttacked) {
            if(!finalTurnCompleted) {
              currentLoopIndex = 0;
              finalTurnCompleted = true;
            } 
            renderPlayerIdle();
            renderOpponentAttack();
            if (currentLoopIndex === endFrame && finalTurnCompleted === true) {
              bothAttacked = true;
            }
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderBothIdle();
          }
        }
      }

      if (loopIndexIsEndFrame()) {
        resetLoopIndex();
      }
      incrementFrame();
    }
    animation = window.requestAnimationFrame(render);
  }
//define framespersecond and begin animation
  function init(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    render()
  }

  return () => {
    window.cancelAnimationFrame(animation)
  } 
}
