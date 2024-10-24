import Phaser from "phaser"
import Platform from "./platform";
import Score from "./score";


function isCircleCollidingWithRectangle(
    circleX: number,
    circleY: number,
    radius: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
): boolean {
    let is_collide: boolean = (
        circleY > rectY-rectHeight &&
        circleY < rectY &&

        circleX+radius/2 > rectX-rectWidth/2 &&
        circleX-radius/2 < rectX+rectWidth/2
    );
    
    return is_collide;
}


export default class Ball
{
    COLOR: number;
    SIZE: number;
    ALPHA: number;
    OBJ: Phaser.GameObjects.Arc;
    
    position: {'x': number, 'y': number};
    speed: number;
    angle: number;


    constructor(private phaser_scene: Phaser.Scene, private screen_width: number, private screen_height: number, private platform: Platform, private score: Score)
    {
        this.COLOR = 0xFFFF00;
        this.SIZE = 20;
        this.ALPHA = 1;

        this.position = 
        {
            x: screen_width/2,
            y: screen_height/2,
        };

        this.speed = 500;
        this.angle = Math.random() * Math.PI * 2;

        this.phaser_scene = phaser_scene;

        this.OBJ = this.phaser_scene.add.circle(
            this.position.x,
            this.position.y,
            this.SIZE,
            this.COLOR,
            this.ALPHA
        )
    }

    update_position(delta: number)
    {
        const X = this.speed * (delta / 1000) * Math.cos(this.angle);
        const Y = this.speed * (delta / 1000) * Math.sin(this.angle);

        this.position.x += X;
        this.position.y += Y;

        if (this.position.x <= this.SIZE || this.position.x >= this.screen_width - this.SIZE) {
            this.angle = Math.PI - this.angle;
        }

        else if (this.position.y <= this.SIZE) {
            this.angle *= -1;
        }

        else if (isCircleCollidingWithRectangle(
            this.position.x, 
            this.position.y, 
            this.SIZE, 
            this.platform.x, 
            this.platform.Y, 
            this.platform.WIDTH,
            this.platform.HEIGHT
        ))
        {
            this.angle *= -1;
            this.score.increase_score()
        }

        else if (this.position.y >= this.screen_height)
        {
            alert("Game Over 8(");
            window.location.reload();
        }

        this.OBJ.setPosition(this.position.x, this.position.y);
    }


}