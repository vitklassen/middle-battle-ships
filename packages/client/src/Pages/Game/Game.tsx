import { useEffect, useMemo, useRef } from 'react';
import styles from './Game.module.css';
import { Engine } from '../../Game';
import globalGameConfig from '../../Game/globalGameConfig';

export const Game = () => {
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
  return (
    <div className={styles.wrapper}>
      <canvas id="canvas-element" ref={ref} width={width} height={height} />
    </div>
  );
};
