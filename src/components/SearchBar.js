import React, { useState } from 'react';
import Axios from 'axios';

import { Button, Form, Input, Segment, Dropdown } from 'semantic-ui-react'

const SearchBar = (props) => {
console.log("in search", props.search , props.setSearch);
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const categoryOptions = [
    { key: 'aged', value:'aged', text: 'aged' },
    { key: 'fresh', value:'fresh', text: 'fresh' },
    { key: 'hard', value:'hard', text: 'hard' },
    { key: 'soft', value:'soft', text: 'soft'},
    { key: 'smokey', value:'smokey', text: 'smokey'},
    { key: 'stinky', value:'stinky', text: 'stinky'},
  ]

  const  DropDownSelection = ()=>  (
    <Dropdown
    placeholder='Select Category'
    fluidsearch
    selection
    options={categoryOptions.map(category => {
      
    })}
    />
    )


  return (
    <div id="search">

      <Form onSubmit={ handleSubmit }>
        <Form.Field inline>

        <label htmlFor="search"><h4>Search Products Here</h4></label>
        <Input
        type="text"
        placeholder="search items..."
        value={props.search}
        onChange={ (ev) => {
          props.setSearch(ev.target.value);
        }}
        />
        <label>Search By Category:</label>
        <DropDownSelection />
        <Input type="submit" value="Submit"/>
        </Form.Field>
      </Form>
    </div>
  );
}


export default SearchBar;
