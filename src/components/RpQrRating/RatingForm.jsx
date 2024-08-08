import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import OTP from "../Common/OTP";
import PhoneFormInput from "../DoctorRegistration/Partials/PhoneFormInput";
import PhoneOtpStatuses from "../DoctorRegistration/Partials/PhoneOtpStatuses";

const location = "/assets/icons/location-white.svg"
const addPhotos = "/assets/icons/add-photo.svg"
const trash = "/assets/icons/trash.svg"

const threeOptions = [
    "Yes",
    "No",
    "Not Applicable"
]

const twoOptions = [
    "Yes",
    "No"
]

const RpQrRatingBanner = ({ level }) => {

    const [pharmacyIDList, setPharmacyIDList] = useState([]);

    const router = useRouter()
    useEffect(() => {
        getPharmacyIDList()
    }, [])

    const queryParams = {
        pharmacy_id: router.query.id,
    };

    const getPharmacyIDList = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}rp-qr-ratings/pharmacy-id-list`, {
                params: queryParams
            })
            .then((response) => {
                setPharmacyIDList(response?.data?.rows);
            });
    }

    return (
        <>
            <div className="bgPrimary text-white">
                <div className="d-flex healthsyRpQrRatingForm">
                    <div className="pharmacyLogoWraper bg-white primaryColor flexCenter fs32fwb">{pharmacyIDList[0]?.name.charAt(0)}</div>
                    <div className="rpQr">
                        <div className="rpQrRating text-center fs12 p-1">
                            #{pharmacyIDList[0]?.pharmacy_id}
                        </div>
                        <div className="pharmacyName fs16fw600">{pharmacyIDList[0]?.name}</div>
                        <div className="d-flex gap-1 flexAlignCenter">
                            <Image src={location} alt="location" width={14} height={14} />
                            <div className="fs13">{pharmacyIDList[0]?.city}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rpQrExperience">
                <div className="fs15fw500 rpQrStep">Step {level - 1}/3</div>
                <div className="fs20fwb">Share your Experience</div>
            </div>
        </>
    )
}

const StarRating = ({
    rating,
    setRating,
    hover,
    setHover,
}) => {
    // const [rating, setRating] = useState(0);
    // const [hover, setHover] = useState(0);
    return (
        <div className="starRating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="raingStar">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}

const SelectField = ({ control, value, options }) => {
    return (
        <div>
            {options.map((option, index) => (
                <div key={index} className="form-check form-check-inline p-0 healthsyRpQrRadioBtn">
                    <Controller
                        name={value}
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <button
                                type="button"
                                className={`rpQrRadioBtn ${field.value === option ? "selected" : ""}`}
                                onClick={() => field.onChange(option)}
                            >
                                <label className="rpQrRatingLabel fs15fw500">{option}</label>
                            </button>
                        )}
                    />
                </div>
            ))}
        </div>
    )
}

const ImageUploader = ({ images, setImages }) => {
    const [fileInputKey, setFileInputKey] = useState(0);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...selectedFiles]);
        setFileInputKey((prevKey) => prevKey + 1);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <div className="d-flex gap-4">
                {images.map((image, index) => (
                    <div key={index} className="uploaded-image position-relative mb-2">
                        <img
                            src={URL.createObjectURL(image)}
                            // src={getsrcValue(image)}
                            width={100}
                            height={133}
                            alt={`uploaded-${index}`}
                        />
                        <img
                            src={trash}
                            width="24"
                            height="24"
                            onClick={() => handleRemoveImage(index)}
                            className="rpQrUploadImage position-absolute top-0 end-0"
                            alt="Remove"
                        />
                    </div>
                ))}
            </div>

            <label htmlFor="imageInput">
                <button onClick={handleButtonClick} className="rpQrRatingAddBtn d-flex flexCenter" type="button">
                    <img src={addPhotos} width={24} height={24} className="me-2" alt="add-photo" />
                    <div className="fs14 star">Add Photos</div>
                </button>
                <input
                    ref={fileInputRef}
                    key={fileInputKey}
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    className="visually-hidden"
                    onChange={handleImageChange}
                    multiple
                />
            </label>
        </div>
    );
};

const StepOne = ({
    register,
    errors,
    getValues,
    enum_otp_status,
    setParentOTPVerified,
    otp_status,
    setOTPStatus,
    setLevel,
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
                className="rpQrFormInput"
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
        <>
            <div className="healthsyRpQrRating">
                <div className="bg-primary">
                    <div className="rpQrBanner text-white">
                        <span className="fs24fw800">Dear Customer,</span>
                        <div className="fs16 rpQrContent">Thank your for choosing my retail pharmacy to buy your medicines and healthcare products. Kindly rate your experience so that we can improve our services. Your feedback is highly valuables to us.</div>
                    </div>
                </div>
                <div className="container healthsyRpQrForm">
                    <div className="col-12 col-md-6 mb-32">
                        <label className="form-label fs15fw600">
                            Name<span className="star">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="form-control rpQrFormInput"
                            placeholder="Enter your name"
                            maxLength="30"
                        />
                        {errors.name && (
                            <div className={`invalid-feedback d-block`}>
                                Please provide a valid name
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-6 mb-56 mobileNoFieldWrapper">
                        <label className="form-label fs15fw600">
                            Mobile Number<span className="star">*</span>
                        </label>
                        {phnInput(otp_status)}
                    </div>

                    <OTP
                        otpAPI="rating-form"
                        enum_otp_status={enum_otp_status}
                        otp_status={otp_status}
                        register={register}
                        getValues={getValues}
                        setOTPStatus={setOTPStatus}
                        setParentOTPVerified={setParentOTPVerified}
                        rowWrapperClsName="otpFieldWrapper"
                        otpLabel={true}
                    />
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 text-center ">
                            <button
                                type="button"
                                onClick={() => setLevel(2)}
                                className={`btn fs20m16fwb text-white rpQrNxtBtn`}
                                style={{
                                    background: (
                                        otp_status !== enum_otp_status.OTP_VERIFIED ||
                                        !getValues("name") ||
                                        !getValues("mobile"))
                                        ? "#D6D6D6" : "#CB1B5B"
                                }}
                                disabled={
                                    otp_status !== enum_otp_status.OTP_VERIFIED ||
                                    !getValues("name") ||
                                    !getValues("mobile")}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const StepTwo = ({
    errors,
    getValues,
    level,
    setLevel,
    control,
    watch,
}) => {
    watch()

    return (
        <div className="healthsyRpQrRating">
            <RpQrRatingBanner
                level={level}
            />
            <div className="rpQrLevelTwo">
                <div className="flexColumn pb-4">
                    <label className="rpQrLabel fs15fwb">Was all your required prescribed medicines available?<span className="star">*</span></label>
                    <div>
                        <SelectField
                            options={threeOptions}
                            control={control}
                            value={"prescribed_medicine"}
                        />
                        {errors.prescribed_medicine && (
                            <div className={`invalid-feedback d-block`}>
                                Please select an option
                            </div>
                        )}
                    </div>
                </div>
                <div className="flexColumn pb-4">
                    <label className="rpQrLabel fs15fwb">Was all your required OTC’s / healthcare products available?<span className="star">*</span></label>
                    <div>
                        <SelectField
                            options={threeOptions}
                            control={control}
                            value={"products_available"}
                        />
                        {errors.products_available && (
                            <div className={`invalid-feedback d-block`}>
                                Please select an option
                            </div>
                        )}
                    </div>
                </div>
                <div className="flexColumn rpQrRatingDiscount">
                    <label className="rpQrLabel fs15fwb">Are you satisfied with the discount % provided for prescribed medicines<span className="star">*</span></label>
                    <div>
                        <SelectField
                            options={threeOptions}
                            control={control}
                            value={"satisfy_with_discount"}
                        />
                        {errors.satisfy_with_discount && (
                            <div className={`invalid-feedback d-block`}>
                                Please select an option
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 text-center">
                        <button
                            type="button"
                            onClick={() => setLevel(3)}
                            className={`btn fs20m16fwb text-white rpQrNxtBtn`}
                            style={{
                                background: (
                                    !getValues("prescribed_medicine") ||
                                    !getValues("products_available")) ||
                                    !getValues("satisfy_with_discount")
                                    ? "#D6D6D6" : "#CB1B5B"
                            }}
                            disabled={
                                !getValues("prescribed_medicine") ||
                                !getValues("products_available") ||
                                !getValues("satisfy_with_discount")
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StepThree = ({
    errors,
    getValues,
    level,
    setLevel,
    control,
    watch,
}) => {
    watch()

    return (
        <div className="healthsyRpQrRating">
            <RpQrRatingBanner
                level={level}
            />
            <div className="rpQrLevelTwo">
                <div className="flexColumn pb-4">
                    <label className="rpQrLabel fs15fwb">Did the pharmacy owner / manager explain the advantages of InstaDoc<span className="star">*</span></label>
                    <div>
                        <SelectField
                            options={twoOptions}
                            control={control}
                            value={"explain_adv"}
                        />
                        {errors.explain_adv && (
                            <div className={`invalid-feedback d-block`}>
                                Please select an option
                            </div>
                        )}
                    </div>
                </div>
                <div className="flexColumn pb-4">
                    <label className="rpQrLabel fs15fwb">Will you come back to buy your prescribed medicines in my pharmacy<span className="star">*</span></label>
                    <div>
                        <SelectField
                            options={twoOptions}
                            control={control}
                            value={"come_back"}
                        />
                        {errors.come_back && (
                            <div className={`invalid-feedback d-block`}>
                                Please select an option
                            </div>
                        )}
                    </div>
                </div>
                <div className="flexColumn rpQrRatingDiscount">
                    <label className="rpQrLabel fs15fwb">Will you refer / suggest my pharmacy to others?<span className="star">*</span></label>
                    <div>
                        <SelectField
                            options={twoOptions}
                            control={control}
                            value={"refer"}
                        />
                        {errors.refer && (
                            <div className={`invalid-feedback d-block`}>
                                Please select an option
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-secondary w-100 btn-height fs20m16fwb br-12"
                            onClick={(e) => (setLevel(2))}
                        >Go Back</button>
                    </div>
                    <div className="col-6">
                        <button
                            type="button"
                            className={`btn border-0 text-white w-100 btn-height fs20m16fwb br-12`}
                            onClick={() => setLevel(4)}
                            style={{
                                background:
                                    !getValues("explain_adv") ||
                                        !getValues("come_back") ||
                                        !getValues("refer")
                                        ? "#D6D6D6" : "#CB1B5B"
                            }}
                            disabled={
                                !getValues("explain_adv") ||
                                !getValues("come_back") ||
                                !getValues("refer")
                            }
                        >Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StepFour = ({
    register,
    errors,
    level,
    isValid,
    control,
    watch,
    images,
    setImages,
}) => {

    watch()

    return (
        <div className="healthsyRpQrRating">
            <RpQrRatingBanner
                level={level}
            />
            <div className="rpQrLevelTwo">
                <div className="flexColumn pb-4">
                    <label className="rpQrLabel fs15fwb mb-0">Rate your overall experience<span className="star">*</span></label>
                    <Controller
                        name="rating"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <StarRating
                                rating={field.value}
                                setRating={field.onChange}
                                hover={field.value}
                                setHover={field.onChange}
                            />
                        )}
                    />
                    {errors.rating && (
                        <div className={`invalid-feedback d-block`}>
                            Please select your rating
                        </div>
                    )}
                </div>
                <div className="flexColumn pb-4">
                    <label className="rpQrLabel fs15fwb mb-0">Write your feedback<span className="star">*</span></label>
                    <textarea
                        {...register("feedback", { required: true })}
                        className="form-control rqQrRatingTextarea"
                        placeholder="Type your feedback here"
                    />
                    {errors.feedback && (
                        <div className={`invalid-feedback d-block`}>
                            Please provide a feedback
                        </div>
                    )}
                </div>
                <div className="flexColumn">
                    <label className="rpQrLabel fs15fwb mb-0">Share your concerns and suggestions through images</label>
                    <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { value } }) => (
                            <ImageUploader images={images} setImages={setImages} />
                        )}
                    />
                </div>
                <div className="col-6 rpQrStepFourBtn">
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
        </div>
    )
}

const RatingForm = () => {
    const router = useRouter()

    const {
        register,
        getValues,
        control,
        formState: { errors, isValid },
        handleSubmit,
        watch,
    } = useForm();
    const [level, setLevel] = useState(1);
    const [images, setImages] = useState([]);

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
        fields.pharmacy_id = router.query.id

        const formData = new FormData();
        images.forEach(file => {
            formData.append("images", file);
        });
        Object.keys(fields).forEach((key) => {
            formData.append(key, fields[key])
        })

        axios
            .post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}rating-form/rating-form-create`,
                formData
            )
            .then((response) => {
                if (response.data?._id) {
                    const adId = response.data._id;
                    router.push({
                        pathname: '/rp-qr-ratings/thank-you',
                        query: { id: adId }
                    },
                        `/rp-qr-ratings/thank-you`
                    );
                } else {
                    alert("Some error");
                }
            })
            .catch((err) => {
                console.log('err', err)
            });
    };

    return (
        <>
            <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
                {level === 1 && (
                    <StepOne
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        enum_otp_status={enum_otp_status}
                        setParentOTPVerified={setParentOTPVerified}
                        otp_status={otp_status}
                        setOTPStatus={setOTPStatus}
                        setLevel={setLevel}
                    />
                )}

                {level === 2 && (
                    <StepTwo
                        errors={errors}
                        getValues={getValues}
                        setLevel={setLevel}
                        level={level}
                        control={control}
                        watch={watch}
                    />
                )}

                {level === 3 && (
                    <StepThree
                        errors={errors}
                        getValues={getValues}
                        level={level}
                        setLevel={setLevel}
                        control={control}
                        watch={watch}
                    />
                )}

                {level === 4 && (
                    <StepFour
                        register={register}
                        errors={errors}
                        level={level}
                        isValid={isValid}
                        control={control}
                        watch={watch}
                        images={images}
                        setImages={setImages}
                    />
                )}
            </form>
        </>
    )
}

export default RatingForm;