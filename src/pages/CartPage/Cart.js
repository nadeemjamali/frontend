import React, { useEffect } from "react";
import "./cart.scss";
import {
  AddItemToCart,
  removeIemFromCart,
  ClearAll,
  TotalCartPrice,
} from "../../Store/Cart";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopingImg from "../../assets/download.jpg";
import MissingItem from "../../assets/MissingItem.webp";
import { BsCurrencyRupee } from "react-icons/bs";
import { paymentHandler, buyProduct } from "../../Api/Api";

function Cart() {
  const { Cart } = useSelector((state) => state.cart);

  const { totalamount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(TotalCartPrice());
  }, [Cart]);

  const dispatch = useDispatch();

  const ClearAllItem = () => {
    dispatch(ClearAll());
    localStorage.removeItem("cartData");
  };

  const navigate = useNavigate();

  const buyNowHandler = (data) => {
    buyProduct(`/purchase/placeOrder`, data)
      .then((res) => {
         (res, "buyproduct");
        paymentHandler("/payment/checkout", {
          amount: res.data.amount,
          userId: res.data.user,
          orderId: res.data._id,
          name: user.name,
          email: user.email,
        })
          .then((res) => {
             (res, "response at handle ");
          })
          .catch((error) => {
             (error);
          });
      })
      .catch((error) =>  (error));
  };

  const addtoCart = (prod, e) => {
    e.stopPropagation();
    dispatch(AddItemToCart(prod));
  };

  const removeFromCart = (prod, e) => {
    e.stopPropagation();
    dispatch(removeIemFromCart(prod));
  };

  return (
    <main className="cartPage">
      <ContentWrapper>
        {user ? (
          <section className="AfterLogin" aria-label="User Cart Section">
            {Cart?.length !== 0 ? (
              <div className="cartsection">
                <div>
                  <h2 className="shopingHeader">Shopping Cart</h2>
                  <p className="cartLength">
                    You have {Cart.length}{" "}
                    {Cart.length === 1 ? "item" : "items"} in your cart
                  </p>
                </div>
                <div className="cartItems">
                  {Cart?.map((prod) => (
                    <div
                      className="cartItem"
                      onClick={() => navigate(`/details/${prod.id}`)}
                      key={prod.id}
                      tabIndex="0"
                      role="button"
                      aria-label={`View details of ${prod.title}`}
                    >
                      <div className="imgCont">
                        <img src={prod.thumbnail} alt={prod.title} />
                        <p>{prod?.title?.slice(0, 15)}</p>
                      </div>
                      <p>
                        {prod.price} <BsCurrencyRupee />
                      </p>
                      <div className="icons">
                        <button
                          onClick={(e) => addtoCart(prod, e)}
                          aria-label={`Add one ${prod.title} to cart`}
                        >
                          +
                        </button>
                        <span aria-hidden="true">{prod.quantity}</span>
                        <button
                          onClick={(e) => removeFromCart(prod, e)}
                          aria-label={`Remove one ${prod.title} from cart`}
                        >
                          -
                        </button>
                      </div>
                      <p>
                        {prod.price * prod.quantity} <BsCurrencyRupee />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="btnContainer">
                  <button onClick={() => navigate("/products")}>
                    Continue Shopping
                  </button>
                  <button onClick={ClearAllItem}>Clear All</button>
                </div>
                <div className="amountBox">
                  <p>
                    Total - {totalamount} <BsCurrencyRupee />
                  </p>
                  <button
                    onClick={() =>
                      buyNowHandler({
                        amount: totalamount,
                        userId: user?._id,
                        items: [...Cart],
                        addresses: user.addresses,
                      })
                    }
                    aria-label="Proceed to checkout"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="additemToCart">
                <img src={ShopingImg} alt="No items in cart" />
                <p>No items in cart</p>
                <button onClick={() => navigate("/products")}>
                  Start Shopping
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="LoginFirst">
            <img className="img" src={MissingItem} alt="Missing Cart Items" />
            <p>Login to see the Cart Items</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </section>
        )}
      </ContentWrapper>
    </main>
  );
}

export default Cart;
