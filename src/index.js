import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Products,
  SearchBar,
  OrderHistory,
  ProductDetails,
  HomepageLayout,
  Nav,
  FormForCheckout,
  Footer
} from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [category, setCategory] = useState('all');

  let filteredProducts = products;

  if(category.length && category !== 'all') {
    filteredProducts = filteredProducts.filter((product)=>{
      return product.categories.includes(category);
    })
  }

  if (search.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      return setProducts(prodList);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const bearer = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.post("api/users/login/token", {}, bearer).then((res) => {
        const userData = res.data;
        return setUser(userData);
      });
    }
  }, []);

  return (
    <Router>
      <Nav user={user} setUser={setUser} />
        <Switch>
          <Route path="/" exact={true} component={HomepageLayout} />

          <Route path="/products" exact>
            <SearchBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory} />

            <Products products={filteredProducts} setProducts={setProducts} />
          </Route>

          <Route path="/products/:productId" exact component={ProductDetails} />

          <Route path="/orderhistory" exact component={OrderHistory} />
        </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
