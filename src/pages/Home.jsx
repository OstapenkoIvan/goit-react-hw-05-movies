import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import MoviesAPI from '../MoviesAPI';
import s from './Home.module.css';

function Home() {
  const [trends, setTrends] = useState([]);
  /**
   * TODO How to optimise fetching here? trending results in one session are the same. useRef for search results maybe?
   */
  const FetchAPI = useMemo(() => new MoviesAPI(), []);

  useEffect(() => {
    FetchAPI.getTrendingMovies().then(data => setTrends(data));
  }, [FetchAPI]);

  if (!trends.length) {
    return;
  }

  return (
    <>
      <h2>Trending today</h2>

      <ul className={s.list}>
        {trends.map(trend => {
          return (
            <Link to={`movies/${trend.id}`} key={trend.id}>
              <li>{trend.title || trend.name}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

// Home.propTypes = {};

export default Home;
