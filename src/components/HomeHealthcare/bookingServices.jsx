import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import _debounce from "lodash/debounce";

const step_1 = "/assets/homeHealthcare/step-1.webp";
const step_2 = "/assets/homeHealthcare/step-2.webp";
const step_3 = "/assets/homeHealthcare/step-3.webp";
const step_4 = "/assets/homeHealthcare/step-4.webp";
const step_5 = "/assets/homeHealthcare/step-5.webp";
const step_6 = "/assets/homeHealthcare/step-6.webp";

const carouselElements = [
  {
    Image: step_1,
    title: "Choose your Category",
    desc: "Book Home Healthcare Services based on categories or based on conditions",
  },
  {
    Image: step_2,
    title: "Select your preferred Service Provider",
    desc: "Select your preferred Home Healthcare Service Provider from the listing in your city / town",
  },
  {
    Image: step_3,
    title: "Select your preferred Date and Time slot",
    desc: "Select your preferred Date and Time slot from the Home Healthcare Service Provider’s availability",
  },
  {
    Image: step_4,
    title: "Fill the required details",
    desc: "Fill the required details for the Home Healthcare booking such as name, age, etc..",
  },
  {
    Image: step_5,
    title: "Review details",
    desc: "Review details select your payment mode and pay",
  },
  {
    Image: step_6,
    title: "Service Provider visits your home",
    desc: "Service Provider visits your home verifies the booking, carries out your chosen service and completes the booking successfully",
  },
];
const BookingServiceWeb = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false);

  const handleCarouselState = _debounce((isElementVisible, isScrollingUp) => {
    if (isElementVisible) {
      if (isScrollingUp) {
        setTimeout(() => {
          setSelectedItem((prev) => {
            if (prev === 0) {
              setCarouselVisible(false);
              return prev;
            } else {
              return prev - 1;
            }
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setSelectedItem((prev) => {
            if (carouselElements.length - 1 === prev) {
              setCarouselVisible(false);
              return prev;
            } else {
              return prev + 1;
            }
          });
        }, 1000);
      }
    }
  }, 150);

  const handleWheel = (event) => {
    const isScrollingUp = event.deltaY < 0;
    let isElementVisible = carouselVisible;
    const carouselEle = document.querySelector(".dynamic-scrolling-carousel");
    const windowCenter = window.outerHeight / 2;
    const position = carouselEle.getBoundingClientRect();
    if (position.top <= windowCenter && position.bottom >= windowCenter) {
      setCarouselVisible(true);
      isElementVisible = true;
    }
    // if (position.top === carouselEle.offsetHeight/2 || position.top <= windowCenter) {
    //   setCarouselVisible(true);
    //   isElementVisible = true;
    // }

    handleCarouselState(isElementVisible, isScrollingUp);
  };

  function enableScrollMonitoring() {
    // Add event listeners for scroll and touchmove events
    window.addEventListener("wheel", handleWheel);
    // window.addEventListener("touchmove", _debounce(handleWheel, 150));
  }

  // Function to disable scroll monitoring
  function disableScrollMonitoring() {
    // Remove event listeners for scroll and touchmove events
    window.removeEventListener("wheel", handleWheel);
    // window.removeEventListener("touchmove", handleWheel);
  }

  // todo
  // useEffect(() => {
  //   enableScrollMonitoring();
  //   return disableScrollMonitoring;
  // }, []);

  // useEffect(() => {
  //   document.body.style.overflow = carouselVisible ? "hidden" : "scroll";
  // }, [carouselVisible]);

  return (
    <Carousel
      infiniteLoop
      autoPlay
      swipeable={true}

      showArrows={true}
      showThumbs={true}
      selectedItem={selectedItem}
      showIndicators={true}
      transitionTime={1000}
      axis="vertical"
      className="dynamic-scrolling-carousel"
      onChange={(inx) => setSelectedItem(inx)}
    >
      {carouselElements.map((data, idx) => {
        return (
          <div className="w-100 bookingServiceCarouselItem" key={idx}>
            <Image
              src={data.Image}
              width={426}
              height={448}
              className="bookingImages"
              alt="Grow Image"
            />
            <div className="textContent">
              <div className="bookingTitle fs48m18fwb">{data.title}</div>
              <div className="bookingDesc fs24m14fw500">{data.desc}</div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

const BookingService = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [isDesktop]);

  return (
    <div className="container">
      <div className="fs38m24fwb bookingServiceTitle text-center">
        Booking{" "}
        <span className="primaryColor">Home based Healthcare Services</span> was
        never this easy and organized !
      </div>
      {isDesktop ? (<>
        <BookingServiceWeb />
      </>
      ) : (
        carouselElements.map((data, idx) => {
          return (
            <div className="bookingServiceMobItem text-center" key={idx}>
              <div className="primaryColor fs48m18fwb mb-2">{data.title}</div>
              <div className="fs24m14fw500 mb-2 bookingMobDesc">{data.desc}</div>
              <Image
                src={data.Image}
                width={266}
                height={280}
                className="bookingMobImages"
                alt="Booking Image"
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookingService;
