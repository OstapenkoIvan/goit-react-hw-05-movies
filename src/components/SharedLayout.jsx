import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import s from './SharedLayout.module.css';
import { useMovie } from '../components/useContext';

/**
 * * "movies" OnClick resets previous search results.
 * * line 4,8,9,18(onCLick).
 * * If removed - search results will be saved.
 */

function SharedLayout() {
  const { setSearchList } = useMovie();
  const resetArr = () => setSearchList([]);

  return (
    <>
      <header className={s.header}>
        <nav className={s.navigation}>
          <NavLink to="/" className={s.navLink}>
            <span className={s.navText}>Home</span>
          </NavLink>
          <NavLink to="/movies" className={s.navLink} onClick={resetArr}>
            <span className={s.navText}>Movies</span>
          </NavLink>
        </nav>
      </header>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}

export default SharedLayout;
