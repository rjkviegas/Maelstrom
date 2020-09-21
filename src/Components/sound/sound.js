import backgroundMusicFile from '../../media/background_music.mp3';

export default class Sound {
    constuctor() {
        this.backgroundMusic = new Audio(backgroundMusicFile);
        this.isMuted = false;
    }

    playMusic() {
        this.isMuted = false;
        this.backgroundMusic.play()
    }

    muteMusic() {
        this.isMuted = true;
        this.backgroundMusic.pause()
    }
}
