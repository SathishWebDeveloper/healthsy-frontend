import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { serviceSpecializations } from "../../constants";

export const InfiniteScroll = ({elements = [], className=""}) => {

  const serviceCategories = elements.reduce((data, item) => {
    if (data?.length) {
      const lastEle = data[data.length - 1];
      if (lastEle?.topImage && !lastEle?.bottomImage) {
        data[data.length - 1] = { ...lastEle, bottomImage: item };
        return data;
      } else {
        const arr = [...data];
        arr.push({ topImage: item });
        return arr;
      }
    } else {
      return [{ topImage: item }];
    }
  }, []);

  const clonedBoxes = [...serviceCategories, ...serviceCategories]; // Clone the boxes

  return (
    <div className={`animateScrollContainer ${className}`}>
      <div className="scroll-content">
        {clonedBoxes.map((data, inx) => (
          <div className="flexColumn serviceGridBoxes" key={inx}>
            <div className="serviceGridBox">
              <Image
                src={data.topImage.image}
                width={45}
                height={45}
                alt="Advantage image"
                priority
                className="serviceGridImg"
              />
              <div className="serviceGridDesc">{data.topImage.text}</div>
            </div>
            <div className="serviceGridBox">
              <Image
                src={data.bottomImage.image}
                width={45}
                height={45}
                alt="Advantage image"
                priority
                className="serviceGridImg"
              />
              <div className="serviceGridDesc">{data.bottomImage.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceGridCarousel = ({ title = "", subTitle = "" }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  return (
    <div className="serviceCategorySection serviceCategoryCarousel">
      <div className="text-center fs38m28fwb">{title}</div>
      <p className="text-center serviceGridSubTitle">{subTitle}</p>
      {isDesktop ? (
        <Carousel
          animationHandler="fade"
          className="highlights-doc-img"
          axis="horizontal"
          // swipeAnimationHandler={1000}
          infiniteLoop
          autoPlay
          swipeable={false}
          interval={2500}
          showArrows={false}
          showThumbs={false} // set to false
          showIndicators={true}
        >
          {serviceSpecializations.map((data, i) => {
            return (
              <div className="container ServiceGrid" key={i}>
                {data.map((val, inx) => {
                  return (
                    <div className="serviceGridBox" key={inx}>
                      <Image
                        src={val.image}
                        width={64}
                        height={64}
                        alt="Advantage image"
                        className="serviceGridImg"
                      />
                      <div className="serviceGridDesc">{val.text}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
      ) : null}
      {!isDesktop && <InfiniteScroll elements = {[
    ...serviceSpecializations[0],
    ...serviceSpecializations[1],
    ...serviceSpecializations[2],
  ]}/>}
    </div>
  );
};

export default ServiceGridCarousel;
