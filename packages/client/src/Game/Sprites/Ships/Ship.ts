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
  public isMouseInShip(x: number, y: number): boolean {
    const leftBorder = this.x
    const rightBorder = this.x + this.width
    const topBorder = this.y
    const bottomBorder = this.y + this.height
    const isHorizontalMatch = x > leftBorder && x < rightBorder
    const isVerticalMatch = y > topBorder && y < bottomBorder
    if(isHorizontalMatch && isVerticalMatch) {
      return true
    }
    return false
  }
  public setNewPosition(x: number, y: number): void {
    this.x += x
    this.y += y
  }
}
