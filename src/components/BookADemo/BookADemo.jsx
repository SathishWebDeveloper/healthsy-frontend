import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import Link from "next/link";
// import "./bookademo.css";
// import combine from "../../assets/combined-icons.svg";
// import manageIimage from "../../assets/manage-image.png";
// import respmanageIimage from "../../assets/resp-manage-image.png";

import Footer from "../Layouts/Footer/Footer";
import HeaderDemo from "./HeaderDemo/headerDemo";
import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import PreferredTimes from "../../data/preferred_time_contact.json";
import specialisationDatas from "../../data/specialisation.json";
import axios from "axios";
// import successgif from "../../assets/success-icon.gif";

const combine = "/assets/combined-icons.svg";
const manageIimage = "/assets/manage-image.png";
const respmanageIimage = "/assets/resp-manage-image.png";
const successgif = "/assets/success-icon.gif";
const home = "/assets/home-icon.svg";
const arrowleft = "/assets/arrow-left.svg";

const BookADemo = () => {
  useEffect(() => {
    getPrimaryspl();
    getPreferredTime();
    getPreferredDay();
  }, []);

  const [primaryspl, setPrimaryspl] = useState([]);
  const [time, setTime] = useState([]);
  const [day, setDay] = useState([]);

  const getPrimaryspl = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}primary-specialisation/list`)
      .then((res) => {
        setPrimaryspl(res.data.rows);
      });
  };

  const getPreferredTime = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}timings/list`).then((res) => {
      setTime(res.data.rows);
    });
  };

  const getPreferredDay = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}days/list`).then((res) => {
      setDay(res.data.rows);
    });
  };

  // useEffect(() => {
  //   document.title =
  //     "Book a demo - We have built a secured and seamless telemedicine platform for you.";
  // }, []);

  const enum_otp_status = {
    SEND_OTP: "Send-OTP",
    OTP_SENT: "OTP-Sent",
    OTP_VERIFIED: "OTP-Verified",
  };

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [otp_status, setOTPStatus] = useState(undefined);
  const [otp_timeout, setOTPTimeout] = useState(0);
  const [formSubmit, setFormSubmit] = useState(false);
  const [rerender, setReRender] = useState(false);

  const [email, setemail] = useState(null);
  const [emailcheck, setEmailCheck] = useState(null);
  const [emailerror, setEmailError] = useState(false);
  const emailValidator = (email) => {
    const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailValidate.test(email);
  };

  const onSubmit = (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-book-a-demo/create`, fields)
      .then((response) => {
        if (response.data?._id) {
          setSuccessModal(true);
        } else {
          errors.submit_fail = response.data;
          setReRender(!rerender);
        }
      })
      .catch((err) => {
        setemail(fields.email);
        errors.submit_fail = err.response.data.error;
        setReRender(!rerender);
      });
  };

  const [otpdisable, setOtpDisable] = useState(false);

  const send_otp = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-book-a-demo/send-otp`, {
        mobile: getValues("mobile"),
      })
      .then((response) => {
        setOTPStatus(enum_otp_status.OTP_SENT);
        run_timeout();
        setOtpDisable(true);
      })
      .catch((err) => {
        console.error(err);
        errors.otp_not_sent = err.response?.data?.message;
        setReRender(!rerender);
        setOtpDisable(false);
      });
  };

  const resend_otp = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-book-a-demo/resend-otp`, {
        mobile: getValues("mobile"),
      })
      .then((response) => {
        run_timeout();
      })
      .catch((err) => {
        console.error(err);
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
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-registration/verify-otp`, {
        mobile: getValues("mobile"),
        otp: otp,
      })
      .then((response) => {
        setOTPStatus(enum_otp_status.OTP_VERIFIED);
      })
      .catch((err) => {
        console.error(err);
        errors.wrong_otp = err.response?.data?.error;
        setReRender(!rerender);
      });
  };

  const SuccessModal = () => {
    return (
      <>
        <div
          className="modal fade show"
          id="successModal"
          tabIndex="-1"
          aria-labelledby="successModalLaqbel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-box modal-lg">
            <div className="modal-content modal-content-sm">
              <div className="modal-body text-center p-90">
                <img src={successgif} alt="successgif" className="success-gif-pict" />
                <h4 className="text-center my-4">Registered Successfully</h4>
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`} className="btn btn-primary py-2 my-2">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    );
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
          <div
            className={`invalid-feedback d-block position-absolute`}
            style={{ bottom: "-28px", left: "0px" }}
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

  return (
    <>
      <HeaderDemo />
      <div className="container">
        <div className='position-absolute w-90 d-block'>
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}><img src={home} alt="home" /></a>  <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" /> <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-doctors`}> For Doctors</a> <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" /> <a href="#"> Book Demo </a>
        </div>
      </div>
      <div className="bookademo-section">
        <div className="container">
          <div className="bookademo-padding bookademo-top-section">
            <div className="row bookademo-display">
              <div className="col-md-6 left-section">
                <div className="sub-title">BOOK A DEMO TODAY !</div>
                <div className="title">
                  We have built a secured and seamless telemedicine platform for
                  you.
                </div>
                <div className="sub-para">
                  Thousand of patients are in need of a doctor like you.
                </div>
                <div className="">
                  <img src={combine} alt="combine" />
                </div>
              </div>
              <div className="col-md-6 right-section">
                <div className="form-box">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-24">
                      <div className="col-12">
                        <label className="form-label">
                          Name <span className="star">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("name", {
                            required: true,
                            maxLength: 100,
                          })}
                          placeholder="Enter your name"
                          autoFocus
                        />
                        {errors.name && (
                          <div className={`invalid-feedback d-block`}>
                            Please provide a valid name
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-24">
                      <div className="col-12">
                        <label className="form-label">
                          Email <span className="star">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          {...register("email", {
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid Email Address",
                            },
                          })}
                          placeholder="Enter your email id"
                          onChange={(e) => {
                            setEmailCheck(e.target.value);
                            if (
                              !emailValidator(e.target.value) &&
                              e.target.value !== ""
                            ) {
                              setEmailError(true);
                            } else {
                              setEmailError(false);
                            }
                          }}
                        />
                        {errors.email ? (
                          <div className={`invalid-feedback d-block`}>
                            Please provide a valid email
                          </div>
                        ) : email && email == emailcheck ? (
                          <div className={`invalid-feedback d-block`}>
                            Email already registered
                          </div>
                        ) : emailerror === true ? (
                          <div className={`invalid-feedback d-block`}>
                            Please provide a valid email
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12  mb-24">
                        <label className="form-label">
                          Mobile Number <span className="star">*</span>
                        </label>
                        {phnInput(otp_status)}
                      </div>

                      {otp_status === enum_otp_status.OTP_SENT && (
                        <div className={`col-12 col-md-6 mb-3`}>
                          {/* <label className="form-label text-white">.</label> */}
                          <div className="row">
                            <div className="col-12 col-md-8 d-flex verifyOTP">
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
                                      .getElementById(
                                        "doctor-registration-otp-2"
                                      )
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
                                      .getElementById(
                                        "doctor-registration-otp-3"
                                      )
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
                                      .getElementById(
                                        "doctor-registration-otp-4"
                                      )
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
                                disabled={
                                  otp1.concat(otp2, otp3, otp4).length != 4
                                }
                                type="button"
                                onClick={verify_otp}
                              >
                                {otp_status === enum_otp_status.OTP_VERIFIED &&
                                  "Verified"}{" "}
                                {(otp_status ===
                                  enum_otp_status.OTP_VERIFIED) ===
                                  false && "Verify"}
                              </button>
                            </div>
                          </div>
                          {errors.wrong_otp && (
                            <div className={`invalid-feedback d-block`}>
                              {errors.wrong_otp}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="row mb-24">
                      <div className="col-12">
                        <label className="form-label" htmlFor="">
                          Primary Specialisation <span className="star">*</span>
                        </label>
                        <select
                          {...register("specialization")}
                          className="form-select select-demo-color-mob"
                          defaultValue={""}
                          style={{ color: "rgba(152, 150, 157, 1)" }}
                        >
                          <option value="" hidden >
                            Select your specialisation
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
                            Please select your specialisation
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-24">
                      <div className="col-12">
                        <label className="form-label">
                          Preferred Day? <span className="star">*</span>
                        </label>
                        <div className="form-subs">
                          {day.map((el, inx) => {
                            if (el.active === true) {
                              return (
                                <label key={inx}>
                                  <input
                                    type="radio"
                                    id="today"
                                    {...register("day")}
                                    value={new Date().toLocaleDateString(
                                      "en-US"
                                    )}
                                  />
                                  <span>{el.type}</span>
                                </label>
                              );
                            }
                          })}
                        </div>
                        {/* <div className="form-subs">
                          <label>
                            <input
                              type="radio"
                              id="today"
                              {...register("day")}
                              value={new Date().toLocaleDateString("en-US")}
                            />
                            <span>Today</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              id="tomorrow"
                              {...register("day")}
                              value={new Date(
                                new Date().setDate(new Date().getDate() + 1)
                              ).toLocaleDateString("en-US")}
                            />
                            <span>Tommorrow</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              id="day_after"
                              {...register("day")}
                              value={new Date(
                                new Date().setDate(new Date().getDate() + 2)
                              ).toLocaleDateString("en-US")}
                            />
                            <span>Day After</span>
                          </label>
                        </div> */}
                        {errors.day && (
                          <div className={`invalid-feedback d-block`}>
                            Please select an option
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-24">
                      <div className="col-12">
                        <label className="form-label">
                          Preferred time to contact you?{" "}
                          <span className="star">*</span>
                        </label>
                        <select
                          className="form-select select-demo-color-mob"
                          {...register("time")}
                          defaultValue={""}
                          style={{
                            color: "rgba(101, 98, 108, 1)",
                            fontSize: "font-size: 14px",
                          }}
                          onChange={(e) => setFormSubmit(true)}
                        >
                          <option value="" disabled>
                            Select Timeline...
                          </option>
                          {time.map((option) => {
                            if (option.active === true) {
                              return (
                                <option key={option.type} value={option.type}>
                                  {option.type}
                                </option>
                              );
                            }
                          })}
                        </select>

                        {errors.time && (
                          <div className={`invalid-feedback d-block`}>
                            Please select your convenient time
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`btn ${formSubmit === false ||
                        otp_status !== enum_otp_status.OTP_VERIFIED
                        ? "bg-light-gray"
                        : "bg-primary"
                        } w-100 mt-3 rounded-3 text-white`}
                      disabled={
                        formSubmit === false ||
                        otp_status !== enum_otp_status.OTP_VERIFIED
                      }
                    >
                      Book a Demo
                    </button>
                    {errors.submit_fail && (
                      <div className={`invalid-feedback d-block`}>
                        {errors.submit_fail}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bookademo-practice-section">
        <div className="bookademo-manage-section">
          <div className="title">Manage Your Practice On The Go !</div>
          <div className="manage-image text-center book-a-demo-mob-img-card">
            <img src={manageIimage} alt="manageIimage" className="content-desktop" />
            <img
              src={respmanageIimage}
              alt="respmanageIimage"
              className="d-none book-a-demo-mob-img"
            />
          </div>
        </div>
      </div>
      {successModal && <SuccessModal />}
    </>
  );
};

export default BookADemo;
