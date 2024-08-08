import React from "react";
import "./services.css";

import consultations from "../../../assets/consultations.svg";
import services from "../../../assets/services.svg";
import products from "../../../assets/products.svg";
import appointments from "../../../assets/appointments.svg";
import instaDoc from "../../../assets/instaDoc.svg";
import medicine from "../../../assets/medicine.svg";
// import service1 from "src/assets/services-1.svg";
// import service2 from "src/assets/services-2.svg";
// import service3 from "src/assets/services-3.svg";
// import service4 from "src/assets/services-4.svg";
// import service5 from "src/assets/services-5.svg";
// import service6 from "src/assets/services-6.svg";

// todo
const Services = (props) => {
    return (
        <div className='our-services'>
            <h3 className='mb-5 fs-bold'>OUR SERVICES</h3>
            <div className='services-box-group'>
                <div className="services-box">
                    <img src={medicine} className='icon ' alt="medicine" />
                    <h6>Order<br />Medicines</h6>
                </div>
                <div className="services-box">
                    <img src={consultations} className='icon ' alt="consultations" />
                    <h6>Online Doctor<br />Consultations</h6>
                </div>
                <div className="services-box">
                    <img src={services} className='icon ' alt="services" />
                    <h6>Home Healthcare<br />Services</h6>
                </div>
                <div className="services-box">
                    <img src={products} className='icon ' alt="products" />
                    <h6>Healthcare<br />Products</h6>
                </div>
                <div className="services-box">
                    <img src={appointments} className='icon ' alt="appointments" />
                    <h6>In-clinic Doctor<br />Appointments</h6>
                </div>
                <div className="services-box">
                    <img src={instaDoc} className='icon ' alt="instaDoc" />
                    <h6>InstaDoc<br />24*7</h6>
                </div>
            </div>
        </div>
    )
}

export default Services;