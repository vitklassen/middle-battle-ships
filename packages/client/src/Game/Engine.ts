import BattleField from './Sprites/Background/BattleField'
import globalGameConfig from './globalGameConfig'

type EngineConfig = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}

const {
  battleFieldWidth,
  distanceBetweenFields,
  startXPosition,
  startYPosition,
} = globalGameConfig.sizeSettings

export class Engine {
  private context: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private enemyField!: BattleField
  private friendlyField!: BattleField
  private isGameOver = false

  constructor(config: EngineConfig) {
    this.context = config.context
    this.canvas = config.canvas
    this.onCellClick = this.onCellClick.bind(this)
    this.initSprites()
    this.initEventsListener()
  }
  public start(): void {
    if (this.isGameOver) {
      return
    }
    requestAnimationFrame(() => {
      this.start()
    })
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.friendlyField.drawSprites()
    this.enemyField.drawSprites()
  }
  public stop(): void {
    this.deleteEventsListener()
    this.isGameOver = true
  }
  private initEventsListener(): void {
    this.canvas.addEventListener('click', this.onCellClick)
  }
  private deleteEventsListener(): void {
    this.canvas.removeEventListener('click', this.onCellClick)
  }
  private onCellClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (
      x >= battleFieldWidth &&
      x <= battleFieldWidth + distanceBetweenFields
    ) {
      return
    }
    if (x < battleFieldWidth) {
      this.friendlyField.changeCellState(x, y)
    } else {
      this.enemyField.changeCellState(x, y)
    }
  }

  private initSprites(): void {
    this.friendlyField = new BattleField({
      context: this.context,
      width: battleFieldWidth,
      height: battleFieldWidth,
      x: startXPosition,
      y: startYPosition,
    })
    this.enemyField = new BattleField({
      context: this.context,
      width: battleFieldWidth,
      height: battleFieldWidth,
      x: startXPosition + distanceBetweenFields + battleFieldWidth,
      y: startYPosition,
    })
    this.friendlyField.initSprites(false)
    this.enemyField.initSprites(true)
  }
}
