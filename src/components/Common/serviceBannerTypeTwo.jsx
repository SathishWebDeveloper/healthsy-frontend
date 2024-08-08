import Image from "next/image";
import { useState } from "react";

import PhysioRegistrationForm from "../Physiotheraphy/PhysioRegistrationForm";
import DownloadBtn from "./DownloadBtn";

const roundTick = "/assets/icons/round-tick.svg";
const arrow = "/assets/Physiotheraphy/book-now-arrow.svg";

const ServiceBannerTypeTwo = ({
  bannerTitle = "",
  bannerListPoints = [],
  bannerclassName = "serviceBannerTwoContent",
  titleClassName = "fs48m30fwb",
  citybanner = "",
  bannerImage,
  mobBannerimage = "",
  setDownloadModal = () => { },
  webImgClass = "",
  mobImgClass = "d-none",
  wrapperClass = "",
  citiesList = [],
  healthConditionsList = [],
}) => {

  const [bookNowForm, setBookNowForm] = useState(false);

  return (
    <div className="bgPrimary position-relative">
      <div className={`serviceBannerTwoWrapper ${wrapperClass} container pt-3 d-flex align-items-center justify-content-between`}>
        <div className={`${bannerclassName}`}>
          <h1 className={`${titleClassName} serviceBannerTitle text-white`}>
            {bannerTitle}
          </h1>
          <div className={`${citybanner} d-flex listPoints flex-wrap`}>
            {bannerListPoints.map((data, inx) => {
              return (
                <div className={"flexCenter"} key={inx}>
                  <Image src={roundTick} height={16} width={16} alt="Tick Imag" />
                  <span className="text-white">{data.text}</span>
                </div>
              );
            })}
          </div>
          <DownloadBtn
            setDownloadModal={() => setBookNowForm(true)}
            btnText={<span>Book Now <Image src={arrow} width={12} height={12} className="bookArrow" alt="book" /></span>}
            btnClassName="downloadAppBtn bookNowBtn"
          />
        </div>
        <Image
          src={bannerImage}
          height={620}
          width={675}
          className={`${webImgClass} serviceBannerImgTypeTwo`}
          alt="service-banner"
          priority
        />
        {mobBannerimage && <Image
          src={mobBannerimage}
          height={620}
          width={675}
          className={`${mobImgClass}  serviceBannerImgTypeTwo`}
          alt="service-banner"
          priority
        />}
        {/* <Image src={mobBannerimage}  width={428} height={494} className="mobContent" alt="serviceBanner"/> */}
      </div>
      <PhysioRegistrationForm bookNowForm={bookNowForm} setBookNowForm={setBookNowForm} citiesList={citiesList} healthConditionsList={healthConditionsList} />
    </div>
  );
};

export default ServiceBannerTypeTwo;
