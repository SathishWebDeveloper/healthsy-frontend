import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

import TermsPrivacy from "../Common/TermsPrivacy";
import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import DashedBorderElement from "../DoctorRegistration/Partials/DashedBorderElement";
import Location from "../Common/location";
import LanguageField from "../Common/LanguageField";
import { degree, states, years } from "../Common";
import OTP from "../Common/OTP";

const StepOne = ({
    register,
    errors,
    getValues,
    trigger,
    setError,
    setLevel,
    emailerror,
    setEmailError,
    watch,
    clearErrors,
    enum_otp_status,
    setParentOTPVerified,
    otp_status,
    setOTPStatus,
}) => {
    watch() // when pass nothing as argument, you are watching everything

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
                className="healthsynergyFormInput"
            >
                <PhoneOtpStatuses
                    otpStatus={otpStatus}
                    enumOtpStatus={enum_otp_status}
                    getValues={getValues}
                    setOTPStatus={setOTPStatus}
                    otpAPI="doctor-registration"
                />

                {errors.mobile && (
                    <div className={`invalid-feedback d-block`}>
                        Please provide a valid mobile number
                    </div>
                )}
            </PhoneFormInput>
        );
    };

    const onClickNext = async (e) => {
        let [valid_name, valid_email, valid_mobile] = [
            await trigger("name"),
            await trigger("email"),
            await trigger("mobile"),
        ];
        !valid_name &&
            setError("name", {}, { shouldFocus: true });
        !valid_email &&
            setError("email", {}, { shouldFocus: true });
        !valid_mobile &&
            setError("mobile", {}, { shouldFocus: true });
        // verify-email
        await axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-registration/verify-email`,
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
            setLevel(2);
    }

    useEffect(() => {
        emailerror && setEmailError(false)
        errors.email && clearErrors("email")
    }, [getValues("email")])

    return (
        <div id="doctoregistration-level-one">
            <div className="row">
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Name of the Doctor<span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="form-control healthsynergyFormInput"
                        placeholder="Enter your name"
                        maxLength="30"
                    />
                    {errors.name && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a valid name
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Email ID<span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid Email Address",
                            },
                        })}
                        className="form-control healthsynergyFormInput"
                        placeholder="Enter your email id"
                    />
                    {errors.email && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a valid email
                        </div>
                    )}
                    {emailerror ? (
                        <div className={`invalid-feedback d-block`}>
                            Email already exist
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="col-12 col-md-6 mb-40 mobileNoFieldWrapper">
                    <label className="form-label">
                        Mobile Number<span className="star">*</span>
                    </label>
                    {phnInput(otp_status)}
                </div>

                <OTP
                    otpAPI="doctor-registration"
                    enum_otp_status={enum_otp_status}
                    otp_status={otp_status}
                    register={register}
                    getValues={getValues}
                    setOTPStatus={setOTPStatus}
                    setParentOTPVerified={setParentOTPVerified}
                    rowWrapperClsName="otpFieldWrapper"
                />
            </div>

            <div className="row mt-4 flexCenter">
                <div className="col-12 col-md-6 text-center">
                    <button
                        type="button"
                        onClick={async (e) => onClickNext(e)}
                        className={`btn py-3 fs20m16fwb text-white w-55 mb-4 doctorNxtBtn br-12`}
                        style={{
                            background: (
                                otp_status !== enum_otp_status.OTP_VERIFIED ||
                                !getValues("name") ||
                                !getValues("email") ||
                                !getValues("mobile")) ||
                                Object.keys(errors).length ||
                                emailerror ? "#D6D6D6" : "#CB1B5B"
                        }}
                        disabled={
                            otp_status !== enum_otp_status.OTP_VERIFIED ||
                            !getValues("name") ||
                            !getValues("email") ||
                            !getValues("mobile")}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

const StepTwo = ({
    register,
    errors,
    trigger,
    isValid,
    setLevel,
    getValues,
    gender,
    newLocation,
    setNewLocation,
    control,
    language,
    setValue,
    watch,
    setOTPStatus,
    enum_otp_status,
}) => {
    watch()

    return (
        <div id="doctorregistration-level-two">
            <div className="row">
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Degree{" "}
                        <span className="star">*</span>
                    </label>
                    <select
                        {...register("degree", { required: true })}
                        className="form-control healthsynergyFormInput"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select your degree
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
                        Other Education{" "}
                    </label>
                    <input
                        className="form-control healthsynergyFormInput"
                        type="text"
                        {...register("other_course")}
                        placeholder="Enter your other education"
                    />
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Gender<span className="star">*</span>
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
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Primary Specialization<span className="star">*</span>
                    </label>
                    <select
                        {...register("specialization", { required: true })}
                        className="form-control healthsynergyFormInput"
                        defaultValue={""}
                    >
                        <option value="General Physician">General Physician</option>
                    </select>
                    {errors.specialization && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Specialisation
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Year of Registration with Medical Council <span className="star">*</span>
                    </label>
                    <select
                        {...register("registered_year", { required: true })}
                        className="form-control healthsynergyFormInput"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select
                        </option>
                        {years.map((option, inx) => <option key={inx} value={option}>{option}</option>
                        )}
                    </select>

                    {errors.registered_year && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Year of Registration with Medical Council
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Medical Registration Number <span className="text-muted">(MCI / SMC)</span>
                        <span className="star">*</span>
                    </label>
                    <input
                        className="form-control healthsynergyFormInput"
                        type="text"
                        placeholder="Enter your (MCI / SMC)"
                        {...register("mci", { required: true })}
                    />

                    {errors.mci && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a MCI
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Are you okay to receive online consultations from 9 PM - 9 AM ( Night - Day )<span className="star">*</span>
                    </label>{" "}
                    <br />
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            {...register("receive_online_consultations", {
                                required: true,
                            })}
                            value="Yes"
                        />
                        <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            {...register("receive_online_consultations", {
                                required: true,
                            })}
                            value="No"
                        />
                        <label className="form-check-label">No</label>
                    </div>
                    {errors.receive_online_consultations && (
                        <div className={`invalid-feedback d-block`}>
                            Please select an option
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">State
                        <span className="star">*</span>
                    </label>
                    <select
                        {...register("state", { required: true })}
                        className="form-control healthsynergyFormInput"
                        defaultValue={""}
                    >
                        <option value="" disabled pri-specialization="true">
                            Select your state
                        </option>
                        {states.map((option, inx) => {
                            return (
                                <option key={inx} value={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                    {errors.state && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a State
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">City
                        <span className="star">*</span>
                    </label>
                    <Location
                        control={control}
                        errors={errors}
                        register={register}
                        newLocation={newLocation}
                        setNewLocation={setNewLocation}
                        errMsg="Please provide a valid City"
                        placeholder="Enter your city"
                        registerContent="city"
                        className="healthsynergyFormInput"
                    />
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Location<span className="star">*</span>
                    </label>
                    <input
                        className="form-control healthsynergyFormInput"
                        type="text"
                        placeholder="Enter your location"
                        {...register("location", { required: true })}
                    />
                    {errors.location && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a Location
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mb-40">
                    <label className="form-label">
                        Pincode<span className="star">*</span>
                    </label>
                    <input
                        className="form-control healthsynergyFormInput"
                        type="text"
                        placeholder="Enter your pincode"
                        {...register("pincode", {
                            required: true,
                            min: 110000,
                            pattern: /[0-9]{6}/,
                        })}
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
                <LanguageField
                    errors={errors}
                    language={language}
                    labelTxt="Language"
                    register={register}
                    setValue={setValue}
                    trigger={trigger}
                    getValues={getValues}
                    lastField={true}
                    placeholder="Select known language"
                    arrowPosition="doctorLangArrow"
                    multiSelectClassName="healthsynergyFormInput"
                />
            </div>
            <TermsPrivacy />

            <div className="row mb-4">
                <div className="col-6">
                    <button
                        type="button"
                        className="btn btn-secondary w-100 btn-height fs20m16fwb"
                        onClick={(e) => (setOTPStatus(enum_otp_status.OTP_VERIFIED), setLevel(1))}
                    >Go Back</button>
                </div>
                <div className="col-6">
                    <button
                        type="submit"
                        style={{ background: (!isValid || !getValues()?.languages_known?.length) ? "#D6D6D6" : "#CB1B5B" }}
                        disabled={!isValid || !getValues()?.languages_known?.length}
                        className={`btn border-0 btn-height text-white w-100 fs20m16fwb`}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

const InstaDocRegistration = () => {

    const enum_otp_status = {
        SEND_OTP: "Send-OTP",
        RESEND_OTP: "Resend-OTP",
        OTP_SENT: "OTP-Sent",
        INVALID_OTP: "OTP-Invalid",
        OTP_VERIFIED: "OTP-Verified",
    };

    const [parent_otp_verified, setParentOTPVerified] = useState(false);
    const [otp_status, setOTPStatus] = useState(
        parent_otp_verified === false ? undefined : enum_otp_status.OTP_VERIFIED
    );

    const [isDesktop, setIsDesktop] = useState(false);
    const [instaDocBanner, setInstaDocBanner] = useState("");
    const [instaDocBannerMob, setInstaDocBannerMob] = useState("");
    const navigate = useRouter().push;

    useEffect(() => {
        register('languages_known', { required: true, })
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 960px)");
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener("resize", listener);

        return () => window.removeEventListener("resize", listener);
    }, [isDesktop]);

    useEffect(() => {
        getGender();
        getPrimaryspl();
        getLangauges();
        getBannerImageData();
    }, []);

    const [gender, setGender] = useState([]);
    const [primaryspl, setPrimaryspl] = useState([]);
    const [language, setLanguage] = useState([]);

    const getGender = () => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}gender/list`).then((res) => {
            setGender(res.data.rows);
        });
    };

    const getBannerImageData = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}banner-images/list`)
            .then((res) => {
                setInstaDocBanner(res.data.rows[0].insta_doc_Banner);
                setInstaDocBannerMob(res.data.rows[0].insta_doc_Banner_mob);
            });
    };

    const getPrimaryspl = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}primary-specialisation/list`, {
                noLimit: true,
            })
            .then((res) => {
                setPrimaryspl(res.data.rows);
            });
    };

    const getLangauges = () => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}languages/list`).then((res) => {
            setLanguage(res.data.rows);
        });
    };

    const {
        register,
        getValues,
        setError,
        trigger,
        control,
        setValue,
        clearErrors,
        formState: { errors, isValid },
        handleSubmit,
        watch,
    } = useForm();
    const [level, setLevel] = useState(1);

    const [emailerror, setEmailError] = useState(false);
    const [newLocation, setNewLocation] = useState("");

    const onSubmit = (fields) => {
        fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
        fields.languages_known = fields.languages_known?.length && fields.languages_known?.map((data) => data?.value)

        if (!newLocation) {
            setValue("city", "");
            trigger()
        } else {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-registration/create`,
                    fields
                )
                .then((response) => {
                    if (response.data?._id) {
                        const adId = response.data._id;
                        navigate({
                            pathname: '/for-insta-doc/thank-you',
                            query: { id: adId }
                        },
                            `/for-insta-doc/thank-you`
                        );
                    }
                })
                .catch((err) => {
                    console.log("Err :", err)
                });
        }
    };

    return (
        <div className="instaDocRegistrationForm">
            <div className="doctorregistration1-box">
                <div className="doctorregistration1-banner ">
                    {isDesktop ? (
                        instaDocBanner &&
                        <img
                            src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + instaDocBanner}
                            alt="insta-doc-form-banner"
                            className="content-desktop"
                        />
                    ) : (
                        instaDocBannerMob &&
                        <img
                            src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + instaDocBannerMob}
                            alt="insta-doc-mob-form-banner"
                            className="content-mobiles"
                        />
                    )}
                </div>
                <div
                    className={`doctorregistration1-form pb-3 ${level === 2 ? "" : null}`}
                >
                    <div
                        className={`doctorregistration1-form-banner rounded-top d-flex justify-content-center`}
                    >
                        <div className="d-flex align-items-center bbottom mob-bbottom justify-content-center">
                            <div
                                className={`redround rounded-circle text-center text-white levelRound`}
                            >
                                1
                            </div>
                            <DashedBorderElement isActive={level === 2 ? true : false} />
                            <div
                                className={`rounded-circle text-center text-white ${level === 1 ? "grayround" : "redround"
                                    } levelRound`}
                            >
                                2
                            </div>
                        </div>
                    </div>
                    <div className="doctorregistration1-form-container">
                        <div className="doctorregistration1-form-box">
                            {level === 1 && (
                                <>
                                    <h4 className="mt-4 label-title">Doctor Registration Form</h4>
                                    <h4 className="mb-5  label-msg">
                                        Please fill the details below :
                                    </h4>
                                </>
                            )}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="registration-form"
                            >
                                {level === 1 && (
                                    <StepOne
                                        register={register}
                                        errors={errors}
                                        isValid={isValid}
                                        getValues={getValues}
                                        trigger={trigger}
                                        setError={setError}
                                        setLevel={setLevel}
                                        emailerror={emailerror}
                                        setEmailError={setEmailError}
                                        watch={watch}
                                        clearErrors={clearErrors}
                                        enum_otp_status={enum_otp_status}
                                        setParentOTPVerified={setParentOTPVerified}
                                        otp_status={otp_status}
                                        setOTPStatus={setOTPStatus}
                                    />
                                )}
                                {level === 2 && (
                                    <StepTwo
                                        register={register}
                                        errors={errors}
                                        isValid={isValid}
                                        getValues={getValues}
                                        trigger={trigger}
                                        setError={setError}
                                        setLevel={setLevel}
                                        gender={gender}
                                        control={control}
                                        newLocation={newLocation}
                                        setNewLocation={setNewLocation}
                                        language={language}
                                        setValue={setValue}
                                        watch={watch}
                                        setOTPStatus={setOTPStatus}
                                        enum_otp_status={enum_otp_status}
                                    />
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstaDocRegistration;
