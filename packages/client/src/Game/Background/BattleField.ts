type Config = {
  context: CanvasRenderingContext2D
  width: number
  x: number
  y: number
}

export default class BattleField {
  private context: CanvasRenderingContext2D
  private width: number
  private height: number
  private xPos: number
  private yPos: number

  constructor(config: Config) {
    this.context = config.context
    this.width = config.width
    this.height = config.width
    this.xPos = config.x
    this.yPos = config.y
  }
  public draw() {
    this.context.beginPath()
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
  }
}
