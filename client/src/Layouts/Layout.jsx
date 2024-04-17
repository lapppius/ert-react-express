import TopNavBar from "../components/TopNavBar";
import Player from "../components/Player/Player";
import { usePlayer } from "../contexts/PlayerContext";
import { useContext, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

export function Layout(props) {
  const playerContext = usePlayer();
  const { playing, curId } = playerContext.playerState;
  const location = useLocation();
  const show = window.location.pathname;

  return (
    <>
      <Outlet />
      {show === "/" || playing || curId ? <Player /> : undefined}
    </>
  );
}
