import {
  useReducer,
  useContext,
  useEffect,
  useMemo,
  createContext,
} from "react";

const initialState = {
  curId: undefined,
  curSlug: undefined,
  prevId: undefined,
  nextId: undefined,
  color: undefined,
  curName: undefined,
  nowPlaying: undefined,
  curImg: undefined,
  streamUrl: undefined,
  prevStreamUrl: undefined,
  nextStreamUrl: undefined,
  playing: false,
  emptied: false,
  waiting: false,
  audioContext: null,
  gainNode: null,
  isMobile: false,
};
initialState.audioContext =
  new AudioContext() || window.AudioContext || window.webkitAudioContext;
initialState.gainNode = initialState.audioContext.createGain();
initialState.audioContext.suspend();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPTIED":
      console.log("emptied");
      return { ...state, playing: undefined, nowPlaying: undefined };
    case "SET_NAME":
      return { ...state, curName: action.payload };
    case "SET_NOW_PLAYING":
      return { ...state, nowPlaying: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_CUR_ID":
      return { ...state, curId: action.payload };
    case "SET_STREAM":
      return { ...state, streamUrl: action.payload };
    case "TOGGLE_PLAY":
      console.log("toggle_play");
      if (state.playing === false && state.streamUrl) {
        return { ...state, playing: true };
      } else {
        return { ...state, playing: false };
      }
    case "SET_PLAY":
      console.log("play");
      return { ...state, playing: true, waiting: false };
    case "SET_WAITING":
      console.log("waiting");
      return { ...state, waiting: true };
    case "SET_PAUSE":
      console.log("paused");
      return {
        ...state,
        playing: false,
        waiting: false,
      };
    // case 'TIMEUPDATE':
    //   return { ...state, time: action.payload };
    case "SET_CUR_IMG":
      return { ...state, curImg: action.payload };
    case "SET_NEXT_RADIO":
      return {
        ...state,
        nextStreamUrl: action.payload,
      };
    case "SET_IS_MOBILE":
      if (state.isMobile !== action.payload) {
        return { ...state, isMobile: action.payload };
      } else {
        return { ...state };
      }
    case "SET_CUR_SLUG":
      return { ...state, curSlug: action.payload };

    default:
      return {
        ...state,
      };
  }
};

const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}
export function PlayerProvider({ children }) {
  const [playerState, playerDispatch] = useReducer(reducer, initialState);
  const providerValue = useMemo(() => ({ playerState, playerDispatch }));

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      {
        entries[0].contentRect.width < 599
          ? playerDispatch({
              type: "SET_IS_MOBILE",
              payload: true,
            })
          : playerDispatch({
              type: "SET_IS_MOBILE",
              payload: false,
            });
      }
    });
    resizeObserver.observe(document.body);
  }, [document.body]);
  return (
    <PlayerContext.Provider value={providerValue}>
      {children}
    </PlayerContext.Provider>
  );
}
