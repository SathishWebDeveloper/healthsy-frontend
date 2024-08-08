import React, { useState } from 'react'
import axios from 'axios';

export default function PhoneOtpStatuses({
    otpStatus,
    enumOtpStatus,
    otpTimeout,
    onSendOtp,
    onResendOtp,
    design,
    getValues,
    otpAPI = "",
    setOTPStatus,
}) {
    const [otp_timeout, setOTPTimeout] = useState(0);

    let interval;
    const run_timeout = () => {
        setOTPTimeout(process.env.NEXT_PUBLIC_APP_RESEND_OTP_TIMEOUT);
        interval = setInterval(() => {
            setOTPTimeout((prevState) => {
                if (prevState === 1) {
                    clearInterval(interval);
                }
                return prevState - 1;
            });
        }, 1000);
    };

    const send_otp = () => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}${otpAPI}/send-otp`,
                { mobile: getValues("mobile") }
            )
            .then((response) => {
                setOTPStatus(enumOtpStatus.OTP_SENT);
                run_timeout();
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message);
            });
    };

    const resend_otp = () => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}${otpAPI}/resend-otp`,
                { mobile: getValues("mobile") }
            )
            .then((response) => {
                run_timeout();
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message);
            });
    };

    return (
        <>
            {
                otpStatus === enumOtpStatus.SEND_OTP &&
                <span className={`c-input-group--btn ${design === true ? "career-get-codee" : ""}`}>
                    <button
                        className={`c-input-group--btn-text get-code`}
                        type="button"
                        onClick={otpAPI ? () => send_otp() : onSendOtp}
                    >Get Code</button>
                </span>
            }
            {
                otpStatus === enumOtpStatus.OTP_SENT &&
                <span className={`c-input-group--btn ${design === true ? "career-get-timer" : ""}`}>
                    <button
                        className={`c-input-group--btn-text get-code ${design === true ? "career-get-timer" : ""}`}
                        type="button"
                        onClick={e => otpAPI ? (otp_timeout === 0 && resend_otp()) : (otpTimeout === 0 && onResendOtp())}
                        disabled={otpAPI ? (otp_timeout > 0) : (otpTimeout > 0)}
                    >{otpAPI ? (otp_timeout === 0 ? "Resend OTP" : otp_timeout) : (otpTimeout === 0 ? "Resend OTP" : otpTimeout)}
                    </button>
                </span>
            }
            {
                otpStatus === enumOtpStatus.OTP_VERIFIED &&
                <div className={`c-input-group--status text-success ${design === true ? "career-verifyy" : ""}`}>Verified</div>
            }
        </>
    )
}
