import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import "./launching.css";

// import linkedin from "../../../assets/homepage/linkedin-icon.svg";
// import facebook from "../../../assets/homepage/fb-icon.svg";
// import instagram from "../../../assets/homepage/insta-icon.svg";
// import twitter from "../../../assets/homepage/twitter-icon.svg";
// import getnotifypict from "../../../assets/homepage/get-notify-phone-img.png";

const linkedin = "/assets/homepage/linkedin-icon.svg";
const facebook = "/assets/homepage/fb-icon.svg";
const instagram = "/assets/homepage/insta-icon.svg";
const twitter = "/assets/homepage/Twitter Logo.svg";
const getnotifypict = "/assets/homepage/get-notify-phone-img.png";
import NotifySuccess from "../../Modals/NotifySuccess/NotifySuccess";

const Launching = (props) => {
    const [success, setSuccess] = useState(false);
    const [successTimeout, setSuccessTimeout] = useState(null);
    const [timeoutDuration, setTimeoutDuration] = useState(5000);
    const [errorBag, setErrorBag] = useState({});
    const [modelerror, setModelError] = useState('')

    //--------Social Media Link--------------
    const [data, setData] = useState([])
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [facebookUrl, setFacebookUrl] = useState('')
    const [instagramUrl, setInstagramUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')

    useEffect(() => {
        getSocialMediaData()
    }, [])

    const getSocialMediaData = () => {
        axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`
        )
            .then((res) => {
                setLinkedinUrl(res.data.rows[res.data.rows.length - 1].linkedin)
                setFacebookUrl(res.data.rows[res.data.rows.length - 1].facebook)
                setInstagramUrl(res.data.rows[res.data.rows.length - 1].instagram)
                setTwitterUrl(res.data.rows[res.data.rows.length - 1].twitter)
            })
    }
    //--------Social Media Link--------------

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [email, setemail] = useState(null);
    const [emailcheck, setEmailCheck] = useState(null)
    const [emailerror, setEmailError] = useState(false)
    const emailValidator = email => {
        const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailValidate.test(email)
    }

    const onSubmit = async (fields) => {
        clearTimeout(successTimeout)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}get-notified/launch`, fields)
            setSuccess(true)
            setErrorBag(null)
            // setSuccessTimeout(setTimeout(() => setSuccess(false), timeoutDuration))
        } catch (error) {
            setemail(fields.email);
            setModelError(error?.response?.data?.errors)
            setErrorBag(error?.response?.data?.errors)
            // clearTimeout(successTimeout)
        }
    };

    const [launchbgcolor, setlaunchbgcolor] = useState(false);

    return (
        <>
            <div className="launching-section">
                <div className="container bg-lpink">
                    <div className="row">
                        <div className="col col-md-7">
                            <div className="sub-title">Launching Shorthly...</div>
                            <div className="title">Get Notified</div>
                            <div className="title">When we Launch</div>
                            <div>
                                <p className="para">
                                    A one stop solution and innovative healthcare platform for{" "}
                                    <span>all your healthcare needs</span>
                                </p>
                            </div>
                            <div>
                                <ul className="social-links">
                                    <li>
                                        {
                                            linkedinUrl && linkedinUrl.length > 0
                                                ? <img
                                                    src={linkedin}
                                                    alt="linkedin"
                                                    onClick={() => {
                                                        window.open(
                                                            linkedinUrl
                                                        );
                                                    }}
                                                />
                                                : null
                                        }
                                    </li>
                                    <li>
                                        {
                                            facebookUrl && facebookUrl.length > 0
                                                ?
                                                <img
                                                    src={facebook}
                                                    alt="facebook"
                                                    onClick={() => {
                                                        window.open(facebookUrl);
                                                    }}
                                                />
                                                : null
                                        }
                                    </li>
                                    <li>
                                        {
                                            instagramUrl && instagramUrl.length > 0
                                                ? <img
                                                    src={instagram}
                                                    alt="instagram"
                                                    onClick={() => {
                                                        window.open(instagramUrl);
                                                    }}
                                                />
                                                : null
                                        }
                                    </li>
                                    <li>
                                        {
                                            twitterUrl && twitterUrl.length > 0
                                                ? <img
                                                    src={twitter}
                                                    alt="twitter"
                                                    onClick={() => {
                                                        window.open(twitterUrl);
                                                    }}
                                                />
                                                : null
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="order-first my-3 col-12 col-md-5 d-flex justify-content-center align-items-center position-relative my-md-0 order-md-last">
                            <div className="position-absolute d-flex w-100 h-100 justify-content-center align-items-center ">
                                <div className="round pendulam position-absolute"></div>
                            </div>
                            <div className="p-3 my-5 get-notified-container right-bg w-75 my-md-0">
                                <div className="get-notigy-bg d-flex justify-content-between align-items-center">
                                    <div className="px-4 text">Get <br /> Notified</div>
                                    <div className="image">
                                        <img src={getnotifypict} alt="getnotifypict" />
                                    </div>
                                </div>
                                <div className="notify-form">
                                    <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="position-relative">
                                            <input
                                                type="email"
                                                className="form-control notify-input"
                                                name="email"
                                                id="validationCustom01"
                                                placeholder="Enter your email address"
                                                {...register("email", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid Email Address",
                                                    },
                                                })}
                                                onChange={(e) => {
                                                    setlaunchbgcolor(true)
                                                    setEmailCheck(e.target.value)
                                                    if (!emailValidator(e.target.value) && e.target.value !== "") {
                                                        setEmailError(true)
                                                    } else {
                                                        setEmailError(false)
                                                    }
                                                }}
                                            />
                                            {/* {errorBag && errorBag.email ? (
                                                <div className={`invalid-feedback d-block position-absolute`} style={{ bottom: '-24px', left: '0px' }}>
                                                    {errorBag.email[0]}
                                                </div>
                                            ) : null} */}

                                            {errors.email ? (
                                                <div className={`invalid-feedback d-block`}>
                                                    Please provide a valid email
                                                </div>
                                            ) : email && email == emailcheck ? (
                                                <div className={`invalid-feedback d-block`}>
                                                    Email already registered
                                                </div>
                                            ) : emailerror === true ?
                                                <div className={`invalid-feedback d-block`}>
                                                    Please provide a valid email
                                                </div>
                                                : ""}
                                        </div>
                                        <button
                                            type="submit"
                                            className={`btn get-notify-btn mx-auto m-2 ${launchbgcolor ? "launch-bg-color" : ""}`}
                                            data-bs-toggle="jobShareModal"
                                            data-bs-target="#jobshare"
                                        >
                                            Notify Me{" "}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {success && <NotifySuccess closeModal={() => setSuccess(false)} />}
        </>
    );
};

export default Launching;
