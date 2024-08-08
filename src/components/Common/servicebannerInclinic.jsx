import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineChevronRight } from "react-icons/md";
import Select from 'react-select';

import { useEffect, useState } from "react";
import apiCall from "../../api";
import { filteredData, } from "../../constants/filter";
import useIsDesktop from "../Hooks/useIsDesktop";
const popularConsultationSearchesArr = ["General Physician", "ENT", "Dermatology", "Genecology"]

const roundTick = "/assets/icons/round-tick.svg";
const searchIcon = "/assets/icons/magnifying-glass.svg";
const arrow = "/assets/arrow-left-white.svg"
const locationIcon = "/assets/location.svg"


const citySelectStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      height: "51px",
      border: "1px solid #E9E9E9",
      backgroundColor: "#F5F5F5",
      boxShadow: "none",
      borderRadius: "15px",
      "&:hover": {
        border: "1px solid #E9E9E9",
      },
    };
  },
  placeholder: (provided) => ({
    ...provided,
    textAlign: "start",
    color: "#4D4D4D",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f5f5f5" : "white",
    color: "black",
    margin: state.isFocused ? "0" : "0",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  }),
  menu: (provided) => ({
    ...provided,
  }),
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: '51px',
    border: '1px solid #E9E9E9',
    backgroundColor: '#F5F5F5',
    boxShadow: 'none',
    borderRadius: '15px',
    borderRadius: (state.isFocused && state.options.length) ? '15px 15px 0px 0px' : '15px',
    '&:hover': {
      border: '1px solid #E9E9E9',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: 'start',
    color: '#4D4D4D',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f5f5f5' : 'white',
    color: "black",
    margin: state.isFocused ? '0' : '0',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
};

const mobileSelectStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      height: '56px',
      // width : '204px',
      border: '1px solid #E9E9E9',
      // backgroundColor : '#F5F5F5',
      boxShadow: 'none',
      borderRadius: '8px',
      '&:hover': {
        border: '1px solid #E9E9E9',
      },
    };
  },
  placeholder: (provided) => ({
    ...provided,
    textAlign: 'start',
    color: '#4D4D4D',
    margin: '0 0 0 45px'
  }),
  // option: (provided, state) => ({
  //   ...provided,
  //   backgroundColor: state.isFocused ? '#f5f5f5' : 'white',
  //   color: "black",
  //   margin:state.isFocused ? '0' : '0',
  //   '&:hover': {
  //     backgroundColor: '#f5f5f5',
  //   },
  // }),
  // menu: (provided) => ({
  //   ...provided,
  // }),
};

const ServiceBannerInClinic = ({
  bannerTitle = "",
  bannerListPoints = [],
  className = "",
  bannerImage,
  pageName = "",
  handleChange
}) => {

  const defaultCity = {
    type: "city",
    value: "Coimbatore",
    slug: "coimbatore",
    label: (
      <div className="flexBetweenCenter">
        <div className="doctor-option-label">
          <span className="label-top fs16">Coimbatore</span>
        </div>
      </div>
    )
  }
  const navigate = useRouter().push
  const [options, setOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(defaultCity);
  const words = ["Specialization", "Doctors", "Symtoms", "Clinics", "services"];
  const searchLocation = ['Coimbatore', 'Chennai', 'Bangalore', 'Salem'];
  const desktop = useIsDesktop();

  useEffect(() => {
    if (selectedOption?.value) {
      navigate(`/in-clinic-appointments/${selectedOption?.slug}`);
    }
  }, [selectedOption])

  useEffect(() => {
    if (selectedCityOption) {
      setSelectedCityOption(selectedCityOption)
    } else {
      setSelectedCityOption(defaultCity)
    }
  }, [selectedCityOption])


  const handleInputChange = (inputValue) => {
    (async () => {
      if (inputValue.length > 2) {
        try {
          const result = await apiCall(`partnered-doctor/inclinic-filter`, "POST", {
            search: inputValue,
            cityType: selectedCityOption?.type,
            citySlug: selectedCityOption?.slug
          })
          if (result?.data?.doctorRecords?.length) {
            const options = [];
            const doctorProfileOptions = [];
            result.data.doctorRecords.forEach((doctor) => {
              // doctor profile
              if (doctor?.doctor_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
                doctorProfileOptions.push({
                  value: doctor?.doctor_name,
                  label: (
                    <div className="flexBetweenCenter">
                      <div className="doctor-option-label">
                        <span className="label-top fs16">{doctor?.doctor_name}</span>
                        <span className="fs12 specializationText">{doctor?.inclinic_primary_specialization?.inclinic_doctor_specialization}</span>
                      </div>
                      <MdOutlineChevronRight size={24} />
                    </div>
                  ),
                  // todo type need or not 
                  slug: selectedCityOption?.type === "locality" ? `${doctor.city?.slug_url}/${doctor.clinic_location?.locality_slug}/${doctor.inclinic_primary_specialization?.inclinic_doctor_specialization_slug}/${doctor?.doctor_name_slug}` :
                   `${doctor.city?.slug_url}/${doctor.inclinic_primary_specialization?.inclinic_doctor_specialization_slug}/${doctor?.doctor_name_slug}`,
                  // slug: `${doctor?.inclinic_primary_specialization?.doctorinclinic_doctor_specialization_slug}/${doctor.doctor_name_slug}`,
                });
              }
              // specialization
              if (doctor.inclinic_primary_specialization?.inclinic_doctor_specialization?.toLowerCase().includes(inputValue?.toLowerCase())) {
                options.push({
                  value: doctor.inclinic_primary_specialization?.inclinic_doctor_specialization,
                  type: 'specialization',
                  label: (
                    <div className="option-label">
                      <span className="fs16">{doctor.inclinic_primary_specialization?.inclinic_doctor_specialization}</span>
                      <span className="label-right">Specialization</span>
                    </div>
                  ),
                  slug: selectedCityOption?.type === "locality" ? `${doctor.city?.slug_url}/${doctor.clinic_location?.locality_slug}/${doctor.
                    inclinic_primary_specialization
                    ?.inclinic_doctor_specialization_slug}?type=specialization` :
                    `${doctor.city?.slug_url}/${doctor.
                      inclinic_primary_specialization
                      ?.inclinic_doctor_specialization_slug}?type=specialization`,
                });
              }
              // Health Concern
              doctor.inclinic_health_concern?.forEach((hc) => {
                if (hc?.health_concern?.toLowerCase().includes(inputValue?.toLowerCase())) {
                  options.push({
                    value: hc.health_concern,
                    type: 'health-concern',
                    label: (
                      <div className="option-label">
                        <span className="fs16">{hc.health_concern}</span>
                        <span className="label-right">Symptoms</span>
                      </div>
                    ),
                    // slug: hc.health_concern_slug,
                    slug: selectedCityOption?.type === "locality" ? `${doctor.city?.slug_url}/${doctor.clinic_location?.locality_slug}/${hc.health_concern_slug}?type=symptoms` :
                      `${doctor.city?.slug_url}/${hc.
                        health_concern_slug}?type=symptoms`,
                  });
                }
              })

              return options;
            });

            const clinicProfileOptions = [];
            const clinicSpecialityOptions = [];
            const cliniServiceOptions = [];

            result.data.clinicProfileRecords.forEach((clinic) => {
              //  ClinicProfileOptions
              if (clinic?.clinic_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
                clinicProfileOptions.push({
                  value: clinic?.clinic_name,
                  type: 'clinic-profile',
                  label: (
                    <div className="flexBetweenCenter">
                      <div className="clinic-option-label">
                        <span className="label-top fs16">{clinic?.clinic_name}</span>
                        <span className="fs12 specializationText">{clinic?.clinic_location?.locality}</span>
                      </div>
                      <MdOutlineChevronRight size={24} />
                    </div>
                  ),
                  slug: `${clinic?.city?.slug_url}/${clinic.clinic_location.locality_slug}/${clinic.clinic_specialty_status.clinic_speciality_slug}/${clinic.clinic_name_slug}`,
                });
              }


              //  ClinicSpecialtyOptions
              if (clinic.clinic_specialty_status?.clinic_speciality?.toLowerCase().includes(inputValue?.toLowerCase())) {
                clinicSpecialityOptions.push({
                  value: clinic.clinic_specialty_status.clinic_speciality,
                  type: 'clinic-speciality',
                  label: (
                    <div className="flexBetweenCenter">
                      <div className="clinic-option-label">
                        <span className="label-top fs16">{clinic.clinic_specialty_status.clinic_speciality}</span>
                      </div>
                      <MdOutlineChevronRight size={24} />
                    </div>
                  ),
                  // slug: clinic.inclinic_primary_specialization?.inclinic_doctor_specialization_slug,
                });
              }

              clinic?.services?.forEach((cs) => {
                if (cs?.service_name?.toLowerCase().includes(inputValue?.toLowerCase())) {
                  cliniServiceOptions.push({
                    value: cs.service_name,
                    type: 'clinic-service',
                    label: (
                      <div className="option-label">
                        <span className="fs16">{cs.service_name}</span>
                        <span className="label-right">Symptoms</span>
                      </div>
                    ),
                    slug: cs.clinic_service_slug,
                  });
                }
              })

              return options;
            });


            const filteredOptions = [
              ...filteredData([...options,

              // ...cliniServiceOptions
            ]),
              {
                label: "Doctors",
                slug: "data",
                backgroundColor: "#E9E9E9",
                options: filteredData(doctorProfileOptions)
              },
              // {
              //   label: "Clinics",
              //   slug: "data",
              //   backgroundColor: "#E9E9E9",
              //   options: filteredData(clinicProfileOptions)
              // },
              // {
              //   label: "Clinic Speciality",
              //   slug: "data",
              //   backgroundColor: "#E9E9E9",
              //   options: filteredData(clinicSpecialityOptions)
              // },
            ]
            setOptions(filteredOptions);
          }

        } catch (err) {
          console.error(err);
        }
      } else {
        setOptions([])
      }
    })()
  };


  const dynamicText = "Search for ";

  const newPlaceholder = (
    <div style={{ position: 'relative', display: 'flex' }}>
      <div style={{ margin: '0px 8px 0px 0px' }} className="placeholder-first-part">{dynamicText.substring(0, 10)}</div>
      <div style={{ color: '#CB1B5B' }} className="placeholder-second-part"><div className="child-text">
        {words.map((special, index) => {
          return (
            <div key={`special${index}`}>{special}</div>
          )
        })}
      </div></div>
    </div>
  );

  const handleLocationChange = (locationSearch) => {
    (async () => {

      if (locationSearch.length > 2)

        try {
          const result = await apiCall(`doctor-cities/search`, "GET", {
            search: locationSearch,
            active: true
          })

          if (result?.data?.length) {
            const options = [];
            result.data.forEach((data) => {
              if (data?.locality) {
                options.push({
                  value: data?.locality,
                  type: 'locality',
                  label: (
                    <div className="option-label flex-column align-items-start">
                      <span className="fs16">{data?.locality}</span>
                      <span className="label-right">{data?.city?.city}</span>
                    </div>
                  ),
                  slug: data.locality_slug,
                });
              } else {
                options.push({
                  value: data?.city,
                  type: 'city',
                  label: (
                    <div className="option-label">
                      <span className="fs16">{data?.city}</span>
                      <span className="label-right">City</span>
                    </div>
                  ),
                  slug: data.slug_url,
                });
              }
            })
            setCityOptions(options)
          }
        } catch (err) {
          console.error(err);
        }
    })()
  }

  return (
    <div className={`${className} serviceBannerSection serviceInclinicSection`}>
      <div className="container inclinicField d-flex">
        <div className="servicetopcontentWrapper">
          <div className="topsection_1">
            <h1 className="serviceBannerTitle fs48m30fwb text-white">
              {bannerTitle}
              {/* {desktop ? bannerTitle : 'Get Consulted Online by Doctors on HealthSy'} */}
            </h1>
            <div className="bannerTitle_points">
              {bannerListPoints.map((data, inx) => {
                return (
                  <div key={inx}>
                    <Image src={roundTick} height={16} width={16} alt="Tick Imag" className="banner_icon" />
                    <span className="text-white">{data.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {desktop ?
            <div className="topsection_2">

              {pageName !== "online-consultation" &&
                <div className="searchFieldWrapper position-relative">
                  <div className="location_field">
                    <Select
                      className="city_destination"
                      classNamePrefix="select"
                      defaultValue={defaultCity}
                      // isDisabled={isDisabled}
                      // isLoading={isLoading}
                      placeholder={"City / Town"}
                      isClearable={true}
                      // isRtl={isRtl}
                      onChange={setSelectedCityOption}
                      onInputChange={handleLocationChange}
                      isSearchable={true}
                      name="locationCity"
                      options={cityOptions}
                      noOptionsMessage={() => null}
                      styles={citySelectStyles}
                    />
                    <span className="location_icon"> <Image src={locationIcon} width={14} height={16} alt="location" /></span>
                  </div>
                  <div className="docter_field">
                    <Select
                      className="doctor special"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      // isDisabled={isDisabled}
                      // isLoading={isLoading}
                      placeholder={newPlaceholder}
                      isClearable={true}
                      // isRtl={isRtl}
                      onChange={setSelectedOption}
                      onInputChange={handleInputChange}
                      isSearchable={true}
                      name="specialization"
                      options={options}
                      noOptionsMessage={() => null}
                      styles={customStyles}
                    />
                    {/* <span className="specialization-lgcontent-text">{currentWord}</span> */}
                  </div>
                  {/* <input
      type="text"
      placeholder="Search for Specialization"
      className="consultationSearchField"
    /> */}
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
                  {/* {searchicon} */}
                  {/* <Image    
      src={searchIcon}
      width={24}
      height={24}
      alt="search-icon"
      className="consultationSearchIcon"
    /> */}
                  {/* <button className="consultationSearchBtn fs20fwb text-white desktopContent" onClick={() => navigate("/doctor-listing")}>Search</button> */}
                </div>
              }
            </div> : <>
              <div className="mobileSearchField"  >
                <Select
                  className="mobileScreenInput"
                  classNamePrefix="select"
                  // defaultValue={colourOptions[0]}
                  // isDisabled={isDisabled}
                  // isLoading={isLoading}
                  placeholder={newPlaceholder}
                  isClearable={true}
                  // isRtl={isRtl}
                  // onChange={setSelect(()=>true)}
                  // onInputChange={handleInputChange}
                  isSearchable={true}
                  name="specialization&location"
                  options={options}
                  noOptionsMessage={() => null}
                  styles={mobileSelectStyles}
                  onMenuOpen={() => handleChange()}
                // onClick={()=>handleChange()}
                />
                {/* <span className="specialization-mobcontent-text">{currentWord}</span> */}
                <span className="search_icon">
                  <Image
                    src={searchIcon}
                    width={24}
                    height={24}
                    alt="search-icon"
                    className="specializationSearchIcon"
                  /></span>

                {/* <button className="consultationSearchBtn fs20fwb text-white desktopContent" onClick={() => navigate("/doctor-listing")}>Search</button> */}
              </div></>}

          <div className="topsection_3 text-white ">
            <span className="fs18m14fw500m600">Popular Searches</span>
            <div className="popularSearchContainer">
              <div className="d-flex popularSearchWrapper">


                {popularConsultationSearchesArr.map((data, inx) =>
                  <div key={inx} className="popularConsultationSearch fs18 flexCenter">{data}
                    <span>
                      <Image src={arrow} width={11} height={15} alt="arrow" className="onlineDoctorArrow" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* {pageName !== "online-consultation" && <DownloadBtn setDownloadModal={setDownloadModal} setBannerQrImg={setBannerQrImg} pageName={pageName} />} */}
          {/* {pageName === "online-consultation" &&
            <div className="searchFieldWrapper position-relative">
              <input
                type="text"
                placeholder="Search for Sepcialization"
                className="consultationSearchField"
              />
              <div className="text-white">
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
              </div>
              <Image
                src={searchIcon}
                width={24}
                height={24}
                alt="search-icon"
                className="consultationSearchIcon"
              />
              <button className="consultationSearchBtn fs20fwb text-white desktopContent" onClick={() => navigate("/doctor-listing")}>Search</button>
            </div>
          } */}
        </div>
        <div className="serviceimagesectionwrapper">
          <Image
            src={bannerImage}
            height={540}
            width={540}
            className="serviceBannerImg"
            alt="service-banner"
            priority

          />
        </div>

      </div>
    </div>
  );
};

export default ServiceBannerInClinic;

