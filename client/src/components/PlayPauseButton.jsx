import styles from './PlayPauseButton.module.css';
import { usePlayer } from '../contexts/PlayerContext';
import { useContext } from 'react';

export default function PlayPauseButton(props) {
  const playerContext = usePlayer();
  const { playing, waiting, curId, curSlug, streamUrl, time } =
    playerContext.playerState;
  const playIconPath =
    'M12 25Q11 25 11 24L11 12Q11 11 12 11L24 17Q25.5 18 24 19';
  const pauseIconPath =
    'M12 25Q11 25 11 24L11 12Q11 11 12 11L24 11Q25 11 25 12L25 24Q25 25 24 25';
  const loadingIconPath =
    'M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z';
  const getProps = () => {
    playerContext.playerDispatch({
      type: 'SET_STREAM',
      payload: props.streamUrl,
    });
    playerContext.playerDispatch({
      type: 'SET_CUR_ID',
      payload: props.id,
    });

    playerContext.playerDispatch({
      type: 'SET_NAME',
      payload: props.title,
    });
    playerContext.playerDispatch({
      type: 'SET_CUR_SLUG',
      payload: props.slug,
    });

    if (curId === props.id && props.streamUrl) {
      playerContext.playerDispatch({ type: 'TOGGLE_PLAY' });
    }
    if (curId !== props.id) {
      playerContext.playerDispatch({ type: 'SET_EMPTIED' });
    }
  };
  return (
    <button
      onClick={() => getProps()}
      className={`${styles.button} ${styles[props.style]}`} //
      title={playing && curId === props.id ? 'Παύση' : 'Αναπαραγωγή'}
      aria-label={props.title}
    >
      {waiting && curId === props.id ? (
        <svg
          version="1.1"
          id="L4"
          x="0px"
          y="0px"
          viewBox="0 0 36 36"
          enableBackground="new 0 0 0 0"
        >
          <circle fill="#fff" stroke="none" cx="10" cy="18" r="2">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill="#fff" stroke="none" cx="18" cy="18" r="2.5">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill="#fff" stroke="none" cx="26" cy="18" r="2">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      ) : (
        <svg x="0px" y="0px" viewBox="0 0 36 36">
          <path
            d={
              playing && !waiting && time !== null && curId === props.id
                ? pauseIconPath
                : playIconPath
            }
            fill="white"
          />
        </svg>
      )}
    </button>
  );
}
