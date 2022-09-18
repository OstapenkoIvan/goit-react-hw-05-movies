import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import MoviesAPI from '../MoviesAPI';
import MovieList from '../components/MovieList';
// import PropTypes from 'prop-types';

/**
 * TODO every click in search bar rerenders page. Why?
 */

function Movies(props) {
  const [query, setQuery] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (searchQuery) {
      FetchAPI.getMovieByName(searchQuery).then(data => setQuery(data.results));
    }
  }, []);

  const FetchAPI = useMemo(() => new MoviesAPI(), []);

  const onChange = value => {
    setSearchParams(value !== '' ? { query: value } : {});
  };

  const onSubmit = value => {
    setSearchParams(value !== '' ? { query: value } : {});
    FetchAPI.getMovieByName(value).then(data => setQuery(data.results));
  };

  return (
    <>
      <section>
        <SearchForm
          value={searchQuery}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {query.length > 0 && <MovieList data={query} />}
      </section>
    </>
  );
}

// Movies.propTypes = {};

export default Movies;
