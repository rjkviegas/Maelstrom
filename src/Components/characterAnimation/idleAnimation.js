import { banditIdle } from './bandit/bandit_idle.js';
import { wizardIdle } from './wizard/wizard_idle.js';
import { wizardAttack } from './wizard/wizard_attack.js';
// import PlayerAttacking from './playerAttacking'
import React, { useContext } from 'react'

export default function IdleAnimation(playerObj, canvas, ctx) {
  let player;
  let sprites;
  console.log("Wizard attack status (IDLE): " + playerObj.is_attacking);
  // console.log("Wizard avatar: " + playerObj.current_avatar_text() );  
 

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
     
  let frameCount = 0
  let animationFrameId
  let currentLoopIndex = 0;
  let numberOfFramesPerCycle = 10; //decrease value to increase speed of animation
  var fpsInterval, startTime, now, then, elapsed;
  // (banditIdle && wizardIdle && wizardAttack).onload = function () {
 //initiate animation
  // }
 
  // player = (playerObj.is_attacking) ? wizardAttack :  wizardIdle

     
  sprites = [banditIdle, wizardIdle];

  function render() {
    
    frameCount++
    if (frameCount < numberOfFramesPerCycle) {
        window.requestAnimationFrame(render);
        return;
      }
    frameCount = 0;

    // if(playerObj.is_attacking && frameCount === 8){
    //   playerObj.is_attacking = false;
    // }

    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear animation after each frame

    now = Date.now();
    elapsed = now - then;
    
    //only draw image if enough time has passed since last frame
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      for(var i = 0; i < sprites.length; i++){
        drawFrame(sprites[i], sprites[i].cycleLoop[currentLoopIndex], 0, 0, 0);
        currentLoopIndex++;

        if (currentLoopIndex >= sprites[i].cycleLoop.length) {
          currentLoopIndex = 0;
        }
      } //iterate through every sprite in sprites array and draw sprites to canvas
    }
    
    window.requestAnimationFrame(render);

  }
  const fps = 10;
  console.log(fps)
  //define framespersecond and begin animation
  const init = (fps) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    window.requestAnimationFrame(render); 
    }
    init(fps);
  return () => {
      window.cancelAnimationFrame(animationFrameId)
  } 
}
