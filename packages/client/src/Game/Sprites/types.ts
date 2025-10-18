export type ShipType =
  | 'mainShip'
  | 'aircraft'
  | 'cruiser'
  | 'submarine'
  | 'destroyer'

export type CommonSpritesConfig = {
  context: CanvasRenderingContext2D
  canvas?: HTMLCanvasElement
  width?: number
  height?: number
  x: number
  y: number
}

export type FleetTemplate = {
  type: ShipType
  size: number
  id: number
  x: number
  y: number
}
