import React, { useEffect, useState, useRef } from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../components/LazyLoading/Img";
import { fetchDetailsfromApi, updateProduct } from "../../Api/Api";
import {
  getAllProducts,
  loadingState,
  setFilteredProduct
} from "../../Store/ProductSlice";
import { AiFillStar, AiOutlineFileAdd } from "react-icons/ai";
import {HiOutlinePencil} from "react-icons/hi"
import { BsCurrencyRupee } from "react-icons/bs";
import AddForm from "../../components/Addproduct/AddProduct";
import axios from "axios";

import "./Product.scss";

function Product() {
  const { products, loading , filtredproduct } = useSelector((state) => state.AllProducts);

  const preset_key = process.env.PRESENT_KEY;
  const cloud_name = process.env.CLOUD_NAME;

  const navigate = useNavigate();
 // const [filtredproduct, setFilteredProduct] = useState([]);

  const dispatch = useDispatch();

  // Api calling
  const fetchData = () => {
    dispatch(loadingState(true));
    fetchDetailsfromApi("/products").then((res) => {
      dispatch(loadingState(false));
      dispatch(getAllProducts(res));
     dispatch(setFilteredProduct(res));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [ShowForm, setShowForm] = useState(false);

  const [productPerPage] = useState(10);

  const [currentPage, setCurrrentPage] = useState(1);

  const { user } = useSelector((state) => state.user);

  const numOfTotalPages = Math.ceil(filtredproduct?.length / productPerPage);

  const pages = [...Array(numOfTotalPages + 1)?.keys()]?.slice(1);

  const indexOfLastProductDisplayonPage = currentPage * productPerPage;
  const indexOfFirstProductDisplayonPage =
    indexOfLastProductDisplayonPage - productPerPage;

  const visibleProduct = filtredproduct?.slice(
    indexOfFirstProductDisplayonPage,
    indexOfLastProductDisplayonPage
  );

  const prevpageHandler = () => {
    if (currentPage !== 1) {
      setCurrrentPage(currentPage - 1);
    } else {
      setCurrrentPage(currentPage);
    }
  };
  const nextPageHandler = () => {
    if (currentPage !== pages.length) {
      setCurrrentPage(currentPage + 1);
    } else {
      setCurrrentPage(currentPage);
    }
  };

  const currentsortedelm = useRef();

  const sortByValues = () => {
    const e = currentsortedelm.current.value;
    if (e === "ratingAcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.rating > b.rating ? 1 : -1));
     dispatch(setFilteredProduct(productCopy));
    } else if (e === "ratingDec") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.rating < b.rating ? 1 : -1));
       dispatch(setFilteredProduct(productCopy));
    } else if (e === "priceAcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.price > b.price ? 1 : -1));
       dispatch(setFilteredProduct(productCopy));
    } else if (e === "priceDec") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) => (a.price < b.price ? 1 : -1));
       dispatch(setFilteredProduct(productCopy));
    } else if (e === "discountAcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) =>
        a.discountPercentage > b.discountPercentage ? 1 : -1
      );
       dispatch(setFilteredProduct(productCopy));
    } else if (e === "discountDcc") {
      const productCopy = [...filtredproduct];
      productCopy.sort((a, b) =>
        a.discountPercentage < b.discountPercentage ? 1 : -1
      );
       dispatch(setFilteredProduct(productCopy));
    } else {
      dispatch(setFilteredProduct(filtredproduct));
    }
  };

  const currentCategory = useRef();

  const CategoryFilter = () => {
    const e = currentCategory.current.value;
    if (e) {
      const matchedProduct = products.filter((item) => item.category === e);
      dispatch(setFilteredProduct(matchedProduct));
    }
    if (e === "#") {
      dispatch(setFilteredProduct(products));
    }
  };

  const DetailPage = (id) => {

    navigate(`/details/${id}`);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const uploadTumbnail = (id, e) => {
     (id);
    const file = e.target.files[0];
    if (file) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", preset_key);
      form.append("cloud_name", "");
    
      axios
        .post(
          `
          https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          form
        )
        .then((res) =>
          updateProduct(`/products/${id}`, {
            thumbnail: res.data.secure_url,
          })
            .then(
              dispatch(loadingState(true)),
              fetchDetailsfromApi("/products").then((res) => {
                dispatch(setFilteredProduct(res));
                dispatch(getAllProducts(res));
                dispatch(loadingState(false));
              })
            )
            .catch((error) =>  (error))
        )
        .catch((error) =>  (error));
    }
  };

  return (
    <main className="productPage" aria-label="Product List Section">
      {ShowForm && (
        <AddForm setShowForm={setShowForm} ShowForm={ShowForm} Id={user._id} />
      )}
      <ContentWrapper>
        <div className="Mainproduct">
          <header className="productHeader">
            <h2>Products</h2>
            <div className="selectors">
              <label htmlFor="sortBy">Sort by:</label>
              <select
                className="select"
                id="sortBy"
                name="sortBy"
                ref={currentsortedelm}
                onChange={sortByValues}
                aria-label="Sort products by"
              >
                <option value="#">Sort by</option>
                <option value="ratingAcc">Rating Ascending Order</option>
                <option value="ratingDec">Rating Descending Order</option>
                <option value="priceAcc">Price Ascending Order</option>
                <option value="priceDec">Price Descending Order</option>
                <option value="discountAcc">Discount Ascending Order</option>
                <option value="discountDcc">Discount Descending Order</option>
              </select>

              <label htmlFor="category">Filter by category:</label>
              <select
                className="select"
                id="category"
                name="category"
                ref={currentCategory}
                onChange={CategoryFilter}
                aria-label="Filter products by category"
              >
                <option value="#">Category</option>
                <option value="#"> Category</option>
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
              {user?.role === "seller" && (
                <div className="addProduct" onClick={openForm}>
                  <p className="addicon">
                    {" "}
                    <AiOutlineFileAdd />
                  </p>

                  <p>Add Product</p>
                </div>
              )}
            </div>
          </header>
          {loading && (
            <div aria-live="polite">
              <ColorRing
                visible={true}
                height="100"
                width="100"
                aria-label="Loading blocks"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["1c4b91", "173d77"]}
              />
            </div>
          )}
          <div className="Products">
            {visibleProduct?.map((elm) => (
              <div
                key={elm.id}
                onClick={() => DetailPage(elm.id)}
                className="Product"
                role="button"
                tabIndex="0"
                aria-label={`View details of ${elm.title}`}
              >
                <div className="ImageContainer">
                  {elm?.thumbnail ? (
                    <div>
                      {user?.role === "seller" &&
                        user?._id === elm?.sellerId && (
                          <section
                            className="updateProfilePencil"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <label htmlFor="productThumbnail">
                              <HiOutlinePencil />
                            </label>
                            <input
                              id="productThumbnail"
                              style={{ display: "none" }}
                              type="file"
                              onChange={(e) => uploadTumbnail(elm.id, e)}
                              aria-label="Upload thumbnail"
                            />
                          </section>
                        )}

                      <Img
                        src={elm.thumbnail}
                        className="ThumbnailImg"
                        alt={elm.title}
                      />
                    </div>
                  ) : (
                    user.role === "seller" &&
                    user?._id === elm?.sellerId && (
                      <section
                        className="updateProfile"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <label htmlFor="productThumbnail">
                          <AiOutlineFileAdd />
                        </label>
                        <input
                          id="productThumbnail"
                          style={{ display: "none" }}
                          type="file"
                          onChange={(e) => uploadTumbnail(elm.id, e)}
                          aria-label="Upload thumbnail"
                        />
                      </section>
                    )
                  )}
                </div>
                <div className="details" key={elm.id}>
                  <h3 className="title">{elm.title}</h3>
                  <div className="rating">
                    {elm.rating} <AiFillStar aria-label="Star Rating" />
                  </div>
                  <p className="price">
                    <BsCurrencyRupee aria-label="Price" /> {elm.price}
                  </p>
                  <p className="discount">upto {elm.discountPercentage} off</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              className="btn"
              onClick={prevpageHandler}
              aria-label="Previous Page"
            >
              prev
            </button>
            <div>
              {pages.map((page) => (
                <span
                  key={page}
                  onClick={() => setCurrrentPage(page)}
                  className={`${currentPage === page ? "active" : "normal"}`}
                  role="button"
                  tabIndex="0"
                  aria-label={`Go to Page ${page}`}
                >{`${page} | `}</span>
              ))}
            </div>
            <button
              className="btn"
              onClick={nextPageHandler}
              aria-label="Next Page"
            >
              next
            </button>
          </div>
        </div>
      </ContentWrapper>
    </main>
  );
}

export default Product;
