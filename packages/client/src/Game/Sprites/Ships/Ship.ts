import { CommonSpritesConfig } from '../types'

export class Ship {
  protected x: number
  protected y: number
  protected width: number
  protected height: number
  protected image = new Image()
  protected context: CanvasRenderingContext2D

  constructor(config: CommonSpritesConfig, path: string) {
    const { x, y, width, height, context } = config
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = context
    this.image.src = path
  }

  public draw(): void {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
