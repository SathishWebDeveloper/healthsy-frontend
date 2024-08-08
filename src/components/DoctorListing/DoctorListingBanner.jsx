import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from 'react-select';

import { MdOutlineChevronRight } from "react-icons/md";
import { slugUrl } from "../../constants";

import useIsDesktop from "../Hooks/useIsDesktop";

const searchIcon = "/assets/icons/magnifying-glass.svg";
const arrowIcon = "/assets/arrow_white.svg"
const closeIcon = "/assets/icons/close-icon.svg"
// const searchWhiteIcon = "/assets/search_white.svg"

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: '77px',
    border: 'none',
    margin: '0 0 46px',
    padding: '0 14px 0 55px',
    boxShadow: '0px 1px 9px 0px rgba(81, 79, 79, 0.25)',
    borderRadius: (state.isFocused && state.options.length) ? '15px 15px 0px 0px' : '15px',
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: 'start',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f5f5f5' : 'white',
    color: "black",
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
};

const DoctorListingBanner = ({
  selectedOption,
  setSelectedOption
}) => {
  const desktop = useIsDesktop()
  const navigate = useRouter().push
  const { query: { specialization } } = useRouter()

  const [options, setOptions] = useState([])
  // const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption?.type === "health-concern") {
      navigate(`/online-doctor-consultations/health-concern/${selectedOption?.slug}`)
    } else if (selectedOption?.value) {
      navigate(`/online-doctor-consultations/${selectedOption?.slug}`)
    }
  }, [selectedOption])

  const handleInputChange = (inputValue) => {
    if (inputValue.length > 2) {
      axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/filter`, {
          value: inputValue,
        })
        .then((response) => {
          // const filteredDoctors = response.data.filter((doctor) => {
          //   const lowercasedValue = inputValue?.toLowerCase();
          // // todo check this one need or not
          //   return (
          //     doctor.doctor_name?.toLowerCase().includes(lowercasedValue) ||
          //     doctor.doctor_primary_specialization?.online_doctor_specialization?.toLowerCase().includes(lowercasedValue) ||
          //     doctor.online_health_concern.some(item => item.health_concern.includes(lowercasedValue))
          //   );
          // });

          const combinedOptions = response.data.flatMap((doctor) => {
            const options = [];
            console.log('options', options)

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
                slug: `${doctor?.doctor_primary_specialization?.online_doctor_specialization_slug}/${doctor.doctor_name_slug}`,
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
    } else {
      setOptions([])
    }
  };

  const getDoctorSpecialisation = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-specialisation/list`, {
        active: true,
      })
      .then((response) => {
        setOptions(response.data.rows.map((data) => ({ value: data?.online_doctor_specialization, label: data?.online_doctor_specialization, slug: data?.online_doctor_specialization_slug })));
        const data = response.data.rows.find((data) => data?.online_doctor_specialization_slug === specialization)
        setSelectedOption({ value: data?.online_doctor_specialization, label: data?.online_doctor_specialization, slug: data?.online_doctor_specialization_slug })
      })
      .catch((err) => {
        console.error(err);
        alert("Some error");
      });
  };

  // useEffect(() => {
  //   getDoctorSpecialisation()
  // }, [specialization])

  return (
    <div className="DoctorListingBanner bgPrimary">
      <div className="container text-white docterList-Bannertext">
        <div>
          <h1 className="doctorListingTitle fs44m26fw800">{desktop ? 'Qualified and Experienced Doctors' : 'Search Doctor, Make an Appointment'}</h1>
          <div className="fs18m14fw500  doctorListing-subTitle">{desktop ? 'Consult online with doctors who are most comfortable and suitable for you' : 'Discover the best doctors for your health'}</div>
        </div>
        <div className="position-relative selectWithSearchField">
          {/* <input
                        type="text"
                        placeholder="General Physician"
                        className="doctorSearchField"
                    /> */}
          <div className="searchFieldWrapper position-relative">
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
              onInputChange={handleInputChange}
              isSearchable={true}
              name="specialization"
              options={options}
              noOptionsMessage={() => null}
              styles={customStyles}
            />

            <Image
              src={searchIcon}
              width={24}
              height={24}
              alt="search-icon"
              className="doctorListingSearchIcon"
            />
          </div>
          {/* {desktop ? <button className="doctorListingSearchBtn fs20fwb text-white position-relative desktopContent">
                        <Image src={arrowIcon} width={20} height={20} className="" alt="arrowIcon" />
                    </button> :
                        <Image src={closeIcon} width={19} height={19} alt="closeIcon" className="position-absolute serachCloseIcon" />} */}
        </div>
      </div>
    </div >
  )
}

export default DoctorListingBanner