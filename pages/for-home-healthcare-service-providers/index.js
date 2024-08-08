import { useEffect, useState } from "react";
import axios from "axios";

import FormLandingAdvantages from "../../src/components/Common/formLandingAdvantages";
import FormLandingBanner from "../../src/components/Common/formLandingBanner";
import FormLandingOnboard from "../../src/components/Common/formLandingOnboard";
import FormLandingSteps from "../../src/components/Common/formLandingSteps";
import HighlightHomeHealthcare from "../../src/components/HealthCare/highlightHomeHealthcare";
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import CtaBannerModel from "../../src/components/Common/ctaBannerModel";
import SuccessModal from "../../src/components/Common/ctaSuccessModal";
import CTAMobileFooter from "../../src/components/Common/ctaMobileFooter";
import CTACard from "../../src/components/Common/ctaCard";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";

const homeHealthcareBanner = "/assets/home-healthcare-banner.webp";
const homeHealthcareBannerMob = "/assets/mobile-home-healthcare-banner.webp";
const pay = "/assets/rupee.svg";
const grow = "/assets/icons/grow.svg";
const notepad = "/assets/icons/notepad.svg";
const menusymbol = "/assets/menu.svg"

const shieldplus = "/assets/shieldplus.svg";
const verified = "/assets/Vector2.svg";
const HHSPQR = "/assets/qrCode/hhsp-banner-qr.png";
const doctorsDedicatedApp = "/assets/icons/doctors_dedicated_app.svg";

const advantageArr = [
    {
        image: notepad,
        imgWidth: 44,
        imgHeight: 44,
        title: "Simple and Hassle Free",
        desc: "The registration and onboarding process is simple & hassle free."
    },
    {
        image: doctorsDedicatedApp,
        imgWidth: 44,
        imgHeight: 44,
        title: "Dedicated App",
        desc: "Healthcare App for Partnered HHSP on App Store & Play Store."
    },
    {
        image: pay,
        imgWidth: 44,
        imgHeight: 44,
        title: "Timely Payments",
        desc: "Settlements within 3 working days without any delay."
    },
    {
        image: menusymbol,
        imgWidth: 44,
        imgHeight: 44,
        title: "More Service Categories",
        desc: "6+ Home healthcare service categories on HealthSy."
    },
    {
        image: verified,
        imgWidth: 44,
        imgHeight: 44,
        title: "100% Safe",
        desc: "HealthSy is 100% safe and secured platform."
    },
    {
        image: grow,
        imgWidth: 44,
        imgHeight: 44,
        title: "Grow with Us",
        desc: "Extend your services and track your growth using HealthSy."
    },
]

const HealthCarePage = ({ setDownloadModal }) => {
    const [ctaModal, setCTAModal] = useState(null);
    const [showCTAcard, setShowCTAcard] = useState(true);
    const [ctaPopupModal, setCtaPopupModal] = useState(false);
    const [successPopupModal, setSuccessPopupModal] = useState(false);

    const isDesktop = useIsDesktop()

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}cta-banner/ctabannerlist`, { category: "home-healthcare-service-providers" })
            .then((response) => {
                setCTAModal(response?.data?.rows?.filter((val) => val?.active));
            });
    }, [])

    return (
        <>
            <FormPageHeader />
            <FormLandingBanner
                breadcrumbText="For Home Healthcare Service Providers"
                title={"Are you a Professional Healthcare Service Provider ?"}
                describtion="Then get on-board HealthSy to start your digital journey today !"
                scanText="Scan the QR code to download the ‘HealthSy for HHSP’ App "
                bannerImage={isDesktop ? homeHealthcareBanner : homeHealthcareBannerMob}
                bannerImageAlt="Home Healthcare Banner"
                getStartedLink="#register-for-home-healthcare"
                bannerName="homeHealthcareLandingBanner"
                QRcodeImg={HHSPQR}
            />
            <FormLandingAdvantages
                title={<>Advantages of HealthSy<span className="primaryColor"></span></>}
                desc={<><span className="primaryColor">“Partnered <h2 className="fs36m24fwb d-inline">Home Healthcare</h2> Service Providers Network Programme”</span></>}
                advantageArr={advantageArr}
            />
            <FormLandingSteps
                getStartedLink="register-for-home-healthcare"
                registerLink="for-home-healthcare-service-providers/register-your-interest"
            />
            <HighlightHomeHealthcare />
            <FormLandingOnboard
                title="Get ‘HealthSy for HHSP’ App now"
                desc="Manage your profession effectively and efficiently!"
                mobTitle="Get ‘HealthSy for HHSP’ App now"
                mobDesc="Manage and grow your business on the app!"
                pageName="for-home-healthcare-service-providers"
                getStartedLink="#register-for-home-healthcare"
                onClickDownload={setDownloadModal}
            />
            {showCTAcard && ctaModal?.length && ctaModal[0]?.bannerImage ? (
                <CTACard
                    setShowCTAcard={setShowCTAcard}
                    setCtaPopupModal={setCtaPopupModal}
                    ctaModal={ctaModal}
                />)
                : null
            }
            {showCTAcard && (
                <CTAMobileFooter
                    ctxBannerText="Connect with your relationship buddy to know more"
                    setCtaPopupModal={setCtaPopupModal}
                    setShowCTAcard=
                    {setShowCTAcard}
                />)}
            {ctaPopupModal && (
                <CtaBannerModel
                    successModal={ctaPopupModal}
                    setSuccessModal={setCtaPopupModal}
                    setSuccessPopupModal={setSuccessPopupModal}
                    uniqueField="service_category"
                    category="home-healthcare-service-providers"

                />)}
            {successPopupModal && <SuccessModal successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} />}
        </>
    )
}

export default HealthCarePage