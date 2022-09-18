import React from 'react';
// import PropTypes from 'prop-types'

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
      {/* <input value={value} type="text" name="query" /> */}
      <button type="submit">SEARCH</button>
    </form>
  );
}

// SearchForm.propTypes = {}

export default SearchForm;
