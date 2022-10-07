import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Cast.module.css';
import { useMovie } from './useContext';
import CastItem from './CastItem';

function Cast(props) {
  const { searchList, getMovieCast } = useMovie();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieCast(Number(movieId));
  }, [getMovieCast, movieId]);

  if (!searchList.length) {
    return;
  }

  return (
    <section className={s.castSection}>
      {searchList.map(searchItem => {
        return <CastItem key={searchItem.id} props={searchItem} />;
      })}
    </section>
  );
}

export default Cast;
