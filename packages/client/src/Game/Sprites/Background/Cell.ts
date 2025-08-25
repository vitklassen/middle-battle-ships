import { CommonSpritesConfig } from '../types'
import Square from './Square'

enum CellState {
  EMPTY = 'green',
  NOTVALID = 'red',
  NEUTRAL = 'white',
  BUSY = 'gray',
}

export default class Cell extends Square {
  protected isClicked: boolean
  protected isEmpty: boolean = true
  protected cellState: string = CellState.NEUTRAL
  protected shipCount: number = 0

  constructor(config: CommonSpritesConfig, isClicked: boolean) {
    super(config)
    this.isClicked = isClicked
  }
  public draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height)
    this.context.fillStyle = this.cellState
    this.context.fillRect(this.xPos, this.yPos, this.width, this.height)
  }
  public checkValidPosition(x: number, y: number, width: number): boolean {
    const isHorizontalMatch = this.xPos >= x && this.xPos < x + width
    const isVerticalMatch = this.yPos >= y && this.yPos < y + this.height
    if (isHorizontalMatch && isVerticalMatch) {
      if (!this.isEmpty) {
        this.cellState = CellState.NOTVALID
        return false
      } else {
        this.cellState = CellState.EMPTY
        return true
      }
    } else if (!this.isEmpty) {
      this.cellState = CellState.BUSY
      return false
    } else {
      this.cellState = CellState.NEUTRAL
      return false
    }
  }
  public isInSquare(x: number, y: number): boolean {
    const isHorizontalMatch = x > this.xPos && x < this.xPos + this.width
    const isVerticalMatch = y > this.yPos && y < this.yPos + this.width
    if (isHorizontalMatch && isVerticalMatch) {
      this.isClicked = true
      return true
    }
    return false
  }
  public setStateCell(state: 'notValid' | 'empty' | 'neutral' | 'busy'): void {
    switch (state) {
      case 'notValid':
        this.cellState = CellState.NOTVALID
        break
      case 'empty':
        this.cellState = CellState.EMPTY
        this.isEmpty = true
        break
      case 'busy':
        this.cellState = CellState.BUSY
        this.shipCount++
        this.isEmpty = false
        break
      default:
        this.shipCount--
        if (this.shipCount <= 0) {
          this.cellState = CellState.NEUTRAL
          this.isEmpty = true
        }
        break
    }
  }
  public getEmptyProperty(): boolean {
    return this.isEmpty
  }
  public getWidth() {
    return this.width
  }
  public getXPos() {
    return this.xPos
  }
  public getYPos() {
    return this.yPos
  }
}
