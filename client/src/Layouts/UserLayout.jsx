import TopNavBar from '../components/TopNavBar';
import { usePlayer } from '../contexts/PlayerContext';
import { useContext } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

export default function UserLayout(props) {
  const playerContext = usePlayer();
  const { playing, curId } = playerContext.playerState;
  const location = useLocation();
  const show = window.location.pathname;
  return (
    <>
      <TopNavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
