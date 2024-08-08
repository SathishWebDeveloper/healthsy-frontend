import Image from "next/image";

const healthsyLifeBannerImage = "/assets/healthsyLife/healthsy_life_banner.png";
const home = "/assets/home.png";
const arrowleft = "/assets/arrow-left.png";

const HealthsyLifeBanner = () => {
  return (
    <div className="lifeBannerSection">
      <Image
        src={healthsyLifeBannerImage}
        className="healthsyLifeBanner"
        fill
        alt="HealthSy Life Image"
        priority
      />
      <div className="lifeBannerContent flexCenter w-100">
        <div className="position-absolute w-100 top-0">
          <div className="container ">
            <div className="pt-3 d-flex align-items-baseline text-white">
              <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                <img src={home} alt="home" />
              </a>{" "}
              <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
              <a href="#" className="text-white">
                {" "}
                HealthSy Life{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-white">
            Opportunities don’t happen, you create them
          </h1>
          <a
            className="btn btn-open-positions d-flex align-items-center justify-content-center"
            href={`${process.env.NEXT_PUBLIC_WEB_URL}/join-us`}
          >
            See open positions
          </a>
        </div>
      </div>
    </div>
  );
};

export default HealthsyLifeBanner;
