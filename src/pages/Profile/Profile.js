import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import Img from "../../components/LazyLoading/Img";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import avtar from "../../assets/avatar.png";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineFileAdd, AiFillDelete } from "react-icons/ai";
import {
  updateUser,
  removeItemFromDb,
  getuserdetails,
  fetchDetailsfromApi,
} from "../../Api/Api";
import { getOrders } from "../../Store/Orders";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../Store/UserAuth";
import { BsCurrencyRupee } from "react-icons/bs";
import OrderModel from "../../components/OrderModel/OrderModel";
import { UserFun } from "../../Store/UserAuth";
import { productAddedBySeller } from "../../Store/ProductSlice";
import axios from "axios";
import AddForm from "../../components/Addproduct/AddProduct";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [openModel, setOpenModel] = useState(false);
  const [orderedItem, setOrderedItem] = useState(null);
  const { orders } = useSelector((state) => state.orders);
  const [editForm, seteditForm] = useState(false);
  const [formdata, setformdata] = useState({});
  const [emptyError, setError] = useState("");

  const preset_key = process.env.PRESENT_KEY;
  const cloud_name = process.env.CLOUD_NAME;

  const { sellerProduct } = useSelector((state) => state.AllProducts);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const AddProfileimage = (e) => {
    const file = e.target.files[0];
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
        updateUser(`/users/${user?._id}`, { profilePic: res.data.secure_url })
          .then((res) => {
            getuserdetails("/Auth/profile")
              .then((res) => {
                dispatch(UserFun(res));
                return res;
              })
              .catch((error) => {
                 (error);
                return error;
              });
          })
          .catch((err) => {
             (err);
          })
      )
      .catch((err) =>  (err));
  };

  const userId = user?._id;

  const LoginFirst = () => {
    Navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     (formdata, "form");
    if (Object.keys(formdata).length === 0) {
      setError("please inset something ");
    } else {
      updateUser(`/users/${user?._id}`, formdata)
        .then((res) => {
          seteditForm(false);
          setformdata({});
          getuserdetails("/Auth/profile")
            .then((res) => {
              dispatch(UserFun(res));
              return res;
            })
            .catch((error) => {
               (error);
              return error;
            });
        })
        .catch((err) => {
           (err);
        });
    }
  };

  const toggleedit = () => {
    seteditForm((prev) => !prev);
  };

  const logoutHandler = () => {
    dispatch(Logout());
    localStorage.clear();
    Navigate("/");
  };

  const removeItem = (id, e) => {
    e.stopPropagation();
    if (user?.role === "user") {
      removeItemFromDb(`/purchase/${id}`)
        .then((res) => {
          if (user?._id) {
            fetchDetailsfromApi(`/purchase/${user?._id}`)
              .then((res) => {
                dispatch(getOrders(res));
              })
              .catch((error) => {
                 (error);
              });
          }
        })
        .catch((error) => {
           (error);
        });
    } else {
      removeItemFromDb(`/products/${id}`)
        .then((res) => {
          if (user?._id) {
            fetchDetailsfromApi(`/products/seller/${user?._id}`)
              .then((res) => {
                dispatch(productAddedBySeller(res));
              })
              .catch((error) => {
                 (error);
              });
          }
        })
        .catch((error) => {
           (error);
        });
    }
  };

  const [ShowForm, setShowForm] = useState(false);
  const [editproductItem, setEditProductItem] = useState("");
  const [editableShow, setEditableShow] = useState(false);
  const [ProductId, setProductId] = useState("");

  const openForm = () => {
    setShowForm(true);
  };

  const editProductDetail = (item) => {
    setShowForm(true);
    setEditProductItem(item);
    setEditableShow(true);
    setProductId(item.id);
  };

  useEffect(() => {
     ("effect");
    if (user?.role === "seller") {
      fetchDetailsfromApi(`/products/seller/${userId}`)
        .then((res) => {
          dispatch(productAddedBySeller(res));
        })
        .catch((error) => {
           (error);
        });
    } else
      fetchDetailsfromApi(`/purchase/${userId}`)
        .then((res) => {
          dispatch(getOrders(res));
        })
        .catch((error) => {
           (error);
        });
  }, [user?.orders, user?.role, ShowForm]);

  return (
    <main className="profilePage" role="main">
      {ShowForm && (
        <AddForm
          setShowForm={setShowForm}
          ShowForm={ShowForm}
          editableShow={editableShow}
          editproductItem={editproductItem}
          setEditableShow={setEditableShow}
          ProductId={ProductId}
          Id={userId}
        />
      )}
      <ContentWrapper>
        {!user ? (
          <div className="beforeLogin">
            <h1>Welcome to Your Profile Page</h1>
            <p>
              To access the profile creation feature, kindly log in or sign in
              first. Thank you for your cooperation.
            </p>
            <button className="btn" onClick={LoginFirst}>
              Login first
            </button>
          </div>
        ) : (
          <div className="afterLogin">
            <div className="profiledetails">
              <div className="ImageContainer">
                <div className="uploadicon">
                  <label
                    htmlFor="profileImageInput"
                    aria-label="Edit Profile Picture"
                  >
                    {<HiOutlinePencil />}
                  </label>
                  <input
                    id="profileImageInput"
                    style={{ display: "none" }}
                    type="file"
                    onChange={AddProfileimage}
                    aria-label="Upload Profile Picture"
                  />
                </div>
                <img
                  className="profilePic"
                  src={user?.profilePic ? `${user?.profilePic}` : avtar}
                  alt="Profile Picture"
                />
              </div>
              <div className="basicdetails">
                {!editForm ? (
                  <div className="details">
                    <h2 className="name">{user?.name}</h2>
                    <p className="email">{user?.email}</p>
                    <p>{user?.addresses}</p>
                    <div className="deleteBtnContainer">
                      <button onClick={logoutHandler}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <form className="editForm" onSubmit={handleSubmit}>
                    <input
                      placeholder="userName"
                      name="name"
                      type="text"
                      value={formdata.name}
                      onChange={handlechange}
                    />
                    <textarea
                      placeholder="address"
                      name="addresses"
                      type="text"
                      value={formdata.addresses}
                      onChange={handlechange}
                    />
                    <p className="error">{emptyError}</p>
                    <button>submit</button>
                  </form>
                )}

                <button
                  className="edit_goBack"
                  onClick={toggleedit}
                  aria-label={editForm ? "Go Back" : "Edit Profile"}
                >
                  {editForm ? "Go Back" : "Edit"}
                </button>
              </div>
            </div>
            <hr />
            {user?.role === "seller" ? (
              <section className="sellerProductSection">
                <h1>
                  {sellerProduct.length === 0
                    ? "Add some Products"
                    : "Products Added by seller "}
                </h1>
                {sellerProduct.map((item) => (
                  <section
                    key={item?.id}
                    className="sellerProducts"
                    onClick={() => Navigate(`/details/${item?.id}`)}
                  >
                    <img className="productImg" src={item?.thumbnail} />
                    <div className="productdetails">
                      <p> Title: {item?.title} </p>
                      <p>Price :{item?.price}</p>
                    </div>
                    <div className="icons">
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="edit"
                      >
                        <HiOutlinePencil
                          onClick={() => editProductDetail(item)}
                        />
                      </p>
                      <p>
                        <AiFillDelete
                          className="delete"
                          onClick={(e) => removeItem(item?.id, e)}
                        />
                      </p>
                    </div>
                  </section>
                ))}

                <div className="addProduct" onClick={openForm}>
                  <p className="addicon">
                    {" "}
                    <AiOutlineFileAdd />
                  </p>
                  <p>Add Product</p>
                </div>
              </section>
            ) : (
              <div className="orderSection">
                {orders?.length === 0 ? (
                  <div className="noOrders">
                    <h2>All Orders</h2>
                    <button
                      className="btn"
                      onClick={() => Navigate("/products")}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="allorders">
                    <h2>Order History</h2>
                    {orders?.map((prod) => (
                      <div
                        className="orderdetails"
                        onClick={() => {
                          setOrderedItem(prod);
                          setOpenModel(true);
                        }}
                        key={prod._id}
                        role="button"
                        tabIndex="0"
                        aria-label={`View details of Order ${prod._id}`}
                      >
                        <div className="itemDetails">
                          {prod.items.map((item) => (
                            <div key={item.id}>
                              <Img
                                className="image"
                                src={item.thumbnail}
                                alt={`Product Image ${item.id}`}
                              />
                              <div>
                                <p className="quantity">
                                  {item.quantity
                                    ? `Quantity : ${item.quantity}`
                                    : "Quantity : 1"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="productdetail">
                          <p className="amount">
                            {prod.amount} <BsCurrencyRupee />{" "}
                          </p>
                          <p>Payment : {prod.payment_status}</p>
                        </div>
                        <button
                          className="removeItem"
                          onClick={(e) => removeItem(prod._id, e)}
                          aria-label={`Cancel Order ${prod._id}`}
                        >
                          Cancel Order
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </ContentWrapper>
      <OrderModel
        openModel={openModel}
        setOpenModel={setOpenModel}
        orderedItem={orderedItem}
        setOrderedItem={setOrderedItem}
      />
    </main>
  );
}

export default Profile;
