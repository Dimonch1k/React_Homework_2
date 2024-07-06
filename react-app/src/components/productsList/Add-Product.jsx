import React, { useState, useEffect } from "react";
// import { Formik, Field, Form } from "formik";

import "./Add-Product.scss";

import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

const AddProduct = ({ addNewProduct }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);

  const [fields, setFields] = useState({
    img: "",
    info: "",
    expire: false,
    price: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFields({ ...fields, img: e.target.result });
        console.log(fields.img);
      };
      reader.readAsText(file);
    }
  };

  const addProduct = () => {
    // let img = document.querySelector("#product-img");
    // let info = document.querySelector("#product-info");
    // let expire = document.querySelector("#product-expires-true");
    // let price = document.querySelector("#product-price");

    // let processor = document.querySelector("#product-processor");
    // let ram = document.querySelector("#product-ram");
    // let storage = document.querySelector("#product-storage");
    // let display = document.querySelector("#product-display");

    // let fields = [info, price, processor, ram, storage, display];

    // if (isEmptyFields(img, fields)) return;

    if (isEmptyFields(fields)) return;

    // const newProduct = {
    //   id: Math.random(),
    //   image: img.value,
    //   info: info.value,
    //   expire: expire.value,
    //   price: price.value,
    //   more: {
    //     processor: processor.value,
    //     ram: ram.value,
    //     storage: storage.value,
    //     display: display.value,
    //   },
    // };

    const newProduct = {
      id: Math.random(),
      image: fields.img,
      info: fields.info,
      expire: fields.expire,
      price: fields.price,
      more: {
        processor: fields.processor,
        ram: fields.ram,
        storage: fields.storage,
        display: fields.display,
      },
    };

    // Clear all fields
    // clearFields(fields, img);
    clearFields();

    // Clear all placeholders
    // clearPlaceholders(fields);
    // clearPlaceholders();

    // Send data to localStorage to verify if data can be stored into list
    setData([...data, newProduct]);

    // Add new product
    addNewProduct({ ...newProduct });
  };

  // Check if all fields are filled
  const isEmptyFields = () => {
    // check if any field is empty or contains only whitespaces
    // const fieldsIndexes = fields.reduce(
    //   (acc, field, index) => (field.value === "" ? [...acc, index] : acc),
    //   []
    // );

    // // notify about required fields and return false if any is empty
    // if (fieldsIndexes.length > 0) {
    //   notifyPlaceholders(fields, fieldsIndexes);
    //   return true;
    // }

    // return !matchFileType(img);

    const inputs = {
      info: fields.info,
      price: fields.price,
      processor: fields.processor,
      ram: fields.ram,
      storage: fields.storage,
      display: fields.display,
    };

    const inputsIndexes = Object.keys(inputs).forEach((input, index) => {
      if (input === "") {
        return index;
      }
    });

    if (inputsIndexes) {
      // notifyPlaceholders(fields, [inputsIndexes]);
      return true;
    }

    return !matchFileType(fields.img);
  };

  // Check if file is image file
  function matchFileType(file) {
    const extension = getExtension(file).toLowerCase();
    return /^(jpg|jpeg|png|gif|webp|tiff|bmp)$/.test(extension);
  }

  // Get extension of some file
  function getExtension(file) {
    return file.split(".").pop();
  }

  // Set placeholder notification for empty fields
  // const notifyPlaceholders = (fields, fieldsIndexes) => {
  //   const placeholders = [
  //     "Enter product info",
  //     "Enter price",
  //     "Enter processor model",
  //     "Enter RAM size",
  //     "Enter storage size",
  //     "Enter display size",
  //   ];
  //   fieldsIndexes.forEach((index) => {
  //     fields[index].placeholder = `${placeholders[index]} (must be filled)`;
  //   });
  // };

  // Clear all Fields
  // const clearFields = (fields, img) => {
  //   fields.forEach((field) => {
  //     field.value = "";
  //   });
  //   img.value = "";
  // };

  const clearFields = () => {
    setFields({
      img: "",
      info: "",
      expire: false,
      price: "",
      processor: "",
      ram: "",
      storage: "",
      display: "",
    });
  };

  // // Clear all Placeholders
  // const clearPlaceholders = (fields) => {
  //   fields.forEach((field) => {
  //     field.placeholder = "";
  //   });
  // };

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
              <label htmlFor="img">
                Upload image: <br />
                <input
                  type="file"
                  accept="image/*"
                  id="product-img"
                  name="img"
                  value={fields.img}
                  onChange={handleChange}
                />
              </label>
              <hr />

              {/* Product Info */}
              <label htmlFor="info">
                Enter info about product:
                <input
                  type="text"
                  name="info"
                  value={fields.info}
                  onChange={handleChange}
                  id="product-info"
                />
              </label>
              <hr />

              {/* Product Expiration */}
              <div className="product-expiration">
                <label>Expires:</label>

                <input
                  type="radio"
                  name="expires"
                  value={!fields.expire}
                  onChange={handleChange}
                  id="product-expires-true"
                />
                <label htmlFor="expires">Yes</label>

                <input
                  type="radio"
                  name="expires"
                  value={!fields.expire}
                  onChange={handleChange}
                  id="product-expires-false"
                  checked
                />
                <label htmlFor="expires">No</label>
              </div>
              <hr />

              {/* Product Price */}

              <label htmlFor="price">
                Price:
                <input
                  type="text"
                  name="price"
                  value={fields.price}
                  onChange={handleChange}
                  id="product-price"
                />
              </label>
              <hr />
            </div>

            {/* Product More */}
            {/* Product Description */}

            <div className="description">
              {/* Processor */}
              <label
                htmlFor="processor"
                className="description__item description__processor"
              >
                Processor:
                <input
                  type="text"
                  name="processor"
                  value={fields.processor}
                  onChange={handleChange}
                  id="product-processor"
                />
              </label>

              {/* RAM */}
              <label
                htmlFor="ram"
                className="description__item description__ram"
              >
                RAM:
                <input
                  type="text"
                  name="ram"
                  value={fields.ram}
                  onChange={handleChange}
                  id="product-ram"
                />
              </label>

              {/* Storage */}
              <label
                htmlFor="storage"
                className="description__item description__store"
              >
                Storage:
                <input
                  type="text"
                  name="storage"
                  value={fields.storage}
                  onChange={handleChange}
                  id="product-storage"
                />
              </label>

              {/* Display */}
              <label
                htmlFor="display"
                className="description__item description__display"
              >
                Display:
                <input
                  type="text"
                  name="display"
                  value={fields.display}
                  onChange={handleChange}
                  id="product-display"
                />
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
