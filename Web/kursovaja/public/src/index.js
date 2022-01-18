import {level} from "./JsonManager.js";
import  {Player} from "./player.js";
import {Controller} from "./controller.js";
import {EngineGame} from "./engine.js";
import { Animation } from "./anim.js";
import { Enemy } from "./enemy.js";
import { audioGame } from "./sound.js";

const canvasFront = document.getElementById('canvas');
const canvasUser = document.getElementById('canvasUser');
const canvasEnemy= document.getElementById('canvasEnemy');


let levels = [];
let currentLevel= undefined;
if(window.location.pathname === "/level1"){
    levels[0] = new level(1);
    currentLevel = levels[0];
}else{
    levels[1] = new level(2);
    currentLevel = levels[1];
}

currentLevel? start(currentLevel): alert("miss level");

function start(currentLevel){


    let map = {
        Ycols: currentLevel.width,
        Xcrows: currentLevel.height,
        heightPX: currentLevel.height * currentLevel.sizeTileSet,
        widthPX: currentLevel.width * currentLevel.sizeTileSet
    }
    let sizeTile = currentLevel.sizeTileSet;

    setCanvasWidth(canvasFront);
    setCanvasWidth(canvasUser);
    setCanvasWidth(canvasEnemy);
    let ctx = canvasFront.getContext('2d');
    let ctxUser = canvasUser.getContext('2d');
    let ctxEnemy = canvasEnemy.getContext('2d');

    let tileAtlas = new Image();
    tileAtlas.src = 'json/image/Tileset.png';
    tileAtlas.onload = drawFont;

    

    let tileAtlasUser = new Image();
    tileAtlasUser.src = 'json/image/pipo-xmaschara05.png';
    tileAtlasUser.onload = drawUser;

    let tileAtlasEnemy = new Image();
    tileAtlasEnemy.src = 'json/image/pipo-charachip_soldier01.png';
    tileAtlasEnemy.onload = drawEnemy;
    
    //tileAtlasUser.onload = drawEnemy;



    let tileOutputSize = 1 // can set to 1 for 32px or higher
    let updatedTileSize = sizeTile * tileOutputSize;

    let atlasCol = Math.floor(currentLevel.tileSet["front"]["imagewidth"] / map.Ycols);
    let atlasRow = Math.floor(currentLevel.tileSet["front"]["imageheight"] / map.Xcrows);

    let layerFront = currentLevel.layer["front"]["data"];
    let layerCollision =  currentLevel.layer["collisionMap"]["objects"];
    let layerPlayer =  currentLevel.layer["user"]["data"];
    let layerEnemy =  currentLevel.layer["enemy"]["data"];

    function setCanvasWidth(canvas){
        canvas.width = map.widthPX;
        canvas.height = map.heightPX;
    }

    let coin =[];
    let exit = [];
    let enemy = [];

    function drawFont() {
        let mapIndex = 0;
        let sourceX = 0;
        let sourceY = 0;
        for (let col = 0; col < map.heightPX; col += sizeTile) {
            for (let row = 0; row < map.widthPX; row += sizeTile) {
                let tileVal = layerFront[mapIndex];

                if(tileVal != 0) {
                    tileVal -= 1;
                    sourceY = Math.floor(tileVal/atlasCol)*sizeTile;
                    sourceX = (tileVal % atlasCol)*sizeTile;
                    switch(tileVal) {
                        case 98:
                            coin.push({"x":col * tileOutputSize,"y":row * tileOutputSize});
                            break;
                        case 97:
                            exit.push({"x":col * tileOutputSize,"y":row * tileOutputSize});
                            break;
                        case 99:
                            enemy.push({"x":col * tileOutputSize,"y":row * tileOutputSize});
                            break;

                    }
                    ctx.drawImage(tileAtlas, sourceX, sourceY, sizeTile,
                        sizeTile, row * tileOutputSize, col * tileOutputSize,
                        updatedTileSize, updatedTileSize);
                    console.log("i drawed");
                }
                mapIndex ++;
            }
        }
    }

    var enemyClass = undefined;
    var animationEnemy = undefined;
    function drawEnemy(type){
        let mapIndex = 0;
        let sourceX = 0;
        let sourceY = 0;
        for (let col = 0; col < map.heightPX; col += sizeTile) {
            for (let row = 0; row < map.widthPX; row += sizeTile) {
                let tileVal = layerEnemy[mapIndex];
                
                if(tileVal != 0) {
                    tileVal -= 1;
                    sourceY = Math.floor(tileVal/atlasCol)*sizeTile;
                    sourceX = (tileVal % atlasCol)*sizeTile;
                    if(!enemyClass){
                        animationEnemy = new Animation("enemy", 32, 32);
                        enemyClass = new Enemy(row* tileOutputSize,col* tileOutputSize, 32,ctxUser,tileAtlasEnemy,animationEnemy);
                        enemy.push({"enemy":"solider","x":col * tileOutputSize,"y":row * tileOutputSize});
                    }
                    ctxUser.drawImage(tileAtlasEnemy, sourceX, sourceY, sizeTile,
                        sizeTile, row * tileOutputSize, col * tileOutputSize,
                        updatedTileSize, updatedTileSize);

                    return;
                }
                mapIndex ++;
            }
        }
    }


    let allEntity = ({"coin":coin,'exit':exit,"enemy":enemy});
    console.log(allEntity);
    var user = undefined;
    var animationUser = undefined;

    function drawUser(){
        let mapIndex = 0;
        let sourceX = 0;
        let sourceY = 0;
        for (let col = 0; col < map.heightPX; col += sizeTile) {
            for (let row = 0; row < map.widthPX; row += sizeTile) {
                let tileVal = layerPlayer[mapIndex];
               
                if(tileVal != 0) {
                    tileVal -= 1;
                    sourceY = Math.floor(tileVal/atlasCol)*sizeTile;
                    sourceX = (tileVal % atlasCol)*sizeTile;
                    if(!user){
                        user = new Player(col* tileOutputSize,row* tileOutputSize, allEntity,ctxEnemy,ctx,tileAtlasUser, sizeTile,layerCollision);
                        animationUser = new Animation("user", user.sizeTile, user.sizeTile);
                    }
                    ctxEnemy.drawImage(tileAtlasUser, sourceX, sourceY, sizeTile,
                        sizeTile, row * tileOutputSize, col * tileOutputSize,
                        updatedTileSize, updatedTileSize);

                    return;
                }
                mapIndex ++;
            }
        }
    }

    

    var currentPlatformIsActive = "green";



    function changeActivePlatform(){
        console.log("change");
        if(currentPlatformIsActive === "night"){
            let layerPlatformCollision =  currentLevel.layer["platformGreen"]["objects"];
            user.platformColision(layerPlatformCollision, 1);

            ctx.fillStyle = '#50575c';
            for(let i of currentLevel.layer["platformNight"]["objects"]){
                ctx.fillRect(i.x, i.y, i.width, i.height);
            }

            ctx.fillStyle = '#1E6F50';
            for(let i of currentLevel.layer["platformGreen"]["objects"]){
                ctx.fillRect(i.x, i.y, i.width, i.height);
            }
            currentPlatformIsActive = "green";
        }else{
            let layerPlatformCollision =  currentLevel.layer["platformNight"]["objects"];
            user.platformColision(layerPlatformCollision, 1);
            ctx.fillStyle = '#0C2E44';
            for(let i of currentLevel.layer["platformNight"]["objects"]){
                ctx.fillRect(i.x, i.y, i.width, i.height);
            }
            ctx.fillStyle = '#50575c';
            for(let i of currentLevel.layer["platformGreen"]["objects"]){
                ctx.fillRect(i.x, i.y, i.width, i.height);
            }
            currentPlatformIsActive = "night";
        }
    }

    window.addEventListener("load", function(event) {
        let sound = new audioGame();

        let name = localStorage.getItem('name');
        let coin = localStorage.getItem('coin');
        let dies = localStorage.getItem('die');
        $("#level").text(`Level: ${window.location.pathname.slice(6)}`);
        $("#userName").text(`use name: ${name}`);
        $("#coin").text(`coin: ${coin}`);
        $("#die").text(`die count: ${dies}`);


        var controller = new Controller();

        let layerPlatformNightCollision =  currentLevel.layer["platformNight"]["objects"];
        user.platformColision(layerPlatformNightCollision, 1);

        var keyDownUp = function (event) {
            controller.keyDownUp(event.type, event.keyCode);
        };

        var update = function () {
            if (controller.left.active) {
                user.moveLeft(1);
                animationUser.nextFrame("left");
                if(!user.jumping){
                    sound.playStep();
                }
                
            }
            if (controller.right.active) {
                user.moveRigth(1);
                animationUser.nextFrame("right");
                if(!user.jumping){
                    sound.playStep();
                }
            }
            if (controller.up.active) {
                user.jump();
                controller.up.active = false;
            }
            if(controller.change.active){
                changeActivePlatform();
                controller.change.active = false;
            }

            if(!(controller.right.active ||controller.left.active )){
                animationUser.nextFrame("stay");
            }

            enemyClass.update();
            user.update(enemyClass.y,enemyClass.x);

            enemyClass.follow(user.posX,user.posY);
            //enemyClass.inspectTeretory();
            
            //user.draw();

        };

        

        var renderUser = function () {
            let currentAnim = animationUser.currentAnimPos;
            user.draw(currentAnim.x+32,currentAnim.y+32);

            let animEnemy = animationEnemy.currentAnimPos;
            enemyClass.draw(animEnemy.x+32,animEnemy.y+32);
        }

        var engine = new EngineGame(1000/30,update, renderUser );

        window.addEventListener("keydown", keyDownUp);
        window.addEventListener("keyup", keyDownUp);
        changeActivePlatform();
        engine.start();
    });
}
