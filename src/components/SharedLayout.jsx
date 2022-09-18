import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import s from './SharedLayout.module.css';

function SharedLayout() {
  return (
    <>
      <header className={s.header}>
        <nav className={s.navigation}>
          <NavLink to="/" className={s.navLink}>
            <span className={s.navText}>Home</span>
          </NavLink>
          <NavLink to="/movies" className={s.navLink}>
            <span className={s.navText}>Movies</span>
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default SharedLayout;

/**
 * TODO make active button visible
 */
