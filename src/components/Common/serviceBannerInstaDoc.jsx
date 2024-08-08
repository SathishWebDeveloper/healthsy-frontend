import Image from "next/image";
import { useState } from "react";

import DownloadBtn from "./DownloadBtn";

const roundTick = "/assets/icons/round-tick.svg";
const chat = "/assets/insta-doc/chat.webp";

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
  QRcodeImg = "",
  scanText =
  healthConditionsList = []
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
            btnText={"Download Now"}
            btnClassName="downloadAppBtn"
          />
          <div className="QRcodeWrapper d-flex align-items-center w-100 pb-5 desktopContent">
            <div className="QRcode">
              <Image src={QRcodeImg} alt="QR code" width={94} height={94} />
            </div>
            <div className="QRcodeContent ms-4 fw-bold">{scanText}</div>
          </div>
        </div>
        <div className="bannerImgWrapper">
          <Image
            src={bannerImage}
            height={520}
            width={875}
            className={`${webImgClass} serviceBannerImgTypeTwo`}
            alt="service-banner"
            priority
          />
          <Image
            src={chat}
            height={44}
            width={116}
            className={`position-absolute chatOne`}
            alt="service-banner"
            priority
          />
           <Image
            src={chat}
            height={33}
            width={95}
            className={`position-absolute chatTwo`}
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
        </div>
        {/* <Image src={mobBannerimage}  width={428} height={494} className="mobContent" alt="serviceBanner"/> */}
      </div>
      {/* <PhysioRegistrationForm bookNowForm={bookNowForm} setBookNowForm={setBookNowForm} citiesList={citiesList} healthConditionsList={healthConditionsList} /> */}
    </div>
  );
};

export default ServiceBannerTypeTwo;
