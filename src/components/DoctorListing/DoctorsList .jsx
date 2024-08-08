import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppLinkSuccess from "../Common/AppLinkSuccess";
import { RangeSlider } from "react-double-range-slider";
import "react-double-range-slider/dist/cjs/index.css";
import BookingDetailsModal from "../Common/bookingDetailsModal";
// import Pagination from "react-bootstrap/Pagination";
// import Pagination from 'react-bootstrap-pagination';
// import 'react-bootstrap-pagination/dist/react-bootstrap-pagination.css'; 
import { convertToTitleCase } from "../../constants";
import useIsDesktop from "../Hooks/useIsDesktop";
import DownloadApp from "./DownloadApp";
import { Pagination } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
const arrowleft = "/assets/arrow-left.svg";
const arrowDown = "/assets/dropdown.svg";
const doctorImg = "/assets/doctorsListing/doctor_img.png";
const verifyImg = "/assets/icons/verify.svg";
const graduation = "/assets/icons/graduation.svg";
const language = "/assets/icons/language.svg";
const experience = "/assets/icons/experience.svg";
const healthsyMembership = "/assets/membership.webp";
const locationIcon = "/assets/location.svg";
const hospitalIcon = "/assets/icons/hospital.svg";

const doctorsLocationData = [
  { area: "Jubillee Hills", count: 2 },
  { area: "Jubillee Hills", count: 2 },
  { area: "Jubillee Hills", count: 2 },
];

const DoctorsList = ({ selectedOption, inClinic }) => {
  const {query: { location,specialization, slug },} = useRouter();
  console.log('query' , location , specialization , slug);
  const [doctorsList, setDoctorsList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [gender, setGender] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [popup, setPopup] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState(false);
  const [doctorSpecialization, setDoctorSpecialization] = useState([]);
  const [page, setPage] = useState({
    data: [],
    limit: 10,
    activePage: 1,
    totalCount:0
  });

    
  useEffect(() => {
    let totalValue = "x-total-count";
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${page.limit}`
      )
      .then((res) => {
        console.log('test',res.headers[totalValue] , res.data)
        // console.log('test',res.headers["x-total-count"])
        setPage((prev) => ({
          ...prev,
          data: res.data,
          totalCount:res.headers[totalValue]
          // totalCount:90
        }));
      })
      .catch((error) => console.log(error));
  }, [page.limit]);

  const maxLimit = page.totalCount / page.limit;

  // const [curr, set_Curr] = useState(1); // this is the curr page in the previous method 

  const pageChangeFunction = (p) => {
    if (p >= 1 && p <= maxLimit) {
      // set_Curr(p);
         setPage((prev)=> ({
          ...prev,
          activePage : p
         }))
         handleChangeApiPage(p);
         
    }
  };
  const handleChangeApiPage = (p) => {
    axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=${p}`)
    .then((res) => {
      setPage((prev) => ({
        ...prev,
        data: res.data,
      }));
    })
    .catch((error) => console.log(error));
};
  
  const showPageItemsFunction = () => {
    const data = [];
    const numPage = ( Math.ceil(page.totalCount/page.limit) === 1 ? 1 : 2 ) ; // if we need to  show additional page means we change the logic here
    if (maxLimit < 10) {

      data.push(
        <Pagination.Prev
          key="prev"
          onClick={() => pageChangeFunction(page.activePage - 1)}
          className={`${page.activePage == 1 ? 'arrow-notallowed' :''}`}
        >
        <img
            src={arrowleft}
            alt="arrowleft"
            className="pagination-arrow-left"
          />
          {"Previous"}
        </Pagination.Prev>
      );

      for (let i = 1; i <= maxLimit; i++) {
        data.push(
          <Pagination.Item
            key={i}
            active={i === page.activePage}
            onClick={() => pageChangeFunction(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      data.push(
        <Pagination.Next
          key="next"
          onClick={() => pageChangeFunction(page.activePage + 1)}
          className={`${page.activePage == maxLimit ? 'arrow-notallowed' :''}`}
        >
          {" "}
          {"Next"}
          <img
            src={arrowleft}
            alt="arrowleft"
            className="pagination-arrow-right"
          />
        </Pagination.Next>
      );
    
    } 
    
    else {
      const leftside = page.activePage - numPage / 2 > 1;
      const rightside = page.activePage + numPage / 2 < maxLimit;

      data.push(
        <Pagination.Prev
          key="prev"
          onClick={() => pageChangeFunction(page.activePage - 1)}
          className={`${page.activePage == 1 ? 'arrow-notallowed' :''}`}
        >
        <img
            src={arrowleft}
            alt="arrowleft"
            className="pagination-arrow-left"
          />
          {"Previous"}
        </Pagination.Prev>
      );
      if(leftside){
              data.push(
        <Pagination.Item
            key="first"
            onClick={() => pageChangeFunction(1)}
        > 1 </Pagination.Item>
       );
      }
      //direct push to the first page using pagination first 
    //   data.push(
    //     <Pagination.First
    //         key="first"
    //         onClick={() => pageChangeFunction(1)}
    //     />
    // );
      if (leftside) {
        data.push(<Pagination.Ellipsis key="leftEllipsis"  onClick={() => pageChangeFunction(page.activePage - 1)} />);
      }
      const str = Math.max(1, Math.round(page.activePage - numPage / 2));
      const end = Math.min(maxLimit, Math.round(page.activePage + numPage / 2));
      for (let i = str; i <= end; i++) {
        data.push(
          <Pagination.Item
            key={i}
            active={i === page.activePage}
            onClick={() => pageChangeFunction(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      if (rightside) {
        data.push(<Pagination.Ellipsis key="rightEllipsis" onClick={() => pageChangeFunction(page.activePage + 1)} />);
      }
      if(rightside){
        data.push(
        <Pagination.Item
         key="last"
         onClick={() => pageChangeFunction(maxLimit)}
         > {maxLimit} </Pagination.Item>
        );
      }
      data.push(
        <Pagination.Next
          key="next"
          onClick={() => pageChangeFunction(page.activePage + 1)}
          className={`${page.activePage == maxLimit ? 'arrow-notallowed' :''}`}
        >
          {" "}
          {"Next"}
          <img
            src={arrowleft}
            alt="arrowleft"
            className="pagination-arrow-right"
          />
        </Pagination.Next>
      );
      // data.push(
      //     <Pagination.Last
      //         key="last"
      //         onClick={() => pageChangeFunction(maxLimit)}
      //     />
      // );
    }
    return data;
  };


const desktop = useIsDesktop();
  const router = useRouter();

  const { register, errors, getValues, handleSubmit, reset } = useForm();

  const currentYear = new Date().getFullYear();

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

  const handleViewDoctorProfile = (specialization , slugname ) => {
    if(inClinic){
           router.push(`/in-clinic-appointments/${location}/${specialization}/${slugname}`)
    }
    else {
          router.push(
      `/online-doctor-consultations/${specialization}/${slugname}`
    )
    }
    // router.push(
    //   `/online-doctor-consultations/${specialization}/${option?.doctor_name_slug}`
    // )
  } 

  const getDoctorsList = () => {
    const selectedValue = selectedOption?.value;

    const requestData = {
      profile_mode: "Online",
    };

    if (specialization) {
      requestData.specialization = specialization;
    } else if (slug) {
      // requestData.symptom = selectedValue;
      requestData.symptom = slug;

    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/list`,
        requestData
      )
      .then((response) => {
        setDoctorsList(response.data.rows);
        setFilteredDoctors(response.data.rows);

        let languageList = [];
        let genders = [];

        response.data?.rows?.forEach((doctor) => {
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
      })
      .catch((err) => {
        console.error(err);
        // alert("Some error");
      });
  };

  useEffect(() => {
    getDoctorsList();
  }, [selectedOption, slug, specialization]);

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
        <div className="d-flex docotorsAvailableSection">
          <div className="fs24m18fwb">
            Available {convertToTitleCase(specialization)}{" "}
            {desktop ? -filteredDoctors.length : ""}
          </div>

          {/* <div className="d-flex desktopContent DoctorsLsitSort">
          <div className="fs14fwb">Sort by</div>
          <Image src={arrowDown} width={15} height={15} className="" alt="arrowDown" />
        </div> */}
        </div>
        <div className="flexBetween doctorDetails_Area">
          <div className="doctorDetails">
            {filteredDoctors.slice(0, 5).map((option, idx) => {
              // {doctorsList && doctorsList.map((option, idx) => {
              return (
                  <div className="doctorsListCard position-relative flexBetween" key={idx}>
                    <div className="d-flex doctersListCardContainer" style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>

                      <div className="doctersImageContainer">
                        <img src={`${process.env.NEXT_PUBLIC_APP_API_URL}profile-images/${option.profileImage}`} width={146} height={196} className="doctorsCardImage" alt="doctor" />
                      </div>
                      <div className="doctorListDetails">
                        <div className="flexAlignCenter">
                          <div className="doctorsListContent fs22m16fwb">{option.doctor_name}</div>
                          <Image src={verifyImg} width={21} height={21} alt="verify" className="" />
                        </div>
                        <div className="fs16m14 doctorsListTitle">{option.doctor_primary_specialization?.online_doctor_specialization}</div>
                        <div className="d-flex">
                          <Image src={graduation} width={16} height={16} alt="graduationImg" className="" />
                          <div className="fs13m12 doctorsListQualification">{option?.degree?.ug_degree}</div>
                        </div>
                        <div className="d-flex doctorsListLanguage">
                          <Image src={language} width={19} height={19} alt="language" className="" />
                          <div className="fs13m12 doctorsListQualification">{option.languages_known?.map(item => item?.type)?.join(', ')}</div>
                        </div>
                        {/* todo Experience */}
                        <div className="d-flex">
                          <Image src={experience} width={19} height={19} alt="experience" />
                          <div className="fs13m12 doctorsListQualification">Experience:  {currentYear - option.medical_council + 1}</div>
                        </div>
                      </div>
                      </div>
                      {inClinic && (
                        <div className="doctors-inclinic-location-area">
                          <span className="inclinic-doctors-area">
                            <Image
                              src={locationIcon}
                              width={14}
                              height={14}
                              alt="location"
                            />
                            Banjara Hills,
                          </span>
                          <span className="inclinic-doctors-area">
                            {" "}
                            <Image
                              src={hospitalIcon}
                              width={14}
                              height={14}
                              alt="location"
                            />{" "}
                            Hyderabad
                          </span>
                        </div>
                      )}
                      </div>
                      <div className={`d-flex doctorsListBtn ${inClinic && "inclinic-button-field"}`}
                    >
                      <button type="button" className="doctorsProfile" onClick={() => handleViewDoctorProfile(option?.doctor_primary_specialization?.online_doctor_specialization_slug,option?.doctor_name_slug)}>View Profile</button>
                      <button type="button" onClick={() => consultDoctor(option)} className="doctorConsultation">Consult ₹{option?.online_consultation_fee}</button>
                    </div>
                  </div>
              )
            })}
            <Image src={healthsyMembership} width={906} height={260} alt="membership" className="desktopContent mb-4 doctorMembershipImg" onClick={() => router.push("/memberships")} />
            {filteredDoctors.slice(5).map((option, idx) => {

              return (
                <div className="doctorsListCard position-relative flexBetween" key={idx}>
                  <div className="d-flex doctersListCardContainer">
                    <div className="doctersImageContainer">
                      <img src={`${process.env.NEXT_PUBLIC_APP_API_URL}profile-images/${option.profileImage}`} width={146} height={196} className="doctorsCardImage" alt="doctor" />
                    </div>
                    <div className="doctorListDetails">
                      <div className="flexAlignCenter">
                        <div className="doctorsListContent fs22m16fwb">{option.doctor_name}</div>
                        <Image src={verifyImg} width={21} height={21} alt="verify" className="" />
                      </div>
                      <div className="fs16m14 doctorsListTitle">{option.doctor_primary_specialization?.online_doctor_specialization}</div>
                      <div className="d-flex">
                        <Image src={graduation} width={16} height={16} alt="graduationImg" className="" />
                        <div className="fs13m12 doctorsListQualification">{option?.degree?.ug_degree}</div>
                      </div>
                      <div className="d-flex doctorsListLanguage">
                        <Image src={language} width={19} height={19} alt="language" className="" />
                        <div className="fs13m12 doctorsListQualification">{option.languages_known?.map(item => item?.type)?.join(', ')}</div>
                      </div>
                      {/* todo Experience */}
                      <div className="d-flex">
                        <Image src={experience} width={19} height={19} alt="experience" />
                        <div className="fs13m12 doctorsListQualification">Experience: {currentYear - option.medical_council + 1}</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex doctorsListBtn">
                    <button type="button" className="doctorsProfile" onClick={() => router.push(`/online-doctor-consultations/${option?.doctor_primary_specialization?.online_doctor_specialization_slug}/${option?.doctor_name_slug}`)}>View Profile</button>
                    <button type="button" onClick={() => consultDoctor(option)} className="doctorConsultation">Consult ₹{option?.online_consultation_fee}</button>
                  </div>
                </div>
              )
            })}

          </div>
          <div className=" doctorFilterSection desktopContent">
          {inClinic && (
              <div className="doctors-specific-address">
                <div className="doctors-address-title">
                  Andrologist near you
                </div>
                <div className="doctors-address-subtitle">
                  You are seeing results for Banajara Hills. See results from
                  other Hyderabad city locations
                </div>
                <div className="doctors-address-cards">
                  <div className="doctors-card-top">
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
                  <div className="doctors-card-bottom">
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
            )}
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
        <div style={{border: "1px solid red"}}>
          {page.data.map((item,index)=> {
            return (
              <div key={item.id}>
                {item.title}
              </div>
            )
          })}
           </div>

        <div className="pagination-container">
        <Pagination>{showPageItemsFunction()}</Pagination>
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
          {/* <div className="fs14fwb pb-2">Top Services In Coimbatore</div>
        <div className="fs14">Presentation and neatness of your profile is a key factor when it comes to users / patients finding you or when consulting with you for an online consultation or in-clinic appointment. Thus, we request you to share your professional image / photo via email and WhatsApp. We thank you for your valuable time and your co-operation and we are eagerly waiting to hear from you and to start working with you. Presentation and neatness of your profile is a key factor when it comes to users / patients finding you or when consulting with you for an online consultation or in-clinic </div> */}
        </div>
      </div>
      {popup &&
        <BookingDetailsModal
          successModal={popup}
          setSuccessModal={setPopup}
          doctorDetail={doctorDetail}
          specialization={specialization}
        />
      }
    </>
  )
}

export default DoctorsList