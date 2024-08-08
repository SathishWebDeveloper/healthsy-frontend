import Link from "next/link";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap"
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import AdFormFooter from "../DoctorsAd/adFormFooter";
import useIsDesktop from "../Hooks/useIsDesktop";

const healthsyLogo = "/assets/healthsy-logo.png";
const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/appleIcon.svg";
const documentImage = "/assets/document.svg"
const indeedIcon = "/assets/linkedin-icon.svg";
const facebookIcon = "/assets/fb-icon.svg";
const instagramIcon = "/assets/instagram-logo.svg";
const twitterIcon = "/assets/X.svg";
const mobCloseIcon = "/assets/mobCloseIcon.svg";


const ThankYou = ({
    title = "",
    downloadBrochure = "",
    image = "",
    closeNavigate = "",
    appCategory = "",
    successTxt = "",
    subSuccessTxt = "",
    className = "",
    Brochure = '/assets/dowloadBrochure/HealthSy Partnered Doctor Network Programme Brochure.pdf'
}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const { linkedin = "#",
        facebook = "#",
        instagram = "#",
        twitter = "#" } = socialMediaLinks

    const router = useRouter();
    const { id } = router.query;
    const isDesktop = useIsDesktop()

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: appCategory })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
            });
    }, [])

    useEffect(() => {
        getSocialMediaData();
    }, []);

    const getSocialMediaData = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
            .then((res) => {
                setSocialMediaLinks(res.data.rows[res.data.rows.length - 1]);
            });
    };

    const handleClick = async (type) => {
        if (router.pathname === "/ad-landing-page-partners-doctors/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}doctors-ad/click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        } else if (router.pathname === "/rp-qr-instadoc/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-qr-code/insta-doc-qr-code-click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        } else if (router.pathname === "/ad-landing-page-users-general/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}user-general/user-general-click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        }
    };

    return (
        <>
            <div className="text-center">
                <div className="succussRegistration">
                    <div className="mobContent d-flex">
                        <Image
                            src={mobCloseIcon}
                            width="32"
                            height="32"
                            className="doctorAdsStep"
                            onClick={() => router.push(closeNavigate)} />
                    </div>
                    <Image src={healthsyLogo} width="249" height="68" className="doctorHealthSyLogo" />
                    <div className={`${className} fs32m22fwb`}>{successTxt}</div>
                    <div className="doctorHealthSyContent fs16m15">{subSuccessTxt} </div>
                    <Image src={image} alt="SuccessImg" width='453' height='412' className="sucessImage" />
                </div>
                <div className="container">
                    <div className="healthSyDoctorsApp">{title}</div>
                    <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank">
                        <button className="healthSyDownloadBtn" onClick={() => handleClick("android")}>
                            <span className="fs16fwb">Google Play</span>
                            <Image src={logo_google_playstore_outline} width={15} height={16} className="healthSyPlayStore" alt='Play store' />
                        </button>
                    </Link>
                    <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank">
                        <button className="healthSyDownloadBtn healthSyAppleStore" onClick={() => handleClick("ios")}>
                            <span className="fs16fwb">App Store</span>
                            <Image src={logo_app_playstore_outline} width={16} height={16} className="healthSyPlayStore" alt='apple store' />
                        </button>
                    </Link>
                    <div className="healthSyOptions">or</div>
                    <div>
                        <Image src={documentImage} width={24} height={24}></Image>
                        <a href={Brochure} download>
                            <button className="downloadBrochure fs16fwb" onClick={() => { handleClick("brochure"); }}>{downloadBrochure}</button>
                        </a>
                    </div>
                    <div className="doctorsAdPage">
                        <div className="healthSyFollowUs fs16fw600">Follow us on</div>
                        <Image
                            src={indeedIcon}
                            alt="LinkedIn Image"
                            className="healthSySocialMediaIcon"
                            onClick={() => {
                                window.open(linkedin);
                            }}
                        />
                        <Image
                            src={facebookIcon}
                            alt="Facebook Image"
                            className="healthSySocialMediaIcon"
                            onClick={() => {
                                window.open(facebook);
                            }}
                        />
                        <Image
                            src={instagramIcon}
                            alt="Instragram Image"
                            className="healthSySocialMediaIcon"
                            onClick={() => {
                                window.open(instagram);
                            }}
                        />
                        <Image
                            src={twitterIcon}
                            alt="Twitter Image"
                            onClick={() => {
                                window.open(twitter);
                            }}
                        />
                    </div>
                </div>
            </div>
            {isDesktop && <AdFormFooter className="desktopContent" />}
        </>
    )
}

export default ThankYou;