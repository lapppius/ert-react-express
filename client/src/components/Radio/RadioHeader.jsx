import styles from "./RadioHeader.module.css";
import PlayPauseButton from "../PlayPauseButton";
import ShareButton from "../ShareButton";
import RadioImg from "../RadioImg";
import * as Vibrant from "node-vibrant";
import { useEffect, useRef, useState, useContext } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { Skeleton } from "@mui/material";

export default function RadioHeader(props) {
  const playerContext = usePlayer();
  const { curId, curImg } = playerContext.playerState;
  const [imgPalette, setImgPalette] = useState(null);

  const wikiSummaryRef = useRef(null);
  const descriptionContainerRef = useRef(null);

  useEffect(() => {
    if (props.id === curId && curImg !== props.logoURL) {
      playerContext.playerDispatch({
        type: "SET_CUR_IMG",
        payload: props.logoURL,
      });
    }
  }, []);

  useEffect(() => {
    if (props.logoURL) {
      Vibrant.from(props.logoURL)
        .getPalette()
        .then((palette) => {
          if (setImgPalette) setImgPalette(palette);
        })
        .catch((error) => {
          console.error("Error extracting palette:", error);
          // Handle error if necessary
        });
    }
  }, [props.logoURL]);

  return (
    <section
      className={styles.radioHeaderContainer}
      style={{
        background: `${
          imgPalette != null
            ? `linear-gradient(185deg, rgba(${imgPalette.LightVibrant.getRgb().join(
                ","
              )},1) 0%,rgba(${imgPalette.Vibrant.getRgb().join(",")},1) 50%
                          ,rgba(${imgPalette.DarkVibrant.getRgb().join(
                            ","
                          )},1) 100%)`
            : `linear-gradient(250deg, #6e6e6e, #171717)`
        } `,
      }}
    >
      <header>
        <div className={styles.headerText}>
          <h1>
            {!props.name ? (
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  variant: "rounded",
                  width: "13rem",
                  animation: "wave",
                }}
              />
            ) : (
              props.name
            )}
          </h1>
        </div>

        <RadioImg
          title={props.name}
          id={props.id}
          src={props.logoURL}
          height="180px"
          width="180px"
          style="radioLogoContainer"
          borderColor={
            imgPalette != null
              ? imgPalette.LightVibrant.getRgb().join(",")
              : "black"
          }
        />
        <div className={styles.headerButtons}>
          <PlayPauseButton
            style="radioPlayButton"
            id={props.id}
            streamUrl={props.streamURL}
            title={props.title}
          />
          <ShareButton {...props} />
        </div>
        <div className={styles.radioDescription} ref={descriptionContainerRef}>
          {props.wikiSum.sumContent ? (
            <>
              <p className={styles.wikiSummary} ref={wikiSummaryRef}>
                {props.wikiSum.sumContent}
                {props.wikiSum.isWiki == null ? (
                  ""
                ) : props.wikiSum.isWiki == true ? (
                  <a
                    className={styles.wikiLink}
                    target="_blank"
                    title={`Λήμμα της Βικιπαίδειας για ${props.title}`}
                    href={`https://el.wikipedia.org/wiki/${encodeURI(
                      props.title
                    )}`}
                  >
                    Βικιπαίδεια
                  </a>
                ) : (
                  <a
                    className={styles.wikiLink}
                    target="_blank"
                    title={`Λήμμα της Βικιπαίδειας για ${props.title}`}
                    href={`https://wikidata.org/wiki/${encodeURI(props.id)}`}
                  >
                    Wikidata
                  </a>
                )}
              </p>
            </>
          ) : (
            <div>
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  variant: "rounded",
                  height: "1.5rem",
                  width: "22rem",
                  animation: "wave",
                }}
              />
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  variant: "rounded",
                  height: "1.5rem",
                  width: "13rem",
                  animation: "wave",
                }}
              />
            </div>
          )}
        </div>
      </header>
    </section>
  );
}
