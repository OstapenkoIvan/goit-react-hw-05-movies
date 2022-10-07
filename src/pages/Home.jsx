import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

import s from './Home.module.css';
import { useMovie } from '../components/useContext';

function Home() {
  const { trend, getTrendingMovies } = useMovie();

  useEffect(() => {
    getTrendingMovies();
  }, [getTrendingMovies]);

  if (!trend.length) {
    return;
  }

  console.count('render-home'); // 2 рендера на старте, при возврате на домашнюю страницу 5-6 рендеров. Почему?

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
