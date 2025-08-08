import styles from './Game.module.css'
import { useEffect, useMemo, useRef } from 'react'
import Engine from '../../Game/Engine'
import globalGameConfig from '../../Game/globalGameConfig'

export const Game = () => {
  const ref = useRef(null)
  const { width, height } = useMemo(() => {
    const {
      battleFieldWidth,
      distanceBetweenFields,
      startXPosition,
      startYPosition,
    } = globalGameConfig.sizeSettings
    const width =
      2 * battleFieldWidth + distanceBetweenFields + 2 * startXPosition
    const height = startYPosition + battleFieldWidth + distanceBetweenFields
    return { width, height }
  }, [])
  useEffect(() => {
    const canvas = ref.current as unknown as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (canvas && ctx) {
      const engine = new Engine({
        context: ctx,
        canvas: canvas,
      })
      engine.start()
    }
  }, [])
  return (
    <div className={styles.wrapper}>
      <canvas
        id="canvas-element"
        ref={ref}
        width={width}
        height={height}></canvas>
    </div>
  )
}
