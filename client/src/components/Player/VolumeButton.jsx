import { useContext, useEffect, useRef, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import styles from "./VolumeButton.module.css";

export default function VolumeButton() {
  const playerContext = usePlayer();
  const { gainNode, isMobile } = playerContext.playerState;
  // const sliderVolume = localStorage.getItem(sliderVolume);
  const volumeUpIcon =
    "M9 21 11 21Q12 21 13 22L16 25Q17 26 17 25L17 11Q17 10 16 11L13 14Q12 15 11 15L9 15Q8 15 8 16L8 20Q8 21 9 21ZM19 14 19 22C20.48 21.32 21.5 19.77 21.5 18 21.5 16.26 20.48 14.74 19 14ZM19 11.29C21.89 12.15 24 14.83 24 18 24 21.17 21.89 23.85 19 24.71L19 26.77C23.01 25.86 26 22.28 26 18 26 13.72 23.01 10.14 19 9.23L19 11.29Z";
  const volumeOffIcon =
    "m21.48 17.98c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51c.66-1.24 1.03-2.65 1.03-4.15 0-4.28-2.99-7.86-7-8.76v2.05c2.89.86 5 3.54 5 6.71zM9 9q-1 0-1.27 1.26l4.72 4.73H9Q8 15 8 16v4Q8 21 9 21H11Q12 21 13 22l3 3Q17 26 17 25v-6l4.25 4.25c-.67.52-1.428.966-2.256 1.258v2.121c1.38-.31 2.63-.95 3.69-1.81l2.04 2.05q1.27.27 1.27-1.27l-9-9-8-7.46zm8 2Q17 10 16 11l-1 1Q15 12 16 13l1 1z";
  const volumeDownIcon =
    "M8 21 11 21Q12 21 13 22L16 25Q17 26 17 25L17 11Q17 10 16 11L13 14Q12 15 11 15L9 15Q8 15 8 16L8 20Q8 21 9 21ZM19 14 19 22C20.48 21.32 21.5 19.77 21.5 18 21.5 16.26 20.48 14.74 19 14Z";

  const volumeContainerRef = useRef(null);
  const volumeRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const volumeSliderContainerRef = useRef(null);
  const volumeSliderOuterContainerRef = useRef(null);

  let mobileFlag = false;
  let initialVolume = 0.49;
  let initialMuted = false;
  if (localStorage.getItem("volume")) {
    initialVolume = JSON.parse(localStorage.getItem("volume")).volume;
    initialMuted = JSON.parse(localStorage.getItem("volume")).muted;
  }
  const [volumeValue, setVolumeValue] = useState(initialVolume);
  const [mutedValue, setMutedValue] = useState(initialMuted);
  const [volumeIcon, setVolumeIcon] = useState(volumeUpIcon);

  function volumeButton(e) {
    if (
      e.target !== volumeSliderRef.current &&
      e.target !== volumeSliderContainerRef.current &&
      e.target !== volumeSliderOuterContainerRef.current
    ) {
      if (isMobile) {
        if (volumeSliderRef.current.value == 0) {
          setVolumeValue(1);
          setMutedValue(false);
        } else {
          setVolumeValue(0);
          setMutedValue(true);
        }
      } else {
        if (volumeSliderRef.current.value == 0) {
          setVolumeValue(initialVolume);
          setMutedValue(false);
        } else {
          setVolumeValue(0);
          setMutedValue(true);
        }
      }
    }
  }

  function volumeSlider(e) {
    gainNode.gain.value = Math.cos((1.0 - e.target.value) * 0.5 * Math.PI);
    setVolumeValue(e.target.value);
    if (e.target.value == 0) {
      setMutedValue(true);
    } else {
      setMutedValue(false);
    }
  }

  useEffect(() => {
    const volumeData = {};
    gainNode.gain.value = volumeSliderRef.current.value = volumeValue;
    volumeData["muted"] = mutedValue;
    volumeData["volume"] = initialVolume;
    localStorage.setItem("volume", JSON.stringify(volumeData));

    if (volumeValue >= 0.05) {
      volumeData["volume"] = volumeValue;
    }

    if (mutedValue) {
      setVolumeValue(0);
    }

    //change icon based on volume value
    if (volumeValue == 0) {
      setVolumeIcon(volumeOffIcon);
    } else if (volumeValue < 0.5) {
      setVolumeIcon(volumeDownIcon);
    } else {
      setVolumeIcon(volumeUpIcon);
    }
  }, [volumeValue, mutedValue]);

  useEffect(() => {
    if (
      mobileFlag == false &&
      isMobile &&
      initialVolume > 0 &&
      initialVolume < 1
    ) {
      setVolumeValue(1);
      mobileFlag = true;
    }
  }, [isMobile]);

  return (
    <div
      id={styles["volumeControls"]}
      onClick={(e) => {
        volumeButton(e);
      }}
      ref={volumeContainerRef}
    >
      <button
        // onClick={VolumeButton}
        title={mutedValue ? "Επαναφορά Έντασης" : "Σίγαση ήχου"}
        ref={volumeRef}
        data-muted="false"
        id={styles["volume"]}
        aria-label="Κουμπί Σίγασης Ήχου"
      >
        <svg x="0px" y="0px" viewBox="0 0 36 36">
          <path d={volumeIcon} fill="#909090" />
        </svg>
      </button>
      <div
        id={styles["volumeSliderOuterContainer"]}
        ref={volumeSliderOuterContainerRef}
      >
        <div
          id={styles["volumeSliderContainer"]}
          ref={volumeSliderContainerRef}
        >
          <input
            title={`Ένταση ήχου ${Math.floor(volumeValue * 100)}%`}
            ref={volumeSliderRef}
            onChange={(e) => volumeSlider(e)}
            type="range"
            id={styles["volumeSlider"]}
            min="0"
            max="1"
            defaultValue={volumeValue}
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}
