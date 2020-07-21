import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";

const OrderHistory = ({ user, setUser }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const bearer = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get("api/orders/history", bearer).then((res) => {
        const orders = res.data;
        console.log("User's orders: ", orders);
        return setOrders(orders);
      });
    }
  }, []);

  return (
      <Container>
          Welcome to Order History
      </Container>
  )
};

export default OrderHistory;
