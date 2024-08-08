import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import CircleType from "circletype";

const affordability = "/assets/aboutUs/affordability.webp";
const accessibility = "/assets/aboutUs/Accessibility.webp";
const availiablity = "/assets/aboutUs/Availiablity.webp";

const arr = [
  {
    image: affordability,
    title: "Affordability",
    desc: "We strive to keep all our services affordable to cater to a wide array of the population thanks to our regular offers throughout the year that can keep your order value lower than your previous purchase in the nearest pharmacy. Our online consultations can significantly reduce your hospital and travel expenses and at the same guarantee world-class and seamless service.",
    rotateContant:
      "Affordability . Affordability . Affordability . Affordability . Affordability . Affordability . ",
  },
  {
    image: accessibility,
    title: "Accessibility",
    desc: "Most of the population does not have access to primary healthcare facilities as they are living in remote areas. Visiting a pharmacy or a clinic might be quite difficult for them. That is why we decided to deliver medicines to every nook and corner of the country including remote villages. Not just that, we wanted to save them from a long journey to the nearest clinic by offering online doctor consultation. ",
    rotateContant:
      "Accessibility . Accessibility . Accessibility . Accessibility . Accessibility . Accessibility . ",
  },
  {
    image: availiablity,
    title: "Availability",
    desc: "We do not like the word ‘no’ and that is why we decided to tie up with retail pharmacies across the country where almost every medicine that you would need for your ailment is available or made available right at your doorstep. We also do not want you to look beyond HealthSy for any of your healthcare needs. We have partnered doctors who are available 24X7 to answer your health issues.",
    rotateContant:
      "Availability . Availability . Availability . Availability . Availability . Availability . Availability . ",
  },
];

const AboutUsCorePrinciple = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    arr.forEach((ele, inx) => {
      const elements = document.querySelectorAll("div#circletext" + inx);
      elements.forEach((ele) => {
        const circleType = new CircleType(ele);
        circleType.radius(200);
      });
    });
  }, []);

  return (
    <>
      <div
        className="container aboutUsCoreSection"
      // onTouchStart={handleSwipeStart}
      // onTouchEnd={handleSwipeEnd}
      // onMouseDown={handleSwipeStart}
      // onMouseUp={handleSwipeEnd}
      >
        <div className="aboutUsCoreTitle text-center">
          <h3>
            Our Core Principle-<span>Our Company in 3 A’s</span>
          </h3>
        </div>
        <Carousel
          showStatus={true}
          showThumbs={false}
          swipeable={false}
          // stopSwipingHandler={()=>{}}
          // swipeAnimationHandler={()=>{}}
          // swipeScrollTolerance={0}
          // onSwipeEnd={handleSwipeEnd}
          // onSwipeStart={handleSwipeStart}
          // onSwipeMove={handleSwipeEnd}
          // infiniteLoop={true}
          // showIndicators={true}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              setActiveIndex(index);
            }
            return (
              <span
                className={`${isSelected ? "selectedStyle" : "dotStyle"
                  } indicator`}
                onClick={onClickHandler}
              >
                {isSelected ? index + 1 : ""}
              </span>
            );
          }}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showArrows={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                className="carousel-arrow carousel-arrow-prev"
                onClick={onClickHandler}
              ></button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                className="carousel-arrow carousel-arrow-next"
                onClick={onClickHandler}
              />
            )
          }
        >
          {arr.map((item, index) => {
            return (
              <div className="carousel-item circle-wrapper" key={index}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className="carousel-image"
                  height={260}
                  width={260}
                />
                <div className="carousel-content">
                  <h2 className="carousel-title">{item.title}</h2>
                  <p className="carousel-desc">{item.desc}</p>
                </div>
                <div
                  id={"circletext" + index}
                  className="circletext"
                  style={{
                    color: activeIndex === index ? "#A6A6A6" : "transparent",
                  }}
                >
                  {item.rotateContant}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default AboutUsCorePrinciple;
