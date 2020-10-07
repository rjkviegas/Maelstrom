import { wizardAttack } from '../classes/wizard/wizard_attack.js';
import { wizardIdle } from '../classes/wizard/wizard_idle.js'
import { banditIdle } from '../classes/bandit/bandit_idle.js';
import { banditAttack } from '../classes/bandit/bandit_attack.js';


const framespersecond = 16
let animation; 

export default function PlayerAttackAnimation(PlayerObj, OpponentObj, canvas, ctx) {

  if (animation) window.cancelAnimationFrame(animation);

  const endFrame = 7;
  let bothAttacked = false;
  let finalTurnCompleted = false;
  let deathAnimSwitch = false;
  let finalSwing = false;
  let character;
  let opponent; 
  let currentLoopIndex = 0;
  let fpsInterval;
  let then;

  PlayerObj.attackImage.onload = loadOne();

  return () => {
    window.cancelAnimationFrame(animation)
  }

  function loadOne() { OpponentObj.idleImage.onload = loadTwo(); };
  function loadTwo() { PlayerObj.idleImage.onload = loadThree(); };
  function loadThree() { OpponentObj.attackImage.onload = loadFour(); };
  function loadFour() { PlayerObj.deathImage.onload = loadFive(); };
  function loadFive() { 
    character = (PlayerObj.is_attacking || OpponentObj.is_attacking) ? wizardAttack : "idle"; 
    opponent = (PlayerObj.is_attacking || OpponentObj.is_attacking) ? banditIdle : "idle"; 
    OpponentObj.deathImage.onload = init(framespersecond)
  };

  //define framespersecond and begin animation
  function init(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    render()
  }

  function render() {
    if (animation) window.cancelAnimationFrame(animation);
    
    if ((Date.now() - then) > fpsInterval) {
      then = Date.now() - ((Date.now() - then) % fpsInterval);

      clearCanvas();

      if (isDead(PlayerObj) && deadAnimAndFinalSwing()) {
        if (loopIndexIsEndFrame()) {
          setDeathAndFinalSwingToTrue();
        }
        renderOpponentKillsPlayer();
      } else if (isDead(PlayerObj) && !deadAnimAndFinalSwing()) {
          renderOpponentIdle();
          renderPlayerDeathFrame();
      } else if (isDead(OpponentObj) && deadAnimAndFinalSwing()) {
        if (loopIndexIsEndFrame()) { 
          setDeathAndFinalSwingToTrue();
        }
        renderPlayerKillsOpponent();
      } else if (isDead(OpponentObj) && !deadAnimAndFinalSwing()) {
          renderPlayerIdle();
          renderOpponentDeathFrame();         
      } 

      if (areBothAlive()){
        if (areBothIdleStrings()) {
          renderBothIdle();
        }

        if (loopIndexIsEndFrame() && (isPlayerAttackingOpponentIdle())) {
          character = wizardIdle;
        }

        if(isPlayerAttackingOpponentIdle()) {
          if (currentLoopIndex <= endFrame) {
            renderPlayerAttacksOpponent();
          }
        }

        if(loopIndexIsEndFrame() && arePlayerAndOpponentIdle()) {
          character = wizardIdle; opponent = banditAttack;
        }

        if (arePlayerAndOpponentIdle()) {
          if(currentLoopIndex <= endFrame){
            renderBothIdle();
          } 
        }

        if (isOpponentAttackingPlayerIdle()) {
          if (!bothAttacked) {
            if(!finalTurnCompleted) {
              resetLoopIndex();
              finalTurnCompleted = true;
            } 
            renderOpponentAttacksPlayer();
            if (currentLoopIndex === endFrame && finalTurnCompleted === true) {
              bothAttacked = true;
            }
          } else {
            clearCanvas();
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

  function renderOpponentDead(){
    drawFrame(
      OpponentObj.deathImage,
      OpponentObj.deathImage.cycleLoop[currentLoopIndex],
      OpponentObj.deathSourceY,
      0,
      0
    );  
  }

  function renderOpponentAttack() {
    if (isDead(PlayerObj)) { return renderOpponentIdle() };

    drawFrame(
      OpponentObj.attackImage,
      OpponentObj.attackImage.cycleLoop[currentLoopIndex],
      OpponentObj.attackSourceY,
      0,
      0
    );
    if (OpponentObj.attackSound) {
      OpponentObj.attackSound.play()
    };
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

  function renderOpponentAttacksPlayer() {
    renderPlayerIdle();
    renderOpponentAttack();
  }

  function renderOpponentKillsPlayer() {
    renderPlayerDead();
    renderOpponentAttack();
    playPlayerDeathSound();
  }

  function renderPlayerKillsOpponent() {
    renderPlayerAttack();
    renderOpponentDead();
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

  function areBothIdleStrings() {
    return (character === "idle" && opponent === "idle");
  }

  function arePlayerAndOpponentIdle() {
    return (character === wizardIdle && opponent === banditIdle);
  }

  function areBothAlive() {
    return (!isDead(PlayerObj) && !isDead(OpponentObj));
  }

  function loopIndexIsEndFrame() {
    return (currentLoopIndex >= endFrame);
  }

  function renderBothIdle() {
    renderPlayerIdle();
    renderOpponentIdle();
  }

  function deadAnimAndFinalSwing() {
    return (!deathAnimSwitch && !finalSwing);
  }

  function setDeathAndFinalSwingToTrue() {
    deathAnimSwitch = true; 
    finalSwing = true;
  }

  function isPlayerAttackingOpponentIdle() {
    return (character === wizardAttack && opponent === banditIdle);
  }

  function isOpponentAttackingPlayerIdle() {
    return (character === wizardIdle && opponent === banditAttack);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
