import React, { useState } from "react";

const ProductItem = ({ image, info, price, expire, more }) => {
  const [readmore, setReadmore] = useState();

  const toggleReadmore = () => {
    setReadmore(!readmore);
  };

  return (
    <ul className="product">
      <li className="product__item product__image">
        <img src={image} alt="product-image" />
      </li>
      <li className="product__item product__info">{info}</li>
      <li
        className="product__item product__expire"
        style={{ color: expire ? "#ff5c00" : "#00a046" }}
      >
        {expire ? "Expires" : "In stock"}
      </li>
      <li className="product__item product__price">{price}</li>

      <button className="more-btn" onClick={toggleReadmore}>
        {readmore ? "Less" : "More"}
      </button>

      <p
        className="product__description"
        style={{ display: readmore ? "block" : "none" }}
      >
        {more.processor} / {more.ram} / {more.storage} / {more.display}
      </p>
    </ul>
  );
};

export default ProductItem;
