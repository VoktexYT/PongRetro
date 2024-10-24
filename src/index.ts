import Phaser from 'phaser';
import Ball from './ball';
import Platform from './platform';
import Score from './score';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const GRID_SPACING = 40;
const NUM_COL = Math.floor(WIDTH / GRID_SPACING);
const NUM_ROW = Math.floor(HEIGHT / GRID_SPACING);

const LINE_COLOR = 0xFF00FF;
const LINE_WIDTH = 1;
const LINE_ALPHA = 1;

class Game extends Phaser.Scene 
{
  BALL: Ball | undefined;
  PLATFORM: Platform | undefined;
  SCORE: Score | undefined;

  constructor() 
  {
    super({ key: 'Game' });
  }

  preload() 
  {
  }
  
  create() 
  {
    // Create background grid
    const graphics = this.add.graphics();

    for (let y = 0; y < NUM_ROW; y++) {
      graphics.lineStyle(LINE_WIDTH, LINE_COLOR, LINE_ALPHA);
      graphics.beginPath();
      graphics.moveTo(0, GRID_SPACING * y);
      graphics.lineTo(WIDTH, GRID_SPACING * y);
      graphics.strokePath();

      for (let x = 0; x < NUM_COL; x++) {
        graphics.lineStyle(LINE_WIDTH, LINE_COLOR, LINE_ALPHA);
        graphics.beginPath();
        graphics.moveTo(GRID_SPACING * x, 0);
        graphics.lineTo(GRID_SPACING * x, HEIGHT);
        graphics.strokePath();
      }
    }

    // Create ball
    this.SCORE = new Score(this, WIDTH);
    this.PLATFORM = new Platform(this, HEIGHT);
    this.BALL = new Ball(this, WIDTH, HEIGHT, this.PLATFORM, this.SCORE);
  }
  
  update(time: number, delta: number) 
  {
    this.BALL?.update_position(delta);
    this.PLATFORM?.update_position();
    this.SCORE?.update_position();
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: Game
};

const game = new Phaser.Game(config);
