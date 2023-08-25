import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Img from "../../components/LazyLoading/Img";
import NoResultFound from "../../assets/no-results.png";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { AiFillStar } from "react-icons/ai";
import "./SearchResult.scss";
import { ColorRing } from "react-loader-spinner";

function SearchResult() {
  const { products, loading } = useSelector((state) => state.AllProducts);

   (products);

  const { query } = useParams();

  const navigate = useNavigate();
  const searchedElement = products.filter((item) => {
    return (
      item.category.toLocaleLowerCase().includes(query.toLowerCase()) ||
      item.title.toLocaleLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLocaleLowerCase().includes(query.toLowerCase())
    );
  });
   (searchedElement);

   (query);
  return (
    <div className="searchResultsPage" role="main">
    {loading && (
      <div aria-live="polite">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["1c4b91", "173d77"]}
        />
      </div>
    )}
    {!loading && (
      <ContentWrapper>
        {searchedElement.length > 0 ? (
          <div className="resultContainer">
            {searchedElement?.map((item) => (
              <div
                className="Alldetails"
                onClick={() => navigate(`/details/${item.id}`)}
                key={item.id}
                role="button"
                tabIndex="0"
                aria-label={`View details of ${item.title}`}
              >
                <div className="resultCardImg">
                  <Img src={item.thumbnail} alt={item.title} />
                  <p className="circleRating" aria-label={`Rating: ${item.rating}`}>
                    {item.rating} <AiFillStar />
                  </p>
                </div>
  
                <div className="textBlock">
                  <p className="title">{item.title}</p>
  
                  <p className="discount">Discount - {item.discountPercentage}%</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="resultNotFound">
            <Img className="notFoundImg" src={NoResultFound} alt="No results found" />
            <p>No such data found</p>
          </div>
        )}
      </ContentWrapper>
    )}
  </div>
  
  );
}

export default SearchResult;
