import Image from "next/image";
import { useState } from "react";
import AdsDoctorVideo from "../DoctorsAd/AdsDoctorVideo";
import DoctorsAdvantages from "../DoctorsAd/DoctorsAdvantages";

const closeIcon = "/assets/home-sidebar-close.svg";
const dots = "/assets/dots.svg"

const AdvertiesmentBanner = ({
  title = "",
  bannerName = ""
}) => {

  const [show, setShow] = useState(true)
  const fileUrl = '/assets/dowloadBrochure/HealthSy Partnered Doctor Network Programme Brochure.pdf';

  return (
    <div className={`${bannerName}`}>
      {show && <div className="adBannerTopText w-100 row m-0">
        <span className="col-11 text-center">{<>Need to know more? <a className="primaryColor text-decoration-underline cursor-pointer" download href={fileUrl}>Download the Brochure</a></>}</span>
        <Image
          src={closeIcon}
          width={16}
          height={16}
          alt="close"
          className="col-1 p-0"
          onClick={() => setShow()}
        />
      </div>}
      <div className={`formLandingBannerContainer bg-primary text-center text-white position-relative`}>
        <div className="adHealthsyDoctorsBanner flexCenter">
          <span className="adHaelthsyPartneredDoctor justify-content-center">Become a HealthSy “Partnered Doctor” now !</span>
        </div>
        <div className="adLandingTitle">
          <span className="fs44m26fw800">{title}</span>
        </div>
        <div>
          <span className="fs18m14fw500">Get on-board HealthSy now and provide your services to thousands more.</span>
        </div>
        <div className="d-flex justify-content-center doctorsAdvantagevideo">
          <div>
            <DoctorsAdvantages />
          </div>
          <div>
            <AdsDoctorVideo 
            videoId = "861540371"
            />
          </div>
        </div>
        <Image
          src={dots}
          width={148}
          height={123}
          className="bannerDots desktopContent"
          alt="dots"
        />
      </div>
    </div>
  );
};

export default AdvertiesmentBanner;
