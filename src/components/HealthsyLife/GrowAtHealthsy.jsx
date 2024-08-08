import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const upArrow = "/assets/healthsyLife/upArrow.svg";
const Learn_01 = "/assets/healthsyLife/Learn_01.webp";
const Learn_02 = "/assets/healthsyLife/Learn_02.webp";
const Learn_03 = "/assets/healthsyLife/Learn_03.webp";
const Learn_04 = "/assets/healthsyLife/Learn_04.webp";
const faqIcon = "/assets/healthsyLife/three-lines.svg";

const GrowAtHealthsy = () => {
  const renderArrowPrev = (onClickHandler, hasPrev, label) => {
    return (
      hasPrev && (
        <div className="upDirectionArrow flexCenter" onClick={onClickHandler}>
          <Image
            src={upArrow}
            width={80}
            height={12}
            className=""
            alt="up arrow"
          />
        </div>
      )
    );
  };
  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <div className="downDirectionArrow flexCenter" onClick={onClickHandler}>
        <Image
          src={upArrow}
          width={80}
          height={12}
          className=" downArrowImg"
          alt="down arrow"
        />
      </div>
    );
  return (
    <div className="container d-flex learnGrowContent">
      <div className="learnGrowTxtContent flexColumnJusCenter">
        <div className="primaryColor careerTxt">Careers</div>
        <div className="learnGrowTxt d-flex">
          Learn & Grow
          <div className="d-flex">
            {" "}
            at
            <div className="d-flex ps-3  atHealthsyText">
              {" "}
              HealthSy
              <Image
                width={35}
                src={faqIcon}
                height={35}
                className="threeShades"
                alt="three shades"
              />
            </div>
          </div>
        </div>
        <a
          className="btn btn-open-positions learnGrowBtn d-flex align-items-center justify-content-center"
          href={`${process.env.NEXT_PUBLIC_WEB_URL}/join-us`}
        >
          See open positions
        </a>
      </div>
      <div className="learnGrowCarouselWrapper">
        <Carousel
          infiniteLoop
          showArrows={true}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          showThumbs={false}
          selectedItem={1}
          showIndicators={false}
          axis="vertical"
        >
          <div className="w-100">
            <Image
              src={Learn_03}
              width={607}
              height={360}
              className="learnGrowImg"
              alt="Grow Image"
            />
            <Image
              src={Learn_04}
              width={607}
              height={360}
              className="learnGrowImg"
              alt="Grow Image 2"
            />
          </div>
          <div className="w-100">
            <Image
              src={Learn_01}
              width={607}
              height={360}
              className="learnGrowImg"
              alt="Grow Image 3"
            />
            <Image
              src={Learn_02}
              width={607}
              height={360}
              className="learnGrowImg"
              alt="Grow Image 4"
            />
          </div>
        </Carousel>
      </div>
      <div className="learnGrowCarouselMobileWrapper d-none">
        <Carousel
          infiniteLoop
          showArrows={true}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          showThumbs={false}
          showIndicators={false}
          centerMode={true}
          // selectedItem={1}
          centerSlidePercentage={80}
        >
          <Image
            src={Learn_01}
            width={335}
            height={200}
            className="learnGrowImg"
            alt="Grow Image"
          />
          <Image
            src={Learn_02}
            width={335}
            height={200}
            className="learnGrowImg"
            alt="Grow Image 2"
          />
          <Image
            src={Learn_03}
            width={335}
            height={200}
            className="learnGrowImg"
            alt="Grow Image 3"
          />
          <Image
            src={Learn_04}
            width={335}
            height={200}
            className="learnGrowImg"
            alt="Grow Image 4"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default GrowAtHealthsy;
