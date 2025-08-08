import BattleField from './Background/BattleField'
import Cell from './Background/Cell'
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

export default class Engine {
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
    this.friendlyField.draw()
    this.enemyField.draw()
    this.friendlyCells.forEach(cell => cell.draw())
    this.enemyCells.forEach(cell => cell.draw())
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
    } else if (x < battleFieldWidth) {
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
    this.initBattleField()
    this.initCells()
  }
  private initBattleField(): void {
    this.friendlyField = new BattleField({
      context: this.context,
      width: battleFieldWidth,
      x: startXPosition,
      y: startYPosition,
    })
    this.enemyField = new BattleField({
      context: this.context,
      width: battleFieldWidth,
      x: startXPosition + distanceBetweenFields + battleFieldWidth,
      y: startYPosition,
    })
  }
  private initCells(): void {
    let xPos = startXPosition
    let yPos = startYPosition
    for (let i = 1; i <= cellSize * 10; i++) {
      const currentFriendlyCell = new Cell(
        {
          context: this.context,
          width: battleFieldWidth / 10,
          x: xPos,
          y: yPos,
        },
        false
      )
      const currentEnemyCell = new Cell(
        {
          context: this.context,
          width: battleFieldWidth / 10,
          x: xPos + distanceBetweenFields + battleFieldWidth,
          y: yPos,
        },
        false
      )
      this.friendlyCells.push(currentFriendlyCell)
      this.enemyCells.push(currentEnemyCell)
      if (i % 10 === 0) {
        xPos = startXPosition
        yPos += battleFieldWidth / 10
      } else {
        xPos += battleFieldWidth / 10
      }
    }
  }
}
