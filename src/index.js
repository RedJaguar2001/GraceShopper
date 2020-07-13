import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {ProductCardGroup} from "./components";
import Axios from "axios";


import {
  Products,
  SearchBar,
  Order
} from './components';

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <div>
        <nav>
          <h1>Cheese Wizards</h1>
        </nav>
        <ProductCardGroup
        products={products}
        setProducts={setProducts}
        />
      </div>
      <SearchBar />
      <Products />
      <Order />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
