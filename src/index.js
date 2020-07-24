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
  Order,
} from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [activeCart, setActiveCart] = useState([]);

  let filteredProducts = products;
  if (search.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const bearer = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log('about to request cart');
      axios.get('/api/orders/cart', bearer).then((res) => {

        const activeCartsList = res.data;
        console.log('kevins cart', activeCartsList);
        setActiveCart(activeCartsList);
      })
    }
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      console.log('product list', prodList)

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
          <SearchBar search={search} setSearch={setSearch} />

          <Products products={filteredProducts} setProducts={setProducts} />
        </Route>

        <Route path="/products/:productId" exact component={ProductDetails} />

        <Route path='/cart' exact>
          <Order activeCart={activeCart} setActiveCart={setActiveCart} products={products} setProducts={setProducts}/>
        </Route>

        <Route path="/orderhistory" exact component={OrderHistory} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
