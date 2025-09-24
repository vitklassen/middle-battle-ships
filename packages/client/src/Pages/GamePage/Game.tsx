import { useEffect, useRef, useState } from 'react';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { useCanvasFullscreen } from '../../hooks/useCanvasFullscreen';
import { Button } from '../../Common/Blocks/Button';
import { StartGameScreen } from './StartGameScreen';
import { GameCanvas } from './GameCanvas';
import { Header } from '../../Components/Header';
import styles from './Game.module.css';
import leaderBoardApi from '../../api/leaderBoardApi';
import { useSelector } from '../../Store';
import { initPage, PageInitArgs, usePage } from '../../Router';

export const initGamePage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const GamePage = authorizationChecker(() => {
  usePage({ initPage: initGamePage });

  const ref = useRef(null);
  const profile = useSelector((state) => state.profile.value);

  const { isFullscreen, toggleFullscreen } = useCanvasFullscreen(ref);
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Эффект для размонтирования
  useEffect(
    () => () => {
      if (!profile) {
        return;
      }

      const {
        firstName, id, avatar, email, lastName,
      } = profile;

      // пока тестовые данные
      leaderBoardApi.addUserToLeaderBoard({
        data: {
          firstName,
          id,
          avatar,
          email,
          lastName,
          otherField: 315,
        },
        ratingFieldName: 'otherField',
        teamName: 'wolves',
      });
    },
    [],
  );

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
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullscreen, toggleFullscreen]);

  return (
    <>
      {isFullscreen ? undefined : <Header />}
      <main className={styles.wrapper} ref={ref}>
        {isFullscreen ? undefined : (
          <Button
            onClick={toggleFullscreen}
            className={styles.fullscreenButton}
          >
            Полноэкранный режим
          </Button>
        )}
        {isGameStarted ? (
          <GameCanvas />
        ) : (
          <StartGameScreen onStartGameClick={() => setIsGameStarted(true)} />
        )}
      </main>
    </>
  );
});
