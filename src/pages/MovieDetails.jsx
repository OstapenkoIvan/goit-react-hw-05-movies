import { useEffect, Suspense } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import s from './MovieDetails.module.css';
import BackLink from '../components/BackLink';
import Container from '../components/Container';

import { useMovie } from '../components/useContext';

/**
 * TODO how do i stop rendering main section while pressing cast/reviews?
 * ! 429 error when 'cast' is opened
 * ! When you click different movies, you can briefly see prev poster
//  * TODO make external state component
//  * ? Is reducer necessary? How to change it to useState
//  * TODO make common container components
//  * ! after opening cast or reviews 'go back button' sends to "home", not search results
 */

function MovieDetails({ state }) {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const { getMovieById, searchValue } = useMovie();

  useEffect(() => {
    getMovieById(movieId);
  }, [movieId]); //if you add dependancy "getTrendingMovies" it keeps fetching. why?;

  if (!Object.keys(searchValue).length) {
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
  } = searchValue;

  const movieAdress = `https://image.tmdb.org/t/p/original${poster_path}`;
  const movieScore = Math.round(vote_average * 10) + '%';
  const movieDate = new Date(release_date);
  const movieGenres = genres?.map(gen => gen.name).join(' ');

  return (
    <Container>
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
            <Link to="cast" state={{ from: backLinkHref }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkHref }}>
              Reviews
            </Link>
          </li>
        </ul>
      </section>
      <Suspense>
        <Outlet />
      </Suspense>
    </Container>
  );
}

export default MovieDetails;

//*Its bad method with reducer and own state.

// import { useEffect, useMemo, useReducer, Suspense } from 'react';
// import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
// import MoviesAPI from '../MoviesAPI';
// import s from './MovieDetails.module.css';
// import BackLink from '../components/BackLink';
// import Container from '../components/Container';

// /**
//  * TODO how do i stop rendering main section while pressing cast/reviews?
//  * TODO make external state component
//  * ? Is reducer necessary? How to change it to useState
//  * ! 429 error when 'cast' is opened
// //  * TODO make common container components
// //  * ! after opening cast or reviews 'go back button' sends to "home", not search results
//  */

// function reducer(movie, action) {
//   return action;
// }

// function MovieDetails({ state }) {
//   const [movie, dispatch] = useReducer(reducer, {});
//   const { movieId } = useParams();
//   const FetchAPI = useMemo(() => new MoviesAPI(), []);
//   const location = useLocation();
//   const backLinkHref = location.state?.from ?? '/';

//   useEffect(() => {
//     FetchAPI.getMovieById(Number(movieId)).then(data => dispatch(data));
//   }, [FetchAPI, movieId]);

//   if (!Object.keys(movie).length) {
//     return;
//   }

//   const {
//     title,
//     name,
//     overview,
//     release_date,
//     vote_average,
//     genres,
//     poster_path,
//   } = movie;

//   const movieAdress = `https://image.tmdb.org/t/p/original${poster_path}`;
//   const movieScore = Math.round(vote_average * 10) + '%';
//   const movieDate = new Date(release_date);
//   const movieGenres = genres?.map(gen => gen.name).join(' ');

//   return (
//     <Container>
//       <BackLink to={backLinkHref}>Go Back</BackLink>
//       <section className={s.mainSection}>
//         <img src={movieAdress} alt="" width={200} />
//         <div className={s.secSection}>
//           <p className={s.movieTitle}>
//             {title || name}({movieDate.getFullYear()})
//           </p>
//           <p>User score: {movieScore}</p>
//           <p className={s.movieOverview}>Overview</p>
//           <p>{overview}</p>
//           <p className={s.movieGenre}>Genres</p>
//           <p>{movieGenres}</p>
//         </div>
//       </section>

//       <section className={s.addInfo}>
//         <p>Additional information</p>
//         <ul>
//           <li>
//             <Link to="cast" state={{ from: backLinkHref }}>
//               Cast
//             </Link>
//           </li>
//           <li>
//             <Link to="reviews" state={{ from: backLinkHref }}>
//               Reviews
//             </Link>
//           </li>
//         </ul>
//       </section>
//       <Suspense>
//         <Outlet />
//       </Suspense>
//     </Container>
//   );
// }

// export default MovieDetails;
