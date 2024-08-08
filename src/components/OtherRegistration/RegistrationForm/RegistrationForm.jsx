import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

import OtpForm, { enum_otp_status } from "../../Otp/Otp";
import TermsPrivacy from "../../Common/TermsPrivacy";
import Location from "../../Common/location";
import SuccessModal from "../../Common/successModel";

const RegistrationForm = () => {
  const navigate = useRouter().push;
  const [successModal, setSuccessModal] = useState(false);
  return (
    <>
      <div className="mob-other-reg-bg-color">
        <div className="container">
          <div className="registration-section ">
            <div className="registration-box">
              <div className="registration-title-section">
                <div className="registration-title">
                  Others Registration Form
                </div>
              </div>
              <div className="form-section">
                <div className="form-tilte">
                  Please fill the details below :
                </div>
                <OtherRegistrationLevel1
                  onSuccess={() => setSuccessModal(true)}
                  onHide={() => navigate('/')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {successModal && <SuccessModal successModal={successModal} setSuccessModal={setSuccessModal} onHide={() => navigate('/')} />}
    </>
  );
};

const OtherRegistrationLevel1 = (props) => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();
  const [, setFormSubmit] = useState(false);
  const [otp_status, setOtpStatus] = useState(enum_otp_status.SEND_OTP);
  register("mobile");

  const onOtpStatusChange = (status, mobile) => {
    if (status === enum_otp_status.OTP_VERIFIED) {
      setOtpStatus(status);
      setValue("mobile", mobile);
    }
  };

  const [emailExist, setEmailExist] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  const onSubmit = (fields) => {
    setFormSubmit(true);
    fields.otp = "".concat(fields.otp1, fields.otp2, fields.otp3, fields.otp4);
    if (!newLocation) {
      setValue("location", "", { shouldFocus: true });
      trigger()
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_URL}other-registration/create`, fields)
        .then((response) => {
          if (response.data?._id) {
            props.onSuccess(true);
          } else {
            alert("Some error");
          }
          setFormSubmit(false);
        })
        .catch((err) => {
          if (err?.response?.data?.errors?.code) {
            setEmailExist(true);
          }
          setFormSubmit(false);
        });
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  const [types, setTypes] = useState([]);

  const getTypes = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}types/list`)
      .then((res) => [setTypes(res.data.rows)]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
      <div id="doctoregistration-level-one">
        <div className="row">
          <div className="col-12 col-md-6 mb2p5">
            <label className="form-label">
              Name <span className="star">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="form-control"
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className={`invalid-feedback d-block`}>
                Please provide a valid name
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 mb2p5">
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
          </div>

          <OtpForm onChange={onOtpStatusChange} />

          <div className="col-12 col-md-6 mb2p5">
            <label className="form-label">
              Type <span className="star">*</span>
            </label>

            <select
              {...register("type", { required: true })}
              className="form-control"
              defaultValue={""}
            >
              <option value="" disabled>
                Select
              </option>
              {types.map((el, inx) => {
                if (el.active === true) {
                  return <option value={el.type} key={inx}>{el.type}</option>;
                }
              })}
            </select>

            {errors.type && (
              <div className={`invalid-feedback d-block`}>
                Please provide a Type
              </div>
            )}
          </div>

          <div className="col-12 col-md-6 mb2p5">
            <label className="form-label">
              Location (City / Town) <span className="star">*</span>
            </label>
            <Location
              control={control}
              errors={errors}
              register={register}
              newLocation={newLocation}
              setNewLocation={setNewLocation}
            />
          </div>
          <div className="col-12 mb-32">
            <label className="form-label">
              Message <span className="star">*</span>
            </label>
            <textarea
              className="form-control"
              placeholder="Type your message"
              type="text"
              {...register("message", { required: true })}
            ></textarea>

            {errors.message && (
              <div className={`invalid-feedback d-block`}>
                Please provide a Message
              </div>
            )}
          </div>
        </div>
        <TermsPrivacy />
        <div className="row mt-4">
          <div className="col-12 text-center">
            <button
              type="submit"
              style={{ background: !isValid ? "#98969D" : "#CB1B5B" }}
              className={`btn py-3 fs-4 text-white w-55 mb-4`}
              disabled={otp_status !== enum_otp_status.OTP_VERIFIED}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
