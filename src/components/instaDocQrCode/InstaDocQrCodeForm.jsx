import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import Location from "../Common/location";
import LanguageField from "../Common/LanguageField";

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

            axios
                .post(`${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-qr-code/send-otp`, {
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

        } catch (err) {
            console.log("err - ", err);

        }
    };

    const resend_otp = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-qr-code/resend-otp`, {
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
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-qr-code/verify-otp`, {
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
                className="form-control instaDocForm-Control"
            // otpdisable={otpdisable}
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
            <div className="col-12">
                <label className="instaDocLabel fs18m15fwb">
                    Mobile Number <span className="star">*</span>
                </label>
                {phnInput(otp_status)}
                {mobileError ? (
                    <div className={`invalid-feedback d-block`}>
                        Mobile number already exist
                    </div>
                ) : (
                    ""
                )}
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

const symptoms = [

    {
        type: "Cold",
        active: true,
    },
    {
        type: "Cough",
        active: true,
    },
    {
        type: "Fever",
        active: true,
    },
    {
        type: "Health Advices",
        active: true,
    },
    {
        type: "Injury",
        active: true,
    },
    {
        type: "Pregnancy Care",
        active: true,
    },
    {
        type: "Vaccines",
        active: true,
    },
    {
        type: "Regular Health Checkup",
        active: true,
    },
    {
        type: "Others",
        active: true,
    },
]

const InstaDocQrCodeForm = () => {

    const [newLocation, setNewLocation] = useState("");
    const [gender, setGender] = useState([]);
    const router = useRouter()

    const {
        register,
        getValues,
        setError,
        trigger,
        control,
        setValue,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm();

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

    useEffect(() => {
        getGender();
        register('symptoms', { required: true, })
    }, []);

    const getGender = () => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}gender/list`).then((res) => {
            setGender(res.data.rows);
        }
        )
    }

    const onSubmit = (fields) => {
        fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
        fields.pharmacy_partner_id = router.query.id
        if (!newLocation) {
            setValue("location", "");
            trigger()
        } else {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-qr-code/insta-doc-qr-code-create`,
                    fields
                )
                .then((response) => {
                    if (response.status === 200) {
                        const adId = response.data._id;
                        router.push({
                            pathname: '/rp-qr-instadoc/thank-you',
                            query: { id: adId }
                        },
                            `/rp-qr-instadoc/thank-you`
                        );
                    }
                })
                .catch((err) => {
                    // Handle the error if needed
                });
        }
    };

    return (
        <>

            <div className="container">
                <div className="instaDocContainer">
                    <div className="fs29m22fwb">Kindly fill the details below:</div>
                    <div className="fs18m15 instaDocDetails">Sharing accurate information will help us provide you with best service </div>
                    <div className="instaDocLine desktopContent" />

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="registration-form"
                    >
                        <div className="col-12">
                            <label className="instaDocLabel fs18m15fwb">
                                Name<span className="star">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="form-control instaDocForm-Control"
                                placeholder="Enter your name"
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

                        <div className="col-12">
                            <label className="instaDocLabel fs18m15fwb">
                                Age<span className="star">*</span>
                            </label>
                            <input
                                type="number"
                                {...register("age", { required: true })}
                                className="form-control instaDocForm-Control"
                                placeholder="Enter your age"
                            />
                            {errors.age && (
                                <div className={`invalid-feedback d-block`}>
                                    Please provide a age
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="instaDocLabel fs18m15fwb">
                                Gender <span className="star">*</span>
                            </label>{" "}
                            <select
                                {...register("gender", { required: true })}
                                className="form-control instaDocForm-Control"
                                defaultValue={""}
                            >
                                <option value="" disabled pri-specialization="true">
                                    Select Your Gender
                                </option>
                                {gender.map((data, idx) => {
                                    return (
                                        <option key={idx}>
                                            {data.type}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.gender && (
                                <div className={`invalid-feedback d-block`}>
                                    Please select an option
                                </div>
                            )}
                        </div>

                        <div className="col-12">
                            <LanguageField
                                errors={errors}
                                language={symptoms}
                                register={register}
                                setValue={setValue}
                                trigger={trigger}
                                getValues={getValues}
                                labelTxt="Symptoms"
                                registerContent="symptoms"
                                placeholder="Select Your Symptoms"
                                multiSelectClassName="instaDocForm-Control"
                                multiSelectWrapperClassName="col-md-12"
                                labelClassName="instaDocLabel"
                                validation="Symptoms"
                            />
                        </div>

                        <div className="col-12">
                            <label className="instaDocLabel fs18m15fwb">
                                City / Town <span className="star">*</span>
                            </label>
                            <Location
                                control={control}
                                errors={errors}
                                register={register}
                                newLocation={newLocation}
                                setNewLocation={setNewLocation}
                                placeholder="Enter your city/town"
                                registerContent="city"
                                className="form-control instaDocForm-Control"
                            />
                        </div>

                        <div className="col-12">
                            <label className="instaDocLabel fs18m15fwb">
                                Pincode <span className="star">*</span>
                            </label>
                            <input
                                className="form-control instaDocForm-Control"
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

                        <div className="fs14m12fw500 instaDocAgree text-center">By clicking submit, I agree to
                            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-terms`} className="p-1">
                                <span className="primaryColor text-decoration-underline">  Terms and Conditions </span>
                            </a>
                            <span className="primaryColor p-1"> & </span>
                            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-privacy`} className="p-0">
                                <span className="primaryColor text-decoration-underline"> Privacy Policy </span>
                            </a>
                        </div>

                        <div className="adsSubmitBtn">
                            <button
                                type="submit"
                                className={`btn ${otp_status === enum_otp_status.OTP_VERIFIED
                                    ? "bg-primary"
                                    : "bg-light-gray"
                                    } py-3 fs-4 text-white w-55`}
                                disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
                                style={{ background: !isValid ? "#A6A6A6" : "#CB1B5B" }}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default InstaDocQrCodeForm 