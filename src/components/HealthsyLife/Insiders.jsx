import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const quotation = "/assets/healthsyLife/quotation.png";
const gowtham = "/assets/healthsyLife/Gowtham_Testiomonials.jpg.webp";
const hanna = "/assets/healthsyLife/Hanna_Testiomonials.jpg";
const priya = "/assets/healthsyLife/Priya_Testiomonials.jpg.webp";
const leftArrow = "/assets/healthsyLife/left-arrow.png";

const Insiders = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  const insidersList = [
    {
      image: gowtham,
      name: "Gowtham. R",
      designation: "UI/UX Designer",
      description:
        "HealthSy has enabled me to keep up with the ever changing design environment through its product ideations, developments and updates from time to time. I feel like a complete designer now!",
    },
    {
      image: hanna,
      name: "Hanna Cobb",
      designation: "Business Development Manager",
      description:
        "I have learnt that the three main aspects in communication i,e firmness, boldness and calmness is very important when it comes to negotiating and onboarding on partners at HealthSy",
    },
    {
      image: priya,
      name: "Priya",
      designation: "Content Writer",
      description:
        "There’s motivation, positivity and excitement all through the office and among all the teams at HealthSy ",
    },
  ];
  const Arrows = () => {
    return (
      <>
        <div className="cursor-pointer" onClick={handlePreviousSlide}>
          <Image
            src={leftArrow}
            width={80}
            height={12}
            className="navigationArrow"
            alt="Left Arrow"
          />
        </div>
        <div className="cursor-pointer" onClick={handleNextSlide}>
          <Image
            src={leftArrow}
            width={80}
            height={12}
            className="navigationArrow rightDirectionArrow"
            alt="Right Arrow"
          />
        </div>
      </>
    );
  };
  return (
    <div className="insiderContent">
      <div className="container py-5">
        <h2 className="insiderHeading text-center">
          Hear it from our Insiders
        </h2>
        <h2 className="testimonialsHeading text-center d-none">
        Testimonials from HealthSy
        </h2>
        <div className="insider-container">
          <Image
            src={quotation}
            width={61}
            height={49}
            className="quotationImage"
            alt="Quotation"
          />
          <div>
            <Carousel
              infiniteLoop
              showArrows={true}
              //   ref={carouselRef}
              selectedItem={currentSlide}
              //   renderArrowPrev={renderArrowPrev}
              //   renderArrowNext={renderArrowNext}
              showThumbs={false}
              showIndicators={false}
            >
              {insidersList.map((insider, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex w-100 d-flex justify-content-center insiderInfo"
                  >
                    <Image
                      src={insider.image}
                      width={358}
                      height={434}
                      className="insiderImage"
                      alt={insider?.name}
                    />
                    <div className="insiderDetails d-flex flex-column justify-content-center mt-5">
                      <h2 className="insider-name mb-2">{insider.name}</h2>
                      <p className="insider-designation mb-5">
                        {insider.designation}
                      </p>
                      <p className="insider-description">
                        {insider.description}
                      </p>
                      <div className="d-flex mt-5 webArrows">
                        <Arrows />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
            <div className="d-none justify-content-center mobileArrows">
              <Arrows />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insiders;
