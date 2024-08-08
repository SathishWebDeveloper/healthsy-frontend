import { useState, useEffect } from 'react'

// import step1 from "../../assets/homeHealthcare/speech-therapy.webp";
// import step2 from "../../assets/homeHealthcare/nursing-service.webp";
// import step3 from "../../assets/homeHealthcare/select-date-and-time.webp";
// import step4 from "../../assets/homeHealthcare/patient-details-healthcare.webp";
// import step5 from "../../assets/homeHealthcare/confirm-and-pay.webp";
// import step6 from "../../assets/homeHealthcare/verified-pin.webp";

// import mobStep1 from "../../assets/homeHealthcare/mob-speech-therapy.webp";
// import mobStep2 from "../../assets/homeHealthcare/mob-nursing-service.webp";
// import mobStep3 from "../../assets/homeHealthcare/mob-select-date-and-time.webp";
// import mobStep4 from "../../assets/homeHealthcare/patient-details-healthcare.webp";
// import mobStep5 from "../../assets/homeHealthcare/mob-patient-details-healthcare.webp";
// import mobStep6 from "../../assets/homeHealthcare/mob-verified-pin.webp";
// import stepArrow from "../../assets/stepArrow.svg"
const step1 = "/assets/homeHealthcare/speech-therapy.webp";
const step2 = "/assets/homeHealthcare/nursing-service.webp";
const step3 = "/assets/homeHealthcare/select-date-and-time.webp";
const step4 = "/assets/homeHealthcare/patient-details-healthcare.webp";
const step5 = "/assets/homeHealthcare/confirm-and-pay2.svg";
const step6 = "/assets/homeHealthcare/verified-pin.webp";

const mobStep1 = "/assets/homeHealthcare/mob-speech-therapy.webp";
const mobStep2 = "/assets/homeHealthcare/mob-nursing-service.webp";
const mobStep3 = "/assets/homeHealthcare/mob-select-date-and-time.webp";
const mobStep4 = "/assets/homeHealthcare/patient-details-healthcare.webp";
// todo need
const mobStep5 = "/assets/homeHealthcare/confirm-and-pay2.svg";
const mobStep6 = "/assets/homeHealthcare/mob-verified-pin.webp";
const stepArrow = "/assets/stepArrow.svg"

const HomeHealthcareSteps = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const bookingSteps = [
    {
      image: isDesktop ? step1 : mobStep1,
      stepTitle: "Select your doctor specialisation",
      stepExplanation:
        "Book home healthcare services based on categories or based on conditions",
    },
    {
      image: isDesktop ? step2 : mobStep2,
      stepTitle: "Select your preferred doctor in your locality",
      stepExplanation:
        "Select your preferred home healthcare service provider from the listing in your city / town ",
    },
    {
      image: isDesktop ? step3 : mobStep3,
      stepTitle: `Select your preferred
                date & time slot`,
      stepExplanation:
        "Select your preferred date and time slot from the Home Healthcare Service Provider’s availability",
    },
    {
      image: isDesktop ? step4 : mobStep4,
      stepTitle: "Fill in your required details",
      stepExplanation:
        "Fill the required details for the Home Healthcare booking such as name, age, etc..",
    },
    {
      image: isDesktop ? step5 : mobStep5,
      stepTitle: "Review your details & select your payment mode",
      stepExplanation:
        "Review details select your payment mode and pay",
    },
    {
      image: isDesktop ? step6 : mobStep6,
      stepTitle: "Visit your doctor in a hassle free & secured manner",
      stepExplanation:
        "Service provider visits your home verifies the booking, carries out your chosen service and completes the booking successfully",
    },
  ];
  return (
    <div className="container">
      <div className="healthcareStepsTitleWrapper d-flex justify-content-center">
        <div className="healthcareStepsTitle">
          Booking Home based Healthcare Services was never this easy and organized !
        </div>
      </div>
      {bookingSteps.map((data, idx) => {
        return (
          <div
            className={`healthcareStepWrapper m-5 py-4 d-flex justify-content-around align-items-center ${idx % 2 !== 0 ? "flex-row" : "flex-row-reverse"
              } `}
            key={idx}
          >
            <div>
              <div className={` mb-4 d-flex align-items-end justify-content-end ${(idx % 2 !== 0) ? "flex-row-reverse " : ""} mobContent`}>
                <img src={stepArrow} className="stepsArrow" style={{ transform: (idx % 2 !== 0) ? "scaleX(-1)" : "scaleX(1)" }} alt="stepArrow" />
                <div className="stepsArrowText">Step {idx + 1}</div>
              </div>
              <img
                src={data.image}
                className={`${idx % 2 !== 0 ? "stpesImageRow" : "stpesImageRowReverse"
                  }`}
                alt={`home-healthcare-step-${idx}`}
              ></img>
            </div>
            <div className="">
              {/* <div className="stepTitle mb-4">{data.stepTitle}</div> */}
              <div className="stepExplanation mt-4">{data.stepExplanation}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeHealthcareSteps;
