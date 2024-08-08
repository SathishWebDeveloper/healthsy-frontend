import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import SuccessModal from "../Common/successModel";
import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import Location from "../Common/location";
import axios from "axios";

const VerifyNumber = ({
    register,
    errors,
    getValues,
    otp_status,
    setOTPStatus,
}) => {

    const enum_otp_status = {
        SEND_OTP: "Send-OTP",
        RESEND_OTP: "Resend-OTP",
        OTP_SENT: "OTP-Sent",
        INVALID_OTP: "OTP-Invalid",
        OTP_VERIFIED: "OTP-Verified",
    };

    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [otp_timeout, setOTPTimeout] = useState(0);
    const [otpdisable, setOtpDisable] = useState(false);
    const [mobileError, setMobileError] = useState(false);

    const send_otp = async () => {
        try {
            // const mobileNo = await axios
            //     .post(`${process.env.NEXT_PUBLIC_APP_API_URL}franchise-programme/verify-mobile`, {
            //         mobile: getValues()?.mobile
            //     })
            // if (mobileNo.status === 200) {
            //     setMobileError(true);
            // } else {
            //     setMobileError(false);
            axios
                .post(`${process.env.NEXT_PUBLIC_APP_API_URL}franchise-programme/send-otp`, {
                    mobile: getValues("mobile"),
                })
                .then((response) => {
                    setOTPStatus(enum_otp_status.OTP_SENT);
                    run_timeout();
                    setOtpDisable(true);
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.response?.data?.message);
                    setOtpDisable(false);
                });
            // }
        } catch (err) {
            console.log("err - ", err);

        }
    };

    const resend_otp = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}franchise-programme/resend-otp`, {
                mobile: getValues("mobile"),
            })
            .then((response) => {
                run_timeout();
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message);
            });
    };

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

    const [votp, setvOtp] = useState(false);

    const verify_otp = () => {
        let otp =
            getValues("otp1") +
            getValues("otp2") +
            getValues("otp3") +
            getValues("otp4");
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}franchise-programme/verify-otp`, {
                mobile: getValues("mobile"),
                otp: otp,
            })
            .then((response) => {
                setOTPStatus(enum_otp_status.OTP_VERIFIED);
                setParentOTPVerified(true);
            })
            .catch((err) => {
                if (err.response?.status === 400) {
                    setvOtp(true);
                }
            });
    };

    function setOtpStatus(e) {
        if (e.target.value.length !== 10) return;
        setOTPStatus(enum_otp_status.SEND_OTP);
    }

    const phnInput = (otpStatus) => {
        return (
            <PhoneFormInput
                otpStatus={otpStatus}
                inputAttrs={{ ...register("mobile", { required: true }) }}
                isDisabled={otpStatus === enum_otp_status.OTP_VERIFIED}
                onInputNumber={setOtpStatus}
                // className="adsInputField"
                className="form-control franchiseInputField"
                // otpdisable={otpdisable}
                placeholder="Enter your mobile number"
            >
                <PhoneOtpStatuses
                    otpStatus={otpStatus}
                    enumOtpStatus={enum_otp_status}
                    otpTimeout={otp_timeout}
                    onSendOtp={send_otp}
                    onResendOtp={resend_otp}
                />

                {errors.mobile && (
                    <div className={`invalid-feedback d-block`}>
                        Please provide a valid mobile number
                    </div>
                )}
            </PhoneFormInput>
        );
    };

    return (
        <>
            <div className="col-12 col-md-6">
                <label className="fs15fwb franchiseLabel">
                    Mobile Number <span className="star">*</span>
                </label>
                {phnInput(otp_status)}
                {/* {mobileError ? (
                    <div className={`invalid-feedback d-block`}>
                        Mobile number already exist
                    </div>
                ) : (
                    ""
                )} */}
            </div>
            {otp_status === enum_otp_status.OTP_SENT && (
                <div className={`col-12 col-md-6 verifyOTPWrapper`}>
                    <label className=" fs15fwb text-white">.</label>
                    <div className="row">
                        <div className="col-12 col-md-8 d-flex verifyOTP otpVerification">
                            <input
                                type="number"
                                {...register("otp1", { required: true })}
                                id="doctor-registration-otp-1"
                                min="0"
                                max="9"
                                minLength="1"
                                maxLength="1"
                                className="form-control text-center otp-input otpInput"
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
                                className="form-control text-center otp-input otpInput"
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
                                className="form-control text-center otp-input otpInput"
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
                                className="form-control text-center otp-input otpInput"
                                value={otp4}
                                onChange={(e) => {
                                    setOtp4(e.target.value.substring(0, 1));
                                }}
                            />
                            <button
                                className={`btn py-2 px-4 ${otp_status === enum_otp_status.OTP_VERIFIED
                                    ? "bg-faded-green"
                                    : otp1.concat(otp2, otp3, otp4).length === 4
                                        ? "get-code"
                                        : ""
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

const FranchiseProgrammeForm = () => {

    const navigate = useRouter().push;

    const [newLocation, setNewLocation] = useState("");

    const {
        register,
        setValue,
        getValues,
        trigger,
        control,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm();

    const [successPopupModal, setSuccessPopupModal] = useState(false);

    const onSubmit = (fields) => {
        fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}franchise-programme/franchise-programme-create`,
                fields
            )
            .then((response) => {
                setSuccessPopupModal(true);
            })
            .catch((err) => {
                console.log("Franchise Programme Err", err);
            });
    };

    const [emailerror, setEmailError] = useState(false)

    const [parent_otp_verified, setParentOTPVerified] = useState(false);

    const [otp_status, setOTPStatus] = useState(
        parent_otp_verified === false ? undefined : enum_otp_status.OTP_VERIFIED
    );

    const enum_otp_status = {
        SEND_OTP: "Send-OTP",
        RESEND_OTP: "Resend-OTP",
        OTP_SENT: "OTP-Sent",
        INVALID_OTP: "OTP-Invalid",
        OTP_VERIFIED: "OTP-Verified",
    };

    function setOtpStatus(e) {
        if (e.target.value.length !== 10) return;
        setOTPStatus(enum_otp_status.SEND_OTP);
    }

    return (
        <div className="franchiseProgrammeForm" id="franchise-programme-form">
            <div className="container franchiseProgrammeContentWrapper p-0">
                <div className="fs32m24fwb">Fill the details below :</div>
                <div className="franchiseProgrammeLine desktopContent" />
                <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="feedbackForm">
                        <label className="fs15fwb franchiseLabel franchiseLabelName">
                            Name <span className="star">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="form-control franchiseInputField"
                            placeholder="Enter name"
                        />
                        {errors.name && (
                            <div className={`invalid-feedback d-block`}>
                                Please provide a valid name
                            </div>
                        )}
                    </div>

                    <VerifyNumber
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        otp_status={otp_status}
                        setOTPStatus={setOTPStatus}
                    />

                    <div className="feedbackForm">
                        <label className="fs15fwb franchiseLabel">
                            Email <span className="star">*</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid Email Address",
                                },
                            })}
                            className="form-control franchiseInputField"
                            placeholder="Enter your email"
                        />
                        {errors.email ? (
                            <div className={`invalid-feedback d-block`}>
                                Please provide a valid email
                            </div>
                        ) :
                            emailerror ? (
                                <div className={`invalid-feedback d-block`}>
                                    Email already exist
                                </div>
                            ) : (
                                ""
                            )}
                        <div>
                            <label className="fs15fwb franchiseLabel">
                                Which City / Town do you want to own a franchise <span className="star">*</span>
                            </label>
                            <Location
                                control={control}
                                errors={errors}
                                register={register}
                                newLocation={newLocation}
                                setNewLocation={setNewLocation}
                                placeholder="Select your City / Town"
                                className="franchiseInputField"
                            />
                        </div>
                        <div>
                            <label className="fs15fwb franchiseLabel">
                                Pincode <span className="star">*</span>
                            </label>
                            <input
                                className="form-control franchiseInputField"
                                type="text"
                                {...register("pincode", {
                                    required: true,
                                    min: 110000,
                                    pattern: /[0-9]{6}/,
                                })}
                                placeholder="Enter your pincode"
                                maxLength="6"
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />

                            {errors.pincode && (
                                <div className={`invalid-feedback d-block`}>
                                    Please provide a Pincode
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-center franchiseTerms fs14m12fw500 flexCenter">
                        By clicking submit, I agree to
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-terms`}>
                            <span className="primaryColor text-decoration-underline"> Terms and Conditions </span>
                        </a>
                        <span className="primaryColor"> & </span>
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-privacy`}>
                            <span className="primaryColor text-decoration-underline"> Privacy Policy </span>
                        </a>
                    </div>
                    <div className="flexCenter">
                        <button
                            type="submit"
                            style={{ background: !isValid ? "#A6A6A6" : "#CB1B5B" }}
                            className={`franchiseSubmitBtn text-white fs18m16fwb`}
                            disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
                        >
                            Submit Now
                        </button>
                    </div>
                </form>
            </div>
            {successPopupModal && <SuccessModal successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} onHide={() => navigate('/')} />}
        </div>
    )
}

export default FranchiseProgrammeForm;