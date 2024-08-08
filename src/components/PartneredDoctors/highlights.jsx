import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const image1 = "/assets/mob-1.png";
const image2 = "/assets/mob-2.png";
const image3 = "/assets/mob-3.png";
const image4 = "/assets/mob-4.png";
const tick = "/assets/ticks.svg";
const rightArrow = "/assets/rightArrow.svg";

const highlightsData = [
  {
    title: "Online Doctor Consultations",
    pointsList: [
      "Consult via video, audio and chat",
      "Digital Prescriptions",
      "Manage your Online Consultations Seamlessly",
    ],
    mobPoint:["Manage all your active, upcoming and completed bookings at ease"],
    image: image1,
  },
  {
    title: "In-Clinic Appointments",
    pointsList: [
      "Manage your in-clinic appointments at ease",
      "Manage your patients",
      "Manage your availabilities and time slots",
    ],
    mobPoint:["Manage your in-clinic appointments at ease"],
    image: image2,
  },
  {
    title: "Grow",
    pointsList: ["Manage and track your settlements and payments on the app"],
    mobPoint: ["Manage and track your settlements and payments on the app"],
    image: image3,
  },
  {
    title: "Help and Support",
    pointsList: ["Reach out to HealthSy support via chat, call or email"],
    mobPoint: ["Reach out to HealthSy support via chat, call or email"],
    image: image4,
  },
];

const HighlightsDoctorApp = () => {
  return (
    <div className="container highlightsDoctorApp">
      <div className="highlightDocTitle text-center">
        Highlights of <span className="primaryColor">‘HealthSy - <h2 className="fs48m24fwb d-inline">Doctors App</h2>’</span>
      </div>
      <Carousel
        // animationHandler="fade"
        // className="highlights-doc-img"
        // autoPlay
        infiniteLoop
        // interval={3000}
        axis="horizontal"
        showArrows={false}
        showThumbs={false}
        showIndicators={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) => {
          return (
            <div
              className={`highlightsCarouselArrow flexCenter`}
              onClick={onClickHandler}
            >
              {" "}
              <Image
                src={rightArrow}
                width={30}
                height={20}
                alt="right arrow"
              />
            </div>
          );
        }}
        // renderArrowPrev={(onClickHandler, hasPrev, label) =>
        //   hasPrev && (
        //     <div
        //       className="highlightsCarouselArrow flexCenter"
        //       onClick={onClickHandler}
        //     >
        //       <Image
        //         src={rightArrow}
        //         width={30}
        //         height={30}
        //         alt="right arrow"
        //       />
        //     </div>
        //   )
        // }
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <div
            className="highlightsCarouselRightArrow flexCenter"
            onClick={onClickHandler}
          >
            <Image src={rightArrow} width={30} height={20} alt="right arrow" />
          </div>
        )}
      >
        {highlightsData.map((data, index) => {
          return (
            <div className="d-flex highlightContent" key={index}>
              <Image
                src={data.image}
                width={422}
                height={500}
                className="highlightsImage"
                alt="highlights"
              />
              <div className="highlightTextContent">
                <div className="highlightTitle">{data.title}</div>
                {data.mobPoint.map((val, inx) => {
                    return <div className="mobContent highlightMobDesc" key={inx}>{val}</div>
                })}
                {data.pointsList.map((val, inx) => (
                  <div
                    className="d-flex align-items-center highlightList"
                    key={inx}
                  >
                    {index < 2 ? (
                      <Image
                        src={tick}
                        alt="tick"
                        width={15}
                        height={10}
                        className="tickImage"
                      />
                    ) : null}
                    <div className="highlightPoint">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HighlightsDoctorApp;
