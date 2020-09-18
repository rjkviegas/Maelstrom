import { wizardAttack } from './wizard/wizard_attack.js';
import { banditIdle } from './bandit/bandit_idle.js';
import PlayerAttacking from './playerAttacking'
import React, { useContext } from 'react'

export default function AttackAnimation(playerObj) {
  const canvas = document.getElementById('game-area');
  const context = canvas.getContext('2d');
  let player;
  let sprites;
  console.log("Wizard attack status: " + playerObj.is_attacking);
  console.log("Wizard avatar: " + playerObj.current_avatar_text() );  
 

  function drawFrame(img, frameX, frameY, canvasX, canvasY) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      const scale = 1; 
      const scaledWidth = img.width*scale;
      const scaledHeight = img.height*scale;

      context.drawImage(img,
                      (frameX * img.width), (frameY * img.height), img.width, img.height,
                      canvasX+img.xOffset, canvasY+img.yOffset, scaledWidth, scaledHeight);
        
  }
     
  // let frameCount = 0
  let animationFrameId
  let currentLoopIndex = 0;
  // let numberOfFramesPerCycle = 16; //decrease value to increase speed of animation
  var fpsInterval, startTime, now, then, elapsed;
  // (banditIdle && wizardIdle && wizardAttack).onload = function () {
    init(20); //initiate animation
  // }
 

     
  sprites = [wizardAttack, banditIdle];

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

      context.clearRect(0, 0, canvas.width, canvas.height);

      for(var i = 0; i < sprites.length; i++){
        
        drawFrame(sprites[i], sprites[i].cycleLoop[currentLoopIndex], 0, 0, 0);
   
        if (currentLoopIndex >= sprites[i].cycleLoop.length -1 ) {
          return;
        }
        currentLoopIndex++; 
      }
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

