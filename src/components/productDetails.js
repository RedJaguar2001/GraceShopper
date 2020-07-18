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

const productDetails = ({productId}) => {
  console.log('product ID: ', productId);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then((res) => {
      const prod = res.data.product;
      console.log("product: ", prod);
      return setProduct(prod);
    });
  }, []);

  const { title, description, price, inventory, image } = product;
  console.log(product);

  return (
    <Container>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image src={!image ? "https://via.placeholder.com/500" : image.img_src} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>Quantity: {inventory}</Card.Meta>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <Card.Content>
                <a>
                  <Icon name="dollar" />
                  {price}
                </a>
                <Button>Add to Cart</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default productDetails;
