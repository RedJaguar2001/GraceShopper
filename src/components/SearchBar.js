import React from 'react';

const SearchBar = (props) => {
  return (
  <div id="search">
      <h3>Search Here...</h3>
      <form onSubmit={ handleSubmit }>
        <input type="text" placeholder="search items..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
