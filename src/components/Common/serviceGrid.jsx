import React, { useEffect, useState } from "react";
import Image from "next/image";

import { InfiniteScroll } from "./serviceGridCarousel"
import { homeHealthCareServiceCategories } from "../../constants";

const ServiceGrid = ({ title = "", subTitle = "" }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <div className="serviceCategorySection">
      <div className="text-center fs38m28fwb">{title}</div>
      <p className="text-center serviceGridSubTitle">{subTitle}</p>
      {isDesktop ? (
        <div className="container ServiceGrid">
          {homeHealthCareServiceCategories.map((val, inx) => (
            <div className="serviceGridBox" key={inx}>
              <Image
                src={val.image}
                width={64}
                height={64}
                alt="Advantage image"
                className="serviceGridImg"
                priority
              />
              <div className="serviceGridDesc">{val.text}</div>
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          elements={[...homeHealthCareServiceCategories, ...homeHealthCareServiceCategories, ...homeHealthCareServiceCategories]}
          className="homeHealthcareInfiniteScroll"
        />
      )}
    </div>
  );
};

export default ServiceGrid;