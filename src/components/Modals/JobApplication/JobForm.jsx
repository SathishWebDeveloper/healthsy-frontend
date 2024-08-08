import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import uploadIcon_mob from "../../../assets/upload_icon_mobile.svg";
import PhoneFormInput from "../../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../../DoctorRegistration/Partials/PhoneOtpStatuses";
const jobtitle = "/assets/job-title-icon.svg";
const location = "/assets/location.svg";
const jobtype = "/assets/job-type-icon.svg";
const uploadIcon = "/assets/upload-icon.svg";
const addIcon = "/assets/add-icon.svg";
const successgif = "/assets/success-icon.gif";
const uploadIcon_mob = "/assets/upload_icon_mobile.svg";


// import "./jobform.css";
// import closeIcon from "../../../assets/close-icon.svg";
// import OtpForm, { enum_otp_status } from "../../Otp/Otp";
// import indianflag from "../../../assets/indianflag.svg";

const JobForm = ({ data }) => {
  const [, setResumeData] = useState(null);
  const [gender, setGender] = useState([]);
  const [, setFile] = useState(null);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    getGender();
  }, []);

  const getGender = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}gender/list`).then((res) => {
      setGender(res.data.rows);
    });
  };

  const [file_input_name, setFileInputName] = useState(null);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const {
    register,
    getValues,
    // setError,
    // trigger,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();
  const [successModal, setSuccessModal] = useState(false);
  const [parent_otp_verified, setParentOTPVerified] = useState(false);

  // useEffect(() => {
  //   document.title =
  //     "Register your interest - Thousands of patients are looking for an experienced doctor like you. Get on-board HealthSy and provide your services to thousands more";
  // }, []);

  const [email, setemail] = useState(null);
  const [emailcheck, setEmailCheck] = useState(null);

  const [emailerror, setEmailError] = useState(false);
  const emailValidator = (email) => {
    const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailValidate.test(email);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = async (e) => {
    setFile(e.target?.files[0]);
    const res = await getBase64(e.target.files[0])
      .then((result) => {
        setBase64(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    /*
      If you need array of hyperlink values, for example: ['https://google.com', 'https://apple.com']
      Do this -> Object.values(fields.hyperLink).map(i => Object.values(i)[0])
    */

    fields["myresume"] = fields.myresume[0];
    const updatedFields = { ...fields, location: data.job_Location, jobPosition: data.designation }

    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}career/create`, updatedFields, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data?._id) {
          setSuccessModal(true);
        } else {
          alert("Some error");
        }
      })
      .catch((err) => {
        setemail(fields.email);
      });
  };

  const enum_otp_status = {
    SEND_OTP: "Send-OTP",
    OTP_SENT: "OTP-Sent",
    OTP_VERIFIED: "OTP-Verified",
  };

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp_status, setOTPStatus] = useState(
    parent_otp_verified === false ? undefined : enum_otp_status.OTP_VERIFIED
  );
  const [otp_timeout, setOTPTimeout] = useState(0);
  const [rerender, setReRender] = useState(false);
  const [otpdisable, setOtpDisable] = useState(false);

  const send_otp = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}career/send-otp`, {
        mobile: getValues("mobile"),
      })
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
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}career/resend-otp`, {
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
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}career/verify-otp`, {
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

  // Hyperlinks
  const [hyperLinks, setHyperLinks] = useState([
    {
      [`hyperLink.${new Date().toISOString()}`]: "",
      id: new Date().toISOString(),
    },
  ]);

  const addHyperLink = () => {
    setHyperLinks([
      ...hyperLinks,
      {
        [`hyperLink.${new Date().toISOString()}`]: "",
        id: new Date().toISOString(),
      },
    ]);
  };

  const onUpdateHyperLink = (evt, id) => {
    const list = [...hyperLinks];
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return false;

    list[index][evt.target.name] = evt.target.value;
    setHyperLinks(list);
  };

  const removeHyperLink = (id) => {
    const list = [...hyperLinks];
    if (list.length === 1) return false;

    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return false;

    list.splice(index, 1);
    setHyperLinks(list);
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
          onClick={() => {
            window.location.reload();
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-box modal-lg br-8">
            <div className="modal-content modal-content-sm">
              <div className="text-center modal-body p-90">
                <img src={successgif} alt="successgif" className="success-gif-pict" />
                {/* <Link to="/" className="py-2 my-2 btn btn-primary">Go to Home</Link> */}
                <p className="text-center get-notified-sucess-tittle">
                  Submitted Successfully{" "}
                </p>
                <p>Thank You !</p>
                <p className="get-notified-sucess-content">
                  You have successfully submitted your details and applied for
                  the position. Now sit back and relax while we revert back to
                  you in sometime !
                </p>
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
        design={true}
        otpdisable={otpdisable}
      >
        <PhoneOtpStatuses
          otpStatus={otpStatus}
          enumOtpStatus={enum_otp_status}
          otpTimeout={otp_timeout}
          onSendOtp={send_otp}
          onResendOtp={resend_otp}
          design={true}
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

  const handleFileSelection = (evt) => {
    const file = evt.target.files[0];
    setResumeData({ file, fileName: file.name });
  };

  return (
    <>
      {successModal === false && (
        <div
          className="modal fade jobapply"
          id="jobapply"
          tabIndex="-1"
          aria-labelledby="jobApplyModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-box">
            <div className="modal-content">
              <form
                className="career-job-apply-form"
                action=""
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="modal-body">
                  <div className="jobapply-body">
                    <div id="jobApplyModal" className="title">
                      <strong>Position Title, Job Location and Job Type</strong>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      {" "}
                    </button>
                  </div>
                  <div className="row">
                    <div className="job-title">
                      <img src={jobtitle} alt="jobtitle" />{" "}
                      <span>{data !== "" ? data.designation : ""}</span>
                    </div>
                    <div className="job-title">
                      <img src={location} alt="location" />{" "}
                      <span>{data != "" ? data.job_Location : ""}</span>
                    </div>
                    <div className="job-title">
                      <img src={jobtype} alt="jobtype" />{" "}
                      <span>{data != "" ? data.type_of_job : ""}</span>
                    </div>
                  </div>
                  <div className="job-form-section">
                    <div className="form-fields">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="mb-32 col-md-6">
                            <label>
                              Name <span className="color-mandatory">*</span>
                            </label>
                            <div>
                              <input
                                type="text"
                                {...register("name", { required: true })}
                                // name="name"
                                placeholder="Enter your name"
                                className="form-control"
                                maxLength="30"
                              />
                              {errors.name && (
                                <div className={`invalid-feedback d-block`}>
                                  Please provide a valid name
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mb-32 col-md-6">
                            <label>
                              Email <span className="color-mandatory">*</span>
                            </label>
                            <div>
                              <input
                                type="text"
                                {...register("email", {
                                  required: true,
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid Email Address",
                                  },
                                })}
                                placeholder="Enter your email"
                                className="form-control"
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
                              {/* {email === email (
                                    <div className={`invalid-feedback d-block`}>
                                    Email is already Registered
                                </div>
                                )} */}
                            </div>
                          </div>
                          {/* <div className="mb-32 col-md-12">
                                <div className="col-md-6">
                                <label>
                                    Mobile Number{" "}
                                    <span className="color-mandatory">*</span>
                                </label>
                                <div>
                                    <input
                                    type="text"
                                    className="mobile-input"
                                    name="mobile"
                                    />
                                    <span className="flagicon">
                                    // <img src={indianflag} alt="" />
                                    91
                                    </span>
                                    // <span className="getcode">Get Code</span>
                                </div>
                                </div>
                            </div> */}
                          <div className="mb-4 mb-24 row">
                            <div className="col-6">
                              <label className="form-label">
                                Mobile Number <span className="star">*</span>
                              </label>
                              {phnInput(otp_status)}
                            </div>

                            {otp_status === enum_otp_status.OTP_SENT && (
                              <div className={`col-12 col-md-6 mb-3`}>
                                <label className="text-white form-label">
                                  .
                                </label>
                                <div className="row">
                                  <div className="col-12 col-md-11 d-flex align-center">
                                    <input
                                      type="number"
                                      {...register("otp1", { required: true })}
                                      id="doctor-registration-otp-1"
                                      min="0"
                                      max="9"
                                      minLength="1"
                                      maxLength="1"
                                      className="text-center form-control otp-input"
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
                                      className="text-center form-control otp-input"
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
                                      className="text-center form-control otp-input"
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
                                      className="text-center form-control otp-input"
                                      value={otp4}
                                      onChange={(e) => {
                                        setOtp4(e.target.value.substring(0, 1));
                                      }}
                                    />
                                    <button
                                      className={`btn py-2 px-4 ${otp_status ===
                                        enum_otp_status.OTP_VERIFIED
                                        ? "bg-faded-green"
                                        : otp1.concat(otp2, otp3, otp4)
                                          .length === 4
                                          ? "get-code"
                                          : ""
                                        } rounded-4 border-0`}
                                      disabled={
                                        otp1.concat(otp2, otp3, otp4).length !=
                                        4
                                      }
                                      type="button"
                                      onClick={verify_otp}
                                    >
                                      {otp_status ===
                                        enum_otp_status.OTP_VERIFIED &&
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

                          <div className="mb-32 col-md-6">
                            <label>
                              Gender <span className="color-mandatory">*</span>
                            </label>
                            <div className="input-radio-btn">
                              {gender.map((el, index) => {
                                if (el.active === true) {
                                  return (
                                    <Fragment key={index}>
                                      <input
                                        type="radio"
                                        value={el.type}
                                        key={index + "-" + el.type}
                                        name="gender"
                                        className="job-form-radio-mob"
                                        {...register("gender", {
                                          required: true,
                                        })}
                                      />{" "}
                                      <span>{el.type} </span>
                                    </Fragment>
                                  );
                                }
                              })}
                            </div>
                            {/* <div className="input-radio-btn">
                                                            <input
                                                                type="radio"
                                                                value="Male"
                                                                name="gender"
                                                                {...register("gender", { required: true })}
                                                            />{" "}
                                                            <span>Male</span>
                                                            <input
                                                                type="radio"
                                                                value="Female"
                                                                name="gender"
                                                                {...register("gender", { required: true })}
                                                            />{" "}
                                                            <span>Female</span>
                                                            <input
                                                                type="radio"
                                                                value="Other"
                                                                name="gender"
                                                                {...register("gender", { required: true })}
                                                            />{" "}
                                                            <span>Others</span>
                                                        </div> */}
                            {errors.gender && (
                              <div className={`invalid-feedback d-block`}>
                                Please Provide a Gender
                              </div>
                            )}
                          </div>
                          <div className="mb-32 col-md-6">
                            <label>
                              Age<span className="color-mandatory">*</span>
                            </label>
                            <div>
                              <input
                                type="text"
                                {...register("age", { required: true })}
                                onWheel={(e) => e.target.blur()}
                                name="age"
                                placeholder=""
                                className="form-control"
                                maxLength="3"
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors.age && (
                                <div className={`invalid-feedback d-block`}>
                                  Please provide a Age
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mb-32 col-md-12">
                            <div className="d-flex justify-content-between">
                              <label>
                                Hyperlinks{" "}
                                <span className="grey-title">
                                  (Portfolios / Behance / Dribbble / Github /
                                  Website / LinkedIn / Blogs)
                                </span>{" "}
                                <span className="color-mandatory">*</span>
                              </label>{" "}
                              <span
                                onClick={() => addHyperLink()}
                                className="plus-icon text-end"
                                style={{
                                  marginLeft: "0px",
                                  cursor: "pointer",
                                }}
                              >
                                <img src={addIcon} alt={"addIcon"} className='mob-plus-icon'></img>
                              </span>
                            </div>
                            <div
                              style={{
                                marginTop: "20px",
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "24px",
                              }}
                            >
                              {hyperLinks.map((item) => (
                                <div
                                  key={`input-hyperLink-${item.id}`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    columnGap: "24px",
                                  }}
                                >
                                  <div
                                    style={{ flexGrow: "1", flexShrink: "0" }}
                                  >
                                    <input
                                      type="text"
                                      name="value"
                                      style={{ width: "100%" }}
                                      {...register(`hyperLink.${item.id}`, {
                                        required: true,
                                      })}
                                      defaultValue={item.value || null}
                                      onInput={(evt) =>
                                        onUpdateHyperLink(evt, item.id)
                                      }
                                      className="form-control"
                                      autoFocus
                                    />
                                    {errors.hyperLink && (
                                      <div
                                        className={`invalid-feedback d-block`}
                                      >
                                        Please provide a Hyper Link
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      columnGap: "12px",
                                    }}
                                  >
                                    {hyperLinks.length > 1 ? (
                                      <span
                                        onClick={() => removeHyperLink(item.id)}
                                        className="plus-icon"
                                        style={{
                                          marginLeft: "0px",
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <span
                                          style={{
                                            height: "2px",
                                            width: "50%",
                                            backgroundColor: "#fff",
                                          }}
                                        ></span>
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mb-32 col-md-6">
                            <label>
                              Educational Qualification / Institution Attented{" "}
                              <span className="color-mandatory">*</span>
                            </label>
                            <div>
                              <input
                                type="text"
                                {...register("educationQualification", {
                                  required: true,
                                })}
                                className="form-control"
                                autoFocus
                              //  name="education"
                              />
                              {errors.educationQualification && (
                                <div className={`invalid-feedback d-block`}>
                                  Please provide a Education Qualification
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-32 col-md-6">
                            <div className="upload-btn">
                              <label>
                                Upload Resume{" "}
                                <span className="color-mandatory">*</span>
                              </label>
                              <div>
                                <button className="upload-resume-btn">
                                  {" "}
                                  <img
                                    src={
                                      isDesktop ? uploadIcon : uploadIcon_mob
                                    }
                                    alt="uploadIcon"
                                  />
                                </button>
                                <input
                                  {...register("myresume", {
                                    required: true,
                                  })}
                                  className="upload-resume-btn"
                                  onChange={(e) => {
                                    handleFileInputChange(e);
                                    if (e.target.files.length === 0) {
                                      setFileInputName("");
                                      return;
                                    }

                                    setFileInputName(e.target.files[0].name);
                                  }}
                                  type="file"
                                  name="myresume"
                                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                                {file_input_name ? (
                                  <span className="d-block grey-title text-center resume-title">
                                    {file_input_name}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            {!isDesktop ? (
                              <button
                                className="mob-upload-btn"
                                disabled={true}
                              >
                                Upload
                              </button>
                            ) : (
                              ""
                            )}
                            {errors.myresume && (
                              <div className={`invalid-feedback d-block`}>
                                Please provide a Resume ( PDF, doc and docx
                                formats only)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className={`jobform-submit-btn btn${otp_status !== enum_otp_status.OTP_VERIFIED
                        ? "bg-light-gray"
                        : "bg-primary"
                        } py-3 fs-4 text-white w-55 mb-4`}
                      //  style={{background:( errors.name || errors.email || errors.gender  ||  errors.age ||  errors.email ||  errors.hyperLink || errors.educationQualification  || errors.myresume ||
                      //   otp_status !== enum_otp_status.OTP_VERIFIED)?'#98969D': '#CB1B5B'}}
                      style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
                      disabled={
                        otp_status !== enum_otp_status.OTP_VERIFIED
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {successModal && <SuccessModal />}
    </>
  );
};

export default JobForm;
