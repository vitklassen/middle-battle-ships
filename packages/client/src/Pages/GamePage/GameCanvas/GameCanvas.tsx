import { useEffect, useMemo, useRef } from 'react';
import globalGameConfig from '../../../Game/globalGameConfig';
import { Engine } from '../../../Game';

export const GameCanvas = () => {
  const ref = useRef(null);
  const { width, height } = useMemo(() => {
    const {
      battleFieldWidth,
      distanceBetweenFields,
      startXPosition,
      startYPosition,
    } = globalGameConfig.sizeSettings;
    const width =
      2 * battleFieldWidth + distanceBetweenFields + 2 * startXPosition;
    const height = startYPosition + battleFieldWidth + distanceBetweenFields;
    return { width, height };
  }, []);
  useEffect(() => {
    const canvas = ref.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const engine = new Engine({
      context: ctx,
      canvas,
    });
    engine.start();
    return () => {
      engine.stop();
    };
  }, []);
  return <canvas id="canvas-element" ref={ref} width={width} height={height} />;
};
