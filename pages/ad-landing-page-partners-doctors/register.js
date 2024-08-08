import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap"
import { useForm } from "react-hook-form";
import Head from "next/head";

import Location from "../../src/components/Common/location";
import PhoneFormInput from "../../src/components/DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../../src/components/DoctorRegistration/Partials/PhoneOtpStatuses";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";
import AdFormFooter from "../../src/components/DoctorsAd/adFormFooter";
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import { medicalCouncil, degree } from "../../src/components/Common/index";

const TickImage = "/assets/Doctors-Ads-Tick.svg"
const linkedin_logo = "/assets/linkedin_logo.svg";
const facebook_logo = "/assets/facebook_logo.svg";
const instagram_logo = "/assets/instagram_logo.svg";
const twitter_logo = "/assets/Twitter Logo.svg";
const rounded_Tick = "/assets/round-tick.svg";
const line_icon = "/assets/adsLine.svg";
const line_logo = "/assets/adsLineIcon.svg"
const mobCloseIcon = "/assets/mobCloseIcon.svg";
const mobBackArrowIcon = "/assets/mobBackIcon.svg";

const AdsDetails = [
    {
        title: "Gain from our marketing",
        image: TickImage
    },
    {
        title: "Increase in revenue",
        image: TickImage
    },
    {
        title: "Access to patients",
        image: TickImage
    }
]

const runningContent = [
    <><span className="pointIndicator">.</span>Increase in revenue</>,
    <><span className="pointIndicator">.</span>Access to patients</>,
    <><span className="pointIndicator">.</span>Gain from our marketing</>,
]

const AdDoctorSideBar = () => {

    const isDesktop = useIsDesktop()
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const { linkedin = "#",
        facebook = "#",
        instagram = "#",
        twitter = "#" } = socialMediaLinks

    useEffect(() => {
        getSocialMediaData();
    }, []);

    const getSocialMediaData = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
            .then((res) => {
                setSocialMediaLinks(res.data.rows[res.data.rows.length - 1]);


            });
    };

    return (
        <>
            {isDesktop ?
                <div className="text-white adsregistrationform">
                    <div className="adsDoctorsForm">What’s in it for you ?</div>
                    <div className="">
                        {AdsDetails.map((data, idx) => {
                            return (
                                <div key={idx} className="d-flex adsRegistrationTitle">
                                    <Image
                                        src={data.image}
                                        width="16"
                                        height="16"
                                        alt="adsTickImg"
                                    />
                                    <div className=" text-white">{data.title}</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="advertiesmentFooterSection adsDoctorsFooterSection text-white">
                        <div className="fs14fw500 learnMoreTxt">To learn more. Call us at</div>
                        <div className="fs18m16fwb footerContactNumber"><a className="text-white p-0" href="tel:+91 080-46809777">+91 080-46809777</a></div>
                        <div className="fs12fw500">( 9 AM - 8 PM Monday to Saturday )</div>
                        <div className="fs12fw500 orTxt">(or)</div>
                        <div className="fs14fw500 writeTxt">Write to us at</div>
                        <div className="fs18m16fwb adsFooterMail"><a className="p-0 text-white" href="mailto:doctors@healthsy.in">doctors@healthsy.in</a></div>
                    </div>
                    <div className="flexCenter socialMediaLogos">
                        <img
                            src={linkedin_logo}
                            alt="linkedin_logo"
                            className="adLinkedinLogo"
                            onClick={() => {
                                window.open(linkedin);
                            }}
                        />

                        <img
                            src={facebook_logo}
                            alt="facebook_logo"
                            className="adFacebookLogo"
                            onClick={() => {
                                window.open(facebook);
                            }}
                        />

                        <img
                            src={instagram_logo}
                            alt="instagram_logo"
                            className="adInstagramLogo"
                            onClick={() => {
                                window.open(instagram);
                            }}
                        />

                        <img
                            src={twitter_logo}
                            alt="twitter_logo"
                            className="adTwitterLogo"
                            onClick={() => {
                                window.open(twitter);
                            }}
                        />

                    </div>
                </div> : ""
            }
        </>
    )
}

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
            const mobileNo = await axios
                .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/verify-mobile`, {
                    mobile: getValues()?.mobile
                })
            if (mobileNo.status === 200) {
                setMobileError(true);
            } else {
                setMobileError(false);
                axios
                    .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/send-otp`, {
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
            }
        } catch (err) {
            console.log("err - ", err);

        }
    };

    const resend_otp = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/resend-otp`, {
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
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/verify-otp`, {
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
                className="adsInputField"
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
            <div className="col-12 col-md-6 mb-32">
                <label className="form-lable fs15fwb">
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

const TopSection = ({
    level,
    setLevel
}) => {

    const router = useRouter()
    return (
        <>
            <div className="mobContent adsMobHeader">
                <div className="d-flex adsMobTitle container py-3">
                    <Image
                        src={level === 1 ? mobCloseIcon : mobBackArrowIcon}
                        width={32}
                        height={32}
                        alt="Close Icon"
                        onClick={() => level === 1 ? router.push('/ad-landing-page-partners-doctors') : setLevel(1)}
                    />
                    <div className="fs24fwb">Register Now</div>
                </div>
                <div className="mobContent runningTextWrapper">
                    <div className="runningText flexCenter">
                        {[...runningContent, ...runningContent, ...runningContent, ...runningContent].map((data, inx) => {
                            return (
                                <div key={inx} className="text-white">{data}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

const AdsRegistrationLevel1 = ({
    register,
    errors,
    isValid,
    trigger,
    setLevel,
    setError,
    getValues,
    emailerror,
    setEmailError,
}) => {

    const [gender, setGender] = useState([]);
    const router = useRouter()

    const onClickNext = async (e) => {
        let [valid_name, valid_email, valid_mobile, valid_gender] = [
            await trigger("name"),
            await trigger("email"),
            await trigger("mobile"),
            await trigger("gender"),
        ];
        !valid_name &&
            setError("name", {}, { shouldFocus: true });
        !valid_email &&
            setError("email", {}, { shouldFocus: true });
        !valid_mobile &&
            setError("mobile", {}, { shouldFocus: true });
        !valid_gender &&
            setError("gender", {}, { shouldFocus: true });
        await axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/verify-email`,
                { email: getValues()?.email }
            )
            .then((response) => {
                if (
                    response.data === "Email was exists already"
                ) {
                    setEmailError(true);
                    valid_email = false;
                }
            });
        valid_name &&
            valid_email &&
            valid_mobile &&
            valid_gender &&
            setLevel(2);
    }

    useEffect(() => {
        getGender();
    }, []);

    const getGender = () => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}gender/list`).then((res) => {
            setGender(res.data.rows);
        });
    };

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
        <div className="adsDoctorsFormSection">
            <div className="d-flex">
                <div
                    className={`roundedCircle rounded-circle text-center text-white levelRound doctorsAdLevel flexCenter`}
                >
                    <span className="adsFormCircle">1</span>
                </div>
                <div className="flexCenter">
                    <Image
                        src={line_icon}
                        width="671"
                        height="1"
                        alt="LineImg"
                        className="adsLineImg"
                    />
                </div>
                <div
                    className={`roundedCircle rounded-circle text-center text-white levelRound flexCenter`}
                >
                    <span className="adsFormCircle">2</span>
                </div>
            </div>
            <div className="adsDoctorsFormTitle fs24m22fwb">Fill the details for easy & hassle free Onboarding !</div>
            <div className="fs16m15">Takes less than 2 minutes to fill out the form</div>
            <div className="adsLineSpacing " />
            <div className="row">
                <div className="col-12 col-md-6 mb-32">
                    <label className="form-lable fs15fwb">
                        Name<span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="form-control adsInputField"
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a valid name
                        </div>
                    )}
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className="form-lable fs15fwb">
                        Email ID <span className="star">*</span>
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
                        className="form-control adsInputField"
                        placeholder="Enter name"
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
                </div>
                <VerifyNumber
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    otp_status={otp_status}
                    setOTPStatus={setOTPStatus}
                />
                <div className="col-12 col-md-12">
                    <label className="form-lable fs15fwb">
                        Gender <span className="star">*</span>
                    </label>{" "}
                    <br />
                    {gender.map((el, index) => {
                        if (el.active === true) {
                            return (
                                <div
                                    key={index}
                                    className="form-check form-check-inline"
                                >
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        {...register("gender", { required: true })}
                                        value={el.type}
                                    />
                                    <label className="form-check-label">
                                        {el.type}
                                    </label>
                                </div>
                            );
                        }
                    })}
                    {errors.gender && (
                        <div className={`invalid-feedback d-block`}>
                            Please select an option
                        </div>
                    )}
                </div>
            </div>

            <div className="adsBtnField">
                <button
                    type="button"
                    onClick={async (e) => onClickNext(e)}
                    className={`btn ${otp_status === enum_otp_status.OTP_VERIFIED
                        ? "bg-primary"
                        : "bg-light-gray"
                        } py-3 fs-4 text-white w-55`}
                    disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
                    style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

const AdsRegistrationLevel2 = ({
    register,
    errors,
    isValid,
    control,
    newLocation,
    setNewLocation
}) => {

    const [primaryspl, setPrimaryspl] = useState([]);
    const [experience, setExperience] = useState([]);
    const [inclinic, setInclinic] = useState([]);
    const router = useRouter()

    useEffect(() => {
        getPrimaryspl();
        getExperience();
        getInClinic();
    }, []);

    const getPrimaryspl = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}primary-specialisation/list`, {
                noLimit: true,
            })
            .then((res) => {
                setPrimaryspl(res.data.rows);
            });
    };

    const getInClinic = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}in-clinic-fee/list`)
            .then((res) => {
                setInclinic(res.data.rows);
            });
    };

    const getExperience = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}experience/list`)
            .then((res) => {
                setExperience(res.data.rows);
            });
    };

    return (
        <div className="text-dark adsDoctorsFormSection">
            <div className="d-flex mb-32">
                <Image
                    src={rounded_Tick}
                    alt="rounded_Tick"
                    width={48}
                    height={48} />
                <div className="flexCenter">
                    <Image
                        src={line_logo}
                        width="671"
                        height="1"
                        alt="LineImg"
                        className="adsLineImg"
                    />
                </div>
                <div
                    className={`roundedCircle rounded-circle text-center text-white levelRound flexCenter`}
                >
                    <span className="adsFormCircle">2</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 mb-32">
                    <label className="fs15fwb formLableField">
                        Primary Specialisation <span className="star">*</span>
                    </label>

                    <select
                        {...register("specialization", { required: true })}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select Your specialisation
                        </option>
                        {primaryspl.map((option, inx) => {
                            if (option.active === true) {
                                return (
                                    <option key={inx} value={option.type}>
                                        {option.type}
                                    </option>
                                );
                            }
                        })}
                    </select>

                    {errors.specialization && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Primary Specialisation
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-32">
                    <label className="fs15fwb formLableField">
                        Secondary Specialisation{" "}
                        <span className="star"></span>
                    </label>
                    <select
                        {...register("secondary_specialization")}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select Your specialisation
                        </option>
                        {primaryspl.map((option, inx) => {
                            if (option.active === true) {
                                return (
                                    <option key={inx} value={option.type}>
                                        {option.type}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Medical Registration Number (MCI)
                        <span className="star"> * </span>
                    </label>
                    <input
                        className="form-control adsInputField"
                        type="text"
                        {...register("mci", { required: true })}
                        placeholder="Enter your medical registration number"
                    />

                    {errors.mci && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a MCI
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">Which Medical Council do you belong to ?<span className="star"> *</span></label>
                    <select
                        {...register("medical_council", { required: true })}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select Your Medical Council
                        </option>
                        {medicalCouncil.map((datas, idx) => {
                            return (
                                <option key={idx}>
                                    {datas}
                                </option>
                            );
                        })}
                    </select>
                    {errors.medical_council && (
                        <div className={`invalid-feedback d-block`}>
                            Please choose a Medical Council
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Year of Registration with Medical Council <span className="star">*</span>
                    </label>
                    <input
                        className="form-control adsInputField"
                        type="number"
                        {...register("registered_year", { required: true })}
                        placeholder="Type Your Registered Year"
                    />

                    {errors.registered_year && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Year of Registration with Medical Council
                        </div>
                    )}
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Experience <span className="star">*</span>
                    </label>

                    <select
                        {...register("experience", { required: true })}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select experience
                        </option>
                        {experience.map((option) => {
                            if (option.active === true) {
                                return (
                                    <option key={option.type} value={option.type}>
                                        {option.type}
                                    </option>
                                );
                            }
                        })}
                    </select>

                    {errors.experience && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Experience
                        </div>
                    )}
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Degree{" "}
                        <span className="star">*</span>
                    </label>
                    <select
                        {...register("degree", { required: true })}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select degree
                        </option>
                        {degree.map((data, idx) => {
                            return (
                                <option key={idx}>
                                    {data}
                                </option>
                            );
                        })}
                    </select>

                    {errors.degree && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a degree
                        </div>
                    )}
                </div>

                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Location (City / Town) <span className="star">*</span>
                    </label>
                    <Location
                        control={control}
                        errors={errors}
                        register={register}
                        newLocation={newLocation}
                        setNewLocation={setNewLocation}
                        placeholder="Enter Your City"
                        registerContent="city"
                        className="adsInputField"
                    />
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Pincode <span className="star">*</span>
                    </label>
                    <input
                        className="form-control adsInputField"
                        type="text"
                        {...register("pincode", {
                            required: true,
                            min: 110000,
                            pattern: /[0-9]{6}/,
                        })}
                        placeholder="Enter pincode"
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

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        In-Clinic Fee
                    </label>

                    <select
                        {...register("in_clinic_fee")}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select fee
                        </option>
                        {inclinic.map((option) => {
                            if (option.active === true) {
                                return (
                                    <option key={option.type} value={option.type}>
                                        {option.type}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Online Consultation Fee
                    </label>

                    <select
                        {...register("online_consultation_fee")}
                        className="form-control adsInputField"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select fee
                        </option>
                        {inclinic.map((option) => {
                            if (option.active === true) {
                                return (
                                    <option key={option.type} value={option.type}>
                                        {option.type}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>

                <div className="col-12 col-md-6 mb-32">
                    <label className=" fs15fwb formLableField">
                        Clinic Name <span className="star">*</span>
                    </label>
                    <input
                        className="form-control adsInputField"
                        type="text"
                        {...register("clinic_name", { required: true })}
                        placeholder="Enter clinic name"
                    />
                    {errors.clinic_name && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Clinic Name
                        </div>
                    )}
                </div>

                <div className="col-12 col-md-6 ">
                    <label className="fs15fwb formLableField">
                        Clinic Address <span className="star">*</span>
                    </label>
                    <textarea
                        className="form-control adsClinicAddress adsInputField"
                        type="textArea"
                        placeholder="Enter Address"
                        {...register("clinic_address", { required: true })}
                    />
                    {errors.clinic_address && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Clinic Address
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center adsPrivacyPolicy fs16fw600 flexCenter">
                By clicking submit, I agree to
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-terms`}>
                    <span className="primaryColor text-decoration-underline"> Terms and Conditions </span>
                </a>
                <span className="primaryColor"> & </span>
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-privacy`}>
                    <span className="primaryColor text-decoration-underline"> Privacy Policy </span>
                </a>
            </div>
            <div className="adsSubmitBtn">
                <button
                    type="submit"
                    style={{ background: !isValid ? "#98969D" : "#1AAA55" }}
                    className={`btn border-0 btn-height text-white w-100 fs-4 fw-500`}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

const AdsRegistrationForm = () => {

    const [level, setLevel] = useState(1);
    const [emailerror, setEmailError] = useState(false)
    const [newLocation, setNewLocation] = useState("");

    const isDesktop = useIsDesktop()
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

    const onSubmit = (fields) => {
        fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
        if (!newLocation) {
            setValue("location", "");
            trigger()
        } else {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/doctors-ad-create`,
                    fields
                )
                .then((response) => {
                    if (response.status === 200) {
                        const adId = response.data._id;
                        router.push({
                            pathname: '/ad-landing-page-partners-doctors/thank-you',
                            query: { id: adId }
                        },
                            `/ad-landing-page-partners-doctors/thank-you`
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
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {isDesktop && <FormPageHeader />}
            <TopSection
                level={level}
                setLevel={setLevel}
            />
            <div className="container adsContainerForm d-flex">
                <AdDoctorSideBar />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="registration-form"
                >
                    {level === 1 && (
                        <AdsRegistrationLevel1
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                            isValid={isValid}
                            trigger={trigger}
                            setLevel={setLevel}
                            setError={setError}
                            emailerror={emailerror}
                            setEmailError={setEmailError}
                        />)
                    }

                    {level === 2 && (
                        <AdsRegistrationLevel2
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                            isValid={isValid}
                            control={control}
                            trigger={trigger}
                            setLevel={setLevel}
                            setError={setError}
                            newLocation={newLocation}
                            setNewLocation={setNewLocation}
                        />)
                    }
                </form>
            </div>
            {isDesktop && <AdFormFooter />}
        </>
    )
}

export default AdsRegistrationForm; 