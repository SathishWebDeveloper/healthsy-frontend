import React from "react";
// import './customergrievance.css';
const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const RefundBanner = () => {
    return (
        <div className="container-fluid customer-grievance-banner">
            <div className="container">
                <div className='position-absolute w-90 d-block'>
                    <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}><img src={home} alt="home" /></a>  <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" /> <a href="#" className="text-white"> Customer Grievance Redressal Policy</a>
                </div>
            </div>
            <div className="row banner-tilte">
                <h1> HealthSy Customer Grievance Redressal Policy</h1>
            </div>
        </div>
    );
}

export default RefundBanner;