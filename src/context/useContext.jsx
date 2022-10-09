import { useContext, createContext, useState, useCallback } from 'react';

const MovieContext = createContext();
export const useMovie = () => useContext(MovieContext);

const URL = {
  ADDRESS: 'https://api.themoviedb.org/3',
  KEY: '1fc64bab255082a4321d61bf4be98a08',
  credits: '/credits',
  reviews: '/reviews',
  query: '&query=',
  search: '/search',
};

export const MovieProvider = ({ children }) => {
  const [trend, setTrend] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState({});

  const getTrendingMovies = useCallback(async () => {
    const { ADDRESS, KEY } = URL;
    try {
      const fetchDAta = await fetch(
        `${ADDRESS}/trending/movie/week?api_key=${KEY}`
      );
      const parsedData = await fetchDAta.json();
      const results = await parsedData.results;
      await setTrend(results);
      return await results;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const fetchMovieData = async ({
    id = '',
    data = '',
    query = '',
    name = '',
    search = '',
  }) => {
    const { ADDRESS, KEY } = URL;
    let parsedData = null;
    try {
      const fetchDAta = await fetch(
        `${ADDRESS}${search}/movie${id}${data}?api_key=${KEY}${query}${name}`
      );
      parsedData = await fetchDAta.json();
      return parsedData;
    } catch (error) {
      console.log(error.message);
    } finally {
      if (Array.isArray(parsedData.results)) {
        setSearchList(parsedData.results);
        return;
      }
      if (Array.isArray(parsedData.cast)) {
        setSearchList(parsedData.cast);
        return;
      }
      setSearchValue(prev => ({
        ...prev,
        ...parsedData,
      }));
      return;
    }
  };

  const getMovieById = useCallback(val => {
    const id = `/${val}`;
    return fetchMovieData({ id });
  }, []);

  const getMovieCast = useCallback(val => {
    const { credits } = URL;
    const id = `/${val}`;
    return fetchMovieData({ id, data: credits });
  }, []);

  const getMovieReviews = useCallback(val => {
    const { reviews } = URL;
    const id = `/${val}`;
    return fetchMovieData({ id, data: reviews });
  }, []);

  const getMovieByName = useCallback(name => {
    const { query, search } = URL;
    return fetchMovieData({
      query: query,
      name,
      search: search,
    });
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trend,
        searchValue,
        searchList,
        getTrendingMovies,
        getMovieById,
        getMovieByName,
        getMovieCast,
        getMovieReviews,
        setSearchList,
        setSearchValue,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
