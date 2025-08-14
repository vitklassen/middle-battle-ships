import BattleField from './Sprites/Background/BattleField'
import Cell from './Sprites/Background/Cell'
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
  cellSize,
} = globalGameConfig.sizeSettings

export class Engine {
  private context: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private enemyField!: BattleField
  private friendlyField!: BattleField
  private enemyCells: Cell[] = []
  private friendlyCells: Cell[] = []

  constructor(config: EngineConfig) {
    this.context = config.context
    this.canvas = config.canvas
    this.onCellClick = this.onCellClick.bind(this)
    this.initSprites()
    this.initEventsListener()
  }
  public start(): void {
    requestAnimationFrame(() => {
      this.start()
    })
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.friendlyField.drawSprites()
    this.enemyField.drawSprites()
  }
  private initEventsListener(): void {
    this.canvas.addEventListener('click', this.onCellClick)
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
      this.changeCellState(this.friendlyCells, x, y)
    } else {
      this.changeCellState(this.enemyCells, x, y)
    }
  }

  private changeCellState(cells: Cell[], x: number, y: number): void {
    for (let i = 0; i < cells.length; i++) {
      const cellXPos = cells[i].getXPos()
      const cellYPos = cells[i].getYPos()
      const cellWidth = cells[i].getWidth()
      const isHorizontalMatch = x > cellXPos && x < cellXPos + cellWidth
      const isVerticalMatch = y > cellYPos && y < cellYPos + cellWidth
      if (isHorizontalMatch && isVerticalMatch) {
        cells[i].isClicked = true
        break
      }
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
