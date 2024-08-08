import React from "react";
import './ourservices.css';

// todo
import medicine from "../../../assets/medicine.svg";

const OurServices = (props) => {
    return (
        <>
            <div className="our_service_section">
                <div className="container">
                    <div className="col-12">
                        <div className="row">
                            <h4 className="title">OUR SERVICES</h4>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3 our_service_box">
                                <div className='service'>
                                    <img src={medicine} className='icon' alt="medicine" />
                                    <h5 className='description'>Order </h5>
                                    <h5 className='description'>Medicines </h5>
                                </div>
                            </div>
                            <div className="col-3 our_service_box">
                                <div className='service'>
                                    <img src={medicine} className='icon' alt="medicine" />
                                    <h5 className='description'>Order </h5>
                                    <h5 className='description'>Medicines </h5>
                                </div>
                            </div>
                            <div className="col-3 our_service_box">
                                <div className='service'>
                                    <img src={medicine} className='icon' alt="medicine" />
                                    <h5 className='description'>Order </h5>
                                    <h5 className='description'>Medicines </h5>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3 our_service_box">
                                <div className='service'>
                                    <img src={medicine} className='icon' alt="medicine" />
                                    <h5 className='description'>Order </h5>
                                    <h5 className='description'>Medicines </h5>
                                </div>
                            </div>
                            <div className="col-3 our_service_box">
                                <div className='service'>
                                    <img src={medicine} className='icon' alt="medicine" />
                                    <h5 className='description'>Order </h5>
                                    <h5 className='description'>Medicines </h5>
                                </div>
                            </div>
                            <div className="col-3 our_service_box">
                                <div className='service'>
                                    <img src={medicine} className='icon' alt="medicine" />
                                    <h5 className='description'>Order </h5>
                                    <h5 className='description'>Medicines </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurServices;