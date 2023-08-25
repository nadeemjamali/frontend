import React, { useState, useEffect } from "react";
import "./Addproduct.scss";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { AddProduct, updateProduct, fetchDetailsfromApi } from "../../Api/Api";
import { useDispatch } from "react-redux";
import {
  getAllProducts,
  loadingState,
  productAddedBySeller,
} from "../../Store/ProductSlice";

function AddForm({
  setShowForm,
  ShowForm,
  Id,
  ProductId,
  editproductItem,
  editableShow,
  setEditableShow
}) {
  const initialState = {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (editableShow) {
      setFormData(editproductItem);
    }
  }, [editableShow]);

  const [formData, setFormData] = useState(initialState);

  const [formError, setFormError] = useState(initialState);
  const [issubmit, setIssubmit] = useState(false);
  const [commingError, setCommingError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError(validate({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIssubmit(true);
    setFormError(validate(formData));
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && issubmit) {
      if (editableShow) {
        updateProduct(`/products/${ProductId} `, {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          brand: formData.brand,
          discountPercentage: formData.discountPercentage,
          rating: formData.rating,
          stock: formData.stock,
          category: formData.category,
        }).then(
          fetchDetailsfromApi(`/products/seller/${Id}`).then((res) => {
            dispatch(productAddedBySeller(res));
          }),
          setFormData(initialState),
          setEditableShow(false),
          setShowForm(false)
        );
      } else {
        AddProduct("/products", { ...formData, sellerId: Id })
          .then(
            dispatch(loadingState(true)),
            fetchDetailsfromApi("/products").then((res) => {
              dispatch(loadingState(false));
              dispatch(getAllProducts(res));
              setShowForm(false)
              setFormData(initialState)
            }),
          )
          .catch(setCommingError("product not added sucessfully"));
      }
    }
  }, [issubmit, editableShow]);

  function validate(value) {
    const error = {};
    if (!value.title) {
      error.title = "title is required";
    } else if (!value.price) {
      error.price = "price is required";
    } else if (value.price < 0) {
      error.price = "price is not less than 0";
    } else if (value.price > 10000) {
      error.price = "price is not greater than ten thousand";
    } else if (!value.discountPercentage) {
      error.discountPercentage = "discountPercentage is required";
    } else if (value.discountPercentage < 0) {
      error.discountPercentage = "discountPercentage is not less than 0";
    } else if (value.discountPercentage > 50) {
      error.discountPercentage = "discountPercentage is not greater than 50%";
    } else if (!value.rating) {
      error.rating = "rating is required";
    } else if (value.rating < 0) {
      error.rating = "rating is not less than 0";
    } else if (value.rating > 5) {
      error.rating = "rating is not greater than 5";
    } else if (!value.stock) {
      error.stock = "stock is required";
    } else if (value.stock < 0) {
      error.stock = "stock is not less than 0";
    } else if (!value.brand) {
      error.brand = "brand is required";
    } else if (!value.category) {
      error.category = "category is required";
    } else if (!value.description) {
      error.description = "description is required";
    }
    return error;
  }

  const hidePopup = () => {
    setFormData(initialState),
    setEditableShow(false),
    setShowForm(false)
  };

  return (
    <main className={`formComponent ${ShowForm ? "visible" : ""}`}>
      <div
        className="opacityLayer"
        onClick={hidePopup}
        role="button"
        tabIndex="0"
      ></div>
      <ContentWrapper>
        <section className="formSection">
          <form className="addroductForm" onSubmit={handleSubmit}>
            <h1>{editableShow ? "Update" : "Add"} Product </h1>
            <input
              className="inputfield"
              type="text"
              name="title"
              value={formData.title}
              placeholder="title"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.title} </p>
            <input
              className="inputfield"
              type="text"
              name="price"
              value={formData.price}
              placeholder="price"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.price} </p>
            <input
              className="inputfield"
              name="discountPercentage"
              value={formData.discountPercentage}
              placeholder="discountPercentage"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.discountPercentage} </p>
            <input
              className="inputfield"
              name="rating"
              value={formData.rating}
              placeholder="rating"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.rating} </p>
            <input
              className="inputfield"
              name="stock"
              value={formData.stock}
              placeholder="stock"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.stock} </p>
            <input
              className="inputfield"
              name="brand"
              value={formData.brand}
              placeholder="brand"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.brand} </p>
            <select
              className="selectCategory"
              id="category"
              name="category"
              onChange={handleChange}
              aria-label="Category list"
              value={formData.category}
            >
              <option value="#">category</option>
              <option value="smartphones">Smart Phone</option>
              <option value="laptops">Laptop</option>
              <option value="fragrances"> fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home-Decroration</option>
              <option value="mens-watches">Mens-Watches</option>
              <option value="mens-shoes">Mens-shoes</option>
              <option value="mens-shirts">Mens-shirts</option>
              <option value="furniture">Furniture</option>
              <option value="womens-dresses">Womens-dresses</option>
              <option value="womens-bags">Womens-Bags</option>
              <option value="womens-jewellery">Womens-Jewellery</option>
              <option value="womens-watches">Womens-watches</option>
              <option value="automotive">Automotive</option>
              <option value="lighting">Lighting</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="tops">Tops</option>
              <option value="motorcycle">Motercycle</option>
            </select>
            <input
              className="inputfield"
              name="description"
              value={formData.description}
              placeholder="description"
              onChange={handleChange}
            />
            <p className="errorMessage"> {formError.description}</p>
            <p className="errorMessage">{commingError}</p>
            <button>{editableShow ? "Update" : "Add"} Product </button>
          </form>
        </section>
      </ContentWrapper>
    </main>
  );
}
export default AddForm;
