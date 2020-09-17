import { bandit } from './bandit.js';
import { wizard } from './wizard.js';

const Animation = () => {
  const canvas = document.getElementById('game-area')
  const context = canvas.getContext('2d')
  const sprites = [bandit,wizard];

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

      
  let frameCount = 0
  let animationFrameId
  const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7];
  let currentLoopIndex = 0;
  let numberOfFramesPerCycle = 8; //decrease value to increase speed of animation
  
  ( bandit && wizard ).onload = function () {
  
    init();
  };
  function render() {
    frameCount++
    if (frameCount < numberOfFramesPerCycle) {
        window.requestAnimationFrame(render);
        return;
      }
    frameCount = 0;
    
    context.clearRect(0, 0, canvas.width, canvas.height); //clear animation after each frame

    for(var i = 0; i < sprites.length; i++){
      drawFrame(sprites[i], cycleLoop[currentLoopIndex], 0, 0, 0);
    } //iterate through every sprite in sprites array

    currentLoopIndex++;

    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    window.requestAnimationFrame(render);

  }
  
  function init() {
      window.requestAnimationFrame(render);
     
    }

  return () => {
      window.cancelAnimationFrame(animationFrameId)
  } 
}

export default Animation;
