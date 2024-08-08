import axios from "axios";
import { useState } from "react";

const OTP = ({
    otpAPI = "",
    enum_otp_status = {},
    otp_status,
    register,
    getValues,
    setOTPStatus,
    setParentOTPVerified,
    rowWrapperClsName = "",
    otpLabel = false,
}) => {

    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");

    const [votp, setvOtp] = useState(false);

    const verify_otp = () => {
        let otp =
            getValues("otp1") +
            getValues("otp2") +
            getValues("otp3") +
            getValues("otp4");
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}${otpAPI}/verify-otp`,
                { mobile: getValues("mobile"), otp: otp }
            )
            .then((response) => {
                setOTPStatus(enum_otp_status.OTP_VERIFIED);
                setParentOTPVerified(true);
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setvOtp(true);
                }
            });
    };

    return (
        <>
            {otpLabel && otp_status === enum_otp_status.OTP_SENT && <div className="otpLabel">Verification Code</div>}
            {otp_status === enum_otp_status.OTP_SENT && (
                <div className={`col-12 col-md-6 mb-40`}>
                    <label className="form-label text-white">.</label>
                    <div className={`row ${rowWrapperClsName}`}>
                        <div className="col-12 col-md-8 d-flex verifyOTP">
                            <div className="d-flex">
                                <input
                                    type="number"
                                    {...register("otp1", { required: true })}
                                    id="doctor-registration-otp-1"
                                    min="0"
                                    max="9"
                                    minLength="1"
                                    maxLength="1"
                                    className="form-control text-center otp-input"
                                    value={otp1}
                                    onChange={(e) => {
                                        setOtp1(e.target.value.substring(0, 1));
                                        if (e.target.value.length > 0)
                                            document
                                                .getElementById("doctor-registration-otp-2")
                                                .focus();
                                    }}
                                />
                                <input
                                    type="number"
                                    {...register("otp2", { required: true })}
                                    id="doctor-registration-otp-2"
                                    min="0"
                                    max="9"
                                    minLength="1"
                                    maxLength="1"
                                    className="form-control text-center otp-input"
                                    value={otp2}
                                    onChange={(e) => {
                                        setOtp2(e.target.value.substring(0, 1));
                                        if (e.target.value.length > 0)
                                            document
                                                .getElementById("doctor-registration-otp-3")
                                                .focus();
                                    }}
                                />
                                <input
                                    type="number"
                                    {...register("otp3", { required: true })}
                                    id="doctor-registration-otp-3"
                                    min="0"
                                    max="9"
                                    minLength="1"
                                    maxLength="1"
                                    className="form-control text-center otp-input"
                                    value={otp3}
                                    onChange={(e) => {
                                        setOtp3(e.target.value.substring(0, 1));
                                        if (e.target.value.length > 0)
                                            document
                                                .getElementById("doctor-registration-otp-4")
                                                .focus();
                                    }}
                                />
                                <input
                                    type="number"
                                    {...register("otp4", { required: true })}
                                    id="doctor-registration-otp-4"
                                    min="0"
                                    max="9"
                                    minLength="1"
                                    maxLength="1"
                                    className="form-control text-center otp-input"
                                    value={otp4}
                                    onChange={(e) => {
                                        setOtp4(e.target.value.substring(0, 1));
                                    }}
                                />
                            </div>
                            <button
                                className={`btn py-2 px-4 ${otp_status === enum_otp_status.OTP_VERIFIED
                                    ? "bg-faded-green"
                                    : otp1.concat(otp2, otp3, otp4).length === 4
                                        ? "get-code"
                                        : "bg-white"
                                    } text-primary rounded-4 border-0 verification-btn`}
                                disabled={otp1.concat(otp2, otp3, otp4).length !== 4}
                                type="button"
                                onClick={verify_otp}
                            >
                                {otp_status === enum_otp_status.OTP_VERIFIED && "Verified"}{" "}
                                {(otp_status === enum_otp_status.OTP_VERIFIED) === false &&
                                    "Verify"}
                            </button>
                        </div>
                        {votp ? (
                            <div className={`invalid-feedback d-block`}>
                                OTP Do not match
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    )
}

export default OTP;