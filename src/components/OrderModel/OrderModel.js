import React from "react";
import Img from "../LazyLoading/Img";
import { BsCurrencyRupee } from "react-icons/bs";
import "./style.scss";

const OrderModel = ({
  orderedItem,
  setOrderedItem,
  setOpenModel,
  openModel,
}) => {
  const hidePopup = () => {
    setOpenModel(false);
    setOrderedItem(null);
  };

  return (
    <div
    className={`orderModel ${openModel ? "visible" : ""}`}
    role="dialog"
    aria-modal={openModel}
    aria-labelledby="orderModelTitle"
  >
    <div className="opacityLayer" onClick={hidePopup} role="button" tabIndex="0"></div>
    <div className="orderetails">
      <p className="closeBtn" onClick={hidePopup} role="button" tabIndex="0">
        close
      </p>
      <div className="orderSection">
        <div className="productDetail">
          {orderedItem?.items?.map((item) => (
            <div key={item.id}>
              <Img src={item?.thumbnail} alt="Product Image" />
              <p>{item?.title}</p>
              <p>price: {item?.price}</p>
            </div>
          ))}
        </div>
        <div className="paymentDetail">
          <p className="orderId" id="orderModelTitle">
            Order Id: {orderedItem?._id}
          </p>
          <p className="payId">
            {orderedItem?.paymentId ? `Payment Id: ${orderedItem?.paymentId}` : ""}
          </p>
          <p className="status">Status: {orderedItem?.payment_status}</p>
          <p className="address">Address: {orderedItem?.selectedAddress}</p>
          <p className="amount">
            Amount: {orderedItem?.amount} <BsCurrencyRupee />
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default OrderModel;
