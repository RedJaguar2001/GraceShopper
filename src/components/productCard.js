import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Icon, Image, Label, Button } from "semantic-ui-react";

const ProductCard = ({ product }) => {
  const { id, title, description, price, inventory, image } = product;
  const history = useHistory();

  return (
    <Card raised link key={id}>
      <Card.Content onClick={() => history.push(`/products/${id}`)}>
      <Image src={!image ? "https://i.ytimg.com/vi/RLhmG-LIwnE/maxresdefault.jpg" : image.img_src} wrapped/>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>Quantity: {inventory}</Card.Meta>
        <Card.Description>{description.length > 50 ? `${description.substring(0, 50)}...` : description}</Card.Description>
      </Card.Content>
      </Card.Content>
      <Card.Content extra>
        <Label>
          <Icon name="dollar" />
          {price}
        </Label>
        <Button
        content='Add to Cart'
        floated='right'
        compact
        size='small'
        />
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
