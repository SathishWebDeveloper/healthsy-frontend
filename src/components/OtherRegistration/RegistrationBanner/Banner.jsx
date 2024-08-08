import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';

// import './banner.css'
// import home from "../../../assets/home-icon.svg";
// import arrowleft from "../../../assets/arrow-left.svg";
// import RegistrationBannerImage from "../../../assets/other-reg-form-banner.png";
// import MobileRegistrationBannerImage from "../../../assets/resp-other-banner-mobile.png";

const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const RegistrationBanner = () => {

  const [doctorbanner, setDoctorBanner] = useState('')
  const [doctorbannermob, setDoctorBannerMob] = useState('')

  useEffect(() => {
    getBannerImageData()
  }, [])

  const getBannerImageData = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}banner-images/list`)
      .then((res) => {
        setDoctorBanner(res.data.rows[0].other_Register_Form_Banner)
        setDoctorBannerMob(res.data.rows[0].other_Register_Form_Banner_mob)
      })
  }

  return (
    <div className="other-reg-form-section">
      <div className="container">
        <div className='position-absolute w-90 d-block'>
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}><img src={home} alt="home" /></a>  <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" /> <a href="#" className="text-white"> Others</a>
        </div>
      </div>
      {doctorbanner && <img
        src={
          process.env.NEXT_PUBLIC_APP_API_URL +
          "images/" +
          doctorbanner
        }
        alt="doctorbanner"
        className="banner-img content-desktop bannerImageDesktop"
      />}
      {doctorbannermob && <img
        //   src={MobileRegistrationBannerImage} 
        src={
          process.env.NEXT_PUBLIC_APP_API_URL +
          "images/" +
          doctorbannermob
        }
        alt="doctorbannermob"
        className="banner-img content-mobile bannerImageMob"
      />}
    </div>
  )
}

export default RegistrationBanner