import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import {} from "./components";


import {
  Products,
  SearchBar,
  Order
} from './components';

const App = () => {
  // const [] = useState([]);

  return (
    <Router>
      <div>
        <nav>
          <h1>GraceShopper - Meat and Cheese</h1>
        </nav>
      </div>
      <SearchBar />
      <Products />
      <Order />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
