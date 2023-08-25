// import React from "react";
// import { useSelector } from "react-redux";
// import Carousel from "../../../components/Carousel/Carousel";
// import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

// function Toprated() {
//   const { products, loading } = useSelector((state) => state.AllProducts);
 

//   const TopRattedProduct = products
//   ?.filter((item) => item.rating === products.rating)
//   .sort((a, b) => (a.rating > b.rating ? 1 : -1))
//   .slice(0, 19);

//   return (
//     <section className="carouselSection">
//     <ContentWrapper>
//       <h2 className="carouselTitle" role="heading" aria-level="2">
//         Top Rating
//       </h2>
//     </ContentWrapper>
//     <Carousel Data={TopRattedProduct} loading={loading} aria-label="Top Rating Carousel" />
//   </section>
  
//   );
// }

// export default Toprated;
