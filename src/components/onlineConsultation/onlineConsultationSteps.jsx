import { useState, useEffect } from "react";
// import step1 from "../../assets/onlineConsultation/doctor-specialization.webp";
// import step2 from "../../assets/onlineConsultation/choose-doctor.webp";
// import step3 from "../../assets/onlineConsultation/select-date.webp";
// import step4 from "../../assets/onlineConsultation/mob-patient-details.webp";
// import step5 from "../../assets/onlineConsultation/review-details.webp";
// import step6 from "../../assets/onlineConsultation/consultation-mode.webp";
// import step7 from "../../assets/onlineConsultation/valid.webp";
// import step8 from "../../assets/onlineConsultation/consultation-completed.webp";
// import mobStep1 from "../../assets/onlineConsultation/mob-doctor-specialization.webp";
// import mobStep2 from "../../assets/onlineConsultation/mob-choose-doctor.webp";
// import mobStep3 from "../../assets/onlineConsultation/mob-select-date.webp";
// import mobStep4 from "../../assets/onlineConsultation/mob-patient-details.webp";
// import mobStep5 from "../../assets/onlineConsultation/mob-review-details.webp";
// import mobStep6 from "../../assets/onlineConsultation/mob-consultation-mode.webp";
// import mobStep7 from "../../assets/onlineConsultation/mob-valid.webp";
// import mobStep8 from "../../assets/onlineConsultation/mob-consultation-completed.webp";
// import curve from "../../assets/onlineConsultation/curve.svg"
// import stepArrow from "../../assets/stepArrow.svg"

const step1 = "/assets/onlineConsultation/doctor-specialization.webp";
const step2 = "/assets/onlineConsultation/choose-doctor.webp";
const step3 = "/assets/onlineConsultation/select-date.webp";
const step4 = "/assets/onlineConsultation/mob-patient-details.webp";
const step5 = "/assets/onlineConsultation/review-details.webp";
const step6 = "/assets/onlineConsultation/consultation-mode.webp";
const step7 = "/assets/onlineConsultation/valid.webp";
const step8 = "/assets/onlineConsultation/consultation-completed.webp";
const mobStep1 = "/assets/onlineConsultation/mob-doctor-specialization.webp";
const mobStep2 = "/assets/onlineConsultation/mob-choose-doctor.webp";
const mobStep3 = "/assets/onlineConsultation/mob-select-date.webp";
const mobStep4 = "/assets/onlineConsultation/mob-patient-details.webp";
const mobStep5 = "/assets/onlineConsultation/mob-review-details.webp";
const mobStep6 = "/assets/onlineConsultation/mob-consultation-mode.webp";
const mobStep7 = "/assets/onlineConsultation/mob-valid.webp";
const mobStep8 = "/assets/onlineConsultation/mob-consultation-completed.webp";
const curve = "/assets/onlineConsultation/curve.svg"
const stepArrow = "/assets/stepArrow.svg"

const OnlineConsultationSteps = ({className = ""}) =>{
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
      const media = window.matchMedia("(min-width: 769px)");
      const listener = () => setIsDesktop(media.matches);
      listener();
      window.addEventListener("resize", listener);
  
      return () => window.removeEventListener("resize", listener);
    }, [isDesktop]);
  
    const consultationSteps = [
        {
            image: isDesktop ? step1:mobStep1,
            stepTitle: "Select your doctor specialization",
            stepExplanation:
                "Consult doctors based on doctor specialization or by common health concerns",
        },
        {
            image: isDesktop ? step2:mobStep2,
            stepTitle: "Choose your preferred doctor",
            stepExplanation:
                "Select your preferred doctor from the respective specialization",
        },
        {
            image: isDesktop ? step3:mobStep3,
            stepTitle: `Choose your convenient date & time`,
            stepExplanation:
                "Select your preferred date and time slots from the chosen doctor's availability",
        },
        {
            image: isDesktop ? step4:mobStep4,
            stepTitle: "Fill your basic details",
            stepExplanation:
                "Fill details for online doctor consultation such as patient name, symptoms",
        },
        {
            image: isDesktop ? step5:mobStep5,
            stepTitle: "Review details & Pay",
            stepExplanation:
                "Review your details and proceed to payment using your most convenient method",
        },
        {
            image: isDesktop ? step6:mobStep6,
            stepTitle: "Multiple consultation modes",
            stepExplanation:
                "Connect with your doctor either via video, audio or chat",
        },
        {
            image: isDesktop ? step7:mobStep7,
            stepTitle: "Get digital prescription",
            stepExplanation:
                "Get digital prescription from your doctors during the consultation, use this digital prescription to buy required medicines on HealthSy or you can use this digital prescription to buy in your local pharmacy ",
        },
        {
            image: isDesktop ? step8:mobStep8,
            stepTitle: "Free follow-up",
            stepExplanation:
                "Free follow-up period post completion of your online consultation sessions",
        },
    ];
    return (
        <div className={`consultationstepsWrapper ${className}`}>
        <div className="stepsHeading fs38m24fwb">Consult with Doctors Online in the most <span className="primaryColor"> Effective and Efficient Way </span></div>
        <div className="consultationsteps container">
            <div className='consultatoionStepsImage'>
                <img src={curve} alt='Curve'></img>
            </div>
            {consultationSteps.map((data, idx) => {
                return (
                    <div
                        className={`bookingStep1 consultationStepsContent p-5 pb-0 d-flex justify-content-between align-items-center ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                            } `}
                        key={idx}
                    >   
                        <div>
                            <div className={` mb-4 d-flex align-items-end justify-content-end ${(idx%2) ? "flex-row-reverse " : ""} mobContent`}>
                                <img src={stepArrow} className="stepsArrow" style={{transform: (idx%2) ?"scaleX(-1)":"scaleX(1)"}} alt='Arrow'/>
                                <div className="stepsArrowText">Step {idx+1}</div>
                            </div>
                            <img
                                src={data.image}
                                className={`consultationstepesSectionImage ${idx === 7 && 'mb-5'}`}
                                alt='Steps'
                            ></img>
                        </div>
                        <div className="bookingStep1ContentWrapper consultationStepsWrapper"> 
                            <div className="stepTitle consultationStepsTilte mb-4 text-start">{data.stepTitle}</div>
                            <div className="stepExplanation consultationStepsDesc text-start">{data.stepExplanation}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    )
}

export default OnlineConsultationSteps;