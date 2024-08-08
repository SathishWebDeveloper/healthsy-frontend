import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Image from "next/image";

import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import OTP from "./OTP";
import SuccessModal from "./successModel";
import { useRouter } from "next/router";

const doctorConsultaionImg = "/assets/doctorConsultation.png"
const verify = "/assets/icons/verify.svg"
const closeIcon = "/assets/icons/circle-close-icon.svg"

const report = [
  "Doctor name differs",
  "Online consultation fee",
  "Doctor specialization",
  "Doctor profile image",
  "Profile details",
  "Others"
]

const status = [
  "I’m this doctor",
  "Respective doctor’s team",
  "Public",
  "Prefer not to say"
]

const StepOne = ({
  register,
  errors,
  setLevel,
  getValues,
  doctorDetail
}) => {

  return (
    <div>
      <div className="fs24m18fwb doctorConsultationTitle">Report a Error</div>
      <div className="doctorDetailsLine" />
      <div className="d-flex doctorConsultationWrapper">
        <div className="doctorFormImgWrapper position-relative">
          <img
            src={`${process.env.NEXT_PUBLIC_APP_API_URL}profile-images/${doctorDetail.profileImage}`} width={47} height={62} className="doctorConsultationImg" alt="doctor"
          />
        </div>
        <div>
          <div className="d-flex">
            <div className="fs18m16fwb">{doctorDetail?.doctor_name}</div>
            <Image src={verify} width={25} height={25} alt="verify" />
          </div>
          <div className="fs19m14 generalPhysicianTxt">{(doctorDetail?.doctor_primary_specialization?.online_doctor_specialization)}</div>
        </div>
      </div>
      <div>
        <label className="fs15fwb">What do you want to report ?<span className="primaryColor">*</span></label>
        <div className="report-container">
          {report.map((el, index) => (
            <div key={index} className="report-item">
              <input
                className="form-check-input"
                type="radio"
                {...register("report", {
                  required: true,
                })}
                value={el}
              />
              <label className="form-check-label">{el}</label>
            </div>
          ))}
          {errors.report && (
            <div className={`invalid-feedback d-block`}>
              Please choose a report
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="fs15fwb">Explain your concern<span className="primaryColor">*</span></label>
        <textarea
          className="form-control doctorConsultationTextArea m-0"
          {...register("concern", { required: true })}
          placeholder=""
        ></textarea>
        {errors.concern && (
          <div className={`invalid-feedback d-block`}>
            Please provide a concern
          </div>
        )}
      </div>
      <div className="">
        <button
          type="button"
          onClick={() => setLevel(2)}
          className={`btn fs20m16fwb text-white doctorRegistrationBtn`}
          style={{
            background: (
              !getValues("report") ||
              !getValues("concern"))
              ? "#D6D6D6" : "#CB1B5B"
          }}
          disabled={
            !getValues("report") ||
            !getValues("concern")
          }
        >
          Next
        </button>
      </div>
    </div>
  )
}

const StepTwo = ({
  register,
  errors,
  getValues,
  isValid,
  enum_otp_status,
  setParentOTPVerified,
  otp_status,
  setOTPStatus,
  emailerror,
}) => {

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
        className="doctorInputField"
      >
        <PhoneOtpStatuses
          otpStatus={otpStatus}
          enumOtpStatus={enum_otp_status}
          getValues={getValues}
          setOTPStatus={setOTPStatus}
          otpAPI="rating-form"
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
    <div>
      <div className="fs24m18fwb doctorConsultationTitle">Fill your personal details</div>
      <div className="d-flex gap-3">
        <div className="col-md-6">
          <label className="fs15fwb">
            Name<span className="star">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Type"
            className="form-control doctorInputField reportInputField"
            maxLength="30"
          />
          {errors.name && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid name
            </div>
          )}
        </div>
        <div className="col-md-6">
          <label className="fs15fwb">
            Status<span className="star">*</span>
          </label>
          <select
            {...register("who_are_you", { required: true })}
            className="form-control doctorInputField reportInputField"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select
            </option>
            {status.map((data, idx) => {
              console.log('data', data)
              return (
                <option key={idx} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          {errors.who_are_you && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid status
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="fs15fwb">
          Mobile Number<span className="star">*</span>
        </label>
        {phnInput(otp_status)}
        <OTP
          otpAPI="rating-form"
          enum_otp_status={enum_otp_status}
          otp_status={otp_status}
          register={register}
          getValues={getValues}
          setOTPStatus={setOTPStatus}
          setParentOTPVerified={setParentOTPVerified}
          rowWrapperClsName="otpFieldWrapper"
        />
        <div>
          <label className="fs15fwb">
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
            className="form-control doctorInputField"
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
        </div>
      </div>
      <div className="col-6 doctorInputField">
        <button
          type="submit"
          style={{ background: (!isValid) ? "#E9E9E9" : "#CB1B5B" }}
          disabled={!isValid}
          className={`btn border-0 btn-height text-white w-100 fs20m16fwb`}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const ReportErrorModal = ({
  successModal,
  setSuccessModal,
  doctorDetail = {}
}) => {

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
    setError,
    control,
    setValue
  } = useForm();

  const [level, setLevel] = useState(1);
  const [emailerror, setEmailError] = useState(false)
  const [successPopupModal, setSuccessPopupModal] = useState(false);
  const navigate = useRouter().push;

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

  const onSubmit = (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4)
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}doctors-report/create`,
         {...fields, doctor_name: doctorDetail?.doctor_name}
      )
      .then((response) => {
        setSuccessPopupModal(true);
      })
      .catch((err) => {
        console.log('err', err)
      });
  };

  return (
    <>
      <Modal
        show={successModal}
        dialogClassName=""
        className="doctorConsultationFormModal"
        centered
        onHide={() => setSuccessModal(false)}
      >
        <div className="doctorConsultaionForm reportError">
          <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flexBetween">
              <div className="fs16m14fw500">Step {level}/2</div>
              <Image
                src={closeIcon}
                width={32}
                height={32}
                alt="Close Icon"
                className="ctaCloseIcon cursor-pointer"
                onClick={() => setSuccessModal(false)}
              />
            </div>
            {level === 1 && (
              <StepOne
                register={register}
                errors={errors}
                getValues={getValues}
                setLevel={setLevel}
                control={control}
                setSuccessModal={setSuccessModal}
                level={level}
                trigger={trigger}
                doctorDetail={doctorDetail}
              />
            )}
            {level === 2 && (
              <StepTwo
                register={register}
                errors={errors}
                getValues={getValues}
                isValid={isValid}
                enum_otp_status={enum_otp_status}
                setParentOTPVerified={setParentOTPVerified}
                otp_status={otp_status}
                setOTPStatus={setOTPStatus}
                setLevel={setLevel}
                emailerror={emailerror}
                setEmailError={setEmailError}
              />
            )}
          </form>
        </div>
      </Modal>
      {successPopupModal && <SuccessModal
        successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} onHide={() => navigate('/')} />}
    </>
  );
};

export default ReportErrorModal;