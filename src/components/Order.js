import React from 'react';
import { Container, Grid, Icon, Divider, Button, Card, Item, Image, Input } from 'semantic-ui-react';
import { CartProduct } from './index';

const Order = ({ order }) => {
  return (
    <Container style={{
      marginTop: '5em',
      backgroundColor: 'dodgerBlue'
    }}>
      <Grid columns={2} divided>
        <Grid.Column>
          <Item.Header style={{marginLeft: '1em'}}>MY CART</Item.Header>
          {/* {order.map((products) => {
            return <CartProduct key={order.id} products={products} />;
          })} */}
          </Grid.Column>
          <Grid.Column>
          <Card>
            <Card.Content>
              <Card.Header>TOTAL</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Header style={{
                marginBottom: '1em'
              }}>Sub-total:</Card.Header>
              <Card.Header>FREE Delivery!</Card.Header>
            </Card.Content>
            <Divider horizontal>Say Cheese!</Divider>
            <Button positive>CHECKOUT</Button>
            <Card.Content>
              <Card.Header style={{marginBottom: '1em'}}>WE ACCEPT:</Card.Header>
              <Icon name='cc mastercard' size='big' style={{marginRight: '.5em'}}/>
              <Icon name='cc visa' size='big' style={{marginRight: '.5em'}}/>
              <Icon name='cc discover' size='big' style={{marginRight: '.5em'}}/>
              <Icon name='cc paypal' size='big' style={{marginRight: '.5em'}}/>
            </Card.Content>
        </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Order;
