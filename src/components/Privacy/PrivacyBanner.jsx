import React from "react";
// import './privacy.css';
// import backarrow from "../../assets/back-arrow.svg";
const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const PrivacyBanner = () => {
    return (
        <div className="container-fluid privacybanner">
            <div className="row backarrow">
                {/* <img src={backarrow} className="" alt="" /> */}
            </div>
            <div className="container">
                <div className='position-absolute w-90 d-block'>
                    <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}><img src={home} alt="home" /></a>  <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" /> <a href="#" className="text-white"> Privacy Policy</a>
                </div>
            </div>
            <div className="row banner-tilte-privacy">
                <h1> HealthSy Privacy Policy</h1>
            </div>
        </div>
    );
}

export default PrivacyBanner;