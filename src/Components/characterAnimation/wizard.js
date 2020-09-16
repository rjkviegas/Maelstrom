const Wizard = () => {
    const canvas = document.getElementById('game-area')
    const context = canvas.getContext('2d')
    
    //initate image animation
    const img = new Image();
    img.src = "./assets/characterSprites/EVil Wizard 2/idle.png";
    img.onload = function () {
        init();
    };

    const scale = 1;
    const width = img.width/8;
    const height = img.height;
    const scaledWidth = width*scale;
    const scaledHeight = height*scale;
    
    //function for selecting frame of sprite
    function drawFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(img,
                        frameX * width, (frameY * height)+20, width, height,
                        canvasX, canvasY, scaledWidth, scaledHeight);
        }

        
    
    let frameCount = 0
    let animationFrameId
    const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7];
    let currentLoopIndex = 0;
    let numberOfFramesPerCycle = 10; //decrease value to increase speed of animation

    function render() {
        frameCount++
        if (frameCount < numberOfFramesPerCycle) {
            window.requestAnimationFrame(render);
            return;
          }
        frameCount = 0;
        context.clearRect(0, 0, canvas.width, canvas.height); //clear animation after each frame
        drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
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

export default Wizard;
