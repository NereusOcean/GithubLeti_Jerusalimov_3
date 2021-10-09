
import {gameScreen, currentFig, gameover} from "./main.js";

function keyPresed(x,y,keyUp){
    //  let temp = currentFig;
    let temp = JSON.parse(JSON.stringify(currentFig));
    if(keyUp){
        temp.bouns =  currentFig.bouns.map((row, i) => row.map((val, j) => currentFig.bouns[(currentFig.bouns.length - 1) - j][i]));
        if(gameScreen.canPlace(temp)) {
            gameScreen.deleteOldFig(currentFig);
            currentFig.bouns = temp.bouns;
            gameScreen.draw(currentFig);
        }
    }else{
        temp.cords.y += y;
        temp.cords.x += x;
        if(gameScreen.canPlace(temp)){
            gameScreen.deleteOldFig(currentFig);
            currentFig.cords.y += y;
            currentFig.cords.x += x;
            gameScreen.draw(currentFig);
        }
    }

}
let timer;
timer = setTimeout(()=>(timer = clearTimeout(timer)), 300);

function throwFig(){
    let canplace = true;

    if(!timer &&!gameover){
        currentFig.cords.y += 1;
        while(canplace){
            if(!gameScreen.canPlace(currentFig)){
                gameScreen.addFigure(currentFig);
                gameScreen.refreshMap();
                canplace = false;
            }else {
                currentFig.cords.y += 1;
            }
            timer = setTimeout(()=>(timer = clearTimeout(timer)), 400);
        }

    }

}

document.addEventListener("keydown", function (event) {


    switch (event.which) {
        case 40: //keyDown
            //спустить вниз
            throwFig();
            console.log("keydown");
            break;
        case 37: //keyLeft
            //подвинуть влево
            keyPresed(-1,0);
            console.log("keyLeft");
            break;
        case 39: //keyRight
            //подвинуть вправо
            keyPresed(1,0);
            console.log("keyRight");
            break;
        case 38: //keyUp
            //поворот по часовой
            keyPresed(0,0,true);

            console.log("keyUp");
            break;
        case 32: //space
            //спустить вниз
            throwFig();
            console.log("keydown");
            break;
        default:
            //ничего не делать

            console.log("key");
            break;
    }
});