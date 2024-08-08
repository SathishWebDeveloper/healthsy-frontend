import Image from "next/image";
import { useRouter } from "next/router";

import DownloadBtn from "./DownloadBtn";

const popularConsultationSearchesArr = ["General Physician", "ENT", "Dermatology", "Genecology"]

const roundTick = "/assets/icons/round-tick.svg";
const searchIcon = "/assets/icons/magnifying-glass.svg";
const arrow = "/assets/arrow-left-white.svg"

const ServiceBanner = ({
  bannerTitle = "",
  bannerListPoints = [],
  className = "",
  bannerImage,
  setDownloadModal = () => { },
  setBannerQrImg = () => { },
  pageName = ""
}) => {

  const navigate = useRouter().push

  return (
    <div className={`${className} serviceBannerSection`}>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="servicetopsectionWrapper">
          <h1 className="serviceBannerTitle fs48m30fwb text-white">
            {bannerTitle}
          </h1>
          <div className="row listPoints">
            {bannerListPoints.map((data, inx) => {
              return (
                <div className={data.className} key={inx}>
                  <Image src={roundTick} height={16} width={16} alt="Tick Imag" />
                  <span className="text-white">{data.text}</span>
                </div>
              );
            })}
          </div>
          {pageName !== "online-consultation" && <DownloadBtn setDownloadModal={setDownloadModal} setBannerQrImg={setBannerQrImg} pageName={pageName} />}
          {pageName === "online-consultation" &&
            <div className="searchFieldWrapper position-relative">
              <input
                type="text"
                placeholder="Search for Sepcialization"
                className="consultationSearchField"
              />
              {/* <div className="text-white">
                <span className="fs18m14fw500m600">Popular Searches</span>
                <div className="d-flex popularSearchWrapper">
                  {popularConsultationSearchesArr.map((data, inx) =>
                    <div key={inx} className="popularConsultationSearch fs18 flexCenter">{data}
                      <span>
                        <Image src={arrow} width={11} height={15} alt="arrow" className="onlineDoctorArrow" />
                      </span>
                    </div>
                  )}
                </div>
              </div> */}
              <Image
                src={searchIcon}
                width={24}
                height={24}
                alt="search-icon"
                className="consultationSearchIcon"
              />
              <button className="consultationSearchBtn fs20fwb text-white desktopContent" onClick={() => navigate("/doctor-listing")}>Search</button>
            </div>
          }
        </div>
        <Image
          src={bannerImage}
          height={620}
          width={620}
          className="serviceBannerImg"
          alt="service-banner"
          priority
        />
      </div>
    </div>
  );
};

export default ServiceBanner;
