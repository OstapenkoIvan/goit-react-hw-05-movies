import { useContext, createContext, useState, useCallback } from 'react';
import { movieAPI } from '../api/MoviesAPI.js';

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
  const { trendingMovies, searchedMovies } = movieAPI;
  const [trend, setTrend] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState({});
  const { ADDRESS, KEY, query, search, reviews, credits } = URL;

  const getTrendingMovies = useCallback(async () => {
    try {
      const { results } = await (await trendingMovies(ADDRESS, KEY)).json();
      setTrend(results);
      return await results;
    } catch (error) {
      console.log(error.message);
    }
  }, [ADDRESS, KEY, trendingMovies]);

  const fetchMovieData = useCallback(
    async ({ id = '', data = '', query = '', name = '', search = '' }) => {
      let parsedData = null;
      try {
        parsedData = await (
          await searchedMovies(ADDRESS, KEY, id, data, query, name, search)
        ).json();
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
    },
    [ADDRESS, KEY, searchedMovies]
  );

  const getMovieById = useCallback(
    val => {
      const id = `/${val}`;
      return fetchMovieData({ id });
    },
    [fetchMovieData]
  );

  const getMovieCast = useCallback(
    val => {
      const id = `/${val}`;
      return fetchMovieData({ id, data: credits });
    },
    [credits, fetchMovieData]
  );

  const getMovieReviews = useCallback(
    val => {
      const id = `/${val}`;
      return fetchMovieData({ id, data: reviews });
    },
    [fetchMovieData, reviews]
  );

  const getMovieByName = useCallback(
    name => {
      return fetchMovieData({
        query: query,
        name,
        search: search,
      });
    },
    [fetchMovieData, query, search]
  );

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
