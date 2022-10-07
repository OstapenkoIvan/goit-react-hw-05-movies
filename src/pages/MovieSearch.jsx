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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMovieByName]); // Если добавить searchQuery, то поиск будет происходить по каждой введенной букве в поиск

  const onChange = value => {
    setSearchParams(value !== '' ? { query: value } : {});
  };

  // const onSubmit = value => {
  //   setSearchParams(value !== '' ? { query: value } : {});
  //   getMovieByName(searchQuery);
  // };

  return (
    <Container>
      <section>
        <SearchForm
          value={searchQuery}
          onChange={onChange}
          // onSubmit={onSubmit}
        />
        {searchList.length > 0 && <MovieList data={searchList} />}
      </section>
    </Container>
  );
}

export default Movies;
