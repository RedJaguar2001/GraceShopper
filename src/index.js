import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";

import { Products, SearchBar, Order, ProductDetails, HomepageLayout, Nav } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  // const [user, setUser] = useState([]);

  let filteredProducts = products;
  if (search.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data;
      console.log("product List: ", prodList);
      return setProducts(prodList);
    });
  }, []);

  // useEffect(() => {
  //   // const token = user.token;
  //   const bearer = {
  //     headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk1MDEwMDM1fQ.WvrPH1s7oF4QSzhXac2B96wuh2-96SrNADs4WCjKeAY` },
  //   };

  //   axios.post("/login/token", bearer).then(() => {
  //     const userData = res.data;
  //     console.log('user data: ', userData);
  //   });
  // }, []);

  return (
    <Router>
        <Nav />

        <Switch>
          <Route path="/" exact={true} component={HomepageLayout} />

          <Route path="/products" exact>
            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <Products
              products={filteredProducts}
              setProducts={setProducts}
            />
          </Route>

          <Route path="/products/:productId" exact component={ProductDetails} />
        </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
