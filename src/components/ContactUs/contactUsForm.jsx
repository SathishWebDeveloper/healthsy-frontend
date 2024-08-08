import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import SuccessModal from "../Common/successModel";
import Location from "../Common/location";

const ContactUsForm = (props) => {
  const [newLocation, setNewLocation] = useState("");
  const [emailExist, setEmailExist] = useState(null);
  const navigate = useRouter().push;

  const {
    register,
    getValues,
    trigger,
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [otp_status, setOTPStatus] = useState(undefined);
  const [otp_timeout, setOTPTimeout] = useState(0);
  const [rerender, setReRender] = useState(false);

  const onSubmit = (fields) => {
    if (!newLocation) {
      setValue("location", "");
      trigger()
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}contact-us/create`,
          fields
        )
        .then((response) => {
          setSuccessModal(true),
            reset(),
            setNewLocation(""),
            setOTPStatus(undefined)
        })
        .catch((err) => {
          if (err.response.data?.code === 11000) {
            setEmailExist(true)
          }
          console.log(err);
        });
      setOtp1("")
      setOtp2("")
      setOtp3("")
      setOtp4("")
    }
  };

  const [otpdisable, setOtpDisable] = useState(false);

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
        console.error(err);
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
        console.error(err);
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

  return (
    <>
      <div className="contactUsFormSection">
        <div className="container">
          <div className="row">
            <h3 className="contactUsFormTitle">
              Let us know what's of interest to you.
            </h3>
            <div className="contactUsForm">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label>
                    Interested in<span>*</span>
                  </label>
                  <select
                    {...register("interest", { required: true })}
                    className="form-select contactUsInput selectIntrest"
                    defaultValue={""}
                  >
                    <option disabled value="" pri-specialization="true">
                      Select your Interest
                    </option>
                    <option value="I am a doctor and want to get onboarded">
                      I am a doctor and want to get onboarded{" "}
                    </option>
                    <option value="I own a licensed retail pharmacy and want to get onboarded">
                      I own a licensed retail pharmacy and want to get onboarded{" "}
                    </option>
                    <option value="I am a qualified home healthcare service provider and want
                      to get onboarded">
                      I am a qualified home healthcare service provider and want
                      to get onboarded{" "}
                    </option>
                    <option value="I want to sell on HealthSy">I want to sell on HealthSy</option>
                    <option value="Career Related">Career Related</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.interest && (
                    <div className={`invalid-feedback d-block`}>
                      Please provide a Interest
                    </div>
                  )}
                  <label>
                    Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control contactUsInput"
                    {...register("name", {
                      required: true,
                      maxLength: 100,
                    })}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <div className={`invalid-feedback d-block`}>
                      Please provide a valid name
                    </div>
                  )}
                  <div>
                    <label>
                      Mobile Number<span>*</span>
                    </label>
                    {phnInput(otp_status)}
                    {otp_status === enum_otp_status.OTP_SENT && (
                      <div className={`col-12 col-md-6 mb-3 mt-3`}>
                        {/* <label className="form-label text-white">.</label> */}
                        <div className="row">
                          <div className="col-12 col-md-8 d-flex verifyOTP form-control contactUsInput contactMobile">
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
                              disabled={
                                otp1.concat(otp2, otp3, otp4).length != 4
                              }
                              type="button"
                              onClick={verify_otp}
                            >
                              {otp_status === enum_otp_status.OTP_VERIFIED &&
                                "Verified"}{" "}
                              {(otp_status === enum_otp_status.OTP_VERIFIED) ===
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
                  <label>
                    Email<span>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control contactUsInput"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address",
                      },
                    })}
                    placeholder="Enter your email"
                  />
                  {errors.email ? (
                    <div className={`invalid-feedback d-block`}>
                      Please provide a valid email
                    </div>
                  ) : emailExist ? (
                    <div className={`invalid-feedback d-block`}>
                      Email already registered
                    </div>
                  ) : (
                    ""
                  )}

                  <label>
                    City / Town<span>*</span>
                  </label>
                  <Location
                    control={control}
                    errors={errors}
                    register={register}
                    newLocation={newLocation}
                    setNewLocation={setNewLocation}
                    placeholder={"Location*"}
                    className="contactUsInput"
                  />
                  <textarea
                    className="form-control contactUsInput"
                    rows="3"
                    {...register("message", {})}
                    placeholder="Message"
                  ></textarea>
                  {errors.message && (
                    <div className={`invalid-feedback d-block`}>
                      Please provide a valid name
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
                    className="btn contactUsBtn"
                    style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {successModal && (
        <SuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          onHide={() => navigate('/')}
        />
      )}
    </>
  );
};

export default ContactUsForm;
