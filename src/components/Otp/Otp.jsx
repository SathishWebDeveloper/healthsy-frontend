import React, { useState } from 'react';
import axios from "axios";
// import "./otp.css"
import PhoneFormInput from '../DoctorRegistration/Partials/PhoneFormInput';
import PhoneOtpStatuses from '../DoctorRegistration/Partials/PhoneOtpStatuses';

export const enum_otp_status = {
    SEND_OTP: "Send-OTP",
    RESEND_OTP: "Resend-OTP",
    OTP_SENT: "OTP-Sent",
    INVALID_OTP: "OTP-Invalid",
    OTP_VERIFIED: "OTP-Verified"
};

const OtpForm =  props => {
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [mobile, setMobile] = useState('');

    const [otp_status, setOTPStatus] = useState(undefined);
    const [otp_timeout, setOTPTimeout] = useState(process.env.NEXT_PUBLIC_APP_RESEND_OTP_TIMEOUT);
    const [otpdisable, setOtpDisable] = useState(false)

    const send_otp = () => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}other-registration/send-otp`, { mobile: mobile }).then(response => {
            setOTPStatus(enum_otp_status.OTP_SENT);
            props.onChange && props.onChange(enum_otp_status.OTP_SENT);
            run_timeout();
            setOtpDisable(true)
        }).catch(err => {
            alert(err.response?.data?.message);
            setOtpDisable(false)
        });
    }

    const resend_otp = () => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}other-registration/resend-otp`, { mobile: mobile }).then(response => {
            run_timeout();
            props.onChange && props.onChange(enum_otp_status.RESEND_OTP);
        }).catch(err => {
            console.error(err);
            alert(err.response?.data?.message);
        });
    }

    let interval;
    const run_timeout = () => {
        setOTPTimeout(process.env.NEXT_PUBLIC_APP_RESEND_OTP_TIMEOUT);
        interval = setInterval(() => {
            setOTPTimeout(prevState => {
                if (prevState <= 1) {
                    clearInterval(interval);
                }
                return prevState - 1
            });
        }, 1000);
    }

    const[votp, setvOtp] = useState(false)

    const verify_otp = () => {
        let otp = [otp1, otp2, otp3, otp4].join('');
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}other-registration/verify-otp`, { mobile: mobile, otp: otp }).then(response => {
            setOTPStatus(enum_otp_status.OTP_VERIFIED);
            setvOtp(false)
            props.onChange && props.onChange(enum_otp_status.OTP_VERIFIED, mobile);
        }).catch(err => {
            setvOtp(true)
            props.onChange && props.onChange(enum_otp_status.INVALID_OTP, err);
        });
    };

    function phoneNumInput (e) {
        setMobile(e.target.value);
        if(e.target.value.length === 10) {
          setOTPStatus(enum_otp_status.SEND_OTP);
        }
    }

    const phnInput = (otpStatus) => {
        return (
            <PhoneFormInput
                otpStatus={otpStatus}
                inputAttrs={{ value: mobile }}
                isDisabled={otpStatus === enum_otp_status.OTP_VERIFIED}
                onInputNumber={phoneNumInput}
                // otpdisable={otpdisable}
            >
                <PhoneOtpStatuses
                    otpStatus={otpStatus}
                    enumOtpStatus={enum_otp_status}
                    otpTimeout={otp_timeout}
                    onSendOtp={send_otp}
                    onResendOtp={resend_otp}
                />

                {(mobile.length && mobile.length != 10) ? (
                    <div className={`invalid-feedback d-block position-absolute`} style={{ bottom: '-28px', left: '0px' }}>
                        Please provide a valid mobile number
                    </div>
                ): ''}
            </PhoneFormInput>
        )
    }

    return (
        <>
            <div className='col-12 col-md-6 mb-40'>
                <label className="form-label">Mobile Number <span className="star">*</span></label>

                { phnInput(otp_status) }
                {/* <div className="input-group mobile-num-pre">
                    <span className="input-group-text border-start-0 border-end-0 px-0 text-secondary-gray fw-500 text-indent-10 px-3">91</span>
                    <input
                        type="number"
                        className={`form-control mno-line border-start-0 ${otp_status === undefined ? "" : "border-end-0"}`}
                        disabled={otp_status === enum_otp_status.OTP_VERIFIED}
                        value={mobile}
                        onChange={e => {

                        }}
                    />

                </div> */}
            </div>

            <div className={`col-12 col-md-6 mb-3`}>
                {otp_status === enum_otp_status.OTP_SENT &&
                <div className={`col-12 col-md-6 mb-3`}>
                    <label className="form-label text-white">.</label>
                    <div className='row'>
                        <div className='col-12 col-md-8 d-flex verifyOTP'>
                            <input type="number" id="doctor-registration-otp-1" min="0" max="9" minLength="1" maxLength="1" className="form-control text-center otp-input" value={otp1} onChange={(e) => { setOtp1(e.target.value.substring(0, 1)); if (e.target.value.length > 0) document.getElementById("doctor-registration-otp-2").focus(); }} />
                            <input type="number" id="doctor-registration-otp-2" min="0" max="9" minLength="1" maxLength="1" className="form-control text-center otp-input" value={otp2} onChange={(e) => { setOtp2(e.target.value.substring(0, 1)); if (e.target.value.length > 0) document.getElementById("doctor-registration-otp-3").focus(); }} />
                            <input type="number" id="doctor-registration-otp-3" min="0" max="9" minLength="1" maxLength="1" className="form-control text-center otp-input" value={otp3} onChange={(e) => { setOtp3(e.target.value.substring(0, 1)); if (e.target.value.length > 0) document.getElementById("doctor-registration-otp-4").focus(); }} />
                            <input type="number" id="doctor-registration-otp-4" min="0" max="9" minLength="1" maxLength="1" className="form-control text-center otp-input" value={otp4} onChange={(e) => { setOtp4(e.target.value.substring(0, 1)); }} />
                            <button className={`btn py-2 px-4 ${otp_status === enum_otp_status.OTP_VERIFIED ? 'bg-faded-green' : otp1.concat(otp2, otp3, otp4).length === 4 ? 'get-code' : 'bg-white'} text-primary rounded-4 border-0 verification-btn`} disabled={otp1.concat(otp2, otp3, otp4).length != 4} type="button" onClick={verify_otp}>{otp_status === enum_otp_status.OTP_VERIFIED && "Verified"} {otp_status === enum_otp_status.OTP_VERIFIED === false && "Verify"}</button>
                        </div>
                    </div>
                </div>
                }
                {
                    votp 
                    ? 
                    <div className={`invalid-feedback d-block`}>
                        OTP Do not match
                     </div>
                    : null
                }
            </div>
        </>
    );
}

export default OtpForm;
