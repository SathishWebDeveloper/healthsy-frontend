import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useRouter } from "next/router";

import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import HealthConditionField from "../Common/HealthConditionField";
import CtaSuccessModal from "../Common/ctaSuccessModal";
import { convertToTitleCase } from "../../constants";

const closeIcon = "/assets/home-sidebar-close.svg";
const TickImage = "/assets/round-tick.svg"
const vectorImg = "/assets/tick.svg"
const vectorLine = "/assets/vectorLine.svg"
const vectorGrayLine = "/assets/vectorGayLine.svg"

const PhysioRegistrationLevel1 = ({
    register,
    errors,
    isValid,
    trigger,
    setLevel,
    setError,
    setValue,
    getValues,
    emailerror
}) => {

    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [otp_status, setOTPStatus] = useState(undefined);
    const [rerender, setReRender] = useState(false);
    const [otpdisable, setOtpDisable] = useState(false);
    const [otp_timeout, setOTPTimeout] = useState(0);

    const enum_otp_status = {
        SEND_OTP: "Send-OTP",
        OTP_SENT: "OTP-Sent",
        OTP_VERIFIED: "OTP-Verified",
    };

    const send_otp = () => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-book-a-demo/send-otp`,
                {
                    mobile: getValues("mobile"),
                }
            )
            .then((response) => {
                setOTPStatus(enum_otp_status.OTP_SENT);
                run_timeout();
                setOtpDisable(true);
            })
            .catch((err) => {
                errors.otp_not_sent = err.response?.data?.message;
                setReRender(!rerender);
                setOtpDisable(false);
            });
    };

    const resend_otp = () => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-book-a-demo/resend-otp`,
                {
                    mobile: getValues("mobile"),
                }
            )
            .then((response) => {
                run_timeout();
            })
            .catch((err) => {
                errors.otp_not_sent = err.response?.data?.message;
                setReRender(!rerender);
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

    const verify_otp = () => {
        let otp =
            getValues("otp1") +
            getValues("otp2") +
            getValues("otp3") +
            getValues("otp4");
        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-registration/verify-otp`,
                {
                    mobile: getValues("mobile"),
                    otp: otp,
                }
            )
            .then((response) => {
                setOTPStatus(enum_otp_status.OTP_VERIFIED);
            })
            .catch((err) => {
                errors.wrong_otp = err.response?.data?.error;
                setReRender(!rerender);
            });
    };

    function setOtpStatus(e) {
        if (e.target.value.length === 10) {
            setOTPStatus(enum_otp_status.SEND_OTP);
        }
    }

    const phnInput = (otpStatus) => {
        return (
            <PhoneFormInput
                otpStatus={otpStatus}
                inputAttrs={{ ...register("mobile", { required: true }) }}
                isDisabled={otpStatus === enum_otp_status.OTP_VERIFIED}
                onInputNumber={setOtpStatus}
                placeholder={"Enter your mobile number"}
                errors=""
            >
                <PhoneOtpStatuses
                    otpStatus={otpStatus}
                    enumOtpStatus={enum_otp_status}
                    otpTimeout={otp_timeout}
                    onSendOtp={send_otp}
                    onResendOtp={resend_otp}
                />

                {errors.mobile && (
                    <div
                        className={`invalid-feedback d-block position-absolute`}
                        style={{ bottom: "-25px", left: "0px" }}
                    >
                        Please provide a valid mobile number
                    </div>
                )}
                {errors.otp_not_sent && (
                    <div
                        className={`invalid-feedback d-block position-absolute`}
                        style={{ bottom: "-28px", left: "0px" }}
                    >
                        {errors.otp_not_sent}
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
        // todo
        // await axios
        //     .post(
        //         `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-registration/verify-email`,
        //         { email: getValues()?.email }
        //     )    
        //     .then((response) => {
        //         if (
        //             response.data === "Email was exists already"
        //         ) {
        //             setEmailError(true);
        //             valid_email = false;
        //         }
        //     });
        valid_name &&
            valid_email &&
            valid_mobile &&
            setLevel(2);
    }

    return (
        <div className="formSpacing container">
            <div className="flexCenter physioFormImg">
                <div>
                    <Image src={TickImage} alt="Tick Icon" width={36.935} height={37.248} className="physioImage" />
                </div>
                <div className="fs22m13fw700 stepLevel primaryColor">
                    Step 1
                </div>
                <Image src={vectorLine} alt="Line Icon" width={88} height={16} className="vectorLine vectorSpacing" />
                <div
                    className={`rounded-circle flexCenter text-center text-white circleClr vectorLine physioImage`}
                >
                    <Image src={vectorImg} alt="Vector Icon" width={16.078} height={11.852} className="vectorTick " />
                </div>
                <div className="fs22m13fw700 stepLevel">
                    Step 2
                </div>
                <Image src={vectorGrayLine} alt="Line Icon" width={88} height={16} className="vectorLine vectorSpacing" />
                <div
                    className={`rounded-circle flexCenter text-center text-white circleClr vectorLine physioImage`}
                >
                    <Image src={vectorImg} alt="Line Icon" width={16.078} height={11.852} className="vectorTick" />
                </div>
                <div className="fs22m13fw700 stepLevel">
                    Step 3
                </div>
            </div>
            <div className="fs28m16fwb formTitle ">Fill your Personal Details</div>
            <div className="nameField fs18m14fw600">
                <label>
                    Name<span className="star">*</span>
                </label>
            </div>
            <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Type your name"
                className="form-control"
                maxLength="30"
            />
            {errors.name && (
                <div className={`invalid-feedback d-block`}>
                    Please provide a valid name
                </div>
            )}
            <div className="formControl fs18m14fw600">
                <label>Mobile Number<span className="star">*</span></label>
            </div>
            <div className="bookServiceMobileNo">
                {phnInput(otp_status)}
                <div className="physioServiceFormField ">
                    {otp_status === enum_otp_status.OTP_SENT && (
                        <div>
                            <div className="otpBoxes">
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
                                    className={`btn py-2 px-4 border-0 ${otp_status === enum_otp_status.OTP_VERIFIED
                                        ? "bg-faded-green"
                                        : otp1.concat(otp2, otp3, otp4).length === 4
                                            ? "get-code"
                                            : ""
                                        } rounded-4 verification-btn`}
                                    disabled={otp1.concat(otp2, otp3, otp4).length != 4}
                                    type="button"
                                    onClick={verify_otp}
                                >
                                    {otp_status === enum_otp_status.OTP_VERIFIED &&
                                        "Verified"}{" "}
                                    {(otp_status === enum_otp_status.OTP_VERIFIED) ===
                                        false && "Verify OTP"}
                                </button>
                            </div>
                            {errors.wrong_otp && (
                                <div className={`invalid-feedback d-block`}>
                                    {errors.wrong_otp}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <label className="textForm formControl fs18m14fw600">
                Email<span className="star">*</span>
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
                className="form-control"
                placeholder="Type your email ID"
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
            <div className="btnField">
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

const PhysioRegistrationLevel2 = ({
    register,
    errors,
    isValid,
    trigger,
    setLevel,
    setError,
    setValue,
    citiesList
}) => {

    const router = useRouter();
    const cityPath = router.pathname.split("/")[3];

    useEffect(() => {
        if (cityPath) {
            setValue("city", convertToTitleCase(cityPath))
        }
    }, [cityPath])

    return (
        <div className="formSpacing container">
            <div className="flexCenter physioFormImg">
                <div>
                    <Image src={TickImage} alt="Tick Icon" width={36.935} height={37.248} className="physioImage" />
                </div>
                <div className="fs22m13fw700 stepLevel primaryColor">
                    Step 1
                </div>
                <Image src={vectorLine} alt="Vector Icon" width={88} height={16} className="vectorLine vectorSpacing" />
                <div>
                    <Image src={TickImage} alt="Tick Icon" width={36.935} height={37.248} className="physioImage stepCircleImg" />
                </div>
                <div className="fs22m13fw700 stepLevel primaryColor">
                    Step 2
                </div>
                <Image src={vectorGrayLine} alt="Vector Icon" width={88} height={16} className="vectorLine vectorSpacing" />
                <div
                    className={`rounded-circle flexCenter text-center text-white circleClr vectorLine physioImage`}
                >
                    <Image src={vectorImg} alt="Line Icon" width={16.078} height={11.852} className="vectorTick" />
                </div>
                <div className="fs22m13fw700 stepLevel">
                    Step 3
                </div>
            </div>
            <div className="fs28m16fwb formTitle">Fill your Location details</div>
            <div>
                <label className="locationDetails fs18m14fw600">
                    Select city<span className="star">*</span>
                </label>
                <select
                    {...register("city", { required: true })}
                    className="form-control"
                    defaultValue={cityPath ? cityPath : ""}
                    disabled={cityPath}
                >
                    <option value="">Select your city</option>
                    {cityPath && <option value={convertToTitleCase(cityPath)}>{convertToTitleCase(cityPath)}</option>}
                    {!cityPath && citiesList && citiesList?.map((data, idx) => (

                        <option value={data?.slug_url} key={idx}>
                            {data?.city}
                        </option>
                    ))}
                </select>
                {errors.city && (
                    <div className={`invalid-feedback d-block`}>
                        Please select your city
                    </div>
                )}
            </div>
            <div>
                <label className="formControl fs18m14fw600">
                    Location<span className="star">*</span>
                </label>
                <input
                    type="text"
                    {...register("location", { required: true })}
                    placeholder="Type your Location"
                    className="form-control"
                />
                {errors.location && (
                    <div className={`invalid-feedback d-block`}>
                        Please provide a location
                    </div>
                )}
            </div>
            <div>
                <label className="textForm fs18m14fw600">
                    Pincode<span className="star">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register("pincode", {
                        required: true,
                        pattern: /[0-9]{6}/,
                    })}
                    placeholder="Select your Pincode"
                    maxLength="6"
                    onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />

                {errors.pincode && (
                    <div className={`invalid-feedback d-block`}>
                        Please provide a pincode
                    </div>
                )}
            </div>

            <div className="nextBtn">
                <input
                    type="button"
                    className={`btn border-0 text-white w-100 btn-height`}
                    onClick={async (e) => {
                        if ((await trigger("location")) === false)
                            setError("location", {}, { shouldFocus: true });
                        if ((await trigger("pincode")) === false)
                            setError("pincode", {}, { shouldFocus: true });
                        if ((await trigger("city")) === false)
                            setError("city", {}, { shouldFocus: true });
                        else {
                            Object.keys(errors).length === 0 && setLevel(3);
                        }
                    }
                    }
                    value="Next"
                    style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
                />
            </div>
        </div>
    )
}

const PhysioRegistrationLevel3 = ({
    register,
    errors,
    setValue,
    trigger,
    control,
    getValues,
    handleSubmit,
    isValid,
    healthConditionsList
}) => {
    const router = useRouter();
    const categoryPath = router.pathname.split('/')[2];
    useEffect(() => {
        register('health_conditions', { required: true, })
    },
        []);

    useEffect(() => {
        if (categoryPath) {
            setValue("service_category", convertToTitleCase(categoryPath))
        }
    }, [categoryPath])

    return (
        <div className="formSpacing containerSpacing container">
            <div className="flexCenter physioFormImg">
                <div>
                    <Image src={TickImage} alt="Tick Icon" width={36.935} height={37.248} className="physioImage" />
                </div>
                <div className="fs22m13fw700 stepLevel primaryColor ">
                    Step 1
                </div>
                <Image src={vectorLine} alt="Vector Icon" width={88} height={16} className="vectorLine vectorSpacing" />
                <div>
                    <Image src={TickImage} alt="Tick Image" width={36.935} height={37.248} className="physioImage stepCircleImg" />
                </div>
                <div className="fs22m13fw700 stepLevel primaryColor">
                    Step 2
                </div>
                <Image src={vectorLine} alt="Line Icon" width={88} height={16} className="vectorLine vectorSpacing" />
                <div>
                    <Image src={TickImage} alt="Tick Icon" width={36.935} height={37.248} className="physioImage stepCircleImg" />
                </div>
                <div className="fs22m13fw700 stepLevel primaryColor">
                    Step 3
                </div>
            </div>
            <div className="fs28m16fwb formTitle ">Choose your Service and Slot</div>
            <div>
                <label className="locationDetails fs18m14fw600">
                    Select Service category<span className="star">*</span>
                </label>
                <select
                    {...register("service_category", { required: true })}
                    className="form-control"
                    defaultValue={categoryPath ? categoryPath : ""}
                    disabled={categoryPath}
                >
                    {<option value={convertToTitleCase(categoryPath)}>{convertToTitleCase(categoryPath)}</option>}

                </select>
                {errors.service_category && (
                    <div className={`invalid-feedback d-block`}>
                        Please select your service category
                    </div>
                )}
            </div>
            <div>
                <label className="serviceField fs18m14fw600">
                    Select Health Condition<span className="star">*</span>
                </label>
                <HealthConditionField
                    errors={errors}
                    conditions={healthConditionsList}
                    register={register}
                    setValue={setValue}
                    trigger={trigger}
                    getValues={getValues}
                />
            </div>
            <div className="d-flex dataTimeField">
                <div className="fieldSet position-relative">
                    <label className="datePicker serviceCategory fs18m14fw600">
                        Choose Date<span className="star">*</span>
                    </label>
                    <div className="position-relative">
                        <div className="customDatePicker">
                            <MdOutlineCalendarMonth size={22} />
                        </div>
                        <input
                            {...register("booking_date", { required: true })}
                            type="date"
                            className={`form-control ${getValues()?.booking_date ? "hasDate" : ""}`}
                            placeholder="Choose Date"
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                                setValue("booking_date", e.target.value, { shouldValidate: true });
                            }}
                        />
                        {!getValues()?.booking_date && errors.booking_date && (
                            <div className={`invalid-feedback d-block`}>
                                Please Choose a Date
                            </div>
                        )}
                    </div>
                </div>

                <div className="timeField fieldSet position-relative">
                    <label className="serviceCategory fs18m14fw600">
                        Choose Time<span className="star">*</span>
                    </label>
                    <Controller
                        name="booking_time"
                        control={control}
                        rules={{ required: 'Please choose a time' }}
                        render={({ field }) => (
                            <>
                                <div className="position-relative timePickerIconWrapper">
                                    <TimePicker
                                        {...field}
                                        showSecond={false}
                                        allowEmpty={false}
                                        format="h:mm a"
                                        onChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        value={field.value ? moment(field.value, 'HH:mm') : null}
                                        placeholder="Choose Time"
                                    />
                                </div>
                                {errors.booking_time && (
                                    <div className="invalid-feedback d-block">
                                        {errors.booking_time.message}
                                    </div>
                                )}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="nextLevel">
                <input
                    type="submit"
                    className={`btn border-0 text-white w-100 btn-height`}
                    onClick={handleSubmit}
                    value="Submit"
                    style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
                />
            </div>

            <div className="text-center fs14m12">
                by clicking submit you agree to our <span className="primaryColor">T&C</span>
            </div>
        </div>
    )
}

const PhysioRegistrationForm = ({
    bookNowForm,
    setBookNowForm,
    citiesList = [],
    healthConditionsList = [],
}) => {
    const [level, setLevel] = useState(1);
    const [emailerror, setEmailError] = useState(false)
    const [successPopupModal, setSuccessPopupModal] = useState(false);
    const navigate = useRouter().push;

    const {
        register,
        getValues,
        formState: { errors, isValid },
        handleSubmit,
        trigger,
        control,
        setError,
        reset,
        watch,
        setValue
    } = useForm();

    const onSubmit = (fields) => {
        console.log('fields', fields)

        if (fields.booking_time) {
            const bookingTime = new Date(fields.booking_time);
            const hours = String(bookingTime.getUTCHours()).padStart(2, '0');
            const minutes = String(bookingTime.getUTCMinutes()).padStart(2, '0');
            fields.booking_time = `${hours}:${minutes}`;
        }

        fields.health_conditions = fields.health_conditions?.length && fields.health_conditions?.map((data) => data?.value)

        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}web-bookings/create`,
                fields
            )
            .then((response) => {
                if (response?.data?.data?._id) {
                    setSuccessPopupModal(true);
                    setBookNowForm(false);
                }
            })
            .catch((err) => {
                if (err.response?.data?.code === 11000) {
                    setEmailError(true)
                }
            });
    };

    return (
        <>
            <Modal
                show={bookNowForm}
                dialogClassName=""
                className="bookNowModalContainer"
                centered
                onHide={() => setBookNowForm(false)}
            >
                <div className="boderSpacing">
                    <div className="physioServiceForm flexBetweenCenter">
                        <div className="fs30m20fwb">
                            Book <span className="primaryColor">Home Based Healthcare</span> Service in your city
                        </div>
                        <Image src={closeIcon}
                            width={21}
                            height={21}
                            alt="Close Icon"
                            className="physioCloseIcon"
                            onClick={() => setBookNowForm(false)}
                        />
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="registration-form"
                >
                    {level === 1 && (
                        <PhysioRegistrationLevel1
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                            isValid={isValid}
                            trigger={trigger}
                            setLevel={setLevel}
                            setError={setError}
                            emailerror={emailerror}
                        />)
                    }
                    {level === 2 && (
                        <PhysioRegistrationLevel2
                            register={register}
                            errors={errors}
                            isValid={isValid}
                            trigger={trigger}
                            setLevel={setLevel}
                            setError={setError}
                            citiesList={citiesList}
                            setValue={setValue}
                        />)
                    }
                    {level === 3 && (
                        <PhysioRegistrationLevel3
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            watch={watch}
                            control={control}
                            getValues={getValues}
                            handleSubmit={handleSubmit}
                            isValid={isValid}
                            healthConditionsList={healthConditionsList}
                        />)
                    }
                </form>
            </Modal>
            {successPopupModal && <CtaSuccessModal
                successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} onHide={() => navigate('/')} />}
        </>
    );
};

export default PhysioRegistrationForm; 