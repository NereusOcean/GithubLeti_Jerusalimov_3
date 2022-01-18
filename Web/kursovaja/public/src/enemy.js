

export class Enemy{

    constructor(x,y,tileSize, context, tileAtlas, anim){
        this.x =x;
        this.y =y;

        this.startX = x;

        this.newPosX = 0;
        this.newPosY = 0;
        this.xClear = 0;

        this.isNotFollow = true;
        this.speed = 0.3;
        this.visin = 64;
        this.tileSize = tileSize;

        this.context = context;
        this.tileAtlas = tileAtlas;

        this.touchLeft = true;

        this.anim = anim;
    }

    moveLeft(){
        this.newPosX -= this.speed;
        this.anim.nextFrame("left");
    }

    moveRigth(){
        this.newPosX += this.speed;
        this.anim.nextFrame("right");
    }

    updateUserVelocity(){
        this.xClear = this.x;
        this.x += this.newPosX;

    }

    update(){
        if(this.isNotFollow){
            this.inspectTeretory();
        }
        //console.log(this.x);
        this.updateUserVelocity();
        //console.log(this.x);
        //this.goStart();
        this.newPosX *= 0.9;
    }

    findUser(){

    }

    draw(x,y){
        
        this.context.clearRect(this.xClear,this.y, this.tileSize,this.tileSize);
        this.context.drawImage(this.tileAtlas, x, y, this.tileSize,
            this.tileSize, this.x, this.y,
            this.tileSize, this.tileSize);
    }



    inspectTeretory(){
        if((this.x > this.startX - 64 || this.x<this.startX+64)){
            if(this.x > this.startX - 64 && this.touchLeft){
                this.moveLeft();
            }else{
                this.touchLeft = false;
            }
            if(this.x < this.startX + 64 && !this.touchLeft){
                this.moveRigth();
            }else{
                this.touchLeft = true;
            }
        }
    }

    follow(playerY, playerX){
        if(playerY >= this.y -16 && playerY <= this.y +16){
                this.isNotFollow = false;
                if(this.x > playerX){
                    this.moveLeft();
                }else{
                    this.moveRigth();
                }
        }else{
            this.isNotFollow = true;
        }
    }

}