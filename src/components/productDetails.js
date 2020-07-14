import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Header,
  Label,
  Grid,
  Button,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";

{
  /* <Header as="h2">{title}</Header>
<p>{description}</p> */
}

const productDetails = (product) => {
  const { title, description, price, inventory } = product;
  console.log(product.product);

  return (
    <Container>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image src="https://via.placeholder.com/500" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>Quantity: {inventory}</Card.Meta>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="dollar" />
                  {price}
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default productDetails;
