import axios from "axios"
// import Image from "next/image"
import { Image } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const healthsyLogo = "/assets/healthsy-logo.png";
const thankYouImage = "/assets/icons/mobileThankYou.gif";
const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/appleIcon.svg";
const documentImage = "/assets/document.svg";
const indeedIcon = "/assets/linkedin-icon.svg";
const facebookIcon = "/assets/fb-icon.svg";
const instagramIcon = "/assets/instagram-logo.svg";
const twitterIcon = "/assets/X.svg";

const MobileThankYou = ({
    appCategory = "",
    Brochure = "",
    downloadBrochure = ""
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
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}rating-form/click-count/${id}`,
                { type }
            );
        } catch (error) {
            console.error('Error while tracking click:', error);
        }
    };

    return (
        <div className="rpQrThankYou text-center">
            <Image src={healthsyLogo} width={156} height={43} className="" />
            <div>
                <Image src={thankYouImage} width={95} height={95} className="RpQrRatingFormImg" />
            </div>
            <div className="fs24fw800 rpQrFeedback">Thank you for your
                <br /> feedback!</div>
            <div className="fs14fw500 rpQrDownloadApp">Download ‘HealthSy App’</div>
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
            <div className="rpQrOption">or</div>
            <div>
                <Image src={documentImage} width={24} height={24}></Image>
                <a href={Brochure} download onClick={() => { handleClick("brochure"); }}>
                    <button className="downloadBrochure fs16fwb">{downloadBrochure}</button>
                </a>
            </div>
            <div className="rpQrAdPage">
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
    )
}

export default MobileThankYou;