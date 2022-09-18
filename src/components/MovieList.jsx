import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// import PropTypes from 'prop-types'

function MovieList({ data }) {
  const location = useLocation();

  return (
    <ul>
      {data.map(trend => {
        return (
          <li key={trend.id}>
            <Link to={`${trend.id}`} state={{ from: location }}>
              {trend.title || trend.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// MovieList.propTypes = {}

export default MovieList;
