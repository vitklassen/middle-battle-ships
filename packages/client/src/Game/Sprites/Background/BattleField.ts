import { CommonSpritesConfig } from '../types'
import Square from './Square'

export default class BattleField extends Square {
  constructor(config: CommonSpritesConfig) {
    super(config)
  }
  public draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
  }
}
