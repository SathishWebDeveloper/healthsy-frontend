// import contactUsBanner from "../../assets/contact-us-banner.webp"
const contactUsBanner = "/assets/contactUs/contact-us-gif.gif"
const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const ContactUsBanner = () => {

  return (
    <>
      <div className="contactUsBannerSectionWrapper position-relative pt-4">
        <div className="contactUsBannerSection container d-flex align-items-center justify-content-between pt-5">
        <div className="text-white contactUsBannerTitle">
            <div className="">Hey there,</div>
            <div className="">We’re here for you</div>
          </div>
          <img
            src={contactUsBanner}
            className="contactUsBannerImg"
            alt="Contact Us Banner"
          ></img>
          <div className="padding-section container position-absolute">
            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
              <img src={home} alt="home" />
            </a>{" "}
            <img src={arrowleft} alt="arrow-left" className="breadcrumb-arrow-left" />{" "}
            <a href="#" className="text-white"> Contact Us </a>
          </div>
        </div>
      </div>
      </>
  );
};

export default ContactUsBanner;