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
  horizontalAxis,
  vertivalAxis
} = globalGameConfig.sizeSettings

type TCurrentDraggingShip = {
  startX: number,
  startY: number,
  ship: Ship
}

export default class BattleField extends Square {
  private cells: Cell[] = []
  private ships: Ship[] = []
  private isDragging: boolean = false
  private currentDraggingShip: null | TCurrentDraggingShip = null

  constructor(config: CommonSpritesConfig) {
    super(config)
  }
  public drawSprites(): void {
    this.draw()
    this.cells.forEach(cell => cell.draw())
    this.ships.forEach(ship => ship.draw())
  }
  public onMouseDown(x: number, y: number): void {
    for (let i = 0; i < this.ships.length; i++) {
      if(this.ships[i].isMouseInShip(x, y)) {
        this.isDragging = true
        this.currentDraggingShip = {
          startX: x,
          startY: y,
          ship: this.ships[i]
        }
        return
      }
    }
  }
  public onMouseMove(x: number, y: number): void {
    if(!this.isDragging || !this.currentDraggingShip) {
      return
    } 
    const {startX, startY, ship} = this.currentDraggingShip
    const dx = x - startX
    const dy = y - startY

    ship.setNewPosition(dx, dy)
    this.currentDraggingShip.startX = x
    this.currentDraggingShip.startY = y
  }
  public onMouseOutAndUp(): void {
    if(!this.isDragging || !this.currentDraggingShip) {
      return
    }
    this.isDragging = false
    this.currentDraggingShip = null
  }
  public onChangeCellState(x: number, y: number): void {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].isInSquare(x, y)) {
        return
      }
    }
  }
  private draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'
    this.context.font = "20px comics sans"
    const fixXpos = this.xPos - battleFieldWidth / 20
    const fixYpos = this.yPos - battleFieldWidth / 20
    let varXPos = this.xPos + (battleFieldWidth / 20)
    let varYPos = this.yPos + (battleFieldWidth / 20)
    for (let i = 0; i < 10; i++) {
      this.context.strokeText(horizontalAxis[i], varXPos, fixYpos)
      this.context.strokeText(vertivalAxis[i], fixXpos, varYPos)
      varXPos += battleFieldWidth / 10
      varYPos += battleFieldWidth / 10
    }
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
