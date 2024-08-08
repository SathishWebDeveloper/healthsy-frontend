import Image from "next/image";
import DownloadBtn from "../Common/DownloadBtn";
import useIsDesktop from "../Hooks/useIsDesktop";

const homeHealthcareBanner = "/assets/homeHealthcare/home-healthcare-banner.webp"
const homeHealthcareBannerMob = "/assets/homeHealthcare/mobile-home-healthcare-banner.webp"

const roundTick = "/assets/icons/round-tick.svg"


const HomeHealthcareBanner = ({ setDownloadModal, pageName, setBannerQrImg }) => {

  const points = [
    { text: "100% Safe", className: "col-5" },
    { text: "Affordable Prices", className: "col-7" },
    { text: "Hygiene Standards Followed", className: "col-12 mt-3" },
  ];

  const isDesktop = useIsDesktop()

  return (
    <div className="homeHealthcareBannerSection">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="healthcaretopsectionWrapper">
          <h1 className="healthcareBannerTitle fs48m30fwb text-white">
            Book Home Healthcare Services
            with Qualified Professionals
            on HealthSy
          </h1>
          <div className="row listPoints">
            {points.map((data, inx) => {
              return (
                <div className={data.className} key={inx}>
                  <Image src={roundTick} height={16} width={16} alt="tick" />
                  <span className="text-white">{data.text}</span>
                </div>
              )
            })}
          </div>
          <DownloadBtn setDownloadModal={setDownloadModal} setBannerQrImg={setBannerQrImg} pageName={pageName} />
          <div>
          </div>
        </div>
        <img
          src={isDesktop ? homeHealthcareBanner : homeHealthcareBannerMob}
          className="homeHealthcareBannerImg"
          alt="home-healthcare-banner"
        ></img>
      </div>
    </div>
  );
};

export default HomeHealthcareBanner;
