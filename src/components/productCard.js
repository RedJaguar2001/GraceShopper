import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Icon, Image, Label, Button } from "semantic-ui-react";
import axios from "axios";

const ProductCard = ({
  product,
  products,
  setProducts,
  activeCart,
  setActiveCart,
}) => {
  const { id, title, description, price, inventory, image } = product;
  const history = useHistory();

  const addToCart = () => {
    const bearer = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(`/api/orderItems/`, { productId: id, quantity: 1 }, bearer)
      .then((response) => {
        console.log(response.data);
        setActiveCart([
          ...activeCart,
          {
            description: product.description,
            title: product.title,
            ...response.data,
          },
        ]);

        setProducts(
          products.map((product) => {
            if (product.id === id) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return product;
            }
          })
        );
      });
  };

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
        <Button
          content="Add to Cart"
          floated="right"
          compact
          size="small"
          onClick={addToCart}
        />
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
