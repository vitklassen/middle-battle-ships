import { useEffect, useMemo, useRef } from 'react';
import styles from './Game.module.css';
import { Engine } from '../../Game';
import globalGameConfig from '../../Game/globalGameConfig';
import { Header } from '../../Components/Header';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { useCanvasFullscreen } from '../../hooks/useCanvasFullscreen';
import { Button } from '../../Common/Blocks/Button';

export const Game = authorizationChecker(() => {
  const ref = useRef(null);
  const { isFullscreen, toggleFullscreen } = useCanvasFullscreen(ref);

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

  // Обработчик клавиши F для полноэкранного режима
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFullscreen();
      }

      if (event.key === 'Escape' && isFullscreen) {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, toggleFullscreen]);

  return (
    <>
      {isFullscreen ? undefined : <Header /> }
      <main className={styles.wrapper}>
        {isFullscreen ? undefined : (
          <Button
            onClick={toggleFullscreen}
            className={styles.fullscreenButton}
          >
            Полноэкранный режим
          </Button>
        )}
        <div className={styles.canvasContainer}>
          <canvas
            id="canvas-element"
            ref={ref}
            width={width}
            height={height}
            className={styles.canvas}
          />
        </div>
      </main>
    </>
  );
});
