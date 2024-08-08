import { useRef, useState, useEffect } from "react";
const bannerImg = '/assets/onlineConsultation/online-consultation-banner.webp'
const mobBannerImg = '/assets/onlineConsultation/mob-online-consultation-banner.webp'
const arrowleft = "/assets/arrow-left.svg";
const home = "/assets/home-icon.svg";

const OnlineConsultationBanner = () => {
  const [textIndex, setTextIndex] = useState(0);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const sentences = ["Digital and Contactless", "100% Safe and Secured"];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentenceIndex(currentIndex => (currentIndex + 1) % sentences.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;
    const childHeight = child.offsetHeight;
    parent.style.height = `${childHeight}px`;
    const interval = setInterval(() => {
      setTextIndex((textIndex + 1) % 2);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [textIndex]);

  const texts = [
    "100% Safe and Secured",
    "Digital and Contact less",
    // "Skip the queues",
  ];
  return (
    <div className="onlineConsultationTopContent">
      <div className="container">
        <div className="padding-section consultationBreadcrumb  pt-3">
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
            <img src={home} alt="home" />
          </a>{" "}
          <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
          <a href="#"> Online Doctor Consultations</a>
        </div>
      </div>
      <div className="container OnlineConsultation_bannerImage  mt-5  d-flex align-items-center justify-content-between">
        <div className="consultationTextWrapper">
          <div className="consultationTopLabel">
            Get Consulted Online by Doctors on HealthSy
          </div>
          <div ref={parentRef} className="animContent">
            <div ref={childRef} className={`animSentence consultationAnimeLabel lastLabel ${currentSentenceIndex === 0 ? "slide-in" : "slide-out"}`}>
              {sentences[0]}{" "}{" "}{" "}
            </div>
            <div className={`animSentence consultationAnimeLabel lastLabel ${currentSentenceIndex === 1 ? "slide-in" : "slide-out"}`}>
              {sentences[1]}{" "}{" "}{" "}
            </div>
          </div>
          {/* <div ref={parentRef} className="lastLabel mt-3 mb-5 position-relative">
          {texts.map((text, index) => (
            <div
              key={index}
              ref={index === 1 ? childRef : null}
              className={`text position-absolute ${
                index === textIndex ? "show" : ""
              }`}
            >
              {text}
            </div>
          ))}
        </div> */}
          <div className="mt-4">
            <button className="btn btn-learnMore">Download the App</button>
          </div>
        </div>
        <div className="">
          <img src={bannerImg} className="consultationBannerImg desktopContent" alt='Consultation'></img>
          <img src={mobBannerImg} className="consultationBannerImg mobContent" alt='Consultation'></img>
        </div>
      </div>
    </div>
  );
};

export default OnlineConsultationBanner;

