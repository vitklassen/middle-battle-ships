import { useEffect, useRef } from 'react'
import Engine from '../Game/Engine'

export const Game = () => {
  const ref = useRef(null)
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
    <canvas id="canvas-element" ref={ref} width={1000} height={500}></canvas>
  )
}
