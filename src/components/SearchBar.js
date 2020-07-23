import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { Button, Form, Input, Segment, Dropdown } from 'semantic-ui-react'

const SearchBar = (props) => {
console.log("in search", props.search , props.setSearch);
const [categories, setCategories] = useState([]);



  const handleSelect = (event)=>{
    console.log(event)
    setCategories(event);
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }

  const categoryOptions = [
    { key: 'Aged', value:'Aged', text: 'Aged' },
    { key: 'Fresh', value:'Fresh', text: 'Fresh' },
    { key: 'Hard', value:'Hard', text: 'Hard' },
    { key: 'Soft', value:'Soft', text: 'Soft'},
    { key: 'Smoky', value:'Smoky', text: 'Smoky'},
    { key: 'Stinky', value:'Stinky', text: 'Stinky'},
  ]

  useEffect(()=> {
    Axios.get("/api/products/:category").then((res) => {
      const categoryList =res.data.data;
      console.log('category List: ', categoryList);

      return setCategories(categoryList);
    });
  }, []);



  const  DropDownSelection = ()=>  (
    <Dropdown
    placeholder='Search By Category'
    closeOnChange
    floating
    fluid
    multiple
    search
    selection
    options={categoryOptions}
    />
    )


  return (
    <div id="search">

      <Form onSubmit={ handleSubmit }>
        <Form.Group>
          <Form.Field>
            <Form.Input
              label="Search By Name"
              type="text"
              placeholder="Search By Name"
              value={props.search}
              onChange={ (ev) => {
                props.setSearch(ev.target.value);
            }}
            />
            <label>Search By Category</label>
              <DropDownSelection
              onSelect={handleSelect}>
              categories={categories}
              setCategories={setCategories}
              </DropDownSelection>
          </Form.Field>
          </Form.Group>
      </Form>

    </div>
  );
}


export default SearchBar;
