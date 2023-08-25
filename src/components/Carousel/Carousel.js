import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import "./Carousel.scss";
import { AiFillStar } from "react-icons/ai";
import Img from "../LazyLoading/Img";
import { BsCurrencyRupee } from "react-icons/bs";

function Carousel({ Data, loading }) {
  const CarouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = CarouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behaviour: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="thumbnailImg skeleton"></div>
        <div className="title skeleton"></div>
        <div className="ratting discount skeleton"></div>
      </div>
    );
  };

  return (
    <section className="carousel" role="region" aria-label="Product Carousel">
  <ContentWrapper>
    <button
      className="carouselLeftNav arrow"
      onClick={() => navigation("left")}
      aria-label="Previous Slide"
    >
      <BsFillArrowLeftCircleFill />
    </button>

    <button
      className="carouselRighttNav arrow"
      onClick={() => navigation("right")}
      aria-label="Next Slide"
    >
      <BsFillArrowRightCircleFill />
    </button>
    {!loading ? (
      <div className="carouselItems" ref={CarouselContainer}>
        {Data?.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/details/${item.id}`)}
            className="carouselItem"
            role="button"
            tabIndex="0"
            aria-label={`View details of ${item.title}`}
          >
            <Img
              src={item.thumbnail}
              className="thumbnailImg"
              alt="Product Image"
            />
            <div className="title">{item.title.slice(0, 20)}</div>
            <div className="ratting" aria-label={`Rating: ${item.rating}`}>
              {item.rating} <AiFillStar />
            </div>
            <div className="discount">
              Discount: {item.discountPercentage} %
            </div>
            <div className="discount">
              Price: <BsCurrencyRupee /> {item.price}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="loadingSkeleton">
        {skItem()}
        {skItem()}
        {skItem()}
        {skItem()}
        {skItem()}
      </div>
    )}
  </ContentWrapper>
</section>
  );
}

export default Carousel;
