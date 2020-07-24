import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Form, Input, Segment, Dropdown } from "semantic-ui-react";

const SearchBar = (props) => {
  console.log("in search", props.search, props.setSearch);
  const [categories, setCategories] = useState([{key: 'all', text: 'all', value: 'all'}]);

  const handleSelect = (event) => {
    console.log(event);
    setCategories(event);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(()=> {
    axios.get("/api/categories").then((res) => {
      console.log('category List: ', res.data);
      setCategories([
        ...categories,
        ...res.data.data.map(category=>{
          return {
            key: category.id,
            text: category.name,
            value: category.name
          };
        })
      ])
    });
  }, []);

  return (
    <div id="search">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field>
            <Form.Input
              label="Search By Name"
              type="text"
              placeholder="Search By Name"
              value={props.search}
              onChange={(ev) => {
                props.setSearch(ev.target.value);
              }}
            />
            <label>Search By Category</label>
            <Dropdown
              onChange={(event, data)=>{
                  console.log('DATA', data.value);
                  props.setCategory(data.value);
              }}
              placeholder='Search By Category'
              closeOnChange
              floating
              fluid
              search
              selection
              options={categories}
              value={props.category}
             />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
