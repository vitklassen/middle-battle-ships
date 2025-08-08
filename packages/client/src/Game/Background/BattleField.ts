import Square from './Square'
import { type BackgroundSpriteConfig } from './types'

export default class BattleField extends Square {
  constructor(config: BackgroundSpriteConfig) {
    super(config)
  }
  public draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
  }
}
