import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import Select from 'react-select';

import { slugUrl } from "../../constants";
import DownloadBtn from "./DownloadBtn";

const popularConsultationSearchesArr = ["General Physician", "ENT", "Dermatology", "Genecology"]

const roundTick = "/assets/icons/round-tick.svg";
const searchIcon = "/assets/icons/magnifying-glass.svg";
const arrow = "/assets/arrow-left-white.svg"

const customStyles = {
  control: (provided, state) => {
    // console.log('provided:', provided);
    // console.log('state:', state);
    return {
      ...provided,
      height: '77px',
      border: 'none',
      margin: '0 0 46px',
      padding: '0 14px 0 55px',
      boxShadow: '0px 1px 9px 0px rgba(81, 79, 79, 0.25)',
      borderRadius: (state.isFocused && state.options.length) ? '15px 15px 0px 0px' : '15px',
    };
  },
  placeholder: (provided) => ({
    ...provided,
    textAlign: 'start',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f5f5f5' : 'white',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
  menu: (provided) => ({
    ...provided,
    // maxHeight: '208px', static height for dropdown use this section
    // overflowY: 'auto',
  }),
};

const ServiceBanner = ({
  bannerTitle = "",
  bannerListPoints = [],
  className = "",
  bannerImage,
  setDownloadModal = () => { },
  setBannerQrImg = () => { },
  pageName = ""
}) => {

  const navigate = useRouter().push
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption?.type === "health-concern") {
      navigate(`/online-doctor-consultations/health-concern/${selectedOption?.slug}`)
    } else if (selectedOption?.value) {
      navigate(`/online-doctor-consultations/${selectedOption?.slug}`)
    }
  }, [selectedOption])

  const getDoctorSpecialisation = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-specialisation/list`, {
        active: true,
      })
      .then((response) => {
        setOptions(response.data.rows.map((data) => ({ value: data?.online_doctor_specialization, label: data?.online_doctor_specialization, slug: data?.online_doctor_specialization_slug })));
      })
      .catch((err) => {
        console.error(err);
        alert("Some error");
      });
  };

  useEffect(() => {
    getDoctorSpecialisation()
  }, [])

  
  const handleInputChange = (inputValue) => {
    if (inputValue.length > 2) {
      axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/filter`, {
          value: inputValue,
        })
        .then((response) => {
          // todo check this one need or not
          // const filteredDoctors = response.data.filter((doctor) => {
          //   const lowercasedValue = inputValue?.toLowerCase();
          //   return (
          //     doctor.doctor_name?.toLowerCase().includes(lowercasedValue)
          //     ||
          //     doctor.doctor_primary_specialization?.online_doctor_specialization?.toLowerCase().includes(lowercasedValue) ||
          //     doctor.online_health_concern.some(item => item.health_concern.includes(lowercasedValue))
          //     // doctor.online_health_concern?.toLowerCase().includes(lowercasedValue)
          //   );
          // });

          const combinedOptions = response.data?.flatMap((doctor) => {
            const options = [];

            if (doctor?.doctor_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
              options.push({
                value: doctor?.doctor_name,
                label: (
                  <div className="flexBetweenCenter">
                    <div className="doctor-option-label">
                      <span className="label-top fs16">{doctor?.doctor_name}</span>
                      <span className="fs12">{doctor?.doctor_primary_specialization?.online_doctor_specialization}</span>
                    </div>
                    <MdOutlineChevronRight size={24} />
                  </div>
                ),
                slug: `${doctor.doctor_primary_specialization?.online_doctor_specialization_slug}/${doctor.doctor_name_slug}`,
              });
            }

            if (doctor.doctor_primary_specialization?.online_doctor_specialization?.toLowerCase().includes(inputValue?.toLowerCase())) {
              options.push({
                value: doctor.doctor_primary_specialization?.online_doctor_specialization,
                type: 'specialization',
                label: (
                  <div className="option-label">
                    <span className="fs16">{doctor.doctor_primary_specialization?.online_doctor_specialization}</span>
                    <span className="label-right">Specialization</span>
                  </div>
                ),
                slug: doctor.doctor_primary_specialization?.online_doctor_specialization_slug,
              });
            }
            doctor.online_health_concern?.flatMap((hc)=>{
              if(hc?.health_concern?.toLowerCase().includes(inputValue?.toLowerCase())){
                options.push({
                  value: hc.health_concern,
                  type: 'health-concern',
                  label: (
                    <div className="option-label">
                      <span className="fs16">{hc.health_concern}</span>
                      <span className="label-right">Symptoms</span>
                    </div>
                  ),
                  slug: hc.health_concern_slug,
                });
              }
            })

            // if (doctor.online_health_concern?.toLowerCase().includes(inputValue?.toLowerCase())) {
            //   if (doctor.online_health_concern.includes(',')) {
            //     doctor.online_health_concern.split(',').forEach((data) => {
            //       options.push({
            //         value: data,
            //         type: 'health-concern',
            //         label: (
            //           <div className="option-label">
            //             <span className="fs16">{data}</span>
            //             <span className="label-right">Symptoms</span>
            //           </div>
            //         ),
            //         slug: slugUrl(data),
            //       });
            //     })
            //   } else {
            //     options.push({
            //       value: doctor.online_health_concern,
            //       type: 'health-concern',
            //       label: (
            //         <div className="option-label">
            //           <span className="fs16">{doctor.online_health_concern}</span>
            //           <span className="label-right">Symptoms</span>
            //         </div>
            //       ),
            //       slug: slugUrl(doctor.online_health_concern),
            //     });
            //   }
            // }
            return options;
          });

          const uniqueEntries = new Set();
          const filteredData = combinedOptions.filter(entry => {
            const entryKey = JSON.stringify([entry.value, entry.type]);
            const isUnique = !uniqueEntries.has(entryKey);
            if (isUnique) {
              uniqueEntries.add(entryKey);
            }
            return isUnique;
          });
          setOptions(filteredData);
        })
        .catch((err) => {
          console.error(err);
          alert("Some error");
        });
    } 
    // else {
    //   console.log('else is working');
    //   setOptions([])
    // }
  };

  return (
    <div className={`${className} serviceBannerSection`}>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="servicetopsectionWrapper">
          <h1 className="serviceBannerTitle fs48m30fwb text-white">
            {bannerTitle}
          </h1>
          <div className="row listPoints">
            {bannerListPoints.map((data, inx) => {
              return (
                <div className={data.className} key={inx}>
                  <Image src={roundTick} height={16} width={16} alt="Tick Imag" />
                  <span className="text-white">{data.text}</span>
                </div>
              );
            })}
          </div>
          {pageName !== "online-consultation" && <DownloadBtn setDownloadModal={setDownloadModal} setBannerQrImg={setBannerQrImg} pageName={pageName} />}
          {pageName === "online-consultation" &&
            <div className="searchFieldWrapper position-relative">
              {/* <input
                type="text"
                placeholder="Search for Specialization"
                className="consultationSearchField"
              /> */}
              <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={colourOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                placeholder={"Search for Specialization"}
                isClearable={true}
                // isRtl={isRtl}
                onChange={setSelectedOption}
                onInputChange={(e)=>handleInputChange(e)}
                isSearchable={true}
                name="specialization"
                options={options}
                noOptionsMessage={() => null}
                styles={customStyles}
              />
              {/* <div className="text-white">
                <span className="fs18m14fw500m600">Popular Searches</span>
                <div className="d-flex popularSearchWrapper">
                  {popularConsultationSearchesArr.map((data, inx) =>
                    <div key={inx} className="popularConsultationSearch fs18 flexCenter">{data}
                      <span>
                        <Image src={arrow} width={11} height={15} alt="arrow" className="onlineDoctorArrow" />
                      </span>
                    </div>
                  )}
                </div>
              </div> */}
              <Image
                src={searchIcon}
                width={24}
                height={24}
                alt="search-icon"
                className="consultationSearchIcon"
              />
              
              {/* <button className="consultationSearchBtn fs20fwb text-white desktopContent" onClick={() => navigate("/doctor-listing")}>Search</button> */}
            </div>
          }
        </div>
        <Image
          src={bannerImage}
          height={620}
          width={620}
          className="serviceBannerImg"
          alt="service-banner"
          priority
        />
      </div>
    </div>
  );
};

export default ServiceBanner;
