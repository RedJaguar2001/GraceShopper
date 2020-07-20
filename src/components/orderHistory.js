import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Card, Container, Icon, List, Table } from "semantic-ui-react";

const OrderHistory = ({ user, setUser }) => {
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState({ activeIndex: 0 });

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;

    setState({ activeIndex: newIndex });
  };

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

//   For each past order, I want to see the items ordered (how many and at what price) and the total cart price.
//Table?
  return (
    <Container>
      <Card fluid>
        <Card.Header textAlign="center">Order History</Card.Header>
        <Card.Content>
          <Accordion fluid styled>
            {orders.map((order, i) => {
              return (
                <>
                  <Accordion.Title
                    active={state.activeIndex === i}
                    index={i}
                    onClick={handleClick}
                  >
                    <Icon name="dropdown" />
                    Order ID: {order.id}
                  </Accordion.Title>
                  <Accordion.Content active={state.activeIndex === i}>
                      <List floated>
                          <List.Item>
                              <List.Description>Blue Cheese</List.Description>
                              <List.Content>Quantity: 3</List.Content>
                              <List.Content>Price: 7.25</List.Content>
                          </List.Item>
                      </List>
                  </Accordion.Content>
                </>
              );
            })}
          </Accordion>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default OrderHistory;
