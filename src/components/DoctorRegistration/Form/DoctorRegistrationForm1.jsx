import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { medicalCouncilOptions, states, years } from "../../Common";
import InputTextField from "../../Common/InputTextField";
import LanguageField from "../../Common/LanguageField";
import Location from "../../Common/location";
import MultipleAdd from "../../Common/multipleAdd";
import OTP from "../../Common/OTP";
import SelectField from "../../Common/selectField";
import TermsPrivacy from "../../Common/TermsPrivacy";
import DashedBorderElement from "../Partials/DashedBorderElement";
import PhoneFormInput from "../Partials/PhoneFormInput";
import PhoneOtpStatuses from "../Partials/PhoneOtpStatuses";

const addImage = "/assets/add_img.svg"
const minusIcon = "/assets/minus_icon.svg"

const modes = [
  "Online Only",
  "In-Clinic Only",
  "Both"
]

const establishmentDetails = [
  "I am an establishment owner only",
  "I am both a doctor and an establishment owner",
  "I am a doctor only"
]

const CouncilType = [
  "Allopathy",
  "Dentistry",
  "Ayurveda",
  "Homeopathy",
]

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
  enum_otp_status = {},
  setParentOTPVerified,
  otp_status,
  setOTPStatus,
}) => {

  useEffect(() => {
    emailerror && setEmailError(false)
    errors.email && clearErrors("email")
  }, [getValues("email")])

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
        `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-registration/verify-email`,
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
  return (
    <div id="doctoregistration-level-one">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Name of the Doctor <span className="star">*</span>
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
            Email ID <span className="star">*</span>
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
            Mobile Number <span className="star">*</span>
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
  setValue,
  setError,
  setLevel,
  getValues,
  gender,
  watch,
  primaryspl,
  pgDegree,
  degree,
  pgEnable,
  setPGEnable,
  setOTPStatus,
  organisation,
  setOrganisation,
  enum_otp_status = {},
}) => {
  watch()
  const selectedCouncilType = watch('council_type');

  useEffect(() => {
    if (!selectedCouncilType || (!medicalCouncilOptions[selectedCouncilType].includes(getValues()?.medical_council))) {
      setValue("medical_council", "")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCouncilType]);

  return (
    <div id="doctorregistration-level-two">
      <div className="row">
        <div className="col-12  mb-1">
          <div className="d-flex justify-content-between degreeFieldLabel">
            <label className="form-label">
              UG Degree & Education{" "}
              <span className="star">*</span>
            </label>
            <div className="cursor-pointer" onClick={() => setPGEnable(true)}>
              <Image src={addImage} width={16} height={16} alt={addImage} className="addDoctorPlusImg me-2" />
              <span className="addDoctorDegree fs16fw600">Add More</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-40">
          <select
            {...register("degree", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your UG degree
            </option>
            {degree.map((data, idx) => {
              return (
                <option key={idx}>
                  {data?.ug_degree}
                </option>
              );
            })}
          </select>
          {errors.degree && (
            <div className={`invalid-feedback d-block`}>
              Please provide a UG degree
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your UG education"
            {...register("education", { required: true })}
          />
          {errors.education && (
            <div className={`invalid-feedback d-block`}>
              Please provide a UG Education
            </div>
          )}
        </div>
        {pgEnable ? <>
          <div className="col-12  mb-1">
            <div className="d-flex justify-content-between degreeFieldLabel">
              <label className="form-label">
                PG Degree & Education{" "}
                <span className="star">*</span>
              </label>
              <div className="cursor-pointer" onClick={() => setPGEnable(false)}>
                <Image src={minusIcon} width={16} height={16} alt={"minus"} className=" me-2" />
                <span className="addDoctorDegree fs16fw600">Delete</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-40">
            <select
              {...register("pg_degree", { required: true })}
              className="form-control healthsynergyFormInput"
              defaultValue={""}
            >
              <option value="" disabled pri-specialization="true">
                Select your PG degree
              </option>
              {pgDegree.map((data, idx) => {
                return (
                  <option key={idx}>
                    {data?.pg_degree}
                  </option>
                );
              })}
            </select>
            {errors?.pg_degree && (
              <div className={`invalid-feedback d-block`}>
                Please provide a PG degree
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 mb-40">
            <input
              className="form-control healthsynergyFormInput"
              type="text"
              placeholder="Enter your PG education"
              {...register("pg_education", { required: true })}
            />
            {errors.pg_education && (
              <div className={`invalid-feedback d-block`}>
                Please provide a PG Education
              </div>
            )}
          </div>
        </> : <></>}

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Other Certified Education{" "}
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            {...register("qualification")}
            placeholder="Enter your other certified education"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
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
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Primary Specialization <span className="star">*</span>
          </label>

          <select
            {...register("specialization", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your specialization
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
        <div className="col-12 col-md-6 mb-40">
          <SelectField
            id="councilType"
            labelName="Choose Council Type"
            name="council_type"
            options={CouncilType}
            register={register}
            className="healthsynergyFormInput"
            errors={errors}
            errorText="Please select the Council Type"
            defaultOption="your council type"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <SelectField
            id="medicalCouncil"
            labelName="State Medical Council"
            name="medical_council"
            options={medicalCouncilOptions[selectedCouncilType] ?? []}
            register={register}
            className="healthsynergyFormInput"
            errors={errors}
            errorText="Please choose a State Medical Council"
            defaultOption="your state medical council"
          />
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
              Select your year of registration
            </option>
            {years.map((option, inx) => <option key={inx} value={option}>{option}</option>
            )}
          </select>

          {errors.registered_year && (
            <div className={`invalid-feedback d-block`}>
              Please provide a year of registration
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Medical Registration Number (SMC / DCI / Other Council Number){" "}
            <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your (MCI / SMC / DCI)"
            {...register("mci", { required: true })}
          />

          {errors.mci && (
            <div className={`invalid-feedback d-block`}>
              Please provide a MCI
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <InputTextField
            labelName="Awards & Recognition"
            name="awards_recognition"
            className="healthsynergyFormInput"
            register={register}
            isRequired={false}
            errors={errors}
            placeholder="Type here"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <MultipleAdd
            register={register}
            errors={errors}
            name="organisation"
            organisation={organisation}
            setOrganisation={setOrganisation}
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <InputTextField
            labelName="Fellowship"
            name="fellowship"
            className="healthsynergyFormInput"
            register={register}
            isRequired={false}
            errors={errors}
            placeholder="Type here"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Interested Modes{" "}
            <span className="star">*</span>
          </label>
          <br />
          {modes.map((el, index) => {
            return (
              <div
                key={index}
                className="form-check form-check-inline"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  {...register("intrested_mode", { required: true })}
                  value={el}
                />
                <label className="form-check-label">
                  {el}
                </label>
              </div>
            );
          })}
          {errors.intrested_mode && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">Memberships </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            {...register("memberships", { required: false })}
          />

          {errors.memberships && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Memberships
            </div>
          )}
        </div>
        <div className="col-12 col-md-12 mb-40">
          <label className="form-label">
            About Yourself <span className="star">*</span>
          </label>
          <textarea
            {...register("about", { required: true })}
            className="form-control textAreaControl healthsynergyFormInput"
            placeholder="Type about yourself"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-secondary w-100 btn-height fs20m16fwb br-12"
            onClick={(e) => (setOTPStatus(enum_otp_status.OTP_VERIFIED), setLevel(1))}
          >Go Back</button>
        </div>
        <div className="col-6">
          <button
            type="button"
            className={`btn border-0 text-white w-100 btn-height fs20m16fwb br-12`}
            onClick={async (e) => {
              if ((await trigger("about")) === false)
                setError("about", {}, { shouldFocus: true });
              if ((await trigger("memberships")) === false)
                setError("memberships", {}, { shouldFocus: true });
              if ((await trigger("intrested_mode")) === false)
                setError("intrested_mode", {}, { shouldFocus: true });
              if ((await trigger("medical_council")) === false)
                setError("medical_council", {}, { shouldFocus: true });
              if ((await trigger("registered_year")) === false)
                setError("registered_year", {}, { shouldFocus: true });
              if ((await trigger("mci")) === false)
                setError("mci", {}, { shouldFocus: true });
              if ((await trigger("secondary_specialization")) === false)
                setError("secondary_specialization", {}, { shouldFocus: true });
              if ((await trigger("specialization")) === false)
                setError("specialization", {}, { shouldFocus: true });
              if ((await trigger("gender")) === false)
                setError("gender", {}, { shouldFocus: true });
              if ((await trigger("qualification")) === false)
                setError("qualification", {}, { shouldFocus: true });
              if ((await trigger("degree")) === false)
                setError("degree", {}, { shouldFocus: true });
              if ((await trigger("education")) === false)
                setError("education", {}, { shouldFocus: true });
              else {
                Object.keys(errors).length === 0 && setLevel(3);
              }
            }
            }
            style={{
              background:
                !getValues("intrested_mode") ||
                  !getValues("medical_council") ||
                  !getValues("registered_year") ||
                  !getValues("mci") ||
                  !getValues("specialization") ||
                  !getValues("gender") ||
                  !getValues("degree") ||
                  !getValues("about") ||
                  !getValues("education") ||
                  (pgEnable && (!getValues("pg_degree") ||
                    !getValues("pg_education")))
                  ? "#D6D6D6" : "#CB1B5B"
            }}
            disabled={
              !getValues("intrested_mode") ||
              !getValues("medical_council") ||
              !getValues("registered_year") ||
              !getValues("mci") ||
              !getValues("specialization") ||
              !getValues("gender") ||
              !getValues("degree") ||
              !getValues("about") ||
              !getValues("education") ||
              (pgEnable && (!getValues("pg_degree") ||
                !getValues("pg_education")))
            }
          >Next</button>
        </div>
      </div>
    </div>
  )
}

const StepThree = ({
  register,
  errors,
  trigger,
  setLevel,
  inclinic,
  language,
  setValue,
  control,
  newLocation,
  setNewLocation,
  isValid,
  getValues,
  watch }) => {

  watch()

  return (
    <div id="doctorregistration-level-two">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Online Consultation Fee
          </label>

          <select
            {...register("online_consultation_fee")}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your preferred online consultation fee
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
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            In-Clinic Fee
          </label>

          <select
            {...register("in_clinic_fee")}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your preferred in-clinic fee
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
        <LanguageField
          errors={errors}
          labelTxt="Language"
          language={language}
          register={register}
          setValue={setValue}
          trigger={trigger}
          getValues={getValues}
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
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Location <span className="star">*</span>
          </label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="form-control healthsynergyFormInput"
            placeholder="Enter your Location ( ex. Connaught Place )"
            maxLength="30"
          />
          {errors.location && (
            <div className={`invalid-feedback d-block`}>
              Please provide a location
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
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Clinic Name <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your clinic name"
            {...register("clinic_name", { required: true })}
          />
          {errors.clinic_name && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Clinic Name
            </div>
          )}
        </div>
        <div className="col-12 col-md-12 mb-40">
          <label className="form-label">
            Clinic Address <span className="star">*</span>
          </label>
          <textarea
            className="form-control textAreaControl"
            type="textArea"
            placeholder="Type your clinic address"
            {...register("clinic_address", { required: true })}
          />
          {errors.clinic_address && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Clinic Address
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Clinic Contact Number <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your contact number"
            {...register("clinic_contact_number", { required: true })}
          />
          {errors.clinic_contact_number && (
            <div className={`invalid-feedback d-block`}>
              Please provide a clinic contact number
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Clinic Name-2
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="textArea"
            placeholder="Enter your clinic name-2"
            {...register("clinic_name_2")}
          />
        </div>

        <div className="col-12 col-md-12 mb-40">
          <label className="form-label">
            Clinic Address-2
          </label>
          <textarea
            className="form-control textAreaControl"
            type="textArea"
            placeholder="Clinic Address-2"
            {...register("clinic_address_2")}
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Clinic Contact Number-2
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your contact number-2"
            {...register("clinic_contact_number_2")}
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Are you currently using any telemedicine platform ?{" "}
            <span className="star">*</span>
          </label>{" "}
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              {...register("telemedicine", {
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
              {...register("telemedicine", {
                required: true,
              })}
              value="No"
            />
            <label className="form-check-label">No</label>
          </div>
          {errors.telemedicine && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Establishment Details{" "}
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("establishment", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select your establishment details</option>
            {establishmentDetails.map((option, idx) => <option key={idx} value={option}>{option}</option>)}
          </select>
          {errors.establishment && (
            <div className={`invalid-feedback d-block`}>
              Please provide a establishment details
            </div>
          )}
        </div>
      </div>

      <TermsPrivacy />

      <div className="row mb-4">
        <div className="col-6">
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
    </div>
  )
}

const DoctorRegistrationForm1 = () => {

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

  const [doctorbanner, setDoctorBanner] = useState("");
  const [doctorbannermob, setDoctorBannerMob] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const [pgEnable, setPGEnable] = useState(false)

  const navigate = useRouter().push;

  useEffect(() => {
    getBannerImageData();
    register('languages_known', { required: true, })
  }, []);

  useEffect(() => {
    if ((getValues()?.pg_degree || getValues()?.pg_education) && !pgEnable) {
      setValue("pg_degree", "")
      setValue("pg_education", "")
    }
  }, [pgEnable])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const getBannerImageData = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}banner-images/list`)
      .then((res) => {
        setDoctorBanner(res.data.rows[0].Doctor_Register_Form_Banner);
        setDoctorBannerMob(res.data.rows[0].Doctor_Register_Form_Banner_mob);
      });
  };

  useEffect(() => {
    getGender();
    getPrimaryspl();
    getInClinic();
    getLangauges();
    getDegree();
    getPGDegree();
  }, []);

  const [gender, setGender] = useState([]);
  const [primaryspl, setPrimaryspl] = useState([]);
  const [inclinic, setInclinic] = useState([]);
  const [language, setLanguage] = useState([]);
  const [degree, setDegree] = useState([]);
  const [pgDegree, setPGDegree] = useState([]);

  const getGender = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}gender/list`).then((res) => {
      setGender(res.data.rows);
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

  const getInClinic = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}in-clinic-fee/list`)
      .then((res) => {
        setInclinic(res.data.rows);
      });
  };

  const getLangauges = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}languages/list`).then((res) => {
      setLanguage(res.data.rows);
    });
  };

  const getDegree = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}ug-degree/list`).then((res) => {
      setDegree(res.data.rows);
    });
  };

  const getPGDegree = () => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}pg-degree/list`).then((res) => {
      setPGDegree(res.data.rows);
    });
  };


  const [organisation, setOrganisation] = useState([
    {
      [`organisation${0}`]: "",
      id: 0,
    },
  ]);

  const {
    register,
    getValues,
    setError,
    clearErrors,
    trigger,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const [level, setLevel] = useState(1);

  const [emailerror, setEmailError] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const onSubmit = (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    fields.languages_known = fields.languages_known?.length && fields.languages_known?.map((data) => data?.value);
    fields.organisation = organisation

    if (!newLocation) {
      setValue("city", "");
      trigger()
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-registration/create`,
          fields
        )
        .then((response) => {
          if (response.data?._id) {
            const adId = response.data._id;
            navigate({
              pathname: '/for-doctors/thank-you',
              query: { id: adId }
            },
              `/for-doctors/thank-you`
            );
          }
        })
        .catch((err) => {
          // setemail(fields.email);
        });
    }
  };

  return (
    <div className="doctorregistration1-container">
      <div className="doctorregistration1-box">
        <div className="doctorregistration1-banner ">
          {isDesktop ? (
            doctorbanner &&
            <img
              // src={banner}
              src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + doctorbanner}
              alt="banner"
              className="content-desktop"
            />
          ) : (
            doctorbannermob &&
            <img
              // src={resp_doc_nw_banner}
              src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + doctorbannermob}
              alt="doctorbannermob"
              className="content-mobiles"
            />
          )}
        </div>
        <div className={`doctorregistration1-form pb-3 ${level === 2 ? "" : null}`} >
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
                  <h4 className="label-title">Doctor Registration Form</h4>
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
                    getValues={getValues}
                    setValue={setValue}
                    trigger={trigger}
                    watch={watch}
                    pgEnable={pgEnable}
                    setPGEnable={setPGEnable}
                    pgDegree={pgDegree}
                    setError={setError}
                    setLevel={setLevel}
                    gender={gender}
                    primaryspl={primaryspl}
                    degree={degree}
                    organisation={organisation}
                    setOrganisation={setOrganisation}
                    setOTPStatus={setOTPStatus}
                    enum_otp_status={enum_otp_status}
                  />
                )}
                {level === 3 && (
                  <StepThree
                    register={register}
                    errors={errors}
                    isValid={isValid}
                    trigger={trigger}
                    setError={setError}
                    setLevel={setLevel}
                    inclinic={inclinic}
                    language={language}
                    setValue={setValue}
                    control={control}
                    newLocation={newLocation}
                    setNewLocation={setNewLocation}
                    getValues={getValues}
                    watch={watch}
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

export default DoctorRegistrationForm1;
