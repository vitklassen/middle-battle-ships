import globalGameConfig from '../../globalGameConfig'
import { CommonSpritesConfig, ShipType } from '../types'
import mainShip from './image/mainShip.png'
import aircraftCarrier from './image/aircraftCarrier.png'
import cruiser from './image/cruiser.png'
import submarine from './image/mainShip.png'
import destroyer from './image/mainShip.png'
import Cell from '../Background/Cell'

const { cellCount, battleFieldWidth } = globalGameConfig.sizeSettings

export class Ship {
  protected x: number
  protected y: number
  protected initialX: number
  protected initialY: number
  protected width: number
  protected height: number
  protected image = new Image()
  protected context: CanvasRenderingContext2D
  protected size: number
  protected shipId: number
  private ownCells: Cell[] = []
  private environmentCells: Cell[] = []

  constructor(
    config: CommonSpritesConfig,
    type: ShipType,
    size: number,
    id: number
  ) {
    const { x, y, context } = config
    this.x = x
    this.y = y
    this.initialX = x
    this.initialY = y
    this.width = (size * battleFieldWidth) / cellCount
    ;(this.height = battleFieldWidth / cellCount), (this.context = context)
    this.size = size
    this.shipId = id
    this.setShipImage(type)
  }
  private setShipImage(type: string) {
    switch (type) {
      case 'mainShip':
        this.image.src = mainShip
        break
      case 'aircraft':
        this.image.src = aircraftCarrier
        break
      case 'cruiser':
        this.image.src = cruiser
        break
      case 'submarine':
        this.image.src = submarine
        break
      case 'destroyer':
        this.image.src = destroyer
        break
      default:
        break
    }
  }

  public draw(): void {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  public checkMousePosition(x: number, y: number): boolean {
    const leftBorder = this.x
    const rightBorder = this.x + this.width
    const topBorder = this.y
    const bottomBorder = this.y + this.height
    const isHorizontalMatch = x > leftBorder && x < rightBorder
    const isVerticalMatch = y > topBorder && y < bottomBorder
    if (isHorizontalMatch && isVerticalMatch) {
      return true
    }
    return false
  }
  public addShipCells(cellsInfo: Record<string, number | Cell>[], allCells: Cell[][]) {
    this.ownCells = cellsInfo.map(cellInfo => cellInfo.cell as Cell)
    this.fillEnvironmentCells(cellsInfo, allCells)
    this.ownCells.forEach(cell => cell.setStateCell('busy'))
    this.environmentCells.forEach(cell => cell.setStateCell('busy'))
  }
  private fillEnvironmentCells(cellsInfo: Record<string, number | Cell>[], allCells: Cell[][]): void {
    const rowIndex = cellsInfo[0].i as number
    const colLeftIndex = cellsInfo[0].j as number
    const colRightIndex = cellsInfo[cellsInfo.length - 1].j as number
    const topBorderIndex = rowIndex - 1 >= 0 ? rowIndex - 1: rowIndex
    const bottomBorderIndex = rowIndex + 1 < cellCount ? rowIndex + 1 : rowIndex
    const leftBorderIndex = colLeftIndex - 1 >= 0 ? colLeftIndex - 1 : colLeftIndex
    const rightBorderIndex = colRightIndex + 1 < cellCount ? colRightIndex + 1 : colRightIndex
    for (let i = topBorderIndex; i <= bottomBorderIndex; i++) {
      if(i === rowIndex) {
        if(leftBorderIndex < colLeftIndex) {
          this.environmentCells.push(allCells[i][leftBorderIndex])
        }
        if(rightBorderIndex > colRightIndex) {
          this.environmentCells.push(allCells[i][rightBorderIndex])
        }
        continue
      }
      for (let j = leftBorderIndex; j <= rightBorderIndex; j++) {
        this.environmentCells.push(allCells[i][j])
      }
    }
  }
  public clearShipCells(): void {
    this.ownCells.forEach(cell => cell.setStateCell('neutral'))
    this.environmentCells.forEach(cell => cell.setStateCell('neutral'))
    this.ownCells = []
    this.environmentCells = []
  }
  public getInitialPosition() {
    return { startX: this.initialX, startY: this.initialY }
  }
  public getXPosition(): number {
    return this.x
  }
  public getYPosition(): number {
    return this.y
  }
  public getShipSize(): number {
    return this.size
  }
  public getShipWidth(): number {
    return this.width
  }
  public getShipId(): number {
    return this.shipId
  }
  public setNewPosition(x: number, y: number): void {
    this.x = x
    this.y = y
  }
  public addDeltaPosition(x: number, y: number): void {
    this.x += x
    this.y += y
  }
}
