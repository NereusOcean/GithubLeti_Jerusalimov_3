
export class GameMap{

    constructor(context, colors) {
        this.tetrisMap =[];
        this.scale = 32;
        this.context = context;
        this.colors = colors;
        for(let line = -2; line <= 20; ++line){
            this.tetrisMap[line] = [];
            for(let column = 0; column <10; ++column){
                this.tetrisMap[line][column] = 0;
            }
        }
    }

    addFigure(figure) {

        for(let yOffset = 0; yOffset<figure.bouns.length; ++yOffset){
            for(let xOffset = 0; xOffset<figure.bouns[0].length;++xOffset){
                if(figure.bouns[yOffset][xOffset]) {//Если там единица
                    let y = figure.cords.y+yOffset;
                    let x = figure.cords.x+xOffset;
                    this.tetrisMap[y][x] = figure.bouns[yOffset][xOffset];
                }
            }
        }
    }

    draw(figure){
        for(let yOffset = 0; yOffset<figure.bouns.length; ++yOffset) {
            for (let xOffset = 0; xOffset < figure.bouns[0].length; ++xOffset) {
                if (figure.bouns[yOffset][xOffset]) {//Если там единица
                    let y = figure.cords.y + yOffset;
                    let x = figure.cords.x + xOffset;
                    this.context.fillStyle = figure.color;
                    this.context.fillRect(x * this.scale, y * this.scale, this.scale - 1, this.scale - 1);
                }
            }
        }

    }

    canPlace(currentFig){

        for(let xOffset = 0; xOffset<currentFig.bouns.length; ++xOffset) {
            for (let yOffset = 0; yOffset < currentFig.bouns[0].length; ++yOffset) {
                let y = currentFig.cords.y + yOffset;
                let x = currentFig.cords.x + xOffset;

                if (currentFig.bouns[yOffset][xOffset] && (x < 0 || y+1  >= this.tetrisMap.length-1 || x >= this.tetrisMap[0].length || this.tetrisMap[y+1][x] )) {
                    //console.log("current.x: ", currentFig.cords.x ,"current.y: ", currentFig.cords.y ," offsetx: ", xOffset, "yOffset: ", yOffset);
                    //console.log(this.tetrisMap.length,this.tetrisMap[0].length);
                    return false;
                }

            }
        }
        return true;
    }

    refreshMap(){
        for(let y = 0; y < this.tetrisMap.length; ++y){
                for (let x = 0; x < this.tetrisMap[y].length; ++x) {
                    this.context.fillStyle = this.colors[this.tetrisMap[y][x]];
                    console.log(this.colors[this.tetrisMap[y][x]]);
                    this.context.fillRect(x * this.scale, y * this.scale, this.scale - 1, this.scale - 1);
                }
        }
    }

    clearMap(){
        for(let y = 0; y < this.tetrisMap.length; ++y) {
            for (let x = 0; x < this.tetrisMap[y].length; ++x) {
                this.tetrisMap[y][x] = 0;
                this.context.fillStyle = 'dimgray';
                this.context.fillRect(x * this.scale, y * this.scale, this.scale - 1, this.scale - 1);
            }
        }
    }

    printMap(){
        for(let y = 0; y < this.tetrisMap.length; ++y){
                  console.log(this.tetrisMap[y], " ");

        }
    }

    deleteOldFig(currentFig){

        for(let yOffset = 0; yOffset<currentFig.bouns.length; ++yOffset){
            for(let xOffset = 0; xOffset<currentFig.bouns[0].length;++xOffset){
                if(currentFig.bouns[yOffset][xOffset]) {//Если там единица
                    let y =currentFig.cords.y+yOffset;
                    let x =currentFig.cords.x+xOffset;

                    this.context.fillStyle = "dimgray"
                    this.context.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);

                }
            }
        }


    }


}