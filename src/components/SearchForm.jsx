import React from 'react';
import PropTypes from 'prop-types';

function SearchForm({ onChange, onSubmit, value }) {
  const handleChange = e => {
    onChange(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.elements.query.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} type="text" name="query" onChange={handleChange} />
      <button type="submit">SEARCH</button>
    </form>
  );
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchForm;