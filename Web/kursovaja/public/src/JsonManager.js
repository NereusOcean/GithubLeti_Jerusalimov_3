
export class level{

    constructor(levelNum) {

        $.post("/json", {"data": levelNum}).then(res => {
            console.log("FUCK YOU ....")
            localStorage.setItem(`jsonMap${levelNum}`,res);
        });
        this.Level = JSON.parse(localStorage.getItem(`jsonMap${levelNum}`));
        this.layer = this.getLayers();
        this.tileSet = this.getTileset();
        this.height = this.Level['height'];
        this.width = this.Level["width"];
        this.sizeTileSet = this.Level["tileheight"]; //32x32
        console.log(this.sizeTileSet)

    }



    getLayers(){
        let layers = this.Level["layers"];
        layers.sort((a,b) =>{
           return a.id - b.id; //sort by first letter in name layer 0 - b 1 - f u -2
        });
        return({
            "backGround": layers[0],
            "front": layers[1],
            "collisionMap": layers[3],
            "platformNight": layers[4],
            "platformGreen": layers[5],
            "user": layers[2],
            "enemy": layers[6]

        });
    }

    getTileset(){
        let tilesets = [{}];
        tilesets["front"] = this.Level["tilesets"][0];
        tilesets["user"] = this.Level["tilesets"][1];
        return tilesets;
    }


}
