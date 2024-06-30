import React, { useState } from "react";
import ProductItem from "./Product-Item";
import AddProduct from "./Add-Product";

import { taskList } from "./productList";

import "./Products-List.scss";

const ProductsList = () => {

  const [products, setProducts] = useState(taskList);

  return (
    <div>
      {/* Add Product */}
      <AddProduct />

      <div className="product-list">
        {taskList.map((task) => (
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
    </div>
  );
};

export default ProductsList;
