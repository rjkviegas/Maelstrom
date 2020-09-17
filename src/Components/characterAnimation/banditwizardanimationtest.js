const Animation = () => {
const canvas = document.getElementById('game-area')
const context = canvas.getContext('2d')
const wizard = new Image();
wizard.src = "./assets/characterSprites/EVil Wizard 2/idle.png";
wizard.width = wizard.width/8
wizard.height = wizard.height
wizard.yOffset = -25
wizard.xOffset = -40
const bandit = new Image();
bandit.src = "./assets/characterSprites/bandit/HeavyBandit.png";
bandit.width = bandit.width/8;
bandit.height = bandit.height/5;
bandit.yOffset = 95
bandit.xOffset = 200

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
  var sprites = [bandit,wizard];
  (bandit && wizard ).onload = function () {
  
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

      }
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
