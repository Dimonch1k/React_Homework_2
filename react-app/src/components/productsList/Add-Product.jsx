import React from "react";
import "./Add-Product.scss";

import { X } from 'lucide-react';

const AddProduct = () => {
  const popup = document.querySelector(".add-product-popup");
  const loginButton = document.querySelector("open-popup-btn");
  const closeButton = document.querySelector("close-popup-btn");

  const openPopup = () => {
    popup.style.display = "block";
  }

  const closePopup = () => {
    popup.style.display = "none";
  }

  return (
    <div>
      <button className="open-popup-btn" onClick={openPopup}>Add Product</button>

      {/* <div className="add-product-popup">
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Log In" />
          
          <button className="close-popup-btn" onClick={closePopup}><X/></button>
        </form>
      </div> */}
    </div>
  );
};

export default AddProduct;
