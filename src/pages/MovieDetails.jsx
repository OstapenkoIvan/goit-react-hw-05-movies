import React, { useEffect, useMemo, useReducer } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import MoviesAPI from '../MoviesAPI';
import s from './MovieDetails.module.css';
import BackLink from '../components/BackLink';
// import PropTypes from 'prop-types';

/**
 * TODO how do i stop rendering main section while pressing cast/reviews?
 * TODO make external state component
 * TODO make common container component
 * TODO 429 error when 'cast' is opened
 */

function reducer(movie, action) {
  return action;
}

function MovieDetails({ state }) {
  const [movie, dispatch] = useReducer(reducer, {});
  const { movieId } = useParams();
  const FetchAPI = useMemo(() => new MoviesAPI(), []);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    FetchAPI.getMovieById(Number(movieId)).then(data => dispatch(data));
  }, [FetchAPI, movieId]);

  if (!Object.keys(movie).length) {
    return;
  }

  const {
    title,
    name,
    overview,
    release_date,
    vote_average,
    genres,
    poster_path,
  } = movie;

  const movieAdress = `https://image.tmdb.org/t/p/original${poster_path}`;
  const movieScore = Math.round(vote_average * 10) + '%';
  const movieDate = new Date(release_date);
  const movieGenres = genres?.map(gen => gen.name).join(' ');

  return (
    <>
      <BackLink to={backLinkHref}>Go Back</BackLink>
      <section className={s.mainSection}>
        <img src={movieAdress} alt="" width={200} />
        <div className={s.secSection}>
          <p className={s.movieTitle}>
            {title || name}({movieDate.getFullYear()})
          </p>
          <p>User score: {movieScore}</p>
          <p className={s.movieOverview}>Overview</p>
          <p>{overview}</p>
          <p className={s.movieGenre}>Genres</p>
          <p>{movieGenres}</p>
        </div>
      </section>

      <section className={s.addInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </section>

      <Outlet />
    </>
  );
}

// MovieDetails.propTypes = {};

export default MovieDetails;
