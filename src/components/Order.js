import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Icon,
  Divider,
  Button,
  Card,
  Item,
  Image,
  Input,
} from "semantic-ui-react";
import { CartProduct } from "./index";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Order = ({ activeCart, setActiveCart, products, setProducts }) => {
  const history = useHistory();

  const removeItemFromCart = (id) => {
    const bearer = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.delete(`/api/orderItems/${id}`, bearer).then(() => {
      setActiveCart(
        activeCart.filter((cartItem) => {
          return cartItem.id !== id;
        })
      );
    });
  };

  const updateItemQuantity = (id, productId, currentQty, newQty) => {
    console.log(`${id}-${productId}-${currentQty}-${newQty}`);
    const bearer = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .put(`/api/orderItems/${id}`, { quantity: newQty }, bearer)
      .then((response) => {
        if (response.status === 204) {
          setActiveCart(
            activeCart.filter((cartItem) => {
              return cartItem.id !== id;
            })
          );
        } else {
          setActiveCart(
            activeCart.map((cartItem) => {
              if (cartItem.id === id) {
                return { ...cartItem, quantity: response.data.quantity };
              } else {
                return cartItem;
              }
            })
          );
        }

        const quantityDiff = newQty - currentQty;

        setProducts(
          products.map((product) => {
            if (product.id === productId) {
              return { ...product, quantity: product.quantity - quantityDiff };
            } else {
              return product;
            }
          })
        );
      })
      .catch(console.error);
  };

  return (
    <Container
      style={{
        marginTop: "5em",
        backgroundColor: "black",
      }}
    >
      <Grid columns={2} divided>
        <Grid.Column>
          <Item.Header style={{ marginLeft: "1em" }}>MY CART</Item.Header>
          {activeCart.map((cartItem) => {
            return (
              <CartProduct
                key={cartItem.id}
                cartItem={cartItem}
                removeItemFromCart={removeItemFromCart}
                updateItemQuantity={updateItemQuantity}
              />
            );
          })}
        </Grid.Column>
        <Grid.Column>
          <Card>
            <Card.Content>
              <Card.Header>TOTAL</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Header
                style={{
                  marginBottom: "1em",
                }}
              >
                Sub-total:
                <Icon floated="right" name="dollar" />
                {activeCart
                  .reduce((acc, element) => {
                    return acc + element.quantity * element.price;
                  }, 0)
                  .toFixed(2)}
              </Card.Header>
              <Card.Header>FREE Delivery!</Card.Header>
            </Card.Content>
            <Divider horizontal>Say Cheese!</Divider>
            <Button
              positive
              onClick={() => {
                history.push("/checkout");
              }}
            >
              CHECKOUT
            </Button>
            <Card.Content>
              <Card.Header style={{ marginBottom: "1em" }}>
                WE ACCEPT:
              </Card.Header>
              <Icon
                name="cc mastercard"
                size="big"
                style={{ marginRight: ".5em" }}
              />
              <Icon name="cc visa" size="big" style={{ marginRight: ".5em" }} />
              <Icon
                name="cc discover"
                size="big"
                style={{ marginRight: ".5em" }}
              />
              <Icon
                name="cc paypal"
                size="big"
                style={{ marginRight: ".5em" }}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Order;
