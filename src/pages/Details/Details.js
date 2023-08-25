import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import Img from "../../components/LazyLoading/Img";
import { AiFillStar, AiOutlineFileAdd } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import Carousel from "../../components/Carousel/Carousel";
import { AddItemToCart } from "../../Store/Cart";
import {
  paymentHandler,
  buyProduct,
  updateProduct,
  fetchDetailsfromApi,
} from "../../Api/Api";
import "./Details.scss";
import { loadingState} from "../../Store/ProductSlice";

function Details() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [btnText, setBtntext] = useState("Add to cart");

  const { Cart } = useSelector((state) => state?.cart);

  const { id } = useParams();

  const dispatch = useDispatch();

  const DataToRedux = (item) => {
    if (user) {
      dispatch(AddItemToCart(item));
    } else {
      navigate("/login");
    }
  };

  const preset_key = "productImages";
  const cloud_name = "dygbz1kio";

  const buyNowHandler = (data) => {
    if (user) {
      buyProduct(`/purchase/placeOrder`, data)
        .then((res) => {
          paymentHandler("/payment/checkout", {
            amount: res.data.amount,
            userId: res.data.user,
            orderId: res.data._id,
            name: user?.name,
            email: user?.email,
          })
            .then((res) => {
               (res);
            })
            .catch((error) => {
               (error);
            });
        })
        .catch((error) =>  (error));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const cartItem = Cart?.find((item) => item.id === id);
    if (cartItem) {
      setBtntext(`item added ${cartItem.quantity}`);
    } else {
      setBtntext("Add to cart");
    }
  }, [Cart?.length, id]);

  const matchedProduct = products?.find((product) => product.id === id);

  const [detailProduct, setDetails] = useState([matchedProduct]);

  useEffect(() => {
    setDetails([matchedProduct]);
  }, [matchedProduct]);

  const [MainImage, setMainImg] = useState("");

  useEffect(() => {
    setMainImg(detailProduct[0]?.images[0]);
  }, [detailProduct]);

  const showMainImg = (index) => {
    setMainImg(detailProduct[0]?.images[index]);
  };

  const uploadSubImages = (id, e) => {
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
            images: res.data.secure_url,
          })
            .then(
              dispatch(loadingState(true)),
              fetchDetailsfromApi(`/products/${id}`).then((res) => {
                setDetails([res]);
                dispatch(loadingState(false));
                return res;
              })
            )
            .catch((error) =>  (error))
        )
        .catch((error) =>  (error));
    }
  };

  return (
    <main className="detailsPage">
      <ContentWrapper>
        {loading && (
          <div role="status" aria-live="polite" aria-busy="true">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              aria-label="Loading blocks"
              role="progressbar"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["1c4b91", "173d77"]}
            />
          </div>
        )}

        {detailProduct?.map((item) => (
          <article className="details" key={item?.id}>
            <div className="productDetail">
              <div className="imagecollection">
                {user?.role === "seller" && user?._id === item?.sellerId ? (
                  <section>
                    {[0, 1, 2, 3].map((index) => (
                      <div className="getProductImg" key={index}>
                        {item?.images?.[index] ? (
                          <img
                            onClick={() => showMainImg(index)}
                            src={
                              item?.images[index] && `${item?.images[index]}`
                            }
                            className="image"
                            alt="Product Image"
                          />
                        ) : (
                          <p>
                            <label htmlFor={`detailImage${index}`}>
                              <AiOutlineFileAdd />
                            </label>
                            <input
                              id={`detailImage${index}`}
                              style={{ display: "none" }}
                              type="file"
                              onChange={(e) => uploadSubImages(item.id, e)}
                              aria-label="Upload thumbnail"
                            />
                          </p>
                        )}
                      </div>
                    ))}
                  </section>
                ) : item?.images?.length === 0 ? (
                  <p> Images not uploaded </p>
                ) : (
                  item?.images?.map((img, index) => (
                    <img
                      key={index}
                      onClick={() => showMainImg(index)}
                      src={img}
                      className="image"
                      alt={`Product Image ${index}`}
                    />
                  ))
                )}
              </div>
              <div className="mainImagescreen">
                <Img src={MainImage} alt="Main Product Image" />
              </div>
              <div className="details">
                <h2 className="title">{item?.title}</h2>
                <p className="price">
                  <BsCurrencyRupee />
                  {item?.price}{" "}
                </p>
                <p className="brand">{item?.brand}</p>
                <div className="rating" aria-label={`Rating: ${item?.rating}`}>
                  {item?.rating} <AiFillStar />{" "}
                </div>
                <p className="discount">
                  {" "}
                  up to {Math.round(item?.discountPercentage)}% off{" "}
                </p>
                <p className="description">{item?.description}</p>
              </div>
            </div>
            {user?.role !== "seller" && (
              <div className="btn">
                <button
                  onClick={() =>
                    buyNowHandler({
                      amount: matchedProduct?.price,
                      userId: user?._id,
                      items: matchedProduct,
                      addresses: user?.addresses,
                    })
                  }
                  aria-label="Buy Now"
                >
                  Buy Now
                </button>
                <button onClick={() => DataToRedux(item)} aria-label={btnText}>
                  {btnText}
                </button>
              </div>
            )}
            <p className="disc">{item?.description}</p>

            <section className="SimilarProducts">
              <h1>Similar products</h1>
              <Carousel
                Data={products?.filter(
                  (prod) => prod.category === item?.category
                )}
                loading={loading}
                aria-label="Similar Products Carousel"
              />
            </section>
          </article>
        ))}
      </ContentWrapper>
    </main>
  );
}

export default Details;
