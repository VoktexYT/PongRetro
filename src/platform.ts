import Phaser from "phaser";


export default class Platform
{
    WIDTH: number;
    HEIGHT: number;
    COLOR: number;
    ALPHA: number;
    Y: number;
    OBJ: Phaser.GameObjects.Rectangle | undefined;

    x: number;

    constructor(private phaser_scene: Phaser.Scene, private screen_height: number)
    {
        this.WIDTH = 150;
        this.HEIGHT = 30;
        this.COLOR = 0xFF0000;
        this.ALPHA = 1;
        this.Y = screen_height - 30;

        this.x = 200;

        this.OBJ = this.phaser_scene.add.rectangle(this.x, this.Y, this.WIDTH, this.HEIGHT, this.COLOR, this.ALPHA);

    }

    update_position()
    {
        window.addEventListener("mousemove", (client) => {
            this.x = client.x;
        });

        window.addEventListener("pointermove", (client) => {
            this.x = client.x;
        });

        this.OBJ?.setPosition(this.x, this.Y)
    }
}