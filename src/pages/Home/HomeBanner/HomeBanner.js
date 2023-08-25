import React, { useState } from "react";
import "./HomeBanner.scss";
import Shopping from "../../../assets/feature.jpg";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
function HomeBanner() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <section className="homeBanner" role="banner">
    <div className="Background-img">
      <img src={Shopping} alt="Shopping Banner" />
    </div>
    <div className="opacity-layer" aria-hidden="true"></div>
    <ContentWrapper>
      <div className="homeDetailContainer">
        <h1 className="title">Welcome</h1>
        <p className="subTitle">Start your Shopping with us</p>
        <div className="searchInput">
          <label htmlFor="searchProducts" className="visually-hidden">
            Search your Products
          </label>
          <input
            type="text"
            id="searchProducts"
            placeholder="Search your Products..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
          <button type="submit">Search</button>
        </div>
      </div>
      <div className="homeImageContainer">
        <img className="Homeimage" src={Shopping} alt="Shopping Banner" />
      </div>
    </ContentWrapper>
  </section>
  );
}

export default HomeBanner;
