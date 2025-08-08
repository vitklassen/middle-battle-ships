import { BackgroundSpriteConfig } from './types'

export default class Square {
  protected context: CanvasRenderingContext2D
  protected width: number
  public height: number
  public xPos: number
  public yPos: number

  constructor(config: BackgroundSpriteConfig) {
    this.context = config.context
    this.width = config.width
    this.height = config.width
    this.xPos = config.x
    this.yPos = config.y
  }
}
