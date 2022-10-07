import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Cast.module.css';
import { useMovie } from './useContext';

/**
 * ?should there be so many renderings after map?
 */

function Cast(props) {
  const { searchList, getMovieCast } = useMovie();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieCast(Number(movieId));
  }, []); //if you add dependancy "getTrendingMovies" it keeps fetching. why?;

  if (!searchList.length) {
    return;
  }

  return (
    <section className={s.castSection}>
      {searchList.map(
        ({ profile_path, original_name, name, character, id }) => {
          // console.log(searchList); //why is it rerendering so often? is this fine?
          const posterAdress = `https://image.tmdb.org/t/p/original/${profile_path}`;
          return (
            <div key={id}>
              {profile_path ? (
                <img
                  src={posterAdress}
                  alt={name || original_name}
                  className={s.actorImg}
                />
              ) : (
                <div className={s.skeleton}>Image not found</div>
              )}
              <ul>
                <li>{name || original_name}</li>
                {character && <p>Character: {character}</p>}
              </ul>
            </div>
          );
        }
      )}
    </section>
  );
}

export default Cast;
// import React, { useEffect, useMemo, useReducer } from 'react';
// import { useParams } from 'react-router-dom';
// import MoviesAPI from '../MoviesAPI';
// import s from './Cast.module.css';
// import { useMovie } from './useContext';

// /**
//  * TODO i need to useState instead of useReducer
//  * ?should there be so many renderings after map?
//  */

// function reducer(_, action) {
//   return action;
// }

// function Cast(props) {
//   const { searchList, getMovieCast } = useMovie();
//   const [state, dispatch] = useReducer(reducer, null);
//   const { movieId } = useParams();
//   const FetchAPI = useMemo(() => new MoviesAPI(), []);

//   useEffect(() => {
//     getMovieCast(Number(movieId));
//     // FetchAPI.getMovieCast(Number(movieId)).then(({ cast }) => dispatch(cast));
//   }, [FetchAPI, movieId]);

//   if (!searchList) {
//     return;
//   }

//   return (
//     <section className={s.castSection}>
//       {searchList.map(
//         ({ profile_path, original_name, name, character, id }) => {
//           // console.log(searchList); //why is it rerendering so often? is this fine?
//           const posterAdress = `https://image.tmdb.org/t/p/original/${profile_path}`;
//           return (
//             <div key={id}>
//               {profile_path ? (
//                 <img
//                   src={posterAdress}
//                   alt={name || original_name}
//                   className={s.actorImg}
//                 />
//               ) : (
//                 <div className={s.skeleton}>Image not found</div>
//               )}
//               <ul>
//                 <li>{name || original_name}</li>
//                 {character && <p>Character: {character}</p>}
//               </ul>
//             </div>
//           );
//         }
//       )}
//     </section>
//   );
// }

// export default Cast;
