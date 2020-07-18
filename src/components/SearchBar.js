import React, { useState } from 'react';
import Axios from 'axios';

const SearchBar = (props) => {
console.log("in search", props.search , props.setSearch);
  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div id="search">

      <form onSubmit={ handleSubmit }>
      <label htmlFor="search"><h4>Search Products Here</h4></label>
      <input
      type="text"
      placeholder="search items..."
      value={props.search}
      onChange={ (ev) => {
        props.setSearch(ev.target.value);
      }}
      />
      </form>
    </div>
  );
}


export default SearchBar;
