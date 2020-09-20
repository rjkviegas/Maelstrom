export class animate {

    constructor(
        actionArg ='run', 
        imageSrc = images.wizard, 
        characterWidth = 250, 
        characterHeight = 250, 
        startPosX = 0, 
        startPosY = -25, 
        offsetX = -80, 
        imageForward = 'assets/characterSprites/EvilWizard/Run.png', 
        imageReverse = 'assets/characterSprites/EvilWizard/RunReverse.png', 
        imageRun = 'assets/characterSprites/EvilWizard/Run.png', 
        imageRunback = 'assets/characterSprites/EvilWizard/RunReverse.png' , 
        imageAttack = 'assets/characterSprites/EvilWizard/Attack1.png', 
        imageDie = 'assets/characterSprites/EvilWizard/Death.png', 
        imageIdle = 'assets/characterSprites/EvilWizard/Idle.png'){

            this.action = actionArg;
            this.imageSrc = imageSrc
            this.characterWidth = characterWidth
            this.characterHeight = characterHeight
            this.startPosX = startPosX
            this.startPosY = startPosY
            this.offsetX = offsetX
            this.imageForward = imageForward
            this.imageReverse = imageReverse
            this.imageRun = imageRun
            this.imageRunback = imageRunback
            this.imageAttack = imageAttack
            this.imageDie = imageDie
            this.imageIdle = imageIdle

    }   

}