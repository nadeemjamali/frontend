import React from "react";
import "./Home.scss";
import HomeBanner from "./HomeBanner/HomeBanner";
//import Toprated from "./topRated/Toprated";
import Topdiscount from "./topdiscount/TopDiscount";

function Home() {
  return (
    <section className="HomePage">
      <HomeBanner />
      {/* <Toprated /> */}
      <Topdiscount/>
    </section>
  );
}

export default Home;
