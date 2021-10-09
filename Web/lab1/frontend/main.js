
import {GameMap} from "./gameMap.js";

import "./keyEvent.js"


//--------------Нужные переменные----------------------------------------------------------------------
let score = 0;
let users = JSON.parse(localStorage.getItem("name"));
let currentUsers = users[users.length -1];
document.getElementById("nameUsers").innerHTML = "Name: " + currentUsers.name;
document.getElementById("score").innerHTML = "Score: " + score;
document.getElementById("bestScore").innerHTML = "Best score: " + users[users.length -1].score;
const minCanvas = document.getElementById("nextFig");
const minContext = minCanvas.getContext('2d');


const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');
let animation = null;
let gameSpeed = 60;


let frame = 0;
export let gameover = false;
let startGam = false;



const colors = ["dimgray","cyan", "purple", "yellow", "green", "red", "blue", "orange"];

const figure = {
    'I': {
        bouns: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        cords: {y: -2, x: 3},
        color: "cyan"
    },
    'J': {
        bouns: [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0],
        ],
        cords: {y: -2, x: 3},
        color: "purple"
    },
    'O': {
        bouns: [
            [0, 3, 3],
            [0, 3, 3],
            [0, 0, 0],
        ],
        cords: {y: -2, x: 3},
        color: "yellow"
    },
    'L': {
        bouns: [
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4],
        ],
        cords: {y: -2, x: 3},
        color: "green"
    },
    'Z': {
        bouns: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ],
        cords: {y: -2, x: 3},
        color: "red"
    },
    'T': {
        bouns: [
            [6, 6, 6],
            [0, 6, 0],
            [0, 0, 0],
        ],
        cords: {y: -2, x: 3},
        color: "blue"
    },
    'S': {
        bouns: [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ],
        cords: {y: -2, x: 3},
        color: "orange"
    }
};

export const gameScreen = new GameMap(context, colors);
export let currentFig = {};
let nextFig ={};
let queueFig =[];
//____________________________________________________________________________________________________

//______________________________Работа со звуком______________________________________________________
document.getElementById("mute").addEventListener("click", muteAudio);

let stageClearSound = new Audio('../sounds/07-stage-clear.mp3');
let gameSound = new Audio('../sounds/zvuk-tetrisa-na-konsoli.mp3');
let gameOverSound = new Audio('../sounds/08-game-over.mp3')
let audio = true;
gameSound.play();
gameSound.loop = true;
gameSound.volume= 0.4;
gameOverSound.volume = 0.4;
stageClearSound.volume = 0.4;

function muteAudio(){
    if(audio){
        gameSound.pause();
        audio = false;
    }else{
        gameSound.play();
        audio = true;
    }
}
//____________________________________________________________________________________________________

export function start(){
    randomFigGenerate();
    currentFig = JSON.parse(JSON.stringify(figure[queueFig.pop()]));
    fillNextFigCanvas();
    gameLoop();
}


function randomFigGenerate(){
    const nameFig = ['I','S','T','Z','L','O','J'];
    let len = nameFig.length;
    let rand;
    while(len){
        rand = Math.floor(Math.random() * 7);
        queueFig.push(nameFig[rand]);
        --len;
    }
}

function fillNextFigCanvas(clear){
    if(clear){
        minContext.fillStyle = "dimgray"
        minContext.fillRect(0, 0, 128, 128);
    }else {
        nextFig = figure[queueFig[queueFig.length - 1]];
        for (let x = 0; x < nextFig.bouns.length; ++x) {
            for (let y = 0; y < nextFig.bouns[x].length; ++y) {
                if (nextFig.bouns[y][x]) {
                    minContext.fillStyle = nextFig.color;
                    minContext.fillRect(x * 32, y * 32, 32 - 1, 32 - 1);
                }
            }
        }
    }
}


function gameOver(){
    cancelAnimationFrame(animation);
    gameSound.pause();
    gameOverSound.play();
    gameover = true;
    startGam = false
    //context.globalAlpha = 1;
    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.font = "48px serif";
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

function bestScroe(){
    if(score > users[users.length -1].score){
        users[users.length -1].score = score;
        localStorage.setItem('name',JSON.stringify(users));
        document.getElementById("bestScore").innerHTML = "Best score: " + users[users.length -1].score;
    }
}

function isFiledLine(){
    for(let x = gameScreen.tetrisMap.length -1;  x >= 0;){
        if(gameScreen.tetrisMap[x].every(elem => elem !== 0)){
            ++score;
            let dificult=5;
            if(score>dificult){
                gameSpeed -= 3;
                dificult += 5;

            }
            bestScroe();
            stageClearSound.play();
            document.getElementById("score").innerHTML = "Score: " + score;
            for (let xDeleter = x; xDeleter >= 0; xDeleter--) {
                for (let c = 0; c < gameScreen.tetrisMap[xDeleter].length; c++) {
                    gameScreen.tetrisMap[xDeleter][c] = gameScreen.tetrisMap[xDeleter-1][c];
                }
            }
        }else{
            --x;
        }
    }
}
function fallingFigures(){
    gameScreen.deleteOldFig(currentFig);
    currentFig.cords.y += 1;
    gameScreen.draw(currentFig);
}



document.getElementById("restart").addEventListener("click", restartGame);

export function gameLoop(){
    animation = requestAnimationFrame(gameLoop);

    ++frame;
    if(frame > gameSpeed){
        frame = 0;

        if(gameScreen.canPlace(currentFig)){
            fallingFigures(); //Опустить фигуру на 1
        }else{
            gameScreen.addFigure(currentFig); //добавляем фигуру на карту если коснулась
            isFiledLine();//если линия заполнена очистить
            gameScreen.refreshMap(colors);
            gameScreen.printMap(); //console.log(gameMap)
            for(let x = 0; x < gameScreen.tetrisMap[0].length; ++x){
                if(gameScreen.tetrisMap[0][x]) gameOver(); // если фигурв коснулась верха игра закончена
            }


            currentFig =  JSON.parse(JSON.stringify(figure[queueFig.pop()]));
            if(queueFig.length )randomFigGenerate(); //если в очереди заканчиваются фигуры сгенерировать новые
            fillNextFigCanvas(true); //Очистить экран со след. фигурой
            fillNextFigCanvas(); // Отрисовать новую след. фигурой


        }


    }

}

document.getElementById("aut").addEventListener("click", ()=>{history.go(-1)});


function restartGame(){
    cancelAnimationFrame(animation);
    window.location.reload();
}

