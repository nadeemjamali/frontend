import { useEffect } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult/SearchResult.js";
import Products from "./pages/Products/Product";
import Header from "./components/Header/Header";
import CartPage from "./pages/CartPage/Cart";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDetailsfromApi } from "./Api/Api";
import { getAllProducts, loadingState } from "../src/Store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Registeration/Login/Login";
import Register from "./pages/Registeration/Register/Register";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./assets/404.jpg";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const fetchData = () => {
    dispatch(loadingState(true));
    fetchDetailsfromApi("/products").then((res) => {
      dispatch(loadingState(false));
      dispatch(getAllProducts(res));
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { Cart } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(Cart));
  }, [Cart]);

  const UserElement = ({ children }) => {
    if (user?.role !== "seller") {
      return <>{children}</>;
    } else {
      return (
        <main style={{ width: "100%", height: "700px" }}>
          <section
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontSize: "4rem", color: "blue" }}> 403 </h1>
            <h3 style={{ fontSize: "2rem" }}>Forbidden resource</h3>
          </section>
        </main>
      );
    }
  };
  

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/details" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/cart"
          element={
            <UserElement>
              <CartPage />
            </UserElement>
          }
        />
        <Route
          path="*"
          element={
            <main style={{ width: "100%", height: "700px" }}>
              <section
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ width: "40%", height: "30%" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={PageNotFound}
                  />
                </div>
                <h2> Page not Found </h2>
              </section>
            </main>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
