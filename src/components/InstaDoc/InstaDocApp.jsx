import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import useIsDesktop from "../Hooks/useIsDesktop";
import AppLinkSuccess from "../Common/AppLinkSuccess";

const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/homepage/logo-app-playstore-outline.svg";
const instaDocImg = "/assets/icons/send-arrow.svg";

const InstaDocApp = ({
    subTitle = "",
    className = "",
    instaDoc = "",
    QrImg = "/assets/Qr-code-img.png"
}) => {
    const isDesktop = useIsDesktop();
    const [activeStatus, setActiveStatus] = useState("")
    const [linkSentModal, setLinkSentModal] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
            });
    }, [])

    const onSubmit = (fields) => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}app-download-sms/send-link`, fields)
            .then(() => {
                setLinkSentModal(true)
                reset()
            });
    }

    return (
        <>
            <div className={`container instaDocApp ${className} ${instaDoc}`}>
                <div className="instaDocGeneral text-white">
                    <div className="fs36m24fwb">{isDesktop ? "Get the HealthSy app" : "Download Now !"}</div>
                    <div className="intaDocAdvantage fs16m14">{subTitle}</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="position-relative instaDocInputWrapper d-flex">
                            <div className="flexColumn">
                                <input type="number"
                                    name="moileNumber"
                                    placeholder={isDesktop ? "Type your Mobile Number" : "Enter your Mobile Number"}
                                    className="instaDocInput mt-2"
                                    {...register("mobile", {
                                        required: 'Mobile number is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Mobile number must be exactly 10 digits'
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Mobile number must be exactly 10 digits'
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Mobile number must contain only digits'
                                        }
                                    })}
                                />
                                {errors.mobile && <p className="error">{errors.mobile.message}</p>}
                            </div>
                            <button className="mobContent instaDocMobBtn border-0 flexCenter">
                                <Image src={instaDocImg} width={22} height={22} className="" alt='send arrow' />
                            </button>
                            <button className="instaDocBtn desktopContent mt-2 fw-bold" type="submit">Send App Link</button>
                        </div>
                    </form>
                    <div className="instaDocDownload">Download app from</div>
                    <div className="appLink d-flex  align-items-center p-0 instaDocAppLink">
                        <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank"><button className="btn px-4 py-3 googlePlayStoreBtn googlePlayStoreApp">
                            <Image src={logo_google_playstore_outline} width={23} height={23} className="googlePlayStoreImg" alt='Play store' />
                            Google Play
                        </button></Link>
                        <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank"><button className="btn px-4 py-3 googleAppStoreBtn googleAppStoreButton">
                            <Image src={logo_app_playstore_outline} width={23} height={26} className="googleAppStoreImg" alt='apple store' />
                            App Store
                        </button></Link>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="newInstaDocQrCode desktopContent">
                    <Image src={QrImg} width={228} height={228} alt="Qr-Code" />
                </div>
            </div>
            {linkSentModal &&
                <AppLinkSuccess
                    linkSentModal={linkSentModal}
                    setLinkSentModal={setLinkSentModal}
                />
            }
        </>
    )
}

export default InstaDocApp;