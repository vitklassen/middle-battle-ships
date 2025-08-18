import { CommonSpritesConfig } from '../types'
import Square from './Square'

export default class Cell extends Square {
  public isClicked: boolean
  constructor(config: CommonSpritesConfig, isClicked: boolean) {
    super(config)
    this.isClicked = isClicked
  }
  public draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
    if (this.isClicked) {
      this.context.fillStyle = 'blue'
    } else {
      this.context.fillStyle = 'white'
    }
    this.context.fillRect(this.xPos, this.yPos, this.width, this.height)
  }
  public isInSquare(x: number, y: number): boolean {
    const isHorizontalMatch = x > this.xPos && x < this.xPos + this.width
    const isVerticalMatch = y > this.yPos && y < this.yPos + this.width
    if (isHorizontalMatch && isVerticalMatch) {
      this.isClicked = true
      return true
    }
    return false
  }
  public getWidth() {
    return this.width
  }
  public getXPos() {
    return this.xPos
  }
  public getYPos() {
    return this.yPos
  }
}
