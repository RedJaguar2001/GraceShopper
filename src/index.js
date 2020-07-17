import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

import { Products, SearchBar, Order, ProductDetails } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  let filteredProducts = products;
  if(search.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(search.toLowerCase());
    })
  }

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      console.log("product List: ", prodList);
      return setProducts(prodList);
    });
  }, []);

  return (
    <Router>
      <div>
        <nav><h1>Cheese Wizards</h1></nav>
        <SearchBar
        search={search}
        setSearch={setSearch} />
        <Products
        products={filteredProducts}
        setProducts={setProducts} />
        <ProductDetails
        productId={2}/>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
