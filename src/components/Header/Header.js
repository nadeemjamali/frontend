import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import "./Style.scss";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Avtar from "../../assets/avatar.png";
import { useSelector } from "react-redux";
import { SlMenu } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Logout } from "../../Store/UserAuth";

const Header = () => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY) {
      setShowSearch(false);
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const nevigateToHome = () => {
    navigate("/");
    setShowSearch(false);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const logoutHandler = () => {
    dispatch(Logout());
    setMobileMenu(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <header
      className={`header ${mobileMenu ? "mobileView" : ""}`}
      role="banner"
    >
      <ContentWrapper>
        <div
          className="logo"
          onClick={nevigateToHome}
          role="button"
          tabIndex="0"
        >
          <AiFillShop aria-hidden="true" />
          ShopBag
        </div>
        <nav>
          <ul className="menuItems" role="menubar">
            <li
              className="menuItem"
              onClick={() => [
                navigate("/products"),
                setShowSearch(false),
                setMobileMenu(false),
              ]}
              role="menuitem"
              tabIndex="0"
            >
              Products
            </li>
            {user?.role !== "seller" && (
              <li
                className="menuItem"
                onClick={() => [
                  setMobileMenu(false),
                  setShowSearch(false),
                  navigate("/cart"),
                ]}
                role="menuitem"
                tabIndex="0"
              >
                <AiOutlineShoppingCart aria-label="Shopping Cart" />
              </li>
            )}
            <li
              className="menuItem"
              onClick={openSearch}
              role="menuitem"
              tabIndex="0"
            >
              <HiOutlineSearch aria-label="Search" />
            </li>
            {user === null ? (
              <li
                className="menuItem"
                onClick={() => [
                  navigate("/login"),
                  setMobileMenu(false),
                  setShowSearch(false),
                ]}
                role="menuitem"
                tabIndex="0"
              >
                LOGIN
              </li>
            ) : (
              <li
                className="menuItem"
                onClick={logoutHandler}
                role="menuitem"
                tabIndex="0"
              >
                Logout
              </li>
            )}
            <li
              className="menuItem ProfilePicHeader"
              role="menuitem"
              tabIndex="0"
            >
              <img
                src={user?.profilePic ? `${user?.profilePic}` : Avtar}
                alt="profileImg"
                onClick={() => [
                  navigate("/profile"),
                  setShowSearch(false),
                  setMobileMenu(false),
                ]}
                role="button"
              />
            </li>
          </ul>
        </nav>
        <div className="mobileMenu">
          <HiOutlineSearch onClick={openSearch} role="button" tabIndex="0" />
          <div className="ProfilePicHeader">
            <img
              src={user?.profilePic ? `${user?.profilePic}` : Avtar}
              alt="profileImg"
              onClick={() => [
                navigate("/profile"),
                setShowSearch(false),
                setMobileMenu(false),
              ]}
              role="button"
              tabIndex="0"
            />
          </div>
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => setMobileMenu(false)}
              role="button"
              tabIndex="0"
            />
          ) : (
            <SlMenu onClick={openMobileMenu} role="button" tabIndex="0" />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search your Products...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                aria-label="Search for products"
              />
              <VscChromeClose
                style={{ color: "#fff" }}
                onClick={() => setShowSearch(false)}
                role="button"
                tabIndex="0"
                aria-label="Close Search"
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
