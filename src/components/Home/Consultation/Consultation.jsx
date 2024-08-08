import Image from "next/image";
import React, { useState, useEffect, memo } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CalenderIcon = "/assets/homepage/Consultation/mob-presctiption.svg"
const ConsultIcon = "/assets/homepage/Consultation/mob-consultation.svg"
const PrescriptionIcon = "/assets/homepage/Consultation/prescription.svg"
const FollowupsIcon = "/assets/homepage/Consultation/mob-doc1.svg"

const calanderMobIcon = "/assets/homepage/Consultation/clock-icon.svg"
const ConsultMobIcon = "/assets/homepage/Consultation/social-media-icon.svg"
const PrescriptionMobIcon = "/assets/homepage/Consultation/document-mob-img.svg"
const FollowupsMobIcon = "/assets/homepage/Consultation/message-icon.svg"

const screen2 = "/assets/homepage/Consultation/gynaecologist.webp";
const screen4 = "/assets/homepage/Consultation/chat.webp";
const screen6 = "/assets/homepage/Consultation/prescription-membership.webp";
const screen8 = "/assets/homepage/Consultation/free-follow.webp";
const mob_screen2 = "/assets/homepage/Consultation/gynaecologist.webp";
const mob_screen4 = "/assets/homepage/Consultation/chat.webp";
const mob_screen6 = "/assets/homepage/Consultation/prescription-membership.webp";
const mob_screen8 = "/assets/homepage/Consultation/free-follow.webp";

const Consultation = () => {

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const [selectImage, setSelectImage] = useState(0);

  const onUpdateSlide = (index) => {
    if (index !== selectImage) {
      setSelectImage(index);
    }
  };

  const data = [
    {
      logo: CalenderIcon,
      text: "Select Preferred Doctor / Time Slot",
      image: isDesktop ? screen2 : mob_screen2,
      selectedLogo: calanderMobIcon,
    },
    {
      logo: ConsultIcon,
      text: "Consult via Audio, Video and Chat",
      image: isDesktop ? screen4 : mob_screen4,
      selectedLogo: ConsultMobIcon,
    },
    {
      logo: PrescriptionIcon,
      text: "Get Digital Prescription",
      image: isDesktop ? screen6 : mob_screen6,
      selectedLogo: PrescriptionMobIcon,
    },
    {
      logo: FollowupsIcon,
      text: "Free Follow Ups",
      image: isDesktop ? screen8 : mob_screen8,
      selectedLogo: FollowupsMobIcon,
    },
  ];

  return (
    <div className="consultation w-100">
      <div className="img-container desktopContent">
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
          {
            data.map((e, i) => {
              return (
                <div key={i} className=" car-img">
                  <div className="carousel-images-fordoc">
                    <Image src={e.image} width={536} height={518} alt="image" style={{ maxWidth: i === 3 ? '370px' : 'auto', objectFit: 'contain' }} />
                  </div>
                </div>
              )
            })
          }
        </Carousel>
      </div>
      <div className="content mob-text-content consultationContentWrapper">
        <h5 className="primaryColor fs16fw600">100% SAFE AND SECURE</h5>
        <h2 className="title fs36m22fwb">
          Simple, Secure and Seamless Online Doctor Consultations!
        </h2>
        <div className="desktopContent">
          <ul className="features">
            {data.map((el, index) => {
              // const SvgIcon = el.logo;
              return (
                <li key={index} className={el.text === data[selectImage].text ? "active" : ""}>
                  <Image src={el.text === data[selectImage].text ? el.selectedLogo : el.logo} width={29} height={30} test="i" alt="logo" /> {el.text}
                </li>
              );
            })}
          </ul>
          <div className='home_page_learn_more'>
            <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/online-doctor-consultations
`}>Learn More</a>
          </div>
        </div>

        <div className="mobContent">
          <div className="img-container">
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
              {
                data.map((e, i) => {
                  return (
                    <div key={i} className=" car-img">
                      <div className="carousel-images-fordoc">
                        <Image src={e.image} width={350} height={200} alt="image" style={{ maxWidth: i === 3 ? '370px' : 'auto', objectFit: 'contain' }} />
                        <div className="fs16fw600">{e.text}</div>
                      </div>
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <div className='home_page_learn_more'>
            <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/online-doctor-consultations
`}>Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Consultation);