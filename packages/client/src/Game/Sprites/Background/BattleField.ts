import globalGameConfig from '../../globalGameConfig'
import { Ship } from '../Ships/Ship'
import { CommonSpritesConfig } from '../types'
import Cell from './Cell'
import Square from './Square'
import shipImage from '../../Sprites/Ships/ship.png'

const {
  battleFieldWidth,
  distanceBetweenFields,
  startXPosition,
  startYPosition,
  cellSize,
} = globalGameConfig.sizeSettings

export default class BattleField extends Square {
  private cells: Cell[] = []
  private ships: Ship[] = []

  constructor(config: CommonSpritesConfig) {
    super(config)
  }
  public drawSprites(): void {
    this.draw()
    this.cells.forEach(cell => cell.draw())
    this.ships.forEach(ship => ship.draw())
  }
  public changeCellState(x: number, y: number): void {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].isInSquare(x, y)) {
        break
      }
    }
  }
  private draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
  }
  public initSprites(isEnemy: boolean): void {
    this.initCells(isEnemy)
    this.initShips(isEnemy)
  }
  private initCells(isEnemyCells: boolean): void {
    let xPos = startXPosition
    let yPos = startYPosition
    const dx = isEnemyCells ? distanceBetweenFields + battleFieldWidth : 0
    for (let i = 1; i <= cellSize * 10; i++) {
      const currentCell = new Cell(
        {
          context: this.context,
          width: battleFieldWidth / 10,
          height: battleFieldWidth / 10,
          x: xPos + dx,
          y: yPos,
        },
        false
      )
      this.cells.push(currentCell)
      if (i % 10 === 0) {
        xPos = startXPosition
        yPos += battleFieldWidth / 10
      } else {
        xPos += battleFieldWidth / 10
      }
    }
  }
  private initShips(isEnemyShips: boolean): void {
    const dx = isEnemyShips ? distanceBetweenFields + battleFieldWidth : 0
    const ship = new Ship(
      {
        x: startXPosition + dx,
        y: startYPosition + battleFieldWidth + 20,
        width: (4 * battleFieldWidth) / 10,
        height: battleFieldWidth / 10,
        context: this.context,
      },
      shipImage
    )
    this.ships.push(ship)
  }
}
