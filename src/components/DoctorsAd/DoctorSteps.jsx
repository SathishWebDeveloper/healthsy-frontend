import Image from "next/image";

const stepsImage = "/assets/Advertiesment/ad-landing-web-image.webp";
const stepsMobImage = "/assets/Advertiesment/ad-landing-mob-img.webp";
const pointerImg = "/assets/large-dots.png"

const DoctorsAdSteps = ({
  title = "",
  desc = "On-boarding process made simple",
  registerLink = "",
  getStartedLink = "",
}) => {
  return (
    <div className="doctorsAdStepCom text-center position-relative doctorAdsBanner">
      <div id={getStartedLink} className="formLandingSteps doctorAdSteps bg-primary">
        <div className="container">
          <Image
            src={pointerImg}
            width={59}
            height={253}
            alt="pointerImg"
            className="desktopContent doctorsAdsPointerImg">
          </Image>
          <div className="fs36m28fwb doctorAdSection">{title}</div>
          <div className="fs18m14fw500 text-center">{desc}</div>
          <div className="stepsImgWrapper doctorAdsImage">
            <Image
              src={stepsImage}
              fill
              quality={100}
              alt="Steps Image"
              className="desktopContent adDocStepsImg"
            />
            <Image
              src={stepsMobImage}
              fill
              quality={100}
              className="mobContent"
              alt="Steps Image"
            />
          </div>
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${registerLink}`}>
            <button className="doctorAdRegistrationBtn">
              <span className="registerNow-btn fs16fwb desktopContent">Grow Your Profession - Register Now</span>
              <span className="registerNow-btn fs16fwb mobContent">Grow Your Profession</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorsAdSteps;