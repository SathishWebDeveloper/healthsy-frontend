import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Image from "next/image";

import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import Location from "./location";
import { useEffect } from "react";

const closeIcon = "/assets/home-sidebar-close.svg";

const CtaBannerModel = ({
  successModal,
  setSuccessModal,
  specialisation = false,
  setSuccessPopupModal,
  uniqueField = "special_category",
  category
}) => {
  const [newLocation, setNewLocation] = useState("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp_status, setOTPStatus] = useState(undefined);
  const [otp_timeout, setOTPTimeout] = useState(0);
  const [rerender, setReRender] = useState(false);
  const [primaryspl, setPrimaryspl] = useState([]);
  const [service, setService] = useState([]);

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
    control,
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    if (uniqueField === "service_category") {
      axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_URL}service-category/list`)
        .then((res) => {
          setService(res.data.rows);
        });
    } else if (specialisation) {
      axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_URL}primary-specialisation/list`, {
          noLimit: true,
        })
        .then((res) => {
          setPrimaryspl(res.data.rows);
        });
    }
  }, [])

  const [otpdisable, setOtpDisable] = useState(false);

  const enum_otp_status = {
    SEND_OTP: "Send-OTP",
    OTP_SENT: "OTP-Sent",
    OTP_VERIFIED: "OTP-Verified",
  };

  const send_otp = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}cta-form/send-otp`,
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
        `${process.env.NEXT_PUBLIC_APP_API_URL}cta-form/resend-otp`,
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

  const UniqueFields = () => {
    return (
      <>
        {specialisation ? (
          <>
            <select
              {...register(uniqueField, { required: true })}
              className="form-control ctaFormInput"
              defaultValue={""}
            >
              <option value="" disabled pri-specialization="true">
                Select your specialisation*
              </option>
              {primaryspl.map((option, inx) => {
                if (option.active === true) {
                  return (
                    <option key={inx} value={option.type}>
                      {option.type}
                    </option>
                  );
                }
                return null; // Add a null return for non-matching options
              })}
            </select>
          </>
        ) : uniqueField === "pharmacy_name" ? (
          <>
            <input
              type="text"
              className="form-control ctaFormInput"
              {...register(uniqueField, { required: true })}
              placeholder="Type your pharmacy name*"
            />
          </>
        ) : (
          <>
            <select
              {...register(uniqueField, { required: true })}
              className="form-control ctaFormInput"
              defaultValue={""}
            >
              <option value="" disabled>
                Select your Category
              </option>
              {service.map((el, inx) => {
                if (el.active === true) {
                  return (
                    <option value={el.type} key={inx}>
                      {el.type}
                    </option>
                  );
                }
                return null; // Add a null return for non-matching options
              })}
            </select>
          </>
        )}
      </>
    );
  };

  const phnInput = (otpStatus) => {
    return (
      <PhoneFormInput
        otpStatus={otpStatus}
        inputAttrs={{ ...register("mobile", { required: true }) }}
        isDisabled={otpStatus === enum_otp_status.OTP_VERIFIED}
        onInputNumber={setOtpStatus}
        placeholder={"Contact number*"}
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

  const onSubmit = (fields) => {
    fields.category = category
    if (!newLocation) {
      setValue("location", "");
      trigger()
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}cta-form/create`,
          fields
        )
        .then((response) => {
          reset(),
            setNewLocation(""),
            setOTPStatus(undefined)
          setSuccessPopupModal(true);
          setSuccessModal(false);
        })
        .catch((err) => {
          if (err.response.data?.code === 11000) {
            setEmailError(true)
          }
        });
      setOtp1("")
      setOtp2("")
      setOtp3("")
      setOtp4("")
    }
  };

  return (
    <>
      <Modal
        show={successModal}
        dialogClassName=""
        className="relationShipModalContainer"
        centered
        onHide={() => setSuccessModal(false)}
      >
        <div className="ctaBannerModelSection">
          <div className="border-0">
            <div className="d-flex justify-content-between align-items-baseline ctaHeadingSection">
              <h2 className="ctaHeading">
                Connect with your Relationship Buddy
              </h2>
              <Image
                src={closeIcon}
                width={21}
                height={21}
                alt="Close Icon"
                className="ctaCloseIcon"
                onClick={() => setSuccessModal(false)}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="form-control ctaFormInput"
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
                placeholder="Type your name*"
              />
              {errors.name && (
                <div className={`invalid-feedback d-block`}>
                  Please provide a valid name
                </div>
              )}
              <UniqueFields />
              {errors[uniqueField] && (
                <div className={`invalid-feedback d-block`}>
                  Please provide a {specialisation
                    ? "specialisation"
                    : uniqueField === "pharmacy_name" ? "pharmacy name*" : "service category"}
                </div>
              )}
              <Location
                control={control}
                errors={errors}
                register={register}
                newLocation={newLocation}
                setNewLocation={setNewLocation}
                placeholder={"Location*"}
                className="ctaFormInput"
              />
              <input
                type="text"
                className="form-control ctaFormInput"
                {...register("pincode", {
                  required: true,
                  // min: 110000,
                  pattern: /[0-9]{6}/,
                })}
                placeholder="Pincode*"
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
              {phnInput(otp_status)}
              {otp_status === enum_otp_status.OTP_SENT && (
                <div className={`col-12 col-md-6 mb-3`}>
                  <label className="form-label text-white">.</label>
                  <div className="row">
                    <div className="col-12 col-md-8 d-flex verifyOTP mb-4">
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
              <button
                type="submit"
                className="ctaBtn mt-4"
                // disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
                style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
              >
                Request Callback
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CtaBannerModel;
