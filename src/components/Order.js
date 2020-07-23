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
          <Item.Group divided style={{
          margin: '.5em',
          padding: '.5em',
          backgroundColor: 'yellow',
          borderTop: '1px solid grey'
          }}>
          <Item>
            <Item.Image as='a' src='https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555359686/shape/mentalfloss/cheesefinal.jpg?itok=rL-I9_bI' />

            <Item.Content>
              <Item.Header><Icon name='dollar'/>7.99</Item.Header>
              <Button size='small' floated='right' color='red'>X</Button>
              <Item.Meta>
                <span className='productName'>Swiss Cheese</span>
              </Item.Meta>
              <Item.Description style={{margin: '.5em'}}>It ain't easy bein cheesy</Item.Description>
              <Input type='number' placeholder='Qty' min='0'/>
              <Item.Extra>
                <Button><Icon name='heart'/>Save for later</Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
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
