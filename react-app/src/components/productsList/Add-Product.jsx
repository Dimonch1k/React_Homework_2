import React, { useState, useEffect } from "react";

import "./Add-Product.scss";

import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

import { taskList } from "./productList";

const AddProduct = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [products, setProducts] = useState(taskList);

  const addProduct = () => {
    let img = document.querySelector("#product-img");
    let info = document.querySelector("#product-info");
    let expire = document.querySelector("#product-expires-true");
    let price = document.querySelector("#product-price");

    let processor = document.querySelector("#product-processor");
    let ram = document.querySelector("#product-ram");
    let storage = document.querySelector("#product-storage");
    let display = document.querySelector("#product-display");

    let fields = [info, price, processor, ram, storage, display];

    if (isEmptyFields(img, fields)) return;

    const newProduct = {
      id: Math.random(),
      image: img.value,
      info: info.value,
      expire: expire.value,
      price: price.value,
      more: {
        processor: processor.value,
        ram: ram.value,
        storage: storage.value,
        display: display.value,
      },
    };

    // Clear all fields
    clearFields(fields, img);

    // Clear all placeholders
    clearPlaceholders(fields);

    // Send data to localStorage to verify if data can be stored into list
    setData([...data, newProduct]);

    // DOESN'T WORK YET
    setProducts([...products, newProduct]);
  };

  // Check if all fields are filled
  const isEmptyFields = (img, fields) => {
    // check if any field is empty or contains only whitespaces
    const fieldsIndexes = fields.reduce(
      (acc, field, index) => (field.value === "" ? [...acc, index] : acc),
      []
    );

    // notify about required fields and return false if any is empty
    if (fieldsIndexes.length > 0) {
      notifyPlaceholders(fields, fieldsIndexes);
      return true;
    }

    return !matchFileType(img);
  };

  // Check if file is image file
  function matchFileType(file) {
    const extension = getExtension(file.value).toLowerCase();
    return /^(jpg|jpeg|png|gif|webp|tiff|bmp)$/.test(extension);
  }

  // Get extension of some file
  function getExtension(file) {
    return file.split(".").pop();
  }

  // Set placeholder notification for empty fields
  const notifyPlaceholders = (fields, fieldsIndexes) => {
    const placeholders = [
      "Enter product info",
      "Enter price",
      "Enter processor model",
      "Enter RAM size",
      "Enter storage size",
      "Enter display size",
    ];
    fieldsIndexes.forEach((index) => {
      fields[index].placeholder = `${placeholders[index]} (must be filled)`;
    });
  };

  // Clear all Fields
  const clearFields = (fields, img) => {
    fields.forEach((field) => {
      field.value = "";
    });
    img.value = "";
  };

  // Clear all Placeholders
  const clearPlaceholders = (fields) => {
    fields.forEach((field) => {
      field.placeholder = "";
    });
  };

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
      >
        <Toast.Header>
          <strong className="mr-auto">Add a new product to the list</strong>
        </Toast.Header>

        <Toast.Body>
          <form>
            <div className="product-view">
              {/* Product Image */}
              <label for="img">
                Upload image: <br />
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  id="product-img"
                />
              </label>
              <hr />

              {/* Product Info */}
              <label for="info">
                Enter info about product:
                <input type="text" name="info" id="product-info" />
              </label>
              <hr />

              {/* Product Expiration */}
              <div className="product-expiration">
                <label>Expires:</label>

                <input type="radio" name="expires" id="product-expires-true" />
                <label for="expires">Yes</label>

                <input
                  type="radio"
                  name="expires"
                  id="product-expires-false"
                  checked
                />
                <label for="expires">No</label>
              </div>
              <hr />

              {/* Product Price */}

              <label for="price">
                Price:
                <input type="text" name="price" id="product-price" />
              </label>
              <hr />
            </div>

            {/* Product More */}
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
