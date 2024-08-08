import React from "react";
// import { Link } from "react-router-dom";
import successIcon from "../../../assets/success-icon.gif"
import './success.css';

// todo
const OtherRegistrationSuccess = () => {
    return (
        <>
            <div className="success-modal">
                <div className="modal fade" id="success" tabIndex="-1" aria-labelledby="successModal" aria-hidden="true">
                    <div className="modal-dialog modal-box">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src={successIcon} alt="successIcon" className="success-gif" />
                                <div className="success-text"><p>Registered Successfully</p></div>
                                <div>
                                    <a to="/"><button className='success-home-btn'>Go to Home</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtherRegistrationSuccess;