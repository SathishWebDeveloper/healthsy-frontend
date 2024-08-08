import Link from "next/link";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap"
import axios from "axios";
import { useRouter } from "next/router";

const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/appleIcon.svg";
const documentImage = "/assets/document.svg"
const indeedIcon = "/assets/linkedin-icon.svg";
const facebookIcon = "/assets/fb-icon.svg";
const instagramIcon = "/assets/instagram-logo.svg";
const twitterIcon = "/assets/X.svg";
const mobCloseIcon = "/assets/mobCloseIcon.svg";
const tickImg = "/assets/icons/round-pink-tick.svg"
const downloadIcon = "/assets/google_play.svg"

const ThankYouTwo = ({
    title = "",
    downloadBrochure = "",
    image = "",
    closeNavigate = "",
    appCategory = "",
    successTxt = "",
    subSuccessTxt = "",
    titleClassName = "",
    Brochure = '/assets/dowloadBrochure/HealthSy Partnered Doctor Network Programme Brochure.pdf',
    iMac = false,
    appDownload = false
}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const { linkedin = "#",
        facebook = "#",
        instagram = "#",
        twitter = "#" } = socialMediaLinks

    const router = useRouter();
    const { id } = router.query;

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
        if (router.pathname === "/for-doctors/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}doctor-registration/click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        } else if (router.pathname === "/for-retail-pharmacies/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}pharmacy-registration/click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        } else if (router.pathname === "/for-home-healthcare-service-providers/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}healthcare-registration/click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        } else if (router.pathname === "/for-insta-doc/thank-you") {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_API_URL}insta-doc-registration/click-count/${id}`,
                    { type }
                );
            } catch (error) {
                console.error('Error while tracking click:', error);
            }
        }
    };

    return (
        <>
            <div className={`text-center doctorFormThankyou`}>
                <div className="succussRegistration">
                    <div className="mobContent d-flex">
                        <Image
                            src={mobCloseIcon}
                            width="32"
                            height="32"
                            className="doctorAdsStep"
                            onClick={() => router.push(closeNavigate)}
                        />
                    </div>
                    <Image src={tickImg} width="130" height="130" className="healthsySucessLogo" />
                    <div className={`${titleClassName} fs35m22fwb`}>{successTxt}</div>
                    <div className="fs16m15 subSucessTxt">{subSuccessTxt} </div>
                    <Image src={image} alt="SuccessImg" width='453' height='412' className="sucessImage" />
                </div>
                <div className="container">
                    <div className="healthsyThankYouTwo fs16fw500">{title}</div>
                    {!appDownload ? <>
                        <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank">
                            <button className="healthSyDownloadBtn" onClick={() => handleClick("android")}>
                                <span className="fs16fwb">Google Play</span>
                                <Image src={logo_google_playstore_outline} width={15} height={16} className="healthSyPlayStore" alt='Play store' />
                            </button>
                        </Link>
                        {iMac && <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank">
                            <button className="healthSyDownloadBtn healthSyAppleStore" onClick={() => handleClick("ios")}>
                                <span className="fs16fwb">App Store</span>
                                <Image src={logo_app_playstore_outline} width={16} height={16} className="healthSyPlayStore" alt='apple store' />
                            </button>
                        </Link>}
                    </>
                        : <Link href={"https://healthsy.app/assets/apk/instadoc.apk"} target="_blank">
                            <button className="appDownloadBtn bg-primary text-white fs16fwb" onClick={() => handleClick("android")}>
                                Download the app
                                <Image src={downloadIcon} width={15} height={16} className="healthSyPlayStore" alt='Play store' />
                            </button>
                        </Link>}
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
        </>
    )
}

export default ThankYouTwo;