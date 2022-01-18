

export class audioGame{

    constructor(){
        this.pickUpCoin = new Audio('json/music/pickUpCoin.wav');
        this.die = new Audio('json/music/die.mp3');
        this.music = new Audio('json/music/music.wav');
        this.step = new Audio('json/music/step.wav');
        this.nextLvl = new Audio('json/music/nextLevel.mp3');

    }


    playStep(){
        this.step.play();
    }

    playNextLevel(){
        this.nextLvl.play();
    }

    playCoinPickUp(){
        this.pickUpCoin.play();
    }

    playDie(){
        this.die.play();
    }

    playMusic(){
        this.music.play();
    }

    volume(step,coin,die,music,overallVolume){
        if(overallVolume){
            this.pickUpCoin.volume = overallVolume
            this.die.volume = overallVolume
            this.music.volume = overallVolume
            this.step.volume = overallVolume
        }else{
            this.pickUpCoin.volume = coin
            this.die.volume = die
            this.music.volume = music
            this.step.volume = step
        }


    }

}
