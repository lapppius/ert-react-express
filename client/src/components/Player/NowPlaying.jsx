import { wait } from '@testing-library/user-event/dist/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './NowPlaying.module.css';

// function playerObserver(nowPlayingEl, nowWord) {
//     let id = null;
//     let flag = false;
//     let transform = null;
//     const observer = new ResizeObserver((entries) => {
//         transform = 0;
//         clearInterval(id);

//         if (
//             nowPlayingEl.current.offsetWidth +
//                 nowWord.current.offsetWidth +
//                 20 >=
//             document.body.offsetWidth
//         ) {
//             let pos = null;
//             let amount = null;
//             amount =
//                 nowPlayingEl.current.offsetWidth +
//                 nowWord.current.offsetWidth +
//                 20 -
//                 document.body.offsetWidth +
//                 1;
//             id = setInterval(
//                 frame,
//                 60 - nowPlayingEl.current.offsetWidth / 10 + 5
//             );
//             function frame() {
//                 if (flag === true && pos !== null) {
//                     // titleRef.current.style.transform =
//                     //     'translateX(-' + pos + 'px)';
//                         transform = -pos;
//                     setTimeout(() => {
//                         pos -= 0.5;
//                         if (pos === 0) flag = false;
//                     }, 4000);
//                 } else if (pos < amount) {
//                     // titleRef.current.style.transform =
//                     //     'translateX(-' + pos + 'px)';
//                     transform = -pos;
//                     pos += 0.5;
//                     if (pos >= amount) flag = true;
//                 }
//             }
//         }
//     });

//     observer.observe(nowPlayingEl.current);
//     observer.observe(document.body);
//     return transform;
// }

let nowPlayingID = undefined;
const nowPlayingError = 'Μη διαθέσιμο';
const NOW_PLAYING_API = 'https://proxy-ert.vercel.app/api/nowPlaying?id=';

function getNowPlayingTitle(prevPlayingID) {
  return new Promise((resolve, reject) => {
    fetch('wikisource.json', { cache: 'force-cache' })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        for (let r of res) {
          if (r.wikiID === prevPlayingID && r.wikiID !== undefined) {
            nowPlayingID = r.epgID;
          }
        }
        if (nowPlayingID !== null) {
          fetch(NOW_PLAYING_API + nowPlayingID)
            .then((response) => {
              return response.json();
            })
            .then((res) => {
              resolve(res.show);
            });
        } else {
          resolve(nowPlayingError);
        }
      });
  });
}

export default function NowPlaying() {
  const [nowPlayingTitle, setNowPlayingTitle] = useState(undefined);

  const nowPlayingEl = useRef();

  return (
    <>
      <h1 id={styles['nowPlaying']}>
        <div id={styles['nowPlayingTitleContainer']}>
          <div id={styles['nowPlayingTitle']}>
            <span
              ref={nowPlayingEl}
              className={nowPlayingTitle !== undefined ? styles.update : ''}
            >
              {nowPlayingTitle}
            </span>
          </div>
        </div>
      </h1>
      <h2 id={styles['nowPlayingDesc']}></h2>
    </>
  );
}
