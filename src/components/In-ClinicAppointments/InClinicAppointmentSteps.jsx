import { useState, useEffect } from 'react'
import Image from 'next/image';

const step1 = "/assets/inclinic/Select-your-doctor-specialization.webp";
const step2 = "/assets/inclinic/Select-your-preferred-doctor-in-your-locality.webp";
const step3 = "/assets/inclinic/select-date-and-time.webp";
const step4 = "/assets/inclinic/Fill-your-details.webp";
const step5 = "/assets/inclinic/review-your-details.webp";
const step6 = "/assets/inclinic/vist-your-doctor.webp";

const mobStep1 = "/assets/inclinic/mob-select-your-doctor-specialization.webp";
const mobStep2 = "/assets/inclinic/mob-select-your-preferred-doctor-in-your-locality.webp";
// todo need
const mobStep3 = "/assets/inclinic/select-date-and-time.webp";
const mobStep4 = "/assets/inclinic/mob-fill-your-details.webp";
const mobStep6 = "/assets/inclinic/mob-vist-your-doctor.webp";
const stepArrow = "/assets/stepArrow.svg"

const dotorSpecialisation = "/assets/inclinic/dotor-specialisation.webp"
const generalPhysician = "/assets/inclinic/general-physician.webp"
const dateTimeSlot = "/assets/inclinic/date-time-slot.webp"
const dateTime = "/assets/inclinic/date-time.webp"
const requiredDetails = "/assets/inclinic/required-details.webp"
const appointmentDateTime = "/assets/inclinic/appointment-date-time.webp"

const InClinicAppointmentSteps = () => {
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
      image: step1,
      mobImage: dotorSpecialisation,
      smallMobImage: generalPhysician,
      stepTitle: "Select your doctor specialization",
      stepExplanation:
        "Book In-Clinic doctor appointments based on doctor specialization or by common health concerns",
    },
    {
      image: isDesktop ? step2 : mobStep2,
      stepTitle: "Select your preferred doctor in your locality",
      stepExplanation:
        "Select your preferred doctor / clinic from the chosen listing from your city / town",
    },
    {
      image: step3,
      mobImage: dateTimeSlot,
      smallMobImage: dateTime,
      stepTitle: `Select your preferred
                date & time slot`,
      stepExplanation:
        "Select your preferred date and time slot from the respective doctor’s availability",
    },
    {
      image: isDesktop ? step4 : mobStep4,
      stepTitle: "Fill in your required details",
      stepExplanation:
        "Fill the required details for In-Clinic doctor appointment such as name, age, etc..",
    },
    {
      image: step5,
      mobImage: requiredDetails,
      smallMobImage: appointmentDateTime,
      stepTitle: "Review your details & select your payment mode",
      stepExplanation:
        "Review your details, select your payment method as either ‘Online’ or ‘Pay at Clinic’ and confirm",
    },
    {
      image: isDesktop ? step6 : mobStep6,
      stepTitle: "Visit your doctor in a hassle free & secured manner",
      stepExplanation:
        "Visit your doctor at the clinic as per your appointment date and time, show your appointment Id shared with you by HealthSy and complete your In-Clinic doctor consultation",
    },
  ];
  return (
    <div className="container pb-1">
      <div className="bookingSteps d-flex justify-content-center">
        <div className="bookingStepsContent">
          Book your <span className='primaryColor'>In-Clinic Appointments</span> with the Doctors Near You 
        </div>
      </div>
      {bookingSteps.map((data, idx) => {
        return (
          <div
            className={`bookingStep1 m-5 py-4 d-flex justify-content-around align-items-center ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } `}
            key={idx}
          >
            <div>
              <div className={` mb-4 d-flex align-items-end justify-content-end ${(idx % 2) ? "flex-row-reverse " : ""} mobContent`}>
                <img src={stepArrow} className="stepsArrow" style={{ transform: (idx % 2) ? "scaleX(-1)" : "scaleX(1)" }} alt='Arrow' />
                <div className="stepsArrowText">Step {idx + 1}</div>
              </div>
              {isDesktop || idx % 2 !== 0 ? <Image
                src={data.image}
                width={340}
                height={513}
                className={`${idx % 2 === 0 ? "stpesImageRow" : "stpesImageRowReverse"
                  }`}
                alt={`InClinicAppointmentStep-${idx}`}
              /> :
                  <div className='d-flex position-relative'>
                    <Image
                      src={data.mobImage}
                      width={235}
                      height={263}
                      alt={`InClinicAppointmentStep-${idx}`}
                    />
                    <Image
                      src={data.smallMobImage}
                      width={115}
                      height={115}
                      alt={`InClinicAppointmentStep-${idx}`}
                      className="inClinicStepSmallMobImage"
                    />
                </div>}
            </div>
            <div className="bookingStep1ContentWrapper">
              <div className="stepTitle mb-4">{data.stepTitle}</div>
              <div className="stepExplanation">{data.stepExplanation}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InClinicAppointmentSteps;
