import React, { useState, useEffect } from "react";

import "./Add-Product.scss";

import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

import { taskList } from "./productList";

const AddProduct = () => {
  const [show, setShow] = useState(true);
  const [products, setProducts] = useState(taskList);
  const [data, setData] = useState([]);

  const addProduct = () => {
    alert("Product added");
    console.log("Product added");

    const img = document.querySelector("#product-img").value;
    const info = document.querySelector("#product-info").value;
    const expire = document.querySelector("#product-expires-true").checked;
    const price = document.querySelector("#product-price").value;

    const processor = document.querySelector("#product-processor").value;
    const ram = document.querySelector("#product-ram").value;
    const storage = document.querySelector("#product-storage").value;
    const display = document.querySelector("#product-display").value;

    const errors = checkFields(
      img,
      info,
      price,
      processor,
      ram,
      storage,
      display
    );
    if (errors) return;

    const newProduct = {
      id: Math.random(),
      image: img,
      info: info,
      expire: expire,
      price: price,
      more: {
        processor: processor,
        ram: ram,
        storage: storage,
        display: display,
      },
    };

    setData([...data, newProduct]);

    setProducts([...products, newProduct]);
  };

  const checkFields = (img, info, price, processor, ram, storage, display) => {
    const fields = [info, price, processor, ram, storage, display];
    const requiredFields = [];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === "") {
        requiredFields.push(i);
      }
    }

    if (requiredFields.length > 0) {
      notifyPlaceholders(requiredFields, placeholders);

      if (!checkFileType(img)) return false;

      return false;
    }
    return true;
  };

  function checkFileType(file) {
    const extension = getExtension(file).toLowerCase();
    return /^(jpg|jpeg|png|gif|webp|tiff|bmp)$/.test(extension);
  }
  function getExtension(file) {
    return file.split(".").pop();
  }

  const notifyPlaceholders = (requiredFields, placeholders) => {
    const placeholders = [
      "Enter product info",
      "Enter price",
      "Enter processor model",
      "Enter RAM size",
      "Enter storage size",
      "Enter display size",
    ];

    requiredFields.forEach((index) => {
      const input = document.querySelector(
        `#product-${
          ["info", "price", "processor", "ram", "storage", "display"][index]
        }`
      );
      input.placeholder = `${placeholders[index]} (must be filled)`;
    });
  };

  function clearFields(fields) {
    fields.forEach((field) => {
      field.value = "";
    });
  }

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(data));
  }, [data]);

  return (
    <>
      {!show && <Button onClick={() => setShow(true)}>Add product</Button>}
      <Toast
        className="add-product-popup"
        show={show}
        onClose={() => setShow(false)}
        style={{ position: "fixed", zIndex: "10", backgroundColor: "white" }}
      >
        <Toast.Header>
          <strong className="mr-auto">Add a new product to the list</strong>
        </Toast.Header>

        <Toast.Body>
          <form>
            <div className="product-view">
              {/* Product Image */}
              <label for="img">Upload image:</label>
              <input type="file" name="img" id="product-img" />
              <hr />

              {/* Product Info */}
              <label for="info">Enter info about product:</label>
              <input type="text" name="info" id="product-info" />
              <hr />

              {/* Product Expiration */}

              <div className="product-expiration">
                <label for="expires">Expires:</label>

                <input
                  type="radio"
                  name="expires"
                  id="product-expires-true"
                  className="ml-2"
                />
                <label for="expires">Yes</label>
                <input
                  type="radio"
                  name="expires"
                  id="product-expires-false"
                  className="ml-2 "
                  checked
                />
                <label for="expires">No</label>
              </div>
              <hr />
            </div>

            {/* Product Price */}

            <label for="price">Price:</label>
            <input type="text" name="price" id="product-price" />
            <hr />

            {/* Product Description */}

            <div className="description">
              {/* Processor */}
              <label
                for="processor"
                className="description__item description__processor"
              >
                Processor:
                <input type="text" name="processor" id="product-processor" />
              </label>

              {/* RAM */}
              <label for="ram" className="description__item description__ram">
                RAM:
                <input type="text" name="ram" id="product-ram" />
              </label>

              {/* Storage */}
              <label
                for="storage"
                className="description__item description__store"
              >
                Storage:
                <input type="text" name="storage" id="product-storage" />
              </label>

              {/* Display */}
              <label
                for="display"
                className="description__item description__display"
              >
                Display:
                <input type="text" name="display" id="product-display" />
              </label>
            </div>
            <hr />

            <Button
              onClick={addProduct}
              variant="primary"
              size="sm"
              style={{ width: "100%" }}
            >
              Add
            </Button>
          </form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AddProduct;
