import styles from './PlayerControls.module.css';
import PlayerButton from './PlayerButton';
import VolumeButton from './VolumeButton';
import CurrentTime from './CurrentTime';
import { useContext, useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { Link } from 'react-router-dom';
import * as Vibrant from 'node-vibrant';

export default function PlayerControls(props) {
  const [imgPalette, setImgPalette] = useState(null);
  const playerContext = usePlayer();
  const { playing, waiting, curSlug, curImg, color, curRef } =
    playerContext.playerState;

  const playIconPath =
    'M12 25Q11 25 11 24L11 12Q11 11 12 11L24 17Q25.5 18 24 19';
  const pauseIconPath =
    'M12 25Q11 25 11 24L11 12Q11 11 12 11L24 11Q25 11 25 12L25 24Q25 25 24 25';
  const waitingIcon =
    'M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50M30.9 50c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50';

  useEffect(() => {
    if (curImg !== undefined) {
      Vibrant.from(curImg)
        .getPalette()
        .then((palette) => {
          setImgPalette(palette);
        });
    }
  }, [curImg]);

  useEffect(() => {
    playerContext.playerDispatch({
      type: 'SET_COLOR',
      payload: imgPalette,
    });
  }, [imgPalette]);

  return (
    <div id={styles['controls']}>
      <div id={styles['artworkDuration']}>
        {curImg ? (
          <Link to={`/${curSlug}`}>
            <div id={styles['playerImage']}>
              {curImg ? <img src={curImg} height="50px" width="50px" /> : ''}
            </div>
          </Link>
        ) : (
          ''
        )}
        <CurrentTime time={props.time}/>
      </div>
      <div id={styles['mainControls']}>
        <PlayerButton
          type={'SET_CUR_REF'}
          payload={
            curRef !== undefined && curRef.previousElementSibling !== null
              ? curRef.previousElementSibling
              : curRef
          }
          loading={false}
          id="previousBtn"
          title="Προηγούμενο Ραδιόφωνο"
          icon="m12 13Q12 12 13 12h0Q14 12 14 13v11Q14 25 13 25h0Q12 25 12 24zm3.5 6 7.5 6Q24 25 24 24V13Q24 12 23 12z"
        />
        <PlayerButton
          type={'TOGGLE_PLAY'}
          id="playPauseBtn"
          icon={playing ? pauseIconPath : playIconPath}
          loading={waiting ? true : false}
          title={playing ? 'Παύση' : 'Αναπαραγωγή'}
        />
        <PlayerButton
          type={'SET_NEXT_RADIO'}
          payload={
            curRef !== undefined && curRef.nextElementSibling !== null
              ? curRef.nextElementSibling
              : curRef
          }
          loading={false}
          id="nextBtn"
          title="Επόμενο Ραδιόφωνο"
          icon="M13 24 20.5 18 13 12Q12 12 12 13V23Q12 24 13 24zM22 13v10q0 1 1 1Q24 24 24 23V13Q24 12 23 12q-1 0-1 1z"
        />
      </div>
      <div id={styles['sideControls']}>
        <VolumeButton />
      </div>
    </div>
  );
}
