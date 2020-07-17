import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

import { Products, SearchBar, Order, ProductDetails, HomepageLayout } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);

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
        <HomepageLayout/>
        {/* <Products
        products={products}
        setProducts={setProducts} />
        <ProductDetails
        productId={2}/> */}
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
