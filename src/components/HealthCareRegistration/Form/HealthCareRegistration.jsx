import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { states, years } from "../../Common";

import InputTextField from "../../Common/InputTextField";
import TermsPrivacy from "../../Common/TermsPrivacy";
import PhoneFormInput from "../../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../../DoctorRegistration/Partials/PhoneOtpStatuses";
import DashedBorderElement from "../../DoctorRegistration/Partials/DashedBorderElement";
import LanguageField from "../../Common/LanguageField";
import Location from "../../Common/location";
import SuccessModal from "../../Common/successModel";
import OTP from "../../Common/OTP";

const healthCarePlatform = [
  "Yes",
  "No"
]

const HealthCareRegistrationLevel1 = ({
  register,
  errors,
  getValues,
  trigger,
  setError,
  setLevel,
  clearErrors,
  enum_otp_status = {},
  setParentOTPVerified,
  otp_status,
  setOTPStatus,
}) => {

  const [emailerror, setEmailError] = useState(false);

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
        className="healthsynergyFormInput"
      >
        <PhoneOtpStatuses
          otpStatus={otpStatus}
          enumOtpStatus={enum_otp_status}
          getValues={getValues}
          setOTPStatus={setOTPStatus}
          otpAPI="healthcare-registration"
        />

        {errors.mobile && (
          <div
            className={`invalid-feedback d-block position-absolute`}
            style={{ bottom: "-28px", left: "0px" }}
          >
            Please provide a valid mobile number
          </div>
        )}
      </PhoneFormInput>
    );
  };

  const onClickNext = async () => {
    let [valid_name, valid_email, valid_mobile] = [
      await trigger("name"),
      await trigger("email"),
      await trigger("mobile"),
    ];
    !valid_name && setError("name", {}, { shouldFocus: true });
    !valid_email && setError("email", {}, { shouldFocus: true });
    !valid_mobile && setError("mobile", {}, { shouldFocus: true });
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}healthcare-registration/verify-email`,
        { email: getValues()?.email }
      )
      .then((response) => {
        if (
          response.data === "Email was exists already"
        ) {
          setEmailError(true);
          valid_email = false;
        } else {
          setEmailError(false);
        }
      });
    valid_name && valid_email && valid_mobile && setLevel(2);
  }

  return (
    <div id="doctoregistration-level-one">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Name of the HHSP <span className="star">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="form-control healthsynergyFormInput"
            placeholder="Enter your name"
          />
          {errors.name && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid name
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
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
            className="form-control healthsynergyFormInput"
            placeholder="Enter your email id"
            onChange={() => (setEmailError(false), clearErrors("email"))}
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

        <div className="col-12 col-md-6 mb-40 mobileNoFieldWrapper">
          <label className="form-label">
            Mobile Number <span className="star">*</span>
          </label>
          {phnInput(otp_status)}
        </div>

        <OTP
          otpAPI="healthcare-registration"
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
  );
};

const HealthCareRegistrationLevel2 = ({
  register,
  errors,
  getValues,
  trigger,
  setError,
  setLevel,
  watch,
  setOTPStatus,
  enum_otp_status = {},
}) => {
  watch()

  const [gender, setGender] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    getGender();
    getService();
  }, []);

  const getGender = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}gender/list`).then((res) => {
      setGender(res.data.rows);
    });
  };

  const getService = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}service-category/list`)
      .then((res) => {
        setService(res.data.rows);
      });
  };

  return (
    <div id="doctorregistration-level-two">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <InputTextField
            labelName="Degree"
            name="degree"
            className="healthsynergyFormInput"
            register={register}
            errors={errors}
            errorText="Please provide a degree"
            placeholder="Type your degree"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Other Certified Courses
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Type your other certified courses"
            {...register("other_certified_courses", {
            })}
          />
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Age <span className="star">*</span>
          </label>

          <input
            className="form-control healthsynergyFormInput"
            type="number"
            placeholder="Enter your age"
            {...register("age", { required: true, min: 0 })}
          />

          {errors.age && (
            <div className={`invalid-feedback d-block`}>
              Please provide Age
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Gender <span className="star">*</span>
          </label>{" "}
          <br />
          {gender.map((el, inx) => {
            if (el.active === true) {
              return (
                <div className="form-check form-check-inline" key={inx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("gender", { required: true })}
                    value={el.type}
                  />
                  <label className="form-check-label">{el.type}</label>
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
            Service Category <span className="star">*</span>
          </label>
          <select
            {...register("service_category", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled>
              Select your Category
            </option>
            {service.map((el, inx) => {
              if (el.active === true) {
                return <option value={el.type} key={inx}>{el.type}</option>;
              }
            })}
          </select>

          {errors.service_category && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Service Category
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Experience (Year of Commencement) <span className="star">*</span>
          </label>
          <select
            {...register("experience", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your year of commencement
            </option>
            {years.map((option, inx) => <option key={inx} value={option}>{option}</option>)}
          </select>

          {errors.experience && (
            <div className={`invalid-feedback d-block`}>
              Please provide a year of registration
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            License Number / Council Number /  Registration Number
            <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Type here"
            {...register("license_number", { required: true }
            )}
          />
          {errors.license_number && (
            <div className={`invalid-feedback d-block`}>
              Please provide License Number / Council Number /  Registration Number *
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Memberships / Associations Details
            {/* <span className="star">*</span> */}
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Type here"
            {...register("memberships_or_associations", {
            })}
          />
        </div>

        <div className="col-12 col-md-12 mb-40">
          <label className="form-label">
            About Yourself
          </label>
          <textarea
            {...register("about")}
            className="form-control textAreaControl m-0"
            placeholder="Type about yourself"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-secondary w-100 btn-height fs20m16fwb br-12"
            onClick={(e) => (setOTPStatus(enum_otp_status.OTP_VERIFIED), setLevel(1))}
            value="Back"
          >Go Back</button>
        </div>
        <div className="col-6">
          <button
            type="button"
            className={`btn border-0 text-white w-100 btn-height fs20m16fwb br-12 mb-40`}
            onClick={async (e) => {
              if ((await trigger("degree")) === false)
                setError("degree", {}, { shouldFocus: true });
              if ((await trigger("age")) === false)
                setError("age", {}, { shouldFocus: true });
              if ((await trigger("gender")) === false)
                setError("gender", {}, { shouldFocus: true });
              if ((await trigger("service_category")) === false)
                setError("service_category", {}, { shouldFocus: true });
              if ((await trigger("experience")) === false)
                setError("experience", {}, { shouldFocus: true });
              if ((await trigger("license_number")) === false)
                setError("license_number", {}, { shouldFocus: true });
              else {
                Object.keys(errors).length === 0 && setLevel(3);
              }
            }
            }
            style={{
              background:
                !getValues("degree") ||
                  !getValues("age") ||
                  !getValues("gender") ||
                  !getValues("service_category") ||
                  !getValues("experience") ||
                  !getValues("license_number")
                  ? "#D6D6D6" : "#CB1B5B"
            }}
            disabled={
              !getValues("degree") ||
              !getValues("age") ||
              !getValues("gender") ||
              !getValues("service_category") ||
              !getValues("experience") ||
              !getValues("license_number")
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const HealthCareRegistrationLevel3 = ({
  register,
  errors,
  isValid,
  getValues,
  trigger,
  setLevel,
  control,
  newLocation,
  setNewLocation,
  setValue,
}) => {

  useEffect(() => {
    getLangauges();
    getInClinic();
    register('languages_known', { required: true, })
  }, []);

  const [language, setLanguage] = useState([]);
  const [inclinic, setInclinic] = useState([]);

  const getLangauges = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}languages/list`).then((res) => {
      setLanguage(res.data.rows);
    });
  };

  const getInClinic = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}in-clinic-fee/list`)
      .then((res) => {
        setInclinic(res.data.rows);
      });
  };

  return (
    <div id="doctorregistration-level-two" className="mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Fee <span className="star">*</span>
          </label>
          <select
            {...register("fee", {
              required: true,
            })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Choose your fee
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
          {errors.fee && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Fee
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Are your currently available on other home healthcare platforms? {" "}
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("other_home_healthcare_platforms", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled>
              Select your Experience
            </option>
            {healthCarePlatform.map((option, idx) => {
              return (
                <option key={idx} value={option}>{option}</option>
              )
            })}
          </select>
          {errors.other_home_healthcare_platforms && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Your Current Organisation Name(hospital / clinic name)
            <span className="star">*</span>
          </label>{" "}
          <br />
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Type here"
            {...register("establishment", { required: true })}
          />
        </div>

        <LanguageField
          errors={errors}
          language={language}
          register={register}
          setValue={setValue}
          trigger={trigger}
          getValues={getValues}
          labelTxt="Language"
          placeholder="Select known languages"
          arrowPosition="doctorLangArrow"
          multiSelectClassName="healthsynergyFormInput"
        />

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            State <span className="star">*</span>
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
          <label className="form-label">
            City <span className="star">*</span>
          </label>
          <Location
            control={control}
            errors={errors}
            register={register}
            newLocation={newLocation}
            setNewLocation={setNewLocation}
            registerContent="city"
            placeholder="Enter your city"
            className="healthsynergyFormInput"
          />
        </div>

        <div className="col-12 col-md-12 mb-40">
          <label className="form-label">
            Address
            <span className="star">*</span>
          </label>
          <textarea
            className="form-control textAreaControl m-0"
            placeholder=""
            {...register("address", {
              required: true
            })}
          />
          {errors.address && (
            <div className={`invalid-feedback d-block`}>
              Please provide a address
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Location <span className="star">*</span>
          </label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="form-control healthsynergyFormInput"
            placeholder="Enter your location"
          />
          {errors.location && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid Location
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Pincode <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your pincode"
            {...register("pincode", {
              required: true,
              // min: 110000,
              pattern: /[0-9]{6}/,
            })}
            // onChange={(e) => setFormSubmit(true)}
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

      <TermsPrivacy />

      <div className="row mb-4">
        <div className="col-6 mb-40">
          <input
            type="button"
            className="btn btn-secondary w-100 btn-height fs20m16fwb"
            onClick={(e) => setLevel(2)}
            value="Go Back"
          />
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
    </div >
  )
}

const HealthCareRegistration = () => {

  const enum_otp_status = {
    SEND_OTP: "Send-OTP",
    OTP_SENT: "OTP-Sent",
    OTP_VERIFIED: "OTP-Verified",
  };
  const [parent_otp_verified, setParentOTPVerified] = useState(false);

  const [otp_status, setOTPStatus] = useState(
    parent_otp_verified === false ? undefined : enum_otp_status.OTP_VERIFIED
  );

  const [doctorbanner, setDoctorBanner] = useState("");
  const navigate = useRouter().push;

  useEffect(() => {
    getBannerImageData();
  }, []);

  const getBannerImageData = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}banner-images/list`)
      .then((res) => {
        setDoctorBanner(res.data.rows[0].health_Care_Form_Banner);
      });
  };

  const {
    register,
    getValues,
    setError,
    trigger,
    control,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    setValue,
    watch,
  } = useForm();
  const [level, setLevel] = useState(1);
  const [successModal, setSuccessModal] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const onSubmit = async (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    fields.languages_known = fields.languages_known?.length && fields.languages_known?.map((data) => data?.value)
    if (!newLocation) {
      setValue("city", "", { shouldFocus: true });
      trigger()
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}healthcare-registration/create`,
          fields
        )
        .then((response) => {
          if (response.data?._id) {
            const adId = response.data._id;
            navigate({
              pathname: '/for-home-healthcare-service-providers/thank-you',
              query: { id: adId }
            },
              `/for-home-healthcare-service-providers/thank-you`
            );
          } else {
            alert("Some error");
          }
        })
        .catch((err) => {
          console.error(err);
          alert(err.response?.data?.message);
        });
    }
  };

  return (
    <div className="healthcareregistration1-container">
      {/* <Header showMenu="false" /> */}
      <div className="healthcareregistration1-box">
        <div className="healthcareregistration1-banner">
          {doctorbanner &&
            <img
              // src={banner}
              src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + doctorbanner}
              alt="doctorbanner"
            />
          }
        </div>
        <div className="healthcareregistration1-form">
          <div className={`doctorregistration1-form-banner rounded-top d-flex justify-content-center`}>
            <div className="d-flex align-items-center bbottom mob-bbottom justify-content-center">
              <div className={`redround rounded-circle text-center text-white levelRound`}>1</div>
              <DashedBorderElement isActive={level >= 2 ? true : false} />
              <div className={`rounded-circle text-center text-white levelRound ${level < 2 ? "grayround" : "redround"}`}>2</div>
              <DashedBorderElement isActive={level === 3 ? true : false} />
              <div className={`rounded-circle text-center text-white levelRound ${level < 3 ? "grayround" : "redround"}`}>3</div>
            </div>
          </div>

          <div className="doctorregistration1-form-container">
            <div className="doctorregistration1-form-box">
              {level === 1 && (
                <>
                  <h4 className="mt-4 mb-4 fw-bold">
                    Home Healthcare Service Providers Registration Form{" "}
                  </h4>
                  <h4 className="mb-5 label-msg fw-normal">
                    Please fill the details below :
                  </h4>
                </>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="registration-form"
              >
                {level === 1 && (
                  <HealthCareRegistrationLevel1
                    register={register}
                    errors={errors}
                    isValid={isValid}
                    clearErrors={clearErrors}
                    getValues={getValues}
                    trigger={trigger}
                    setError={setError}
                    setLevel={setLevel}
                    enum_otp_status={enum_otp_status}
                    setParentOTPVerified={setParentOTPVerified}
                    otp_status={otp_status}
                    setOTPStatus={setOTPStatus}
                  />
                )}
                {level === 2 && (
                  <HealthCareRegistrationLevel2
                    register={register}
                    errors={errors}
                    isValid={isValid}
                    getValues={getValues}
                    trigger={trigger}
                    setError={setError}
                    setLevel={setLevel}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    setOTPStatus={setOTPStatus}
                    enum_otp_status={enum_otp_status}
                  />
                )}
                {level === 3 && (
                  <HealthCareRegistrationLevel3
                    register={register}
                    errors={errors}
                    isValid={isValid}
                    getValues={getValues}
                    trigger={trigger}
                    setError={setError}
                    setLevel={setLevel}
                    control={control}
                    newLocation={newLocation}
                    setNewLocation={setNewLocation}
                    setValue={setValue}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {successModal && <SuccessModal successModal={successModal} setSuccessModal={setSuccessModal} onHide={() => navigate('/')} />}
    </div>
  );
};

export default HealthCareRegistration;
