export default class Input {
    constructor(sound) {
        this.sound = sound
    }

    listenForMute() {
        window.addEventListener("keydown", (event) => {
            if(event.key === 'x') { // press x for mute
              if (this.sound.isMuted) {
                this.sound.playMusic()
              } else {
                this.sound.muteMusic()
              }
            }
          }); 
    }
}