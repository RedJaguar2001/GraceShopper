import React, { useState } from "react";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";

const ProductCard = ({ product }) => {
  const { id, title, description, price, inventory, image } = product;
  //   console.log("product: ", product);
  return (
    <Card key={id}>
      <Image src={!image ? "https://i.ytimg.com/vi/RLhmG-LIwnE/maxresdefault.jpg" : image.img_src} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>Quantity: {inventory}</Card.Meta>
        <Card.Description>{description.length > 50 ? `${description.substring(0, 50)}...` : description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="dollar" />
          {price}
        </a>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
