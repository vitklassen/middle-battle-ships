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
