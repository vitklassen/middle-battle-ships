import globalGameConfig from '../globalGameConfig'
import { FleetTemplate } from '../Sprites/types'

const { battleFieldWidth, cellCount, startXPosition, startYPosition } =
  globalGameConfig.sizeSettings

export const fleetTemplate: FleetTemplate[] = [
  {
    type: 'mainShip',
    size: 4,
    x: startXPosition,
    y: startYPosition + battleFieldWidth + 2 * cellCount,
    id: 1,
  },
  {
    type: 'aircraft',
    size: 5,
    x: startXPosition + battleFieldWidth / cellCount + 160,
    y: startYPosition + battleFieldWidth + 2 * cellCount,
    id: 2,
  },
  // {
  //   type: 'cruiser',
  //   size: 3,
  //   x: startXPosition,
  //   y: startYPosition + battleFieldWidth + 3 * cellCount,
  //   id: 3,
  // },
  // {
  //   type: 'submarine',
  //   size: 3,
  //   x: startXPosition + battleFieldWidth / cellCount,
  //   y: startYPosition + battleFieldWidth + 3 * cellCount,
  //   id: 4,
  // },
  // {
  //   type: 'destroyer',
  //   size: 2,
  //   x: startXPosition + 2 * (battleFieldWidth / cellCount),
  //   y: startYPosition + battleFieldWidth + 3 * cellCount,
  //   id: 5,
  // },
]
