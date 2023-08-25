import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

import "./Style.scss";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <footer className="footer" role="contentinfo">
      <ContentWrapper>
        <ul className="menuItems" role="menu">
          <li
            className="menuItem"
            role="menuitem"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="menuItem"
            role="menuitem"
            onClick={() => navigate("/products")}
          >
            Products
          </li>
          <li
            className="menuItem"
            role="menuitem"
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>
          {user?.role !== "seller" && (
            <li
              className="menuItem"
              role="menuitem"
              onClick={() => navigate("/cart")}
            >
              Cart <AiOutlineShoppingCart aria-label="Shopping Cart" />
            </li>
          )}
        </ul>
        <div
          className="infoText"
          role="region"
          aria-label="ShopBag Information"
        >
          Carry home your dreams with ShopBag - Your one-stop destination for
          all your shopping needs, Your ultimate destination for online shopping
          pleasure! Discover a wide selection of top-quality products and enjoy
          seamless checkout with our secure and user-friendly shopbag. Shop now
          and experience the joy of convenient, delightful shopping!
        </div>
        <div
          className="socialIcons"
          role="region"
          aria-label="Social Media Links"
        >
          <span>
            <a
              href="https://www.linkedin.com/in/nadeem-akhtar-587b7120a/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </span>
          <span>
            <a
              href="https://www.linkedin.com/in/nadeem-akhtar-587b7120a/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
