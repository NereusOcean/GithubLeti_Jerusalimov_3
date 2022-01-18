import { audioGame } from "./sound.js";

export class Player extends  audioGame{
    //перепутаны x и y
    constructor(pos_x, pos_y, allEntity, ctxUser,ctx,tileAtlasUser, sizeTile,layerCollision,sound){
        super();
        this.posX = pos_x;
        this.posY = pos_y;
        this.newPosx = 0;
        this.newPosY = 0;
        this.gravity = 0;

        this.xClear = pos_x;
        this.yClear = pos_y;

        this.speed = 1;
        this.jumpPower = 22;

        this.jumping = false;
        this.life = 1;
        this.coin = 0;
        this.objEntity = allEntity;
        this.onGround = true;
        localStorage.setItem("coin", "0");
        this.ctxUser = ctxUser;
        this.ctx = ctx;

        this.tileAtlasUser = tileAtlasUser;
        this.sizeTile = sizeTile;
        this.layerCollision = {};
        this.layerCollision.object = layerCollision;
        this.sizeScreen = 1024;
    }

    platformColision(platform,isAdding){
        if(isAdding){
            this.layerCollision.platform = platform;
        }else{
            if(this.layerCollision.platform ) {
                this.layerCollision.platform = undefined;
            }
        }
    }

    moveLeft(x){
        this.newPosY -= this.speed;
        this.detectColiding("left")


    }

    moveRigth(x){
        this.newPosY += this.speed;
        this.detectColiding("right")


    }

    jump(){
        if(!this.jumping){
            this.jumping = true;
            this.newPosx -= this.jumpPower;
        }

    }

    updateUserVelocity(){
        this.xClear = this.posX;
        this.yClear = this.posY;
        this.posX += this.newPosx;
        this.posY += this.newPosY ;
    }

    update(enemyX,enemyY){
        this.detectColiding("up");
        this.newPosx += 1;
        this.detectColiding('down')
        this.updateUserVelocity();
        this.updateEnemyPosition(enemyX,enemyY);
        this.newPosx *= 0.9;
        this.newPosY *= 0.8;


        this.collideObject()
        this.onTouchEntity();
    }

    collideObject() {

        if (this.posX  < 0) { this.posX  = 0; this.newPosx = 0; }
        else if (this.posX  + 32 > this.sizeScreen) { this.posX  = this.sizeScreen - 32; this.newPosx = 0; }
        if (this.posY < 0) { this.posY = 0; this.newPosY = 0; }
        else if (this.posY + 32 > this.sizeScreen) { this.posY = this.sizeScreen - 32; this.newPosY = 0; }


    }

    updateEnemyPosition(x,y){
        for(let i in this.objEntity["enemy"]){
            if(this.objEntity["enemy"][i]["enemy"]){
                this.objEntity["enemy"][i].x = x;
                this.objEntity["enemy"][i].y = y;
            }
        }
    }

    detectColiding(direction){
        if (this.layerCollision.object) {

            let arrColision = JSON.parse(JSON.stringify(this.layerCollision.object));
            if(this.layerCollision.platform){
                for(let i in this.layerCollision.platform){
                    arrColision.push(this.layerCollision.platform[i]);
                }

            }
            for (let i in arrColision) {
                let t ={};
                t.y = arrColision[i]["y"];
                t.x = arrColision[i]["x"];
                t.width = arrColision[i]["width"];
                t.height = arrColision[i]["height"]
                if(this.isColliding(direction, t)){
                    if(direction ==="left"){
                        this.newPosY += this.speed;
                        return;
                    }else if(direction ==="right"){
                        this.newPosY -= this.speed;
                        return;
                    } else if(direction ==="up"){
                        console.log("yep");
                        this.newPosx = 6;
                        return;
                    } else{

                        this.jumping = false;
                        this.newPosx = 0;
                        this.onGround = true;
                        return;
                    }
                }
            }
            if(direction === 'down'){
                this.jumping = true;
                this.onGround = false;
                return;
            }
        }
    }

    isColliding(direction, t){
        //t.y = minX
        let x = Math.ceil(this.posX);
        let y = Math.ceil(this.posY);

        if (direction === 'up') {
            return x - (32/2) - this.newPosx< t.y + t.height && x > t.y
                && y + 32> t.x && y < t.x + t.width;
        }
        if (direction === 'right') {
            return y + 32+(this.newPosY+this.speed) > t.x && y < t.x
                && x +(32)> t.y && x + 32 < t.y +t.height+ (32 );
        }
        if (direction === 'left') {
            return y - 10 -(this.newPosY-this.speed)< t.x + t.width && y > t.x
                && x +(32)> t.y && x + 32 < t.y +t.height+ (32);
        }

        if(direction === "down"){
            return x + (32)+this.newPosx > t.y && x < t.y && y + 32 > t.x && y < t.x + t.width;
        }
    }



    isTouch(objY,objX){
        let maxY = objY + 16;
        let minY = objY - 16;
        let y = Math.floor(this.posY);
        let maxX = objX + 16;
        let minX = objX -16;
        let x = Math.floor(this.posX);
        return(((y <= maxY) && (y>= minY)) && ((x <= maxX) && (x >= minX)));
           
    }

    onTouchEntity(){
        if(this.objEntity["coin"]){



            for(let i in this.objEntity["coin"]){
                let isTouch = this.isTouch(this.objEntity["coin"][i]["y"],this.objEntity["coin"][i]["x"]);
                if(isTouch){
                    this.grabCoin();
                    this.deleteEntity(this.objEntity["coin"][i]);
                    delete this.objEntity["coin"][i];
                }
            }
        }
        if(this.objEntity['exit']){
            for(let i in this.objEntity["exit"]) {
                let isTouch = this.isTouch(this.objEntity["exit"][i]["y"], this.objEntity["exit"][i]["x"]);
                if (isTouch) {
                    this.nextLevel();
                    this.deleteEntity(this.objEntity["exit"][i]);
                    delete this.objEntity["exit"][i];
                }
            }
        }
        if(this.objEntity['enemy']){
            for(let i in this.objEntity["enemy"]) {
                let isTouch = this.isTouch(this.objEntity["enemy"][i]["y"], this.objEntity["enemy"][i]["x"]);
                if (isTouch) {
                    if(this.life){
                        super.playDie();
                        setTimeout(()=>{
                            let dies = localStorage.getItem('die');
                            console.log("youDie");
                            ++dies;
                            localStorage.setItem('die', dies);
                            this.life = 0;
                            document.location.reload();
                        }, 100);
                    }

                }
            }
        }
    }

    draw(x,y){
        this.ctxUser.clearRect(this.yClear,this.xClear, this.sizeTile,this.sizeTile);
        this.ctxUser.drawImage(this.tileAtlasUser, x, y, this.sizeTile,
            this.sizeTile, this.posY, this.posX,
            this.sizeTile, this.sizeTile);
    }
   
    grabCoin(){
        super.playCoinPickUp();
        let coin = localStorage.getItem("coin");
        ++coin;
        localStorage.setItem("coin", coin);
        $("#coin").text(`coin: ${coin}`);
    }

    nextLevel(){
        super.playNextLevel();
        setTimeout(()=>{
            if(window.location.pathname === "/level1"){
                window.open('level2', '_self');
            }else{
                window.open('level1', '_self');
            }
        }, 300);
    }

    deleteEntity(objCord){
        this.ctx.clearRect(objCord["y"],objCord['x'], this.sizeTile,this.sizeTile);
    }

    getGround(){
        return this.onGround;
    }


}
