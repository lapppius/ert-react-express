import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import NowPlaying from "./NowPlaying";
import styles from "./Player.module.css";
import PlayerControls from "./PlayerControls";

// let audioContext = null;
let playPromise = undefined;

function initializeAudio(audioEl, audioContext, gainNode) {
  // pass audio element into the audio context
  const stream = audioContext.createMediaElementSource(audioEl);
  // const gainNode = audioContext.createGain();

  stream.connect(gainNode).connect(audioContext.destination);
}
let prevItem = undefined;
let prevPlayingID = undefined;

export default function Player() {
  const audioElement = useRef(null);
  const playerContext = usePlayer();
  const [time, setTime] = useState(undefined);
  const {
    color,
    playing,
    streamUrl,
    audioContext,
    curId,
    curRef,
    curName,
    nowPlaying,
    curImg,
    radiosList,
  } = playerContext.playerState;

  function setCurrentPlaying(id, img, audio, source, audioContext) {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    playerContext.playerDispatch({ type: "SET_PLAY", payload: id });
    playerContext.playerDispatch({ type: "SET_PLAY", payload: img });

    if (id === prevPlayingID && !audio.paused) return;

    audio.src = source;

    // Create an audio buffer source node.
    const audioBufferSource = audioContext.createBufferSource(
      2,
      audioContext.sampleRate * 3.0,
      audioContext.sampleRate
    );

    audio.load();
    playPromise = audio.play();

    prevPlayingID = id;
  }
  useEffect(() => {
    // if (streamUrl !== undefined) {
    setCurrentPlaying(
      curId,
      curImg,
      audioElement.current,
      streamUrl,
      audioContext
    );
    // }
  }, [streamUrl, curImg]);

  useEffect(() => {
    if (playing === true && streamUrl !== undefined) {
      // setCurrentPlaying(
      //   curId,
      //   curImg,
      //   audioElement.current,
      //   streamUrl,
      //   audioContext
      // );
    } else if (playing === false && streamUrl !== undefined) {
      audioElement.current.pause();
      audioContext.suspend();
    }
  }, [playing, curImg]);

  return (
    <div
      id={styles["player"]}
      className="player"
      style={{
        background: `${
          color != null
            ? `rgba(${color.Vibrant.getRgb().join(",")},0.15)`
            : "transparent"
        }`,
      }}
    >
      <NowPlaying />
      <audio
        onCanPlay={() => playerContext.playerDispatch({ type: "SET_PLAY" })}
        onWaiting={() => playerContext.playerDispatch({ type: "SET_WAITING" })}
        onPause={() => playerContext.playerDispatch({ type: "SET_PAUSE" })}
        onTimeUpdate={(e) => {
          setTime(e.target.currentTime);
        }}
        preload="none"
        id={styles["playerAudio"]}
        crossOrigin="anonymous"
        ref={audioElement}
      />
      <PlayerControls time={time} />
    </div>
  );
}
