import React from "react";
// import './terms.css';
// import backarrow from "../../assets/back-arrow.svg";
const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const Termsbanner = () => {
    return (
        <div className="container-fluid termsbanner">
            <div className="row backarrow">
                {/* <img src={backarrow} className="" alt="" /> */}
            </div>
            <div className="container">
                <div className='position-absolute w-90 d-block'>
                    <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}><img src={home} alt="home" /></a>  <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" /> <a href="#" className="text-white"> Terms and Conditions</a>
                </div>
            </div>
            <div className="row banner-tilte">
                <h1> HealthSy Terms and Conditions</h1>
            </div>
        </div>
    );
}

export default Termsbanner;