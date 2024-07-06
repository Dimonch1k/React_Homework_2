import React, { useState } from "react";
import ProductItem from "./Product-Item";
import AddProduct from "./Add-Product";

import Container from "react-bootstrap/Container";

import { taskList } from "./productList";

import "./Products-List.scss";

const ProductsList = () => {
  const [products, setProducts] = useState(taskList);

  const addNewProduct = (product) => {
    setProducts([...products, product]);
  }

  return (
    <div>
      <Container className="p-3">
        {/* Add Product */}
        <AddProduct addNewProduct={addNewProduct} />

        <div className="product-list">
          {products.map((task) => (
            <ProductItem
              key={task.id}
              image={task.image}
              info={task.info}
              price={task.price}
              expire={task.expire}
              more={task.more}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
