import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';
import Container from '../components/Container';
import { useMovie } from '../components/useContext';

function Movies(props) {
  const { searchList, getMovieByName } = useMovie();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (searchQuery) {
      getMovieByName(searchQuery);
    }
  }, [getMovieByName]); // Если добавить searchQuery, то поиск будет происходить по каждой введенной букве в поиск

  const onChange = value => {
    setSearchParams(value !== '' ? { query: value } : {});
  };

  const onSubmit = value => {
    setSearchParams(value !== '' ? { query: value } : {});
    getMovieByName(searchQuery);
  };

  console.count('render-ms');

  return (
    <Container>
      <section>
        <SearchForm
          value={searchQuery}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {searchList.length > 0 && <MovieList data={searchList} />}
      </section>
    </Container>
  );
}

export default Movies;
// import { useState, useMemo, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import SearchForm from '../components/SearchForm';
// import MoviesAPI from '../MoviesAPI';
// import MovieList from '../components/MovieList';
// import Container from '../components/Container';

// /**
//  * TODO every click in search bar rerenders page. Why?
//  */

// function Movies(props) {
//   const [query, setQuery] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const searchQuery = searchParams.get('query') ?? '';

//   useEffect(() => {
//     if (searchQuery) {
//       FetchAPI.getMovieByName(searchQuery).then(data => setQuery(data.results));
//     }
//   }, []);

//   const FetchAPI = useMemo(() => new MoviesAPI(), []);

//   const onChange = value => {
//     setSearchParams(value !== '' ? { query: value } : {});
//   };

//   const onSubmit = value => {
//     setSearchParams(value !== '' ? { query: value } : {});
//     FetchAPI.getMovieByName(value).then(data => setQuery(data.results));
//   };

//   return (
//     <Container>
//       <section>
//         <SearchForm
//           value={searchQuery}
//           onChange={onChange}
//           onSubmit={onSubmit}
//         />
//         {query.length > 0 && <MovieList data={query} />}
//       </section>
//     </Container>
//   );
// }

// export default Movies;
