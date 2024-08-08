import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReportErrorModal from "../Common/ReportErrorModal";
import { useRouter } from "next/router";

const stethoscope = "/assets/icons/doctor-stethoscope.svg"
const graduation = "/assets/icons/graduation.svg"
const track = "/assets/icons/doctor-track.svg"
const premium = "/assets/icons/premium.svg"
const ellipse = "/assets/icons/Ellipse.svg"
const internet = "/assets/icons/internet.svg"
const doctor = "/assets/icons/doctor-icon.svg"

const languagesKnown = [
  {
    image: ellipse,
    language: "Tamil",
  },
  {
    image: ellipse,
    language: "English",
  },
  {
    image: ellipse,
    language: "Telugu",
  }
]

const aboutInfo = [
  {
    name: "About Doctor12",
    key: "about-doctor"
  },
  {
    name: "Education",
    key: "education"
  },
  {
    name: "Membership",
    key: "membership"
  },
  {
    name: "Languages Known",
    key: "languages-known"
  },
  {
    name: "Specializations",
    key: "specializations"
  },
]

const DoctorGeneralInfo = ({
  doctorDetail,
  specialization
}) => {
  // const navigate = useRouter().push
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const membership = [...new Set(doctorDetail?.membership?.flatMap(item => Object.values(item).filter((val, index) => index % 2 === 0)))]
  const languages_known = doctorDetail.languages_known?.map(item => item?.type)
  const [popup, setPopup] = useState(false)
  const [doctorSpecialization, setDoctorSpecialization] = useState([]);
  const [selectedValue , setSelectedvalue] = useState("about-doctor")
  // const [value,setValue] = useState(false);
  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-specialisation/list`, { active: true }).then(response => {
      setDoctorSpecialization(response.data?.rows)
    }).catch(err => {
      console.error(err);
      // alert("Some error");
    })

  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.aboutDoctorDetailsWrapper');
      const activeAnchor = document.querySelector('.GeneralInfoCategory a.selected');
      let currentSection = 'about-doctor';

      sectionEls.forEach((sectionEl) => {
        if (window.scrollY + 300>= sectionEl.offsetTop) {
          currentSection = sectionEl.id;
        }
      });

      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach((navLink) => {
        navLink.classList.remove('selected');
      });

      const currentNavLink = document.querySelector(`.nav__link[href="#${currentSection}"]`);
      if (currentNavLink) {
        currentNavLink.classList.add('selected');
      }
      if (activeAnchor && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        container.scrollLeft = activeAnchor.offsetLeft - container.clientWidth / 2 + activeAnchor.clientWidth / 2;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 
  
  return (
    <div className="doctorGeneralInfo">
      <div className="desktopContent fs24fwb">General Info</div>
      <div ref={scrollContainerRef} className="GeneralInfoCategory d-flex">
        
        {aboutInfo.map((option, idx) => {
          return (
            <a href={`#${option.key}`}  className=" nav__link" key={idx}>
              {option.name}
              <div></div>
            </a>
          ) 
        })}
      </div>
      <div>
        <div className="aboutDoctorDetailsWrapper" id="about-doctor">
          <div className="d-flex">
            <Image src={stethoscope} width={24} height={24} alt="stethoscope" className="doctorstethoscopeImg" />
            <div className="fs20m14fwb">About Doctor</div>
          </div>
          <div className="fs14 doctorGeneralContent" dangerouslySetInnerHTML={{ __html: doctorDetail?.about }} />

          {/* <div className="fs14 doctorGeneralContent">Presentation and neatness of your profile is a key factor when it comes to users / patients finding you or when consulting with you for an online consultation or in-clinic appointment. Thus, we request you to share your professional image / photo via email and WhatsApp. We thank you for your valuable time and your co-operation and we are eagerly waiting to hear from you and to start working with you. Presentation and neatness of your profile is a key factor when it comes to users / patients finding you or when consulting with you for an online consultation or in-clinic. <span className="primaryColor cursor-pointer">Read more</span></div> */}
        </div>
        <div className="aboutDoctorDetailsWrapper" id="education">
          <div className="d-flex doctorlanguageKnow">
            <Image src={graduation} width={24} height={24} alt="internetImg" />
            <div className="fs20m14fwb">Education</div>
          </div>
          <div>
            {[
              {degree: doctorDetail?.degree?.ug_degree, education: typeof(doctorDetail?.education) === "string" ?  doctorDetail?.education :""},
              {degree: doctorDetail?.pg_degree?.pg_degree, education: doctorDetail?.pg_education},
            ]?.map((data, idx) => {
              return (
                data?.degree ? <div key={idx} className="flexAlignCenter languageKnownWrapper">
                  <Image src={ellipse} width={8} height={8} alt="ellipse" />
                  <div className="fs16m14fw600">{data?.degree}, {data?.education}</div>
                </div> :<></>
              )
            })}
          </div>
        </div>
        <div className="aboutDoctorDetailsWrapper" id="membership">
          {/* <div className="d-flex">
            <Image src={graduation} width={24} height={24} alt={graduation} className="doctorGraduationImg"/>
            <div className="fs20m14fwb">Education</div>
          </div> */}
          {/* <div className="flexAlignStart gap-3 doctorEducationList">
            <Image src={track} width={9} height={education?.length === 1 ? 50 : 80} alt="trackImg" className="doctorEducationTrackImg" style={{marginTop  :'8px'}} />
            <div className="doctorDetailSection">
              {education.map((data, key) => {
                return (
                  <>
                    <div className="fs16m14fw600" style={{marginBottom : "18px"}} key={key}>{data}</div>
                    <div className="fs14 doctorContentWrapper"></div>  
                  </>
                )
              })}
           
            </div>
          </div> */}
          <div className="d-flex doctorMembership aboutDoctorDetailsWrapper">
            <Image src={premium} width={24} height={24} alt="premiumImg" />
            <div className="fs20m14fwb">Membership</div>
          </div>
          {membership.map((data, inx) => {
            return (
              <div key={inx} className="flexAlignCenter p-0 doctorAcademy">
                <Image src={ellipse} width={8} height={8} alt="ellipse" />
                <div className="fs16m14fw600">{data}</div>
              </div>
            )
          })}
        </div>
        <div className="aboutDoctorDetailsWrapper" id="languages-known">
          <div className="d-flex doctorlanguageKnow">
            <Image src={internet} width={24} height={24} alt="internetImg" />
            <div className="fs20m14fwb">Languages Known</div>
          </div>
          <div>
            {languages_known?.map((option, idx) => {
              return (
                <div key={idx} className="flexAlignCenter languageKnownWrapper">
                  <Image src={ellipse} width={8} height={8} alt="ellipse" />
                  <div className="fs16m14fw600">{option}</div>
                </div>
              )
            })}
          </div>
        </div>
        {/* <div className="aboutDoctorDetailsWrapper m-0" id="specializations">
                    <div className="d-flex doctorlanguageKnow">
                        <Image src={doctor} width={24} height={24} alt="doctor" />
                        <div className="fs20m14fwb">Specializations</div>
                    </div>
                    <div className="flexAlignCenter languageKnownWrapper">
                        <Image src={ellipse} width={8} height={8} alt="ellipse" />
                        <div>General Physician</div>
                    </div>
                    <div className="flexAlignCenter languageKnownWrapper">
                        <Image src={ellipse} width={8} height={8} alt="ellipse" />
                        <div>Cardiology</div>
                    </div>
                </div> */}
      </div>
        <div className="doctorReport d-flex fs16m14" onClick={() => setPopup(true)}>Report a Error</div>
      <div className="doctorDetailServices aboutDoctorDetailsWrapper" id="specializations">
        <div className="fs14fwb pb-2">Top Specialities for Online Doctor Consultations</div>
        <div className="fs14 d-flex doctorSpecializationList">
          {doctorSpecialization?.map((data, inx) => {
            return (
              <div key={inx} className="me-3 mb-2">
                • {data?.online_doctor_specialization}
              </div>
            )
          })}
        </div>
        {/* <div className="fs14fwb pb-2">Top Services In Coimbatore</div>
        <div className="fs14 doctorServiceTxt">Presentation and neatness of your profile is a key factor when it comes to users / patients finding you or when consulting with you for an online consultation or in-clinic appointment. Thus, we request you to share your professional image / photo via email and WhatsApp. We thank you for your valuable time and your co-operation and we are eagerly waiting to hear from you and to start working with you. Presentation and neatness of your profile is a key factor when it comes to users / patients finding you or when consulting with you for an online consultation or in-clinic </div> */}
      </div>
      {
        popup &&
        <ReportErrorModal
          successModal={popup}
          setSuccessModal={setPopup}
          doctorDetail={doctorDetail}
        />
      }
    </div>
  )
}

export default DoctorGeneralInfo