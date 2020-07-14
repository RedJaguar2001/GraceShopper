import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardGroup } from "semantic-ui-react";
import { ProductCard } from "./index";

const Products = ({ products, setProducts }) => {
  return (
    <CardGroup itemsPerRow={5}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </CardGroup>
  );
};

export default Products;