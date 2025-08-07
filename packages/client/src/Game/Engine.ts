import BattleField from './Background/BattleField'

type EngineConfig = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}

export default class Engine {
  private context: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private enemyField!: BattleField
  private friendlyField!: BattleField

  constructor(config: EngineConfig) {
    this.context = config.context
    this.canvas = config.canvas
    this.init()
  }
  public start(): void {
    requestAnimationFrame(() => {
      this.start()
    })
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.friendlyField.draw()
    this.enemyField.draw()
    console.log('go')
  }
  private init(): void {
    this.friendlyField = new BattleField({
      context: this.context,
      width: 400,
      x: 0,
      y: 0,
    })
    this.enemyField = new BattleField({
      context: this.context,
      width: 400,
      x: 600,
      y: 0,
    })
  }
}
