import React, { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import MoviesAPI from '../MoviesAPI';
import s from './Cast.module.css';
// import PropTypes from 'prop-types';

/**
 * TODO i need to useState instead of useReducer
 */

function reducer(_, action) {
  return action;
}

function Cast(props) {
  const [state, dispatch] = useReducer(reducer, null);
  const { movieId } = useParams();
  const FetchAPI = useMemo(() => new MoviesAPI(), []);

  useEffect(() => {
    FetchAPI.getMovieCast(Number(movieId)).then(data => dispatch(data.cast));
  }, [FetchAPI, movieId]);

  return (
    <section className={s.castSection}>
      {state &&
        state.map(actor => {
          //   console.log(state); //why is it rerendering so often? is this fine?
          const posterAdress = `https://image.tmdb.org/t/p/original/${actor.profile_path}`;
          return (
            <div key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={posterAdress}
                  alt={actor.name || actor.original_name}
                  className={s.actorImg}
                />
              ) : (
                <div className={s.skeleton}>Image not found</div>
              )}
              <ul>
                <li>{actor.name || actor.original_name}</li>
                {actor.character && <p>'Character:' {actor.character}</p>}
              </ul>
            </div>
          );
        })}
    </section>
  );
}

// Cast.propTypes = {};

export default Cast;
