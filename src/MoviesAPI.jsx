import { PureComponent } from 'react';

/**
 * TODO make functional non-default export.
 */

class MoviesAPI extends PureComponent {
  state = {
    ARDESS: 'https://api.themoviedb.org/3',
    KEY: '1fc64bab255082a4321d61bf4be98a08',
    credits: '/credits',
    reviews: '/reviews',
    query: '&query=',
    search: '/search',
  };

  getTrendingMovies = async () => {
    const { ARDESS, KEY } = this.state;
    try {
      const fetchDAta = await fetch(
        `${ARDESS}/trending/movie/week?api_key=${KEY}`
      );
      const parsedData = await fetchDAta.json();
      const results = await parsedData.results;
      return results;
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchMovieData = async ({
    id = '',
    data = '',
    query = '',
    name = '',
    search = '',
  }) => {
    const { ARDESS, KEY } = this.state;
    try {
      const fetchDAta = await fetch(
        `${ARDESS}${search}/movie/${id}${data}?api_key=${KEY}${query}${name}`
      );
      const parsedData = await fetchDAta.json();
      return parsedData;
    } catch (error) {
      console.log(error.message);
    }
  };

  getMovieById = id => {
    return this.fetchMovieData({ id });
  };
  getMovieCast = id => {
    const { credits } = this.state;
    return this.fetchMovieData({ id, data: credits });
  };

  getMovieReviews = id => {
    const { reviews } = this.state;
    return this.fetchMovieData({ id, data: reviews });
  };

  getMovieByName = name => {
    const { query, search } = this.state;
    return this.fetchMovieData({
      query: query,
      name,
      search: search,
    });
  };
}

export default MoviesAPI;
