import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {ProductCardGroup, ImageExampleFloated,} from "./components";
import Axios from "axios";


import {
  Products,
  // SearchBar,
  // Order
} from './components';
import Homepage from "./components/Home";

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <div>
        <nav>
          <h1>Cheese Wizards</h1>
        </nav>
        
       <ImageExampleFloated/>
        <ProductCardGroup
        products={products}
        setProducts={setProducts}
        />
      </div>

      {/* <SearchBar /> */}
      <Products />
      {/* <Order /> */}
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
