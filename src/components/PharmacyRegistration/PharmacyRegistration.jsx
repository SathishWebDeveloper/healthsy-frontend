import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { states } from "../Common";
import { useRouter } from "next/router";
import 'rc-time-picker/assets/index.css';

import moment from "moment";
import OTP from "../Common/OTP";
import TimePicker from 'rc-time-picker';
import Location from "../Common/location";
import TermsPrivacy from "../Common/TermsPrivacy";
import InputTextField from "../Common/InputTextField";  
import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";
import DashedBorderElement from "../DoctorRegistration/Partials/DashedBorderElement";

const medicineDiscount = [
  "Yes, I provide 12% discount on medicines",
  "Yes, I provide 14% discount on medicines",
  "Yes, I provide 15% discount on medicines",
  "Yes, I provide 16% discount on medicines",
  "Yes, I provide 18% discount on medicines",
  "Yes, I provide 20% discount on medicines",
  "No, I don't provide any discounts on medicines"
]

const deliveryOrder = [
  "Yes",
  "No"
]

const onlinePharmacy = [
  "Yes, I am currently part of a online pharmacy / health-tech platform",
  "No, I have not used nor be associated with any other online platforms for carrying out my business activities"
]

const wholesaleLicense = [
  "Yes, I have both retail and wholesale license",
  "No, I have only retail license",
  "Yes, I have wholesale license"
]

const billingSoftware = [
  "Yes, I am using the following billing / sales / ERP software",
  "No, I am not using any billing / sales / ERP software"
]

const PharmacyRegistrationLevel1 = ({
  register,
  errors,
  clearErrors,
  getValues,
  trigger,
  setError,
  setLevel,
  enum_otp_status = {},
  setParentOTPVerified,
  otp_status,
  setOTPStatus,
}) => {

  const [emailerror, setEmailError] = useState(false);

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
          otpAPI="pharmacy-registration"
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

  const onClickNext = async (e) => {
    let [valid_first_name, valid_last_name, valid_email, valid_mobile, valid_pharmacy_owner_name] = [
      await trigger("first_name"),
      await trigger("last_name"),
      await trigger("email"),
      await trigger("mobile"),
      await trigger("pharmacy_owner_name"),
    ];
    !valid_first_name && setError("first_name", {}, { shouldFocus: true });
    !valid_last_name && setError("last_name", {}, { shouldFocus: true });
    !valid_email && setError("email", {}, { shouldFocus: true });
    !valid_mobile && setError("mobile", {}, { shouldFocus: true });
    !valid_pharmacy_owner_name && setError("pharmacy_owner_name", {}, { shouldFocus: true });

    // verify-email
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}pharmacy-registration/verify-email`,
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
    valid_first_name && valid_last_name && valid_pharmacy_owner_name && valid_email && valid_mobile && setLevel(2);
  }

  return (
    <div id="doctoregistration-level-one">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            First Name <span className="star">*</span>
          </label>
          <input
            type="text"
            {...register("first_name", { required: true })}
            className="form-control healthsynergyFormInput"
            placeholder="Enter your first name"
          />
          {errors.first_name && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid name
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Last Name <span className="star">*</span>
          </label>
          <input
            type="text"
            {...register("last_name", { required: true })}
            className="form-control healthsynergyFormInput"
            placeholder="Enter your last name"
          />
          {errors.last_name && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid name
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Pharmacy Name <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your pharmacy name"
            {...register("pharmacy_owner_name", { required: true })}
          />

          {errors.pharmacy_owner_name && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Pharmacy Name *
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
          otpAPI="pharmacy-registration"
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
                !getValues("first_name") ||
                !getValues("last_name") ||
                !getValues("email") ||
                !getValues("mobile")) ||
                !getValues("pharmacy_owner_name") ||
                Object.keys(errors).length ||
                emailerror ? "#D6D6D6" : "#CB1B5B"
            }}
            disabled={
              otp_status !== enum_otp_status.OTP_VERIFIED ||
              !getValues("first_name") ||
              !getValues("last_name") ||
              !getValues("email") ||
              !getValues("mobile") ||
              !getValues("pharmacy_owner_name")
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const PharmacyRegistrationLevel2 = ({
  register,
  errors,
  isValid,
  trigger,
  setError,
  setLevel,
  control,
  newLocation,
  setNewLocation,
  businessType,
  setValue,
  getValues,
  watch,
  setOTPStatus,
  enum_otp_status = {},
}) => {
  watch()
  return (
    <div id="doctorregistration-level-two" className="mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Pharmacy Business Type <span className="star">*</span>
          </label>
          <select
            {...register("business_type", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your pharmacy business type
            </option>
            {businessType.map((option) => {
              if (option.active === true) {
                return (
                  <option key={option.type} value={option.type}>
                    {option.type}
                  </option>
                );
              }
            })}
          </select>
          {errors.business_type && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Pharmacy Business Type
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Company Name{" "}
            <span>
              (If Pharmacy name & Company name is different){" "}
            </span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            {...register("company_name")}
            placeholder="Enter your company name"
          />
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Pharmacy GST Number <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your Pharmacy GST Number"
            {...register("gst_no", { required: true })}
          />
          {errors.gst_no && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Pharmacy GST Number
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Drug License Number (Form 20 and Form 21) <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            placeholder="Enter your drug license number"
            {...register("pharmacy_registration_number", { required: true })}
          />
          {errors.pharmacy_registration_number && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Pharmacy Drug License Number
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            FSSAI Number <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            {...register("fssai_license_no", { required: true })}
            placeholder="Enter your Pharmacy FSSAI Number"
          />
          {errors.fssai_license_no && (
            <div className={`invalid-feedback d-block`}>
              Please provide FSSAI number value *
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Pharmacist Name <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="text"
            {...register("pharmacist_name", { required: true })}
            placeholder="Enter Pharmacist Name"
          />

          {errors.pharmacist_name && (
            <div className={`invalid-feedback d-block`}>
              Please provide pharmacist name *
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Your pharmacist's license number <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="number"
            {...register("pharmacist_license_number", { required: true })}
            placeholder="Enter your Pharmacist's License Number"
          />

          {errors.pharmacist_license_number && (
            <div className={`invalid-feedback d-block`}>
              Please provide Your pharmacist's license number *
            </div>
          )}
        </div>

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
            errMsg="Please provide a (City / Town) of your Pharmacy"
            className="healthsynergyFormInput"
            placeholder="Select your city"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <InputTextField
            labelName="Pharmacy Location"
            name="pharmacy_location"
            className="healthsynergyFormInput"
            register={register}
            errors={errors}
            errorText="Please provide a pharmacy location"
            placeholder="Type here"
          />
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Address <span className="star">*</span>
          </label>
          <textarea
            className="form-control textAreaControl healthsynergyFormInput"
            type="textArea"
            {...register("pharmacy_address", { required: true })}
            placeholder="Enter your address"
          />
          {errors.pharmacy_address && (
            <div className={`invalid-feedback d-block`}>
              Please provide a Pharmacy Address *
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
            placeholder="Enter your pincode"
          />

          {errors.pincode && (
            <div className={`invalid-feedback d-block`}>
              Please provide a valid Pincode Location of your Pharmacy
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Medicine Discounts(%)
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("discounts_on_products", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}
          >
            <option value="" disabled pri-specialization="true">
              Select your Medicine Discounts
            </option>
            {medicineDiscount.map((option, inx) => <option key={inx} value={option}>{option}</option>
            )}
          </select>
          {errors.discounts_on_products && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-6">
          <input
            type="button"
            className="btn btn-secondary w-100 btn-height fs20m16fwb br-12"
            onClick={(e) => (setOTPStatus(enum_otp_status.OTP_VERIFIED), setLevel(1))}
            value="Go Back"
          />
        </div>
        <div className="col-6">
          <input
            type="button"
            className={`btn border-0 text-white w-100 btn-height fs20m16fwb br-12`}
            onClick={async (e) => {
              if ((await trigger("location")) === false)
                setError("location", {}, { shouldFocus: true });
              if ((await trigger("discounts_on_products")) === false)
                setError("discounts_on_products", {}, { shouldFocus: true });
              if ((await trigger("pincode")) === false)
                setError("pincode", {}, { shouldFocus: true });
              if ((await trigger("pharmacy_address")) === false)
                setError("pharmacy_address", {}, { shouldFocus: true });
              if (!newLocation) {
                setValue("location", "");
                trigger()
                setError("location", {}, { shouldFocus: true })
              }
              if ((await trigger("state")) === false)
                setError("state", {}, { shouldFocus: true });
              if ((await trigger("pharmacist_license_number")) === false)
                setError("pharmacist_license_number", {}, { shouldFocus: true });
              if ((await trigger("fssai_license_no")) === false)
                setError("fssai_license_no", {}, { shouldFocus: true });
              if ((await trigger("pharmacy_registration_number")) === false)
                setError("pharmacy_registration_number", {}, { shouldFocus: true });
              if ((await trigger("gst_no")) === false)
                setError("gst_no", {}, { shouldFocus: true });
              if ((await trigger("company_name")) === false)
                setError("company_name", {}, { shouldFocus: true });
              if ((await trigger("business_type")) === false)
                setError("business_type", {}, { shouldFocus: true });
              else {
                Object.keys(errors).length === 0 && setLevel(3);
              }
            }
            }
            value="Next"
            style={{
              background:
                !getValues("discounts_on_products") ||
                  !getValues("pincode") ||
                  !getValues("pharmacy_address") ||
                  !getValues("location") ||
                  !getValues("state") ||
                  !getValues("pharmacist_license_number") ||
                  !getValues("fssai_license_no") ||
                  !getValues("pharmacy_registration_number") ||
                  !getValues("gst_no") ||
                  !getValues("business_type") ||
                  !isValid
                  ? "#D6D6D6" : "#CB1B5B"
            }}
            disabled={
              !getValues("discounts_on_products") ||
              !getValues("pincode") ||
              !getValues("pharmacy_address") ||
              !getValues("location") ||
              !getValues("state") ||
              !getValues("pharmacist_license_number") ||
              !getValues("fssai_license_no") ||
              !getValues("pharmacy_registration_number") ||
              !getValues("gst_no") ||
              !getValues("business_type") ||
              !isValid
            }
          />
        </div>
      </div>
    </div>
  );
};

const PharmacyRegistrationLevel3 = ({
  register,
  errors,
  isValid,
  trigger,
  setError,
  setLevel,
  storesize,
  inventory,
  control
}) => {

  return (
    <div id="doctorregistration-level-two" className="mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Healthcare Product Discounts (%)
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("discount_on_OTC", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">
              Select your healthcare product discounts
            </option>
            {["Yes I provide 7 percent", "Yes I provide 5 percent", "Yes I provide discounts to healthcare products", "No I don’t provide discounts to healthcare products"].map((value, idx) => {
              return (
                <option key={idx} value={value}>{value}</option>
              )
            })}
          </select>
          {errors.discount_on_OTC && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            What is the approximate size of your pharmacy store?{" "}
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("size", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {storesize.map((el, inx) => {
              if (el.active === true) {
                return (
                  <option key={inx} value={el.type}>{el.type}</option>
                )
              }
            })}
          </select>
          {errors.size && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            What is the value of inventory you have in your pharmacy store?{" "}
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("value_of_inventory", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {inventory.map((el, inx) => {
              if (el.active === true) {
                return (
                  <option key={inx} value={el.type}>{el.type}</option>
                )
              }
            })}
          </select>
          {errors.value_of_inventory && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            How many pharmacists are working in your pharmacy?{" "}
            <span className="star">*</span>
          </label>
          <input
            className="form-control healthsynergyFormInput"
            type="number"
            placeholder="Select"
            {...register("pharmacists_count", { required: true })}
          />

          {errors.pharmacists_count && (
            <div className={`invalid-feedback d-block`}>
              Please provide How many pharmacists are working in your
              pharmacy?
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Do you have a delivery person / staff to deliver orders to your
            customers? <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("have_delivery_person", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {deliveryOrder.map((option, idx) => {
              return (
                <option key={idx} value={option}>{option}</option>
              )
            })}
          </select>
          {errors.have_delivery_person && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Are you currently part of any online pharmacy / health-tech
            platforms ? <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("online_pharmacy", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {onlinePharmacy.map((value, idx) => {
              return (
                <option key={idx} value={value}>{value}</option>
              )
            })}
          </select>
          {errors.online_pharmacy && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Do you have a wholesale license? <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("have_wholesale_license", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {wholesaleLicense.map((option, idx) => {
              return (
                <option key={idx} value={option}>{option}</option>
              )
            })}
          </select>
          {errors.have_wholesale_license && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Do you currently use any billing / sales / ERP software?{" "}
            <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("billing_software", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {billingSoftware.map((option, idx) => {
              return (
                <option key={idx} value={option}>{option}</option>
              )
            })}
          </select>
          {errors.billing_software && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">What is your pharmacy work timings <span className="star">*</span></label>
          <div className="d-flex pharmacyTimingsWrapper">
            <Controller
              // name="time"
              name={`pharmacy_start_timing`}
              control={control}
              rules={{
                required: 'Please choose a time or choose closed'
              }}
              render={({ field }) => (
                <>
                  <div className="">
                    <div className="timePickerIcon">
                      {/* <BsClock size={22} /> */}
                    </div>
                    {/* <input type="time" placeholder="HH:MM" /> */}
                    <TimePicker
                      {...field}
                      showSecond={false}
                      className="pharmacyTimings"
                      allowEmpty={true}
                      use12Hours={true}
                      format="h:mm a"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value ? moment(field.value, 'HH:mm A') : null}
                      placeholder="Start Time"
                    />
                  </div>
                </>
              )}
            />
            <Controller
              // name="time"
              name={`pharmacy_end_timing`}
              control={control}
              rules={{
                required: 'Please choose a time or choose closed'
              }}
              render={({ field }) => (
                <>
                  <div className="">
                    <div className="timePickerIcon">
                      {/* <BsClock size={22} /> */}
                    </div>
                    {/* <input type="time" placeholder="HH:MM" /> */}
                    <TimePicker
                      {...field}
                      showSecond={false}
                      className="pharmacyTimings"
                      allowEmpty={true}
                      use12Hours={true}
                      format="h:mm a"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value ? moment(field.value, 'HH:mm A') : null}
                      placeholder="End Time"
                    />
                  </div>
                </>
              )}
            />
          </div>
          {errors[`pharmacy_start_timing`] || errors[`pharmacy_end_timing`] ? (
            <div className="invalid-feedback d-block">
              {/* {errors[`${option}_start_timing`].message} */}
              Please provide a {errors[`pharmacy_start_timing`] && errors[`pharmacy_end_timing`] ? "Start and End Timings" : errors[`pharmacy_start_timing`] ? "Start Timing" : "End Timing"}
            </div>
          ) : ""}
        </div>
        <div className="col-12 col-md-6 mb-40">
          <label className="form-label">
            Is your pharmacy available on Sundays <span className="star">*</span>
          </label>{" "}
          <br />
          <select
            {...register("pharmacy_available", { required: true })}
            className="form-control healthsynergyFormInput"
            defaultValue={""}>
            <option value="" disabled pri-specialization="true">Select</option>
            {deliveryOrder.map((option, idx) => {
              return (
                <option key={idx} value={option}>{option}</option>
              )
            })}
          </select>
          {errors.pharmacy_available && (
            <div className={`invalid-feedback d-block`}>
              Please select an option
            </div>
          )}
        </div>        
      </div>

      <TermsPrivacy />

      <div className="row mb-4">
        <div className="col-6">
          <input
            type="button"
            className="btn btn-secondary w-100 btn-height fs20m16fwb br-12"
            onClick={(e) => setLevel(2)}
            value="Go Back"
          />
        </div>
        <div className="col-6">
          <input
            type="submit"
            className={`btn border-0 text-white w-100 btn-height fs20m16fwb br-12`}
            value="Submit"
            style={{ background: !isValid ? "#D6D6D6" : "#CB1B5B" }}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

const PharmacyRegistration = () => {

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
  const navigate = useRouter().push;

  useEffect(() => {
    getBannerImageData();
  }, []);

  const getBannerImageData = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}banner-images/list`)
      .then((res) => {
        setDoctorBanner(res.data.rows[0].retail_Pharmacy_Form_Banner);
        setDoctorBannerMob(res.data.rows[0].retail_Pharmacy_Form_Banner_mob);
      });
  };

  useEffect(() => {
    getBusinessType();
    getInventory();
    getStoreSize();
  }, []);

  const [businessType, setBusinessType] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [storesize, setStoreSize] = useState([]);

  const getBusinessType = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}pharmacy-business-type/list`)
      .then((res) => {
        setBusinessType(res.data.rows);
      });
  };

  const getInventory = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}inventory-value/list`)
      .then((res) => {
        setInventory(res.data.rows);
      });
  };

  const getStoreSize = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}pharmacy-store-size/list`)
      .then((res) => {
        setStoreSize(res.data.rows);
      });
  };

  const {
    register,
    getValues,
    setError,
    clearErrors,
    watch,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const [level, setLevel] = useState(1);

  const [email, setemail] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  const onSubmit = (fields) => {
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    fields.pharmacy_town = fields.location;
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}pharmacy-registration/create`,
        fields
      )
      .then((response) => {
        if (response.data?._id) {
          const adId = response.data._id;
          navigate({
            pathname: '/for-retail-pharmacies/thank-you',
            query: { id: adId }
          },
            `/for-retail-pharmacies/thank-you`
          );
        } else {
          alert("Some error");
        }
      })
      .catch((err) => {
        setemail(fields.email);
      });
  };

  return (
    <>
      <div className="pharmacyregister">
        <div className="pharmacyregister-header">
          {/* <Header showMenu="false" /> */}
        </div>
        <div className="pharacyregister-container">
          <div>
            {doctorbanner &&
              <img
                // src={pharmacyregister}
                src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + doctorbanner}
                alt="doctorbanner"
                className="content-desktop bannerImageDesktop"
              />
            }
            {doctorbannermob &&
              <img
                // src={resp_pharmacyregister}
                src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + doctorbannermob}
                alt="doctorbannermob"
                className="content-mobile bannerImageMob"
              />
            }
          </div>
          <div className="pharacyregister-container-box">
            <div className="doctorregistration1-form-banner rounded-top d-flex justify-content-center">
              <div className="d-flex align-items-center bbottom mob-bbottom justify-content-center">
                <div
                  className={`redround rounded-circle text-center text-white levelRound`}
                >
                  1
                </div>
                <DashedBorderElement isActive={level >= 2 ? true : false} />
                <div
                  className={`rounded-circle text-center text-white levelRound ${level < 2 ? "grayround" : "redround"
                    }`}
                >
                  2
                </div>
                <DashedBorderElement isActive={level === 3 ? true : false} />
                <div
                  className={`rounded-circle text-center text-white levelRound ${level < 3 ? "grayround" : "redround"
                    }`}
                >
                  3
                </div>
              </div>
            </div>
            <div className="pharacyregister-container-box-container">
              <div className="doctorregistration1-form-box">
                {level === 1 && (
                  <div>
                    <h4 className="mt-4 mb-4 fw-bold">
                      Partnered Pharmacy Registration Form
                    </h4>
                    <h4 className="mb-5 fw-normal  label-msg">
                      Please fill the details below :
                    </h4>
                  </div>
                )}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="registration-form"
                >
                  {level === 1 && (
                    <PharmacyRegistrationLevel1
                      register={register}
                      errors={errors}
                      isValid={isValid}
                      getValues={getValues}
                      trigger={trigger}
                      setError={setError}
                      setLevel={setLevel}
                      clearErrors={clearErrors}
                      enum_otp_status={enum_otp_status}
                      setParentOTPVerified={setParentOTPVerified}
                      otp_status={otp_status}
                      setOTPStatus={setOTPStatus}
                    />
                  )}
                  {level === 2 && (
                    <PharmacyRegistrationLevel2
                      register={register}
                      errors={errors}
                      isValid={isValid}
                      getValues={getValues}
                      trigger={trigger}
                      setError={setError}
                      setLevel={setLevel}
                      newLocation={newLocation}
                      setNewLocation={setNewLocation}
                      control={control}
                      businessType={businessType}
                      setValue={setValue}
                      watch={watch}
                      setOTPStatus={setOTPStatus}
                      enum_otp_status={enum_otp_status}
                    />
                  )}
                  {level === 3 && (
                    <PharmacyRegistrationLevel3
                      register={register}
                      errors={errors}
                      isValid={isValid}
                      getValues={getValues}
                      trigger={trigger}
                      setError={setError}
                      setLevel={setLevel}
                      storesize={storesize}
                      inventory={inventory}
                      control={control}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyRegistration;
