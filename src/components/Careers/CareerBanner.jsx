import Image from "next/image";

const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";
const careerBannerImg = "/assets/careers/careersBanner.webp";

const CareerBanner = () => {
  return (
    <div className="careerBannerSection">
      <Image
        src={careerBannerImg}
        fill
        alt="My Image"
        className="careerBannerImg"
      />
      <div className="careersBannerContent flexCenter w-100">
        <div className="position-absolute w-100 top-0">
          <div className="container ">
            <div className="pt-3 d-flex text-white">
              <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                <img src={home} alt="home" />
              </a>{" "}
              <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
              <a href="#" className="text-white">
                {" "}
                Careers{" "}
              </a>
            </div>
          </div>
        </div>
        <h1 className="text-white">Join the Health Tech Revolution - Careers at HealthSy</h1>
      </div>
    </div>
  );
};

export default CareerBanner;
