import { useRef, useState, useEffect } from "react";

// import inclinicBannerMob from "../../assets/inclinic/inclinic-banner-mob.webp"
// import inclinicBanner from "../../assets/inclinic/inclinic-banner.webp"
const inclinicBannerMob = "/assets/inclinic/inclinic-banner-mob.webp"
const inclinicBanner = "/assets/inclinic/inclinic-banner.webp"

const InClinicBanner = () => {
  const [textIndex, setTextIndex] = useState(0);
  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;
    const childHeight = child.offsetHeight;
    parent.style.height = `${childHeight}px`;
    const interval = setInterval(() => {
      setTextIndex((textIndex + 1) % 3);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [textIndex]);

  const texts = [
    "100% Safe and Secured",
    "Get appointment reminders",
    "Skip the queues",
  ];

  return (
    <div className="topSection container d-flex align-items-center justify-content-around">
      <div className="topsectionWrapper">
        <div className="firstLabel">Book your</div>
        <div className="firstLabel">
          In-Clinic appointments with top doctors on HealthSy
        </div>
        <div ref={parentRef} className="lastLabel mt-3 mb-5 position-relative">
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
        </div>
        <div>
          <button className="btn btn-learnMore">Download the App</button>
        </div>
      </div>
      <img
        src={inclinicBannerMob}
        className="inclinicBannerImg mobContent"
        alt="In-clinic-banner"
      ></img>
       <img
        src={inclinicBanner}
        className="inclinicBannerImg desktopContent"
        alt="In-clinic-banner"
      ></img>
    </div>
  );
};

export default InClinicBanner;
