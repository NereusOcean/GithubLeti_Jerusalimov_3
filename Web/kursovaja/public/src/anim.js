
export class Animation{

    constructor(object,width,height){
        this.width = width;
        this.height = height;
        this.typeObject = object;
        this.currentAnimPos = {};
    }


    nextFrame(direction){
        if(direction === "stay") {this.currentAnimPos = {"x": 0-32,"y":0-32}; return;}
        if(direction === "left") {this.currentAnimPos = {"x": this.height-32,"y":this.width-32}; return;}
        if(direction === "right") {this.currentAnimPos = {"x": this.height,"y":this.width}; return;}
    }

    getCurrentAnimPos(){
        return this.currentAnimPos;
    }

}