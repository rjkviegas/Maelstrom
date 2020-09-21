import { wizardAttack } from './wizard/wizard_attack.js';
import { wizardIdle } from './wizard/wizard_idle.js'
import { banditIdle } from './bandit/bandit_idle.js';
import { banditAttack } from './bandit/bandit_attack.js'
import PlayerAttacking from './playerAttacking'
import React, { useContext } from 'react'

let animation;
export default function OpponentAttackAnimation(OpponentObj, canvas, ctx) {
  let player;
  let sprites; 
  console.log("Opponent attack status (OPPONENT ATTACK): " + OpponentObj.is_attacking);
  if (animation) {
    window.cancelAnimationFrame(animation)
  }
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
     
  // let frameCount = 0
  let animationFrameId
  let currentLoopIndex = 0;
  // let numberOfFramesPerCycle = 16; //decrease value to increase speed of animation
  var fpsInterval, startTime, now, then, elapsed;
  // (banditIdle && wizardIdle && wizardAttack).onload = function () {
    init(10); //initiate animation
  // }
 
  sprites = [wizardIdle, banditAttack]
     


  function render() {
    
    // frameCount++
    // if (frameCount < numberOfFramesPerCycle) {
    //     window.requestAnimationFrame(render);
    //     return;
    //   }
    // frameCount = 0;

    // if(playerObj.is_attacking && frameCount === 8){
    //   playerObj.is_attacking = false;
    // }

    //clear animation after each frame

    now = Date.now();
    elapsed = now - then;
    
    //only draw image if enough time has passed since last frame
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

     
        drawFrame(sprites[0], sprites[0].cycleLoop[currentLoopIndex], 0, 0, 0);
        drawFrame(sprites[1], sprites[1].cycleLoop[currentLoopIndex], 2, 0, 0);
   
        if (currentLoopIndex >= 7 ) {
          return;
        }
        currentLoopIndex++; 
       //iterate through every sprite in sprites array and draw sprites to canvas
    }
    
    window.requestAnimationFrame(render);

  }

  //define framespersecond and begin animation
  function init(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    window.requestAnimationFrame(render); 
    }

  return () => {
      window.cancelAnimationFrame(animationFrameId)
  } 
}


