import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../contexts/PlayerContext";
import { setImagesListPromise } from "../FetchFunctions";
import PlayingBars from "./Animations/EqualizerIcon";
import PlayPauseButton from "./PlayPauseButton";
import RadioImg from "./RadioImg";
import styles from "./RadiosListItem.module.css";

export default function RadiosListItem(props) {
  const playerContext = usePlayer();
  const { playing, waiting, curId, time, curImg } = playerContext.playerState;
  const liRef = useRef(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [loadedImgUrl, setImgUrl] = useState(undefined);

  useEffect(() => {
    if (props.id === curId && curImg !== props.logoURL) {
      playerContext.playerDispatch({
        type: "SET_CUR_IMG",
        payload: props.logoURL,
      });
    }
  }, []);

  return (
    <li
      tabIndex="0"
      ref={liRef}
      className={`${styles.radiosListItem} ${
        playing && curId === props.id ? `${styles.selected}` : ""
      }`}
      key={props.id}
      id={props.id}
    >
      <div className={styles.imageButtonContainer}>
        <RadioImg
          title={props.title}
          id={props.id}
          height="50px"
          width="50px"
          src={props.logoURL}
          style={"listImageContainer"}
        />
        <span className={waiting && props.id === curId ? styles.active : ""}>
          <PlayPauseButton
            id={props.id}
            streamUrl={props.streamUrl}
            title={props.title}
            slug={props.slug}
          />
        </span>
      </div>

      <Link to={`/${props.id != null ? props.slug : ""}`}>
        <p className={styles}>{props.title}</p>
      </Link>
      {playing && !waiting && time !== null && curId === props.id ? (
        <span className={styles.equalizerWrapper}>
          <PlayingBars />
        </span>
      ) : null}
    </li>
  );
}
