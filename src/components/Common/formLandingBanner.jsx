import Image from "next/image";

const QRcode = "/assets/QRcode.png";
const arrowleft = "/assets/arrow-left.svg";
const home = "/assets/home-icon.svg";

const FormLandingBanner = ({
  breadcrumbText = "",
  title = "",
  describtion = "",
  scanText = "",
  bannerImage,
  bannerImageAlt = "Image",
  getStartedLink = "#",
  bannerName = "",
  QRcodeImg = "",
  mobBanner = "",
  isQRSection = true
}) => {
  return (
    <div className={`formLandingBannerContainer ${bannerName}`}>
      <div className="container pt-3">
        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
          <Image src={home} height={13} width={13} alt="home" />
        </a>{" "}
        <Image
          src={arrowleft}
          height={13}
          width={13}
          alt="arrow"
          className="breadcrumb-arrow-left mx-0"
        />{" "}
        <a href="#" className="breadcrumbText ps-2">
          {" "}
          {breadcrumbText}{" "}
        </a>
      </div>
      <div className="formLandingBannerContent container d-flex justify-content-between align-items-start mt-5">
        <div className="formLandingContentWrapper">
          <h1 className="formLandingBannerTitle">{title}</h1>
          <div className="formLandingBannerDesc mt-4">{describtion}</div>
          <div className="formLandingBannerButton">
            <a href={getStartedLink}>
              <button className="btn btn-learnMore">Get started</button>
            </a>
          </div>
          {isQRSection?
          <div className="QRcodeWrapper d-flex align-items-center w-100 pb-5">
            <div className="QRcode">
              <Image src={QRcodeImg} alt="QR code" width={94} height={94} />
            </div>
            <div className="QRcodeContent ms-4">{scanText}</div>
          </div>
          :<></>}
        </div>
        <Image
          src={bannerImage}
          priority
          width={631}
          height={642}
          className="formLandingBannerImg"
          alt={bannerImageAlt}
        />
        {bannerName === "instaDocBanner" &&
          <Image
            src={mobBanner}
            priority
            width={290}
            height={456}
            className="formLandingMobBannerImg mobContent"
            alt={bannerImageAlt}
          />
        }
      </div>
    </div>
  );
};

export default FormLandingBanner;
