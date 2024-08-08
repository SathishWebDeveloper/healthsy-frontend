import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import "./modal.css";
// import indianflag from "../../../assets/indianflag.svg";
// import handwave from "../../../assets/Orginial.svg";
import TermsPrivacy from "../../Common/TermsPrivacy";
import OtpForm, { enum_otp_status } from "../../Otp/Otp";
// import successgif from "../../../assets/success-icon.gif";
const handwave = "/assets/Orginial.svg";
const successgif = "/assets/success-icon.gif";

const GetNotifiedRed = (props) => {
  // const enum_otp_status = {
  //   SEND_OTP: "Send-OTP",
  //   OTP_SENT: "OTP-Sent",
  //   OTP_VERIFIED: "OTP-Verified",
  // };

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [otp_status, setOtpStatus] = useState(enum_otp_status.SEND_OTP);
  register("mobile");

  const onOtpStatusChange = (status, mobile) => {
    if (status === enum_otp_status.OTP_VERIFIED) {
      setOtpStatus(status);
      setValue("mobile", mobile);
    }
  };

  const [formSubmit, setFormSubmit] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [rerender, setReRender] = useState(false);
  // const [otp_status, setOTPStatus] = useState(undefined);
  const [otp_timeout, setOTPTimeout] = useState(0);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const [email, setemail] = useState(null);
  const [emailcheck, setEmailCheck] = useState(null)

  const [emailerror, setEmailError] = useState(false)
  const emailValidator = email => {
    const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailValidate.test(email)
  }

  const onSubmit = (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}get-notified/create`, fields)
      .then((response) => {
        if (response.data?._id) {
          setSuccessModal(true);
        }
        // setFormSubmit(false);
      })
      .catch((err) => {
        setemail(fields.email);
        // setFormSubmit(false);
      });
  };

  // const send_otp = () => {
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_APP_API_URL}get-notified/send-otp`, {
  //       mobile: getValues("mobile"),
  //     })
  //     .then((response) => {
  //       setOTPStatus(enum_otp_status.OTP_SENT);
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errors.otp_not_sent = err.response?.data?.message;
  //       setReRender(!rerender);
  //     });
  // };

  // const resend_otp = () => {
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-book-a-demo/resend-otp`, {
  //       mobile: getValues("mobile"),
  //     })
  //     .then((response) => {
  //       run_timeout();
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errors.otp_not_sent = err.response?.data?.message;
  //       setReRender(!rerender);
  //     });
  // };

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

  // const verify_otp = () => {
  //   let otp =
  //     getValues("otp1") +
  //     getValues("otp2") +
  //     getValues("otp3") +
  //     getValues("otp4");
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_APP_API_URL}get-notified/verify-otp`, {
  //       mobile: getValues("mobile"),
  //       otp: otp,
  //     })
  //     .then((response) => {
  //       setOTPStatus(enum_otp_status.OTP_VERIFIED);
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errors.wrong_otp = err.response?.data?.error;
  //       setReRender(!rerender);
  //     });
  // };

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 480px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

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
          onClick={() => {
            window.location.reload()
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-box modal-lg br-8">
            <div className="modal-content modal-content-sm">
              <div className="modal-body text-center p-90">
                <img src={successgif} alt="successgif" className="success-gif-pict" />
                {/* <Link to="/" className="btn btn-primary py-2 my-2">Go to Home</Link> */}
                <p className="text-center get-notified-sucess-tittle">
                  Submitted Successfully{" "}
                </p>
                <p className="get-notified-sucess-content">
                  Thank you for the interest in HealthSy! You will be notified
                  of our updates with regards to the launch.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    );
  };

  return (
    <div>
      {successModal === false && (
        <div
          className="modal fade "
          id="getNotifiedModal"
          tabIndex="-1"
          aria-labelledby="getNotifiedModalLabel"
          aria-hidden="true"
        >
          <div className="notified-red">
            <div className="modal-dialog modal-box launcing-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>
                    Love to hear from us ? Get in touch{" "}
                    <img src={handwave} alt="" />
                  </h4>
                  {/* {
                    isDesktop
                    ?
                    ""
                    :
                   
                  } */}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="get-notify-line"></div>
                <div className="modal-body p-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-12 col-md-6 mb-40 mob-mb-24">
                        <label className="form-label">
                          Name <span className="star">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("name", { required: true })}
                          className="form-control"
                          placeholder="Enter your name"
                          autoFocus
                        />
                        {errors.name && (
                          <div className={`invalid-feedback d-block`}>
                            Please provide a valid name
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6 mb-40 mob-mb-24">
                        <label className="form-label">
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
                          className="form-control"
                          placeholder="Enter your email id"
                          onChange={(e) => {
                            setEmailCheck(e.target.value)
                            if (!emailValidator(e.target.value) && e.target.value !== "") {
                              setEmailError(true)
                            } else {
                              setEmailError(false)
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
                        ) : emailerror === true ?
                          <div className={`invalid-feedback d-block`}>
                            Please provide a valid email
                          </div>
                          : ""}
                      </div>

                      <OtpForm onChange={onOtpStatusChange} />

                      {/* <div className="col-12 col-md-6 mb-40 mob-mb-24">
                        <label className="form-label">
                          Mobile Number <span className="star">*</span>
                        </label>

                        <div className="input-group">
                          <span className="input-group-text border-start-0 text-indent-10 border-end-0 px-0 text-muted px-3">
                            91
                          </span>
                          <input
                            type="number"
                            {...register("mobile", { required: true })}
                            className={`form-control border-start-0 mno-line ${
                              otp_status === undefined ? "" : "border-end-0"
                            }`}
                            disabled={
                              otp_status === enum_otp_status.OTP_VERIFIED
                            }
                            onChange={(e) => {
                              if (e.target.value.length == 10)
                                setOTPStatus(enum_otp_status.SEND_OTP);
                            }}
                            placeholder="Mobile number"
                          />
                          {otp_status === enum_otp_status.SEND_OTP && (
                            <span
                              className={`input-group-text border-start-0`}
                            >
                              <button
                                className={`btn py-0 px-2 get-code`}
                                type="button"
                                onClick={send_otp}
                              >
                                Get Code
                              </button>
                            </span>
                          )}
                          {otp_status === enum_otp_status.OTP_SENT && (
                            <span
                              className={`input-group-text bg-white border-start-0`}
                            >
                              <button
                                className={`btn get-code py-0 px-2`}
                                type="button"
                                onClick={(e) =>
                                  otp_timeout === 0 && resend_otp()
                                }
                                disabled={otp_timeout > 0}
                              >
                                {otp_timeout === 0 ? "Resend OTP" : otp_timeout}
                              </button>
                            </span>
                          )}
                          {otp_status === enum_otp_status.OTP_VERIFIED && (
                            <span
                              className={`input-group-text bg-white border-start-0`}
                            >
                              <button
                                className={`btn py-0 px-2 get-notify-verify`}
                                type="button"
                                disabled="disabled"
                              >
                                Verified
                              </button>
                            </span>
                          )}
                          
                        </div>
                        {errors.mobile && (
                            <div className={`invalid-feedback d-block`}>
                              Please provide a valid mobile number
                            </div>
                          )}
                          {errors.otp_not_sent && (
                            <div className={`invalid-feedback d-block`}>
                              {errors.otp_not_sent}
                            </div>
                          )}
                      </div>

                      {otp_status === enum_otp_status.OTP_SENT && (
                        <div
                          className={`col-12 col-md-6 mb-40 mob-mb-24 ${
                            otp_status === enum_otp_status.OTP_VERIFIED
                              ? "d-none"
                              : null
                          }`}
                        >
                          <label className="form-label">
                            OTP <span className="star">*</span>
                          </label>
                          <div className="row">
                            <div className="col-12 col-md-8 d-flex align-center">
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
                                className={`btn py-2 px-4 ${
                                  otp_status === enum_otp_status.OTP_VERIFIED
                                    ? "bg-faded-green"
                                    : otp1.concat(otp2, otp3, otp4).length === 4
                                    ? "get-code"
                                    : "bg-light-gray"
                                } text-white rounded-4`}
                                disabled={
                                  otp1.concat(otp2, otp3, otp4).length != 4
                                }
                                type="button"
                                onClick={verify_otp}
                              >
                                {otp_status === enum_otp_status.OTP_VERIFIED &&
                                  "Verified"}{" "}
                                {otp_status !== enum_otp_status.OTP_VERIFIED &&
                                  "Verify"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>

                    <h6 className="modal-content1 my-4">
                      How exicted are you to know more or use HealthSy?
                    </h6>
                    {isDesktop ? (
                      <div className="row mb-3">
                        <div style={{ display: "flex" }}>
                          <div className="col-6 col-md-2">
                            {" "}
                            <input
                              type="radio"
                              id="get_notified_how_excited_1"
                              className="btn-check"
                              {...register("excitementlevel", {
                                required: true,
                              })}
                              value="Very Excited"
                              onClick={(e) => setFormSubmit(true)}
                            />
                            <label
                              className="btn btn-light btn-outline-primary text-muted"
                              htmlFor="get_notified_how_excited_1"
                            >
                              Very Excited
                            </label>
                          </div>
                          <div className="col-6 ms-3 col-md-2">
                            <input
                              type="radio"
                              id="get_notified_how_excited_2"
                              className="btn-check"
                              {...register("excitementlevel", {
                                required: true,
                              })}
                              value="Excited"
                              onClick={(e) => setFormSubmit(true)}
                            />
                            <label
                              className="btn btn-light btn-outline-primary text-muted"
                              htmlFor="get_notified_how_excited_2"
                            >
                              Excited
                            </label>
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className="col-6 col-md-2 mt-3">
                            <input
                              type="radio"
                              id="get_notified_how_excited_4"
                              className="btn-check"
                              {...register("excitementlevel", {
                                required: true,
                              })}
                              value="Not Much"
                              onClick={(e) => setFormSubmit(true)}
                            />
                            <label
                              className="btn btn-light btn-outline-primary text-muted"
                              htmlFor="get_notified_how_excited_4"
                            >
                              Not Much
                            </label>
                          </div>
                          <div className="col-6 col-md-2 ms-3 mt-3">
                            <input
                              type="radio"
                              id="get_notified_how_excited_5"
                              className="btn-check"
                              {...register("excitementlevel", {
                                required: true,
                              })}
                              value="Do Not Know"
                              onClick={(e) => setFormSubmit(true)}
                            />
                            <label
                              className="btn btn-light btn-outline-primary text-muted"
                              htmlFor="get_notified_how_excited_5"
                            >
                              Do Not Know
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row mb-3">
                        <div className="col-12 col-md-2">
                          {" "}
                          <input
                            type="radio"
                            id="get_notified_how_excited_1"
                            className="btn-check"
                            {...register("excitementlevel", { required: true })}
                            value="Very Excited"
                            onClick={(e) => setFormSubmit(true)}
                          />
                          <label
                            className="btn btn-light btn-outline-primary text-muted"
                            htmlFor="get_notified_how_excited_1"
                          >
                            Very Excited
                          </label>
                        </div>
                        <div className="col-12 col-md-2">
                          <input
                            type="radio"
                            id="get_notified_how_excited_2"
                            className="btn-check"
                            {...register("excitementlevel", { required: true })}
                            value="Excited"
                            onClick={(e) => setFormSubmit(true)}
                          />
                          <label
                            className="btn btn-light btn-outline-primary text-muted"
                            htmlFor="get_notified_how_excited_2"
                          >
                            Excited
                          </label>
                        </div>
                        <div className="col-12 col-md-2">
                          <input
                            type="radio"
                            id="get_notified_how_excited_4"
                            className="btn-check"
                            {...register("excitementlevel", { required: true })}
                            value="Not Much"
                            onClick={(e) => setFormSubmit(true)}
                          />
                          <label
                            className="btn btn-light btn-outline-primary text-muted"
                            htmlFor="get_notified_how_excited_4"
                          >
                            Not Much
                          </label>
                        </div>
                        <div className="col-12 col-md-2">
                          <input
                            type="radio"
                            id="get_notified_how_excited_5"
                            className="btn-check"
                            {...register("excitementlevel", { required: true })}
                            value="Do Not Know"
                            onClick={(e) => setFormSubmit(true)}
                          />
                          <label
                            className="btn btn-light btn-outline-primary text-muted"
                            htmlFor="get_notified_how_excited_5"
                          >
                            Do Not Know
                          </label>
                        </div>
                      </div>
                    )}
                    {errors.get_notified_how_excited && (
                      <div
                        className={`invalid-feedback d-block text-center w-100`}
                      >
                        Please select an option
                      </div>
                    )}
                    <TermsPrivacy />
                    <div className="popup-button popup-button-w100 get-notify-main-button">
                      <button
                        type="submit"
                        className={`popup-white-submit ${formSubmit === false ||
                            otp_status !== enum_otp_status.OTP_VERIFIED
                            ? ""
                            : "bg-primary"
                          }`}
                        disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {successModal && <SuccessModal />}
    </div>
  );
};

export default GetNotifiedRed;
