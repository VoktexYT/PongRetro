import Phaser from "phaser";


export default class Score
{
    OBJ: Phaser.GameObjects.Text
    FONT_SIZE: number;
    score: number;

    constructor(private phaser_scene: Phaser.Scene, private screen_width: number)
    {
        this.FONT_SIZE = 54;
        this.OBJ = phaser_scene.add.text(0, 100, "0", {color: "#00FF00", fontSize: this.FONT_SIZE + 'px', fontFamily: "bold", align: 'center'})
        this.OBJ.setOrigin(0.5);
        this.score = 0;
    }

    update_position()
    {
        this.OBJ.setX(this.screen_width/2);
    }

    increase_score()
    {
        this.score++;
        this.OBJ.text = "" + this.score;
    }

}