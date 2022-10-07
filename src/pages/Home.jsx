import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

import s from './Home.module.css';
import { useMovie } from '../components/useContext';

/**
 * TODO How to optimized fetching here? trending results in one session are the same. useRef for search results maybe?
 */

function Home() {
  const { trend, getTrendingMovies } = useMovie();

  useEffect(() => {
    getTrendingMovies();
  }, []); //if you add dependency "getTrendingMovies" it keeps fetching. why?; useCallback?

  if (!trend.length) {
    return;
  }

  return (
    <Container>
      <h2>Trending today</h2>

      <ul className={s.list}>
        {trend.map(({ id, title, name }) => {
          return (
            <li key={id}>
              <Link to={`movies/${id}`}>{title || name}</Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default Home;
