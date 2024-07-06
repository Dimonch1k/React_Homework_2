import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const ProductItem = ({ image, info, price, expire, more }) => {
  const [readmore, setReadmore] = useState();

  const toggleReadmore = () => setReadmore(!readmore);

  return (
    <>
      <ul className="product">
        <li className="product__item product__image">
          <img src={image} alt="product-image" />
        </li>
        <li className="product__item product__info">{info}</li>

        <li
          className=" product__item product__expire"
          style={{ color: expire ? "#ff5c00" : "#00a046" }}
        >
          {expire ? "Expires" : "In stock"}
        </li>
        <li className="product__item product__price">{price}₴</li>

        <Button
          onClick={() => toggleReadmore(!readmore)}
          aria-controls="example-collapse-text"
          aria-expanded={readmore}
          size="sm"
        >
          {readmore ? "Less" : "More"}
        </Button>
        <Collapse in={readmore}>
          <p className="product__description" style={{ width: "170px" }}>
            {more.processor} / {more.ram} / {more.storage} / {more.display}
          </p>
        </Collapse>
      </ul>
    </>
  );
};

export default ProductItem;
