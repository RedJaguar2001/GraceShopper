import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardGroup,
  Card,
  CardContent,
  CardHeader,
  Icon,
  Image,
} from "semantic-ui-react";
import { ProductCard } from "./index";

const productCardGroup = ({ products, setProducts }) => {
  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      // console.log('product List: ', prodList);
      return setProducts(prodList);
    });
  }, []);

  return (
    <Card.Group itemsPerRow={5}>
      {products.map((product) => {
        return (
        <ProductCard product={product} />
        );
      })}
    </Card.Group>
  );
};

export default productCardGroup;
