import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import ViewPhotoModal from "../Common/ClinicPhotoModal";
import ReportErrorModal from "../Common/ReportErrorModal";
import DoctorDetailsCard from "../Common/doctor/doctorDetailsCard";
import AccordionFaq from "../Common/inclinciAccordion";

const stethoscope = "/assets/icons/doctor-stethoscope.svg";
const graduation = "/assets/icons/graduation.svg";
const experienceImg = "/assets/icons/experience.svg";
const track = "/assets/icons/doctor-track.svg";
const premium = "/assets/icons/premium.svg";
const internet = "/assets/icons/internet.svg";
const doctorIcon = "/assets/icons/doctor-icon.svg";
const share = "/assets/shareinclinic.png";
const direction = "/assets/direction.png";

const aboutInfo = [
  {
    name: "About Doctor15",
    key: "about-doctor",
  },
  {
    name: "Education",
    key: "education",
  },
  {
    name: "Membership",
    key: "membership",
  },
  {
    name: "Languages Known",
    key: "languages-known",
  },
  {
    name: "Specializations",
    key: "specializations",
  },
  {
    name: "Awards and Recognitions",
    key: "awards-and-recognitions",
  },
  {
    name: "Experience",
    key: "experience",
  },
  {
    name: "Registrations",
    key: "registrations",
  },
];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const InclinicDoctorGeneralInfo = ({ doctorDetail, specialization }) => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const degree = useMemo(() => {
    let arr = [
      `${doctorDetail?.degree?.ug_degree}, ${typeof (doctorDetail?.education) === "string" ? doctorDetail?.education : ""}`
    ]
    if(doctorDetail?.pg_degree?.pg_degree){
      arr.push(`${doctorDetail?.pg_degree?.pg_degree}, ${doctorDetail?.pg_education}`)
    }
    return arr
  }, [doctorDetail])

  const membership = useMemo(() => {
    return [...new Set(
      doctorDetail?.membership?.flatMap((item) =>
        Object.values(item).filter((val, index) => val && index % 2 === 0)
      )
    ),]
  }, [doctorDetail?.membership])

  const awards = useMemo(() => {
    return [...new Set(
      doctorDetail?.awards?.flatMap((item) =>
        Object.values(item).filter((val, index) => val && index % 2 === 0)
      )
    ),]
  }, [doctorDetail?.awards])

  const orgExperience = useMemo(() => {
    return [...new Set(
      doctorDetail?.org_experience?.flatMap((item) =>
        Object.values(item).filter((val, index) => val && index % 2 === 0)
      )
    ),]
  }, [doctorDetail?.org_experience])

  const languages_known = doctorDetail.languages_known?.map(
    (item) => item?.type
  );
  const [popup, setPopup] = useState(false);
  const [doctorSpecialization, setDoctorSpecialization] = useState([]);
  const [clinicList, setclinicList] = useState([]);
  const [openPhotoModal, setopenPhotoModal] = useState(false);
  const [clinicImages, setClinicImages] = useState([]);

  //drag and scroll the content
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const { deltaY } = event;
      scrollContainerRef.current.scrollLeft += deltaY;
    };

    const navbarElement = scrollContainerRef.current;
    navbarElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      navbarElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-specialisation/list`,
        { active: true }
      )
      .then((response) => {
        setDoctorSpecialization(response.data?.rows);
      })
      .catch((err) => {
        console.error(err);
        // alert("Some error");
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll(
        ".aboutDoctorDetailsWrapper"
      );
      const activeAnchor = document.querySelector(
        ".InclinicGeneralInfoCategory a.selected"
      );
      let currentSection = "about-doctor";
      console.log('height',window.screenY);
      sectionEls.forEach((sectionEl) => {
        if (window.scrollY + 300 >= sectionEl.offsetTop) {
          currentSection = sectionEl.id;
        }
      });

      const navLinks = document.querySelectorAll(".nav__link");
      navLinks.forEach((navLink) => {
        navLink.classList.remove("selected");
      });

      const currentNavLink = document.querySelector(
        `.nav__link[href="#${currentSection}"]`
      );
      if (currentNavLink) {
        currentNavLink.classList.add("selected");
      }
      if (activeAnchor && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        container.scrollLeft =
          activeAnchor.offsetLeft -
          container.clientWidth / 2 +
          activeAnchor.clientWidth / 2;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getsrcValue = (value) => {
    // if (typeof value === "string" && value.length)
    return process.env.NEXT_PUBLIC_APP_API_URL + "clinic-profile/" + value;
  };

  const handleTimeChange = (start, end) => {
    let startTime = "";
    let endTime = ""
    if (start && start.length <= 8) {
      startTime = start;
    } else {
      startTime = moment(start).format("h:mm A");
    }
    if (end && end.length <= 8) {
      endTime = end;
    } else {
      endTime = moment(end).format("h:mm A");
    }
    return `${startTime} to ${endTime}`;
  };


  return (
    <div className="doctorGeneralInfo pt-0">
      {/* <div className="desktopContent fs24fwb">General Info</div> */}
      <div
        ref={scrollContainerRef}
        className="InclinicGeneralInfoCategory d-flex"

      >
        {aboutInfo.filter((data) => !['experience', 'awards-and-recognitions'].includes(data.key) || (data.key === "experience" && orgExperience?.length) || (data.key === "awards-and-recognitions" && awards?.length)).map((option, idx) => {
          return (
            <a href={`#${option.key}`} className=" nav__link" key={option?.name}>
              <span>{option.name}</span>
              <div></div>
            </a>
          );
        })}
      </div>
      <div>
        <div className="aboutDoctorDetailsWrapper" id="about-doctor">
          <div className="d-flex">
            <Image
              src={stethoscope}
              width={24}
              height={24}
              alt="stethoscope"
              className="doctorstethoscopeImg"
            />
            <h2 className="fs20m14fwb">About {doctorDetail?.doctor_name}</h2>
          </div>
          <div
            className="fs14 doctorGeneralContent"
            dangerouslySetInnerHTML={{ __html: doctorDetail?.about }}
          />
          {/* <div className="primaryColor font-bold">Read More</div> */}
          <div className="doctorSplitContent"></div>
          {doctorDetail?.clinic_profiles?.length &&
            doctorDetail.clinic_profiles.map((item, index) => {
              return (
                <div className="doctorsProfileClinic" key={item._id}>
                  <div className="clinicAddressContainer">
                    <div className="clinicSpecializationImage">
                      <img
                        src={getsrcValue(item.logo)}
                        className="w-100 h-100"

                        alt="logo image"
                      />
                    </div>
                    <div className="clinicAddressField">
                      <h2 className="clinicTitle fs22m16fwb">{item.clinic_name}</h2>
                      <div className="clinicSubTitle">
                        {item.clinic_specialty_status?.clinic_speciality}
                      </div>
                      <div className="clinicAddressArea">{item.address}</div>
                      {/* <div className="clinicButtonContainer">
                        <button className="shareButton">
                          {" "}
                          <Image
                            src={share}
                            width={20}
                            height={20}
                            alt="share-button"
                            className=""
                          />{" "}
                          share
                        </button>
                        <button className="directionButton">
                          <Image
                            src={direction}
                            width={20}
                            height={20}
                            alt="share-button"
                            className=""
                          />
                          Direction
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="clinicTimingContainer">
                    <div className="clinicTimingFieldArea">
                      <div className="WeeklistTimingArea">
                        <div className="timingsTitle fs20m14fwb">Timings</div>
                        <div className="timingsTable">
                          {weekdays?.map((days) => {
                            return (
                              <div className="weekdaysList" key={`sno${days}`}>
                                <div className="daysName me-3">{days}</div>
                                <div className="daysTiming">
                                  {item.timings ? item.timings[`${days}Closed`] ? (
                                    <div style={{color : "#EB0000"}}>Closed</div>

                                  ) : (
                                    <div>
                                      {handleTimeChange(
                                        item.timings[`${days}_start_timing`],
                                        item.timings[`${days}_end_timing`]
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="clinicPhotosArea">
                        <div className="clinicPhotoTitle fs20m14fwb">Photos Of Clinic</div>
                        {item?.photos?.length !== 0 ? (
                          <div className="clinicPhotoFlex">
                            {item.photos.slice(0, 4).map((clinicimg, index) => {
                              return (
                                <img
                                  key={`img${index}`}
                                  src={getsrcValue(clinicimg)}
                                  className="clinicImages"
                                  alt={`img${index}`}
                                />
                              );
                            })}
                            {
                              item?.photos?.length > 4 &&
                              <div className="clinicViewMore" onClick={() => { setopenPhotoModal((prev) => !prev); setClinicImages(item?.photos) }}>View All Photos</div>
                            }
                          </div>
                        ) : (
                          <div
                            className="clinicPhotoFlex"
                            style={{ justifyContent: "center" }}
                          >
                            <div className="clinicImages">No Images Found</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <DoctorDetailsCard
          icon={graduation}
          id="education"
          title="Education"
          data={degree}
          iconAlt="graduation"
        />
        <DoctorDetailsCard
          icon={premium}
          id="membership"
          title="Membership"
          data={membership}
          iconAlt="membership"
        />
        <DoctorDetailsCard
          icon={internet}
          id="languages-known"
          title="Languages Known"
          data={languages_known}
          iconAlt="Languages"
        />
        <DoctorDetailsCard
          icon={doctorIcon}
          id="specializations"
          title="Specializations"
          data={[doctorDetail.inclinic_primary_specialization?.inclinic_doctor_specialization]}
          iconAlt="Specialization"
        />
        {awards?.length ? <DoctorDetailsCard
          icon={doctorIcon}
          id="awards-and-recognitions"
          title="Awards and Recognitions"
          data={awards}
          iconAlt="award"
        /> : null}

        {orgExperience?.length ? <DoctorDetailsCard
          icon={experienceImg}
          id="experience"
          title="Experience"
          data={orgExperience}
          iconAlt="experience"
        /> : null}
        <DoctorDetailsCard
          icon={internet}
          id="registrations"
          title="Registrations"
          data={[`${doctorDetail.mci_no} ${doctorDetail.medical_council_status?.medical_council}, ${doctorDetail.medical_council}`]}
          iconAlt="registration"
        />
      </div>
      {/* TODO */}
      {/* <div
        className="doctorReport d-flex fs16m14"
        onClick={() => setPopup(true)}
      >
        Report a Error
      </div> */}

      <div className="inclinicFaqContainer">
        <span>?</span> Frequently asked Questions
      </div>

      <AccordionFaq faqs={doctorDetail?.faq} />
      {/* <FAQ isStatic staticData={doctorDetail?.faq} /> */}
      <div
        className="doctorDetailServices aboutDoctorDetailsWrapper"
      // id="specializations"
      >
        <div className="fs14fwb pb-2">
          Top Specialities for Online Doctor Consultations
        </div>
        <div className="fs14 d-flex doctorSpecializationList">
          {doctorSpecialization?.map((data, inx) => {
            return (
              <div key={inx} className="">
                • {data?.online_doctor_specialization}
              </div>
            );
          })}
        </div>
      </div>
      {popup && (
        <ReportErrorModal
          successModal={popup}
          setSuccessModal={setPopup}
          doctorDetail={doctorDetail}
        />
      )}
      {
        openPhotoModal && (
          <ViewPhotoModal openPhotoModal={openPhotoModal}
            setopenPhotoModal={setopenPhotoModal}
            clinicImages={clinicImages}
          />
        )
      }
    </div>
  );
};

export default InclinicDoctorGeneralInfo;
