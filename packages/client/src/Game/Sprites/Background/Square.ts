import { CommonSpritesConfig } from '../types';

export default class Square {
  protected context: CanvasRenderingContext2D;

  protected width: number;

  public height: number;

  public xPos: number;

  public yPos: number;

  constructor(config: CommonSpritesConfig) {
    this.context = config.context;
    this.width = config.width || 0;
    this.height = config.height || 0;
    this.xPos = config.x;
    this.yPos = config.y;
  }
}
