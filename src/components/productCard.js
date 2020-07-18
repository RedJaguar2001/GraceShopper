import React, { useState } from "react";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";

const productCard = ({ product }) => {
  const { id, title, description, price, inventory } = product;
  //   console.log("product: ", product);
  return (
    <Card key={id}>
      <Image src="https://www.ecosystemmarketplace.com/wp-content/uploads/2019/11/Swiss-Cheese.jpg" wrapped ui={false} />
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

// description.length() > 50 ? `${description.substring(0, 50)}... ` : description
export default productCard;
