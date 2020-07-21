import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  Card,
  Container,
  Icon,
  List,
  Table,
} from "semantic-ui-react";

const OrderHistory = ({ user, setUser }) => {
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState({ activeIndex: 0 });
  const history = useHistory();

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
    <Container key='container'>
      <Card key='card' fluid>
        <Card.Header key='cardHeader' textAlign="center">Order History</Card.Header>
        <Card.Content key='cardContent'>
          <Accordion key='accordion' fluid styled>
            {orders.map((order, i) => {
              let totalPrice = 0;
              return (
                <>
                  <Accordion.Title
                  key={'accordionTitle'+i}
                    active={state.activeIndex === i}
                    index={i}
                    onClick={handleClick}
                  >
                    <Icon key={'icon'+i} name="dropdown" />
                    Order ID: {order.id}
                  </Accordion.Title>
                  <Accordion.Content key={'accordionContent'+i} active={state.activeIndex === i}>
                    <Table striped key={'Table'+i}>
                      <Table.Body key={'tableBody'+i}>
                        {order.products.map(
                          ({ price, productId, quantity, title }, j) => {
                            totalPrice += parseFloat(price) * quantity;
                            return (
                              <Table.Row key={'products'+j}>
                                <Table.Cell
                                  style={{ color: 'blue',  }}
                                  onClick={() =>
                                    history.push(`/products/${productId}`)
                                  }
                                >
                                  {title}
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  Quantity: {quantity}
                                </Table.Cell>
                                <Table.Cell textAlign="right">
                                  Price: ${price}
                                </Table.Cell>
                              </Table.Row>
                            );
                          }
                        )}
                        <Table.Row key={'totalPriceRow'+i}>
                          <Table.Cell key={'totalPrice'+i}>Total Price:</Table.Cell>
                          <Table.Cell key={'placeholder'+i} textAlign="center"></Table.Cell>
                          <Table.Cell key={'total'+i} textAlign="right">
                            ${(+totalPrice).toFixed(2)}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
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
