import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

// import CalenderIcon from '../../Icons/calender';
// import ConsultIcon from '../../Icons/consult';
// import PrescriptionIcon from '../../Icons/prescription';
// import FollowupsIcon from '../../Icons/followups';
// import { useNavigate } from "react-router-dom";
const booking = "/assets/homeHealthcare/booking.webp";
const manage = "/assets/homeHealthcare/manage.webp";
const screen6 = "/assets/homeHealthcare/grow.webp";
const screen8 = "/assets/homeHealthcare/helpAndSupport.webp";

const CalenderIcon = "/assets/icons/shieldVerified.svg";
const ConsultIcon = "/assets/icons/messanger.svg";
const PrescriptionIcon = "/assets/icons/indianrupee.svg";
const FollowupsIcon = "/assets/icons/clock.svg";

const HighlightHomeHealthcare = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  // const navigate = useRouter().push
  const data = [
    {
      logo: CalenderIcon,
      title: "Manage Your Bookings",
      text: "Manage all your active, upcoming and completed bookings at ease",
      image: booking,
    },
    {
      logo: ConsultIcon,
      title: "Manage your availability and patients",
      text: "Update your schedule and manage your patients efficiently",
      image: manage,
    },
    {
      logo: PrescriptionIcon,
      title: "Manage your payment and settlements",
      text: "Keep track of your payments and settlements from time to time",
      image: screen6,
    },
    {
      logo: FollowupsIcon,
      title: "Help and support",
      text: "Reach out to support via chat, call or email",
      image: screen8,
    },
  ];

  const [selectImage, setSelectImage] = useState(0);

  const onUpdateSlide = (index) => {
    if (index !== selectImage) {
      setSelectImage(index);
    }
  };

  return (
    <div className="container heightlightHomeHealthcare">
      <div className="highlightHealthcareTitle text-center">
        Highlights of <span className="primaryColor">‘HealthSy for HHSP’</span> App
      </div>
      <div className=" w-100 d-flex justify-content-between align-items-end">
        <div className="content desktopContent">
          <ul className="">
            {data.map((el, index) => {
              const SvgIcon = el.logo;
              return (
                <li
                  key={index}
                  className={`d-flex ${el.title === data[selectImage].title ? "active" : ""
                    }`}
                >
                  <div className="highlightImgWrapper flexCenter">
                    <Image src={el.logo} width={44} height={44} alt={`Highlight Image-${index + 1}`} />
                  </div>
                  <div>
                    <div className="highlightTitle">{el.title}</div>
                    <div className="highlightText">{el.text}</div>
                  </div>
                  {/* <SvgIcon test="i" /> {el.text} */}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-5 carouselWrapper">
          <Carousel
            animationHandler="fade"
            className="highlights-doc-img"
            axis="horizontal"
            infiniteLoop
            autoPlay
            swipeable={false}
            interval={2500}
            showArrows={true}
            showThumbs={false} // set to false
            ariaLabel={true}
            showIndicators={true}
            selectedItem={selectImage}
            onChange={onUpdateSlide}
          >
            {data.map((e, i) => {
              return (
                <div key={i} className="container car-img">
                  <div className="carousel-images-fordoc">
                    <img
                      src={e.image}
                      alt="carousel-images"
                      style={{
                        maxWidth: i === 3 ? "370px" : "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="highlightTextContent mobContent">
                    <div className="highlightTitle">{e.title}</div>
                    <div className=" highlightMobDesc">{e.text}</div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HighlightHomeHealthcare;
