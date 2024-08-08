import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AppLinkSuccess from "../Common/AppLinkSuccess";
import { RangeSlider } from "react-double-range-slider";
import "react-double-range-slider/dist/cjs/index.css";
import BookingDetailsModal from "../Common/bookingDetailsModal";
// import Pagination from "react-bootstrap/Pagination";
// import Pagination from 'react-bootstrap-pagination';
// import 'react-bootstrap-pagination/dist/react-bootstrap-pagination.css'; 
import { convertToTitleCase } from "../../constants";
import DoctorProfileCard from "../Common/inclinic/doctorProfileCard";

import useIsDesktop from "../Hooks/useIsDesktop";
import DownloadApp from "./DownloadApp";
import { Dropdown, Pagination } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
const arrowDown = "/assets/dropdown.svg";
const healthsyMembership = "/assets/membership.webp";


const doctorsLocationData = [
  { area: "Jubillee Hills", count: 1 },
  { area: "Jubillee Hills", count: 2 },
  { area: "Jubillee Hills", count: 3 },
];

const LocalityDoctorsList = () => {
  return (
    <div className="doctors-specific-address">
      <div className="doctors-address-title">
        Andrologist near you
      </div>
      <div className="doctors-address-subtitle">
        You are seeing results for Banajara Hills. See results from
        other Hyderabad city locations
      </div>
      <div className="doctors-address-cards">
        <div className="doctors-card-top" ref={scrollTopBoxRef}>
          {doctorsLocationData.map((item, index) => {
            return (
              <div key={`cards${index}`} className="scroll-cards">
                <div>{item.area}</div>
                <div className="doctors-count">
                  {item.count} doctors
                </div>
              </div>
            );
          })}
        </div>
        <div className="doctors-card-bottom" ref={scrollBottomBoxRef}>
          {doctorsLocationData.map((item, index) => {
            return (
              <div key={`cards${index}`} className="scroll-cards">
                <div>{item.area}</div>
                <div className="doctors-count">
                  {item.count} doctors
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
const InclinicDoctorsList = ({ selectedOption, inClinic, records: doctorsList, pageType }) => {
  const { query: { city_slug, slug_level_2 }, } = useRouter();
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);
  const [languageList, setLanguageList] = useState([]);
  const [gender, setGender] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [popup, setPopup] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState(false);
  const [doctorSpecialization, setDoctorSpecialization] = useState([]);
  const [rangeValue, setRangeValue] = useState({
    min: 10,
    max: 100,
    minIndex: 0,
    maxIndex: 0,
  });
  const scrollTopBoxRef = useRef(null);
  const scrollBottomBoxRef = useRef(null);
  //drag and scroll the content

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const { deltaY } = event;
      scrollTopBoxRef.current.scrollLeft += deltaY;
      scrollBottomBoxRef.current.scrollLeft += deltaY;
    };

    const navbarElement = scrollTopBoxRef.current;
    navbarElement?.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      navbarElement?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (doctorsList?.length) {
      let languageList = [];
      let genders = [];
      doctorsList.forEach((doctor) => {
        if (doctor.gender?.type && !genders.includes(doctor.gender?.type)) {
          genders.push(doctor.gender?.type);
        }
        doctor.languages_known?.forEach((item) => {
          if (item?.type && !languageList.includes(item.type)) {
            languageList.push(item.type);
          }
        });
      });
      setGender(genders);
      setLanguageList(languageList);
    }
  }, [doctorsList])

  // const maxLimit = 15;
  // const [curr, set_Curr] = useState(1);
  // const pageChangeFunction = (p) => {
  //   if (p >= 1 && p <= maxLimit) {
  //     set_Curr(p);
  //   }
  // };
  // const [paginationData, setPagination] = useState({
  //   data: [],
  //   activePage: 1,
  //   totalPages: 10,
  //   limit: 10
  // });
  // const handlePageChange = (pageNumber) => {
  //   setPagination(prevState => ({
  //     ...prevState,
  //     activePage: pageNumber
  //   }));
  // };
  // const handlePageNext = () => {
  //   setPagination(prevState => ({
  //     ...prevState,
  //     activePage: Math.min(paginationData.activePage + 1, paginationData.totalPages)
  //   }));
  // };
  // const handlePagePrev = () => {
  //   setPagination(prevState => ({
  //     ...prevState,
  //     activePage: Math.max(paginationData.activePage - 1, 1)
  //   }));
  // };

  const desktop = useIsDesktop();
  const router = useRouter();

  useEffect(() => {
    if (selectedLanguage?.length || selectedGender?.length) {
      if (!selectedGender?.length) {
        setFilteredDoctors(doctorsList.filter((data) => {
          return data.languages_known?.map(item => item?.type).some(item => selectedLanguage.includes(item))
        }))
      } else if (!selectedLanguage?.length) {
        setFilteredDoctors(doctorsList.filter((data) => selectedGender.includes(data.gender?.type)))
      } else {
        setFilteredDoctors(doctorsList.filter((data) => {
          return data.languages_known?.map(item => item?.type).some(item => selectedLanguage.includes(item)) && selectedGender.includes(data.gender?.type)
        }))
      }
    } else {
      setFilteredDoctors(doctorsList);
    }
  }, [selectedLanguage, selectedGender]);

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

  // useEffect(() => {

  //   const lowerRange = document.getElementById('lower');
  //   const upperRange = document.getElementById('upper');
  //   lowerRange?.addEventListener('input', function () {
  //     if (parseInt(lowerRange?.value) > parseInt(upperRange?.value)) {
  //       upperRange?.value = lowerRange?.value;
  //     }
  //   });

  //   upperRange?.addEventListener('input', function () {
  //     if (parseInt(upperRange?.value) < parseInt(lowerRange?.value)) {
  //       lowerRange?.value = upperRange?.value;
  //     }
  //   });
  // }, [])

  const handleViewDoctorProfile = (slugname, inClinic) => {
    router.push(`/in-clinic-appointments/${city_slug}/${slug_level_2}/${slugname}`)
    // else {
    //       router.push(
    //   `/online-doctor-consultations/${specialization}/${slugname}`
    // )}
    // router.push(
    //   `/online-doctor-consultations/${specialization}/${option?.doctor_name_slug}`
    // )
  }

  const onSelectLanguage = (e) => {
    if (e.target.checked && !selectedLanguage.includes(e.target.name)) {
      setSelectedLanguage([...selectedLanguage, e.target.name]);
    }
    if (!e.target.checked && selectedLanguage.includes(e.target.name)) {
      setSelectedLanguage(
        selectedLanguage.filter((val) => val !== e.target.name)
      );
    }
  };

  const onSelectGender = (data) => {
    if (!selectedGender.includes(data)) {
      setSelectedGender([...selectedGender, data]);
    }
    if (selectedGender.includes(data)) {
      setSelectedGender(selectedGender.filter((val) => val !== data));
    }
  };

  const clearFilter = () => {
    setSelectedLanguage([]);
    setSelectedGender([]);
  };
  const consultDoctor = (option) => {
    setPopup(true);
    setDoctorDetail(option);
  };

  return (
    <>
      <div className="container doctorsList">
        <div className="flexBetween doctorDetails_Area">
          <div className="doctorDetails">

            <div className="doctordetails-specialtitlecontainer">
              <div className="contenttitlebanner">
                <h1 className="fs24m18fwb">
                  Available {convertToTitleCase(slug_level_2)}s
                  {` - ${filteredDoctors.length}`}
                </h1>
                <div className="">Book In-Clinic Appointments at clinics near you and skip the wait</div>
              </div>
              {/* <div className="doctordetails-sortingbox">
                sort by
                <img
                  src={arrowDown}
                  className="sorting-downarrow"
                  alt="down"
                />
              </div> */}
            </div>

            {filteredDoctors.slice(0, 5).map((option, idx) => {
              // {doctorsList && doctorsList.map((option, idx) => {
              return (
                <Fragment key={idx}>
                  <DoctorProfileCard
                    doctorDetail={option}
                    handleViewDoctorProfile={handleViewDoctorProfile}
                  />
                </Fragment>
              )
            })}
            <Image src={healthsyMembership} width={906} height={260} alt="membership" className="desktopContent mb-4 doctorMembershipImg" onClick={() => router.push("/memberships")} />
            {filteredDoctors.slice(5).map((option, idx) => {

              return (
                <Fragment key={idx}>
                  <DoctorProfileCard
                    doctorDetail={option}
                    handleViewDoctorProfile={handleViewDoctorProfile}
                  />
                </Fragment>
              )
            })}
          </div>
          <div className=" doctorFilterSection desktopContent">
            {/* {inClinic && <LocalityDoctorsList />} */}
            <div className="row doctorListBoxes">
              <div className="flexBetween filterHeading">
                <span className="fs24fwb">Filter</span>
                <button type="button" onClick={clearFilter} className="primaryColor fs14fw500 bg-transparent border-0">Clear all</button>
              </div>
              <div>
                <label className="fs16fwb filterLangtext">Language</label>
                <div className="doctorLangfilterWrapper">
                  {languageList.map((language, inx) => {
                    return (
                      <div key={inx} className="doctorLangfilter d-flex align-items-center">
                        <input type="checkbox" className="cursor-pointer doctorLangCheckbox" onChange={onSelectLanguage} name={language} checked={selectedLanguage.includes(language)} />
                        <span className="fs16">{language}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* todo price */}
              {/* <div className="rangeContainer" style={{ width: "100%" }}>
                <label className="fs16fwb filterLangtext" style={{ margin: "30px 0px 30px 0px" }}>Price Range</label>
                <RangeSlider
                  style={{ width: "100%" }}
                  value={{ min: 10, max: 100 }}
                  onChange={(e) => {
                    setRangeValue({
                      min: e.min,
                      max: e.max,
                      minIndex: e.minIndex,
                      maxIndex: e.maxIndex,
                    });
                  }}
                  tooltipPosition="under"
                  tooltipVisibility="always"

                />
              </div> */}
              <div className="fs14 flexColumn">
                <label className="fs16fwb doctorGenderFilterText">Gender</label>
                <div className="flexBetween gender_list">
                  {gender.map((data, inx) => <div key={inx} onClick={() => onSelectGender(data)} className={`cursor-pointer docGenderFilter me-3 ${selectedGender.includes(data) ? "selectedBoxField" : ""}`}>{`${data}`}</div>)}
                </div>
              </div>
            </div>
            <DownloadApp />
          </div>
        </div>
        <div className="doctorServices">
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
        </div>
      </div>
      {popup &&
        <BookingDetailsModal
          successModal={popup}
          setSuccessModal={setPopup}
          doctorDetail={doctorDetail}
          specialization={slug_level_2}
        />
      }
    </>
  )
}

export default InclinicDoctorsList