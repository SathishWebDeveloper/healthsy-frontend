import React, { useEffect, useState, memo } from "react";
import Link from "next/link";

const mobile1 = "/assets/homepage/home-img.webp";

const HomepageTop = ({ isiOS, setDownloadModal = () => { } }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  return (
    <div className="homepage-top">
      <h4 className="get-content">
        <div className="scroller">
          <div className="scroller-el-wrap">
            <span>Order Medicines</span>
            <span>Online Doctor Consultations</span>
            <span>Buy Healthcare Products</span>
            <span>Home Healthcare Services</span>
            <span>In-Clinic Appointments</span>
          </div>
        </div>
      </h4>
      <h1 className="title">Where Healthcare is Sincerely Yours !</h1>
      {isDesktop ? (
        <button type="button" className={`btn btn-learnMore`} onClick={setDownloadModal} >
          Download App
        </button>
      ) : (
        <Link href={isiOS()} target="_blank">
          <button type="button" className={`btn btn-learnMore`} >
            Download App
          </button>
        </Link>)}
      <img src={mobile1} data-parallax='{"x": 0, "y": -20}' alt="mobile1" className="bannerImageDesktop banner-mob-img " />
      <img src={mobile1} data-parallax='{"x": 0, "y": -20}' alt="mobile1" className="bannerImageMob homePageTopMob banner-mob-img content-mobile w-50" />
      {
        isDesktop
          ?
          <div
            className="circle"
            id="circle"
            data-parallax='{"x": 0, "y": -2500}'
          ></div>
          :
          <div
            className="circle_normal"
            id="circle_normal"
          ></div>
      }
    </div>
  );
};

export default memo(HomepageTop);
