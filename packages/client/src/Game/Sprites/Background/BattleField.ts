import globalGameConfig from '../../globalGameConfig';
import { fleetTemplate } from '../../utils/constants';
import { Ship } from '../Ships/Ship';
import { CommonSpritesConfig } from '../types';
import Cell from './Cell';
import Square from './Square';

const {
  battleFieldWidth,
  distanceBetweenFields,
  startXPosition,
  startYPosition,
  cellCount,
  horizontalAxis,
  vertivalAxis,
} = globalGameConfig.sizeSettings;

type TCurrentDraggingShip = {
  moveX: number
  moveY: number
  finishX?: number
  finishY?: number
  ship: Ship
  cellsInfo: Record<string, number | Cell>[] | null
}

export default class BattleField extends Square {
  private cells: Cell[][] = Array(cellCount).fill(null);

  private ships: Ship[] = [];

  private isDragging: boolean = false;

  private currentDraggingShip: null | TCurrentDraggingShip = null;

  public fleet: Set<number> = new Set();

  constructor(config: CommonSpritesConfig) {
    super(config);
  }

  public drawSprites(): void {
    this.draw();
    this.cells.forEach((cellsRow) => cellsRow.forEach((cell) => cell.draw()));
    this.ships.forEach((ship) => ship.draw());
  }

  public onMouseDown(x: number, y: number): void {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].checkMousePosition(x, y)) {
        this.isDragging = true;
        this.ships[i].clearShipCells();
        this.fleet.delete(this.ships[i].getShipId());
        this.currentDraggingShip = {
          moveX: x,
          moveY: y,
          ship: this.ships[i],
          cellsInfo: null,
        };
        return;
      }
    }
  }

  public onMouseMove(x: number, y: number): void {
    if (!this.isDragging || !this.currentDraggingShip) {
      return;
    }
    const { moveX, moveY, ship } = this.currentDraggingShip;
    const dx = x - moveX;
    const dy = y - moveY;

    ship.addDeltaPosition(dx, dy);
    this.currentDraggingShip.moveX = x;
    this.currentDraggingShip.moveY = y;
    const shipX = ship.getXPosition();
    const shipY = ship.getYPosition();
    const shipWidth = ship.getShipWidth();
    const shipSize = ship.getShipSize();
    const cellsInfo = [];
    for (let i = 0; i < cellCount; i++) {
      for (let j = 0; j < cellCount; j++) {
        if (this.cells[i][j].checkValidPosition(shipX, shipY, shipWidth)) {
          cellsInfo.push({ cell: this.cells[i][j], i, j });
        }
      }
    }
    if (cellsInfo.length === shipSize) {
      this.currentDraggingShip.finishX = cellsInfo[0].cell.getXPos();
      this.currentDraggingShip.finishY = cellsInfo[0].cell.getYPos();
      this.currentDraggingShip.cellsInfo = cellsInfo;
    } else {
      cellsInfo.forEach((cellInfo) => cellInfo.cell.setStateCell('notValid'));
      this.currentDraggingShip.finishX = undefined;
      this.currentDraggingShip.finishY = undefined;
      this.currentDraggingShip.cellsInfo = null;
    }
  }

  public onMouseOutAndUp(): void {
    if (!this.isDragging || !this.currentDraggingShip) {
      return;
    }
    const { ship } = this.currentDraggingShip;
    if (this.currentDraggingShip.finishX && this.currentDraggingShip.finishY) {
      ship.setNewPosition(
        this.currentDraggingShip.finishX,
        this.currentDraggingShip.finishY,
      );
      if (this.currentDraggingShip.cellsInfo) {
        ship.addShipCells(this.currentDraggingShip.cellsInfo, this.cells);
      }
      this.fleet.add(ship.getShipId());
    } else {
      const { startX, startY } = ship.getInitialPosition();
      ship.setNewPosition(startX, startY);
      this.fleet.delete(ship.getShipId());
    }
    this.isDragging = false;
    this.currentDraggingShip = null;
  }

  private draw(): void {
    this.context.strokeRect(this.xPos, this.yPos, this.width, this.height);
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '20px comics sans';
    const fixXpos = this.xPos - battleFieldWidth / (2 * cellCount);
    const fixYpos = this.yPos - battleFieldWidth / (2 * cellCount);
    let varXPos = this.xPos + battleFieldWidth / (2 * cellCount);
    let varYPos = this.yPos + battleFieldWidth / (2 * cellCount);
    for (let i = 0; i < 10; i++) {
      this.context.strokeText(horizontalAxis[i], varXPos, fixYpos);
      this.context.strokeText(vertivalAxis[i], fixXpos, varYPos);
      varXPos += battleFieldWidth / cellCount;
      varYPos += battleFieldWidth / cellCount;
    }
  }

  public initSprites(isEnemy: boolean): void {
    this.initCells(isEnemy);
    this.initShips(isEnemy);
  }

  private initCells(isEnemyCells: boolean): void {
    let xPos = startXPosition;
    let yPos = startYPosition;
    const dx = isEnemyCells ? distanceBetweenFields + battleFieldWidth : 0;
    let cellsRow;
    for (let i = 0; i < cellCount; i++) {
      cellsRow = Array(cellCount).fill(null);
      for (let j = 0; j < cellCount; j++) {
        const currentCell = new Cell(
          {
            context: this.context,
            width: battleFieldWidth / cellCount,
            height: battleFieldWidth / cellCount,
            x: xPos + dx,
            y: yPos,
          },
          false,
        );
        cellsRow[j] = currentCell;
        xPos += battleFieldWidth / cellCount;
      }
      this.cells[i] = cellsRow;
      xPos = startXPosition;
      yPos += battleFieldWidth / cellCount;
    }
  }

  private initShips(isEnemyShips: boolean): void {
    // const dx = isEnemyShips ? distanceBetweenFields + battleFieldWidth : 0
    this.ships = fleetTemplate.map(
      (shipTemplate) => new Ship(
        {
          context: this.context,
          x: shipTemplate.x,
          y: shipTemplate.y,
        },
        shipTemplate.type,
        shipTemplate.size,
        shipTemplate.id,
      ),
    );
  }
}
