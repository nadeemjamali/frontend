import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

function Topdiscount() {
  const { products, loading } = useSelector((state) => state.AllProducts);

  const Topdiscount = products
    ?.filter((item) => item.discountPercentage >= 16)
    .sort((a, b) => (a.discountPercentage < b.discountPercentage ? 1 : -1));

  return (
<section className="carouselSection" aria-label="Top Discount Carousel Section">
  <ContentWrapper>
    <h2 className="carouselTitle">Top Discount</h2>
  </ContentWrapper>
  <Carousel Data={Topdiscount} loading={loading} aria-label="Top Discount Carousel" />
</section>
  );
}

export default Topdiscount;
