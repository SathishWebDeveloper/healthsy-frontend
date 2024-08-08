import { useEffect, useState } from "react";
import Select from 'react-select';
import { useRouter } from "next/router";
import Image from "next/image";
import { handleInputChange, handleLocationChange } from "./inclinic/search";
import { convertToTitleCase } from "../../constants";

const searchIcon = "/assets/icons/magnifying-glass.svg";
const locationIcon = "/assets/location.svg"
const leftarrowIcon = "/assets/Physiotheraphy/left-arrow.svg";

const mobileSelectStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      height: '60px',
      // width : '204px',
      border: '1px solid #E9E9E9',
      backgroundColor: '#F5F5F5',
      boxShadow: 'none',
      borderRadius: '8px',
      '&:hover': {
        border: '1px solid #E9E9E9',
      },
    };
  },
  placeholder: (provided, state) => {
    return {
      ...provided,
      textAlign: 'start',
      margin: '0 0 0 45px'
    }
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    color: "black",
    margin: state.isFocused ? '0' : '0',
    borderBottom: '1px solid #EDEDED',
    height: '100%',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
  // menu: (provided) => ({
  //   ...provided,
  // }),
};
// const searchLocation = ['Coimbatore', 'Chennai', 'Bangalore', 'Salem'];
const words = ["Specialization", "Doctors", "Symtoms", "Clinics", "services"];

// const updatedLocation = searchLocation.map((data) => ({ value: data, label: data, slug: data }));



// const searchRole = ['Dentists', 'ENT', 'cardiology', 'Nursing'];
// const updatedRole = searchRole.map((data) => ({ value: data, label: data, slug: data }))

const MobileSearchField = ({ handleChange, isDesktop, city_slug, locality_slug = "", slug_level_2, }) => {
  const location = locality_slug ? `${convertToTitleCase(city_slug)}, ${convertToTitleCase(locality_slug)}` : convertToTitleCase(city_slug)
  const locationSlug = locality_slug ? locality_slug : city_slug

  const defaultCity = {
    type: locality_slug? "locality": "city",
    value: locationSlug,
    slug: locality_slug ? locality_slug : city_slug,
    label: (
      <div className="flexBetweenCenter">
        <div className="" style={{padding:'0'}}>
          <span className="label-top fs16">{location}</span>
        </div>
      </div>
    )
  }
  const [options, setOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(defaultCity);
  const dynamicText = "Search for ";
  const navigate = useRouter().push

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

  useEffect(() => {
    if (isDesktop) {
      handleChange();
    }
  }, [isDesktop])

  useEffect(() => {
    if (selectedOption?.value) {
      // navigate(`/in-clinic-appointments/${selectedOption?.slug}`);
      window.location.href = `/in-clinic-appointments/${selectedOption?.slug}`

    } 
  }, [selectedOption])

  return (

    <div className="mobileselectField_Container">
      <div className="search_title"  >
        <Image
          src={leftarrowIcon}
          width={24}
          height={24}
          alt="back-button"
          className="leftarrowIcon"
          onClick={() => handleChange()}
        />
        Search</div>
      <div className="multipleSelect_Container locationPath_container">
        <div className="mobileSearchField"  >
          <Select
            className="mobileScreenInput"
            defaultValue={defaultCity}
            classNamePrefix="select"
            placeholder={"Select Your City/Town"}
            isClearable={true}
            isSearchable={true}
            name="locationCity"
            options={cityOptions}
            noOptionsMessage={() => null}
            onChange={setSelectedCityOption}
            onInputChange={(e) => handleLocationChange(e, setCityOptions)}
            styles={mobileSelectStyles}
          //   onMenuOpen={() => handleChange()}
          />
          <span className="search_icon">
            <Image
              src={locationIcon}
              width={24}
              height={24}
              alt="search-icon"
              className="specializationSearchIcon"
            /></span>
        </div>
      </div>
      <div className="multipleSelect_Container specilizationPath_container">
        <div className="mobileSearchField"  >
          <Select
            className="mobileScreenInput"
            classNamePrefix="select"
            placeholder={newPlaceholder}
            isClearable={true}
            isSearchable={true}
            name="specialization"
            onChange={setSelectedOption}
            onInputChange={(e) => handleInputChange(e, setOptions, selectedCityOption)}
            options={options}

            noOptionsMessage={() => null}
            styles={mobileSelectStyles}
          />
          <span className="search_icon">
            <Image
              src={searchIcon}
              width={24}
              height={24}
              alt="search-icon"
              className="specializationSearchIcon"
            /></span>
        </div>
      </div>
    </div>

  )
}
export default MobileSearchField;