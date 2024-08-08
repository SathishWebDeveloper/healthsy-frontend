import JobShare from "../../Modals/JobShare/JobShare";

const arrowleft = "/assets/arrow-left.svg";
const home = "/assets/home-icon.svg";

const CareerDetailBanner = ({ jobDetails }) => {
  return (
    <>
      <div className="CareerDetailBannerSection ">
        <div className="padding-section container pt-3">
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
            <img src={home} alt="home" />
          </a>{" "}
          <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/join-us`}> Careers </a>
          <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
          <a href="#"> {jobDetails?.designation} </a>
        </div>
        <div className="container jobBannerContent">
          <div className="jobTitle">{jobDetails?.designation}</div>
          <div className="d-flex align-items-center">
            <span className="jobLocation">{jobDetails?.job_Location}</span>
            <span className="dot"></span>
            <span className="typeOfJob">{jobDetails?.type_of_job}</span>
          </div>
          <div className="d-flex justify-content-between align-items-end jobBannerBottomContent">
            <span className="validDate">
              Application valid till: {jobDetails?.jobpost_expiry}
            </span>
            <div className="jobBannerBtns">
              <a href={`#jobapply`}>
                <button className="applyNowBtn">Apply Now</button>
              </a>
              <a href={`#`}>
                <button
                  className="shareBtn"
                  // className="share"
                  data-bs-toggle="modal"
                  data-bs-target="#jobshare"
                >
                  Share
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <JobShare data={jobDetails} />
    </>
  );
};

export default CareerDetailBanner;
