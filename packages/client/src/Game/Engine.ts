import BattleField from './Sprites/Background/BattleField'
import Cell from './Sprites/Background/Cell'
import { Ship } from './Sprites/Ships/Ship'
import globalGameConfig from './globalGameConfig'
import shipImage from './Sprites/Ships/ship.png'

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
  private enemyShips: Ship[] = []
  private friendlyShips: Ship[] = []

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
    this.friendlyShips.forEach(ship => ship.draw())
    this.enemyShips.forEach(ship => ship.draw())
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
    this.initShips()
  }
  private initBattleField(): void {
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
  }
  private initCells(): void {
    let xPos = startXPosition
    let yPos = startYPosition
    for (let i = 1; i <= cellSize * 10; i++) {
      const currentFriendlyCell = new Cell(
        {
          context: this.context,
          width: battleFieldWidth / 10,
          height: battleFieldWidth / 10,
          x: xPos,
          y: yPos,
        },
        false
      )
      const currentEnemyCell = new Cell(
        {
          context: this.context,
          width: battleFieldWidth / 10,
          height: battleFieldWidth / 10,
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
  private initShips(): void {
    const enemyShip = new Ship(
      {
        x: startXPosition + distanceBetweenFields + battleFieldWidth,
        y: startYPosition + battleFieldWidth + 20,
        width: (4 * battleFieldWidth) / 10,
        height: battleFieldWidth / 10,
        context: this.context,
      },
      shipImage
    )
    const friendlyShip = new Ship(
      {
        x: startXPosition,
        y: startYPosition + battleFieldWidth + 20,
        width: (4 * battleFieldWidth) / 10,
        height: battleFieldWidth / 10,
        context: this.context,
      },
      shipImage
    )
    this.enemyShips.push(enemyShip)
    this.friendlyShips.push(friendlyShip)
  }
}
