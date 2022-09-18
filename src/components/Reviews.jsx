import React, { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import MoviesAPI from '../MoviesAPI';
import s from './Reviews.module.css';
// import PropTypes from 'prop-types';

/**
 * TODO i need to useState instead of useReducer
 */

function reducer(_, action) {
  return action;
}

function Reviews(props) {
  const [state, dispatch] = useReducer(reducer, null);
  const { movieId } = useParams();
  const FetchAPI = useMemo(() => new MoviesAPI(), []);

  useEffect(() => {
    FetchAPI.getMovieReviews(Number(movieId)).then(
      data => data.total_results && dispatch(data.results)
    );
  }, [FetchAPI, movieId]);

  if (!state) {
    return <p>We dont have any reviews on this movie! :(</p>;
  }

  return (
    <section>
      <ul>
        {state.map(review => {
          return (
            <li key={review.id}>
              <p className={s.author}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// Reviews.propTypes = {};

export default Reviews;
