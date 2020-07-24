import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Icon, Image, Label, Button } from "semantic-ui-react";
import axios from 'axios';

const ProductCard = ({ product, activeCart, setActiveCart }) => {
  const { id, title, description, price, inventory, image } = product;
  const history = useHistory();

  const updateItemQuantity = (id, productId, currentQty, newQty) => {
    const bearer = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    axios.put(`/api/orderItems/${id}`, {quantity: newQty}, bearer).then((response) => {
      if(response.status === 204) {
        setActiveCart(
          activeCart.filter((cartItem) => {
            return cartItem.id !== id;
          })
        )
      } else {
        setActiveCart(
          activeCart.map((cartItem) => {
            if(cartItem.id === id) {
              return {...cartItem, quantity: response.data.quantity};
            } else {
              return cartItem;
            }
          })
        )
      }

      const quantityDiff = (newQty - currentQty)  

      setProducts(
        products.map((product) => {
          if(product.id === productId) {
            return {...product, quantity: product.quantity - quantityDiff}
          } else {
            return product;
          }
        })
      )
    })
  }

  return (
    <Card raised link key={id}>
      <Card.Content onClick={() => history.push(`/products/${id}`)}>
        <Image
          src={
            !image
              ? "https://i.ytimg.com/vi/RLhmG-LIwnE/maxresdefault.jpg"
              : image.img_src
          }
          wrapped
        />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>Quantity: {inventory}</Card.Meta>
          <Card.Description>
            {description.length > 50
              ? `${description.substring(0, 50)}...`
              : description}
          </Card.Description>
        </Card.Content>
      </Card.Content>
      <Card.Content extra>
        <Label>
          <Icon name="dollar" />
          {price}
        </Label>
        <Button content="Add to Cart" floated="right" compact size="small" onClick={updateItemQuantity}/>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
