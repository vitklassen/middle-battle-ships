import BattleField from './Sprites/Background/BattleField';
import globalGameConfig from './globalGameConfig';

type EngineConfig = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}

type GameStage = 'preparation' | 'play'

const {
  battleFieldWidth,
  distanceBetweenFields,
  startXPosition,
  startYPosition,
} = globalGameConfig.sizeSettings;

export class Engine {
  private context: CanvasRenderingContext2D;

  private canvas: HTMLCanvasElement;

  // private enemyField!: BattleField
  private friendlyField!: BattleField;

  private isGameOver = false;

  private gameStage: GameStage = 'preparation';

  constructor(config: EngineConfig) {
    this.context = config.context;
    this.canvas = config.canvas;
    // this.handleCellClick = this.handleCellClick.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOutAndUp = this.handleMouseOutAndUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.initSprites();
    this.initEventListeners();
  }

  public start(): void {
    const animationId = requestAnimationFrame(() => {
      this.start();
    });
    if (this.isGameOver) {
      cancelAnimationFrame(animationId);
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.friendlyField.drawSprites();
    // this.enemyField.drawSprites()
  }

  public stop(): void {
    this.deleteEventListeners();
    this.isGameOver = true;
  }

  private initEventListeners(): void {
    // this.canvas.addEventListener('click', this.handleCellClick)
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mouseup', this.handleMouseOutAndUp);
    this.canvas.addEventListener('mouseout', this.handleMouseOutAndUp);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  private deleteEventListeners(): void {
    // this.canvas.removeEventListener('click', this.handleCellClick)
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mouseup', this.handleMouseOutAndUp);
    this.canvas.removeEventListener('mouseout', this.handleMouseOutAndUp);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseOutAndUp(event: MouseEvent) {
    event.preventDefault();
    const position = this.detectField(event);
    if (position) {
      if (position.x < battleFieldWidth + startXPosition) {
        this.friendlyField.onMouseOutAndUp();
      } else {
        // this.enemyField.onMouseOutAndUp()
      }
    }
  }

  // private handleCellClick(event: MouseEvent): void {
  //   const position = this.detectField(event)
  //   if(position) {
  //     if(position.x < battleFieldWidth + startXPosition) {
  //       this.friendlyField.onChangeCellState(position.x, position.y)
  //     }
  //     else {
  //       this.enemyField.onChangeCellState(position.x, position.y)
  //     }
  //   }
  // }
  private handleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const position = this.detectField(event);
    if (position) {
      if (position.x < battleFieldWidth + startXPosition) {
        this.friendlyField.onMouseDown(position.x, position.y);
      } else {
        // this.enemyField.onMouseDown(position.x, position.y)
      }
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    event.preventDefault();
    const position = this.detectField(event);
    if (position) {
      if (position.x < battleFieldWidth + startXPosition) {
        this.friendlyField.onMouseMove(position.x, position.y);
      } else {
        // this.enemyField.onMouseMove(position.x, position.y)
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
    });
    // this.enemyField = new BattleField({
    //   context: this.context,
    //   width: battleFieldWidth,
    //   height: battleFieldWidth,
    //   x: startXPosition + distanceBetweenFields + battleFieldWidth,
    //   y: startYPosition,
    // })
    this.friendlyField.initSprites(false);
    // this.enemyField.initSprites(true)
  }

  private detectField(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (
      x >= battleFieldWidth + startXPosition &&
      x <= battleFieldWidth + startXPosition + distanceBetweenFields
    ) {
      return null;
    }
    return { x, y };
  }
}
