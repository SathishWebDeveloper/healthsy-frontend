import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import OTP from "./OTP";
import CtaSuccessModal from "./ctaSuccessModal";
import BookingSuccessModal from "./bookingSuccessModal";

const doctorConsultaionImg = "/assets/doctorConsultation.png"
const verify = "/assets/icons/verify.svg"
const closeIcon = "/assets/icons/circle-close-icon.svg"

const StepOne = ({
  register,
  errors,
  setLevel,
  getValues,
  setValue,
  control,
  doctorDetail,
  specialization
}) => {

  const [selectedGender, setSelectedGender] = useState([])
  const onSelectSymptoms = (data) => {
    if (!selectedGender.includes(data)) {
      setSelectedGender([...selectedGender, data])
      setValue("symptoms", [...selectedGender, data])
    }
    if (selectedGender.includes(data)) {
      setSelectedGender(selectedGender.filter((val) => val !== data))
      setValue("symptoms", selectedGender.filter((val) => val !== data))
    }
  }

  return (
    <div>
      <div className="fs24m18fwb doctorConsultationTitle">Provide details for consultation</div>
      <div className="doctorDetailsLine" />
      <div className="d-flex doctorConsultationWrapper">
        <div className="doctorFormImgWrapper position-relative">
          <img src={`${process.env.NEXT_PUBLIC_APP_API_URL}profile-images/${doctorDetail?.profileImage}`} alt="doctorConsultaionImg" className="doctorConsultationImg bookingConsultation" />
        </div>
        <div>
          <div className="d-flex">
            <div className="fs18m16fwb me-2">{doctorDetail?.doctor_name}</div>
            <Image src={verify} width={25} height={25} alt="verify" />
          </div>
          <div className="fs19m14 generalPhysicianTxt">{doctorDetail?.doctor_primary_specialization?.online_doctor_specialization}</div>
        </div>
      </div>
      <div>
        <label className="fs15fwb"> Select your symptoms<span className="primaryColor">*</span></label>
        <div className="doctorSelectField symptomsField">
          {doctorDetail?.online_health_concern?.map((data) => <div onClick={() => onSelectSymptoms(data?.health_concern)} className={`cursor-pointer docGenderFilter mb-3 me-3 ${selectedGender.includes(data?.health_concern) ? "selectedBoxField" : ""}`}>{`${data?.health_concern}`}</div>)}
        </div>
      </div>
      <div>
        <label className="fs15fwb">Tell us about your health issues<span className="primaryColor">*</span></label>
        <textarea
          className="form-control doctorConsultationTextArea m-0"
          {...register("about", { required: true })}
          placeholder=""
        ></textarea>
        {errors.about && (
          <div className={`invalid-feedback d-block`}>
            Please provide a location
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
              !getValues("symptoms")?.length ||
              !getValues("about"))
              ? "#D6D6D6" : "#CB1B5B"
          }}
          disabled={
            !getValues("symptoms")?.length ||
            !getValues("about")
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
  setValue,
  isValid,
  trigger,
  setError,
  setLevel,
  getValues,
  control
}) => {

  return (
    <div>
      <div className="fs24m18fwb doctorConsultationTitle">Choose your preferred date & time</div>
      <div>
        <label className="fs15fwb">Please select date<span className="primaryColor">*</span></label>
        <div className="position-relative">
          <input
            {...register("date", { required: true })}
            type="date"
            className={`form-control doctorInputField ${getValues()?.date ? "hasDate" : ""}`}
            placeholder="Choose Date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setValue("date", e.target.value, { shouldValidate: true });
            }}
          />
          {!getValues()?.date && errors.date && (
            <div className={`invalid-feedback d-block`}>
              Please Choose a Date
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="fs15fwb">Please select timings<span className="star">*</span></label>
        {/* <input
          type="text"
          {...register("time", { required: true })}
          placeholder="select"
          className="form-control doctorInputField"
        />
        {errors.time && (
          <div className={`invalid-feedback d-block`}>
            Please provide a location
          </div>
        )} */}
        <Controller
          name="time"
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
                  className="form-control doctorInputField"
                />
              </div>
              {errors.time && (
                <div className="invalid-feedback d-block">
                  {errors.time.message}
                </div>
              )}
            </>
          )}
        />
      </div>
      <div className="nextBtn">
        <input
          type="button"
          className={`btn border-0 text-white w-100 btn-height`}
          onClick={async (e) => {
            if ((await trigger("date")) === false)
              setError("date", {}, { shouldFocus: true });
            if ((await trigger("time")) === false)
              setError("time", {}, { shouldFocus: true })
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

const StepThree = ({
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
      <div>
        <label className="fs15fwb">
          Patient name<span className="star">*</span>
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Type your patient name "
          className="form-control doctorInputField"
          maxLength="30"
        />
        {errors.name && (
          <div className={`invalid-feedback d-block`}>
            Please provide a valid name
          </div>
        )}
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
        <div className="fs14m10fw500">By clicking submit, I agree to
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-terms`} className="p-1">
            <span className="primaryColor text-decoration-underline">  Terms and Conditions </span>
          </a>
          <span className="primaryColor text-center"> & </span>
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/adv-landing-privacy`} className="p-0">
            <span className="primaryColor text-decoration-underline"> Privacy Policy </span>
          </a>
        </div>
      </div>
      <div className="col-6 doctorInputField">
        <button
          type="submit"
          // style={{ background: (!isValid) ? "#E9E9E9" : "#CB1B5B" }}
          style={{
            background: (
              otp_status !== enum_otp_status.OTP_VERIFIED ||
              !getValues("name") ||
              !getValues("mobile") ||
              !getValues("email"))
              ? "#E9E9E9" : "#CB1B5B"
          }}
          // disabled={!isValid}
          disabled={
            otp_status !== enum_otp_status.OTP_VERIFIED ||
            !getValues("name") ||
            !getValues("mobile") ||
            !getValues("email")}
          className={`btn border-0 btn-height text-white w-100 fs20m16fwb`}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const BookingDetailsModal = ({
  successModal,
  setSuccessModal,
  specialization,
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
        `${process.env.NEXT_PUBLIC_APP_API_URL}booking-details/create`,
        { ...fields, doctor_name: doctorDetail?.doctor_name, doctor_primary_specialization: doctorDetail?.doctor_primary_specialization, doctor_consult_fee: doctorDetail?.online_consultation_fee }
      )
      .then((response) => {
        setSuccessPopupModal(true);
        setLevel(4);
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
        <div className="doctorConsultaionForm">
          <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flexBetween">
              <div className="fs16m14fw500">Step {level}/3</div>
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
                setValue={setValue}
                control={control}
                setSuccessModal={setSuccessModal}
                level={level}
                trigger={trigger}
                doctorDetail={doctorDetail}
                specialization={specialization}
              />
            )}
            {level === 2 && (
              <StepTwo
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                setLevel={setLevel}
                control={control}
                isValid={isValid}
                setSuccessModal={setSuccessModal}
                level={level}
                trigger={trigger}
                setError={setError}
              />
            )}
            {level === 3 && (
              <StepThree
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
            {level === 4 && (
              <BookingSuccessModal
                setBookingModal={setSuccessModal} successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} onHide={() => navigate('/')} />
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};

export default BookingDetailsModal;