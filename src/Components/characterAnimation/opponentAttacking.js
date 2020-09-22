import { wizardAttack } from './wizard/wizard_attack.js';
import { wizardIdle } from './wizard/wizard_idle.js'
import { banditIdle } from './bandit/bandit_idle.js';
import PlayerAttacking from './playerAttacking'
import React, { useContext } from 'react'
import { banditAttack } from './bandit/bandit_attack.js';

let animation;
export default function PlayerAttackAnimation(OpponentObj, canvas, ctx) {
  let character; let endframe; let notYetSwitched = false;
  let sprites;
  let playerSrcY = 0; let opponentSrcY = 2; let opponentIdleSrcY = 0;

  if (animation) {
    window.cancelAnimationFrame(animation)
  }

  //canvas.currentActor = 'playerAttackAnimation'

  function drawFrame(img, frameX, frameY, canvasX, canvasY) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const scale = 1; 
      const scaledWidth = img.width*scale;
      const scaledHeight = img.height*scale;

      ctx.drawImage(img,
                      (frameX * img.width), (frameY * img.height), img.width, img.height,
                      canvasX+img.xOffset, canvasY+img.yOffset, scaledWidth, scaledHeight);
        
  }

  let currentLoopIndex = 0;
  var fpsInterval, startTime, now, then, elapsed;

 
  const loadOne = () => { sprites[1].onload = loadTwo() }
  const loadTwo = () => {sprites[2].onload = loadThree()}
  const loadThree = () => { character = wizardAttack; sprites[3].onload = init(16)}
     
  sprites = [wizardAttack, banditIdle, wizardIdle, banditAttack];
  sprites[0].onload = loadOne()


  function render() {
    if (animation) {
      window.cancelAnimationFrame(animation)
    }

    now = Date.now();
    elapsed = now - then;
    
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(currentLoopIndex >= 7) { character = wizardIdle}
        if (currentLoopIndex < 7 && character === wizardAttack) {
          drawFrame(sprites[3], sprites[3].cycleLoop[currentLoopIndex], opponentSrcY, 0, 0);
        } else {
          if (notYetSwitched) { currentLoopIndex = 0; notYetSwitched = false}
          drawFrame(sprites[1], sprites[1].cycleLoop[currentLoopIndex], opponentIdleSrcY, 0, 0);
        }
        drawFrame(sprites[2], sprites[2].cycleLoop[currentLoopIndex], playerSrcY, 0, 0);
        if (currentLoopIndex >= 7) { currentLoopIndex = 0}
        currentLoopIndex++; 
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
      
  } 
}

