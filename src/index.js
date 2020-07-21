import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";


import { Products, SearchBar, OrderHistory, ProductDetails, HomepageLayout, Nav , FormForCheckout } from "./components";


const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});




  let filteredProducts = products;
  if (search.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      console.log("product List: ", prodList);
      return setProducts(prodList);
    });
  }, []);


  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk1MTM1MTI3fQ.CGw5QGBSS3DDEevQmAKTHpJkxN9totDE2A52Z_nIxaM
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const bearer = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      axios.post("api/users/login/token", {}, bearer).then((res) => {
        const userData = res.data;
        // console.log('user data: ', userData);
        return setUser(userData);
      });
    }
  }, []);

  console.log("in app user: ", user);
  return (
    <Router>
        <Nav 
        user={user}
        setUser={setUser} />


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

          <Route path='/orderhistory' exact component={OrderHistory}/>
        </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
