import { useEffect, useState } from "react";
import axios from "axios";
import FormLandingBanner from "../../src/components/Common/formLandingBanner";
import FormLandingAdvantages from "../../src/components/Common/formLandingAdvantages";
import FormLandingSteps from "../../src/components/Common/formLandingSteps";
import FormLandingOnboard from "../../src/components/Common/formLandingOnboard";
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import HighlightsPharmacy from "../../src/components/SellwithUs/highlightsPharmacy";
import CTACard from "../../src/components/Common/ctaCard";
import SuccessModal from "../../src/components/Common/ctaSuccessModal";
import CtaBannerModel from "../../src/components/Common/ctaBannerModel";
import CTAMobileFooter from "../../src/components/Common/ctaMobileFooter";

const retailPharmacyBanner = "/assets/retail_pharmacy_banner.webp";
const pay = "/assets/rupee.svg";
const grow = "/assets/icons/grow.svg";
// const tablet = "/assets/tablet.svg";
const notepad = "/assets/icons/notepad.svg";
const logout = "/assets/icons/logout.svg";
const speaker = "/assets/icons/speaker.svg";
const pharmaciesQR = "/assets/qrCode/pharmacy-banner-qr.png";
const pharmacyDedicatedApp = "/assets/icons/pharmacy_dedicated_app.svg";

const advantageArr = [
    {
        image: notepad,
        imgWidth: 44,
        imgHeight: 44,
        title: "Simple and Hassle Free",
        desc: "The registration and onboarding process is simple and hassle free."
    },
    {
        image: pharmacyDedicatedApp,
        imgWidth: 44,
        imgHeight: 44,
        title: "Dedicated App",
        desc: "Medicine delivery app for Partnered Pharmacies on play store."
    },
    {
        image: pay,
        imgWidth: 44,
        imgHeight: 44,
        title: "Timely Payments",
        desc: "Settlements within 7 working days without any delay."
    },
    {
        image: speaker,
        imgWidth: 44,
        imgHeight: 44,
        title: "All Time Access",
        desc: "Access to our existing customers, branding and marketing activities."
    },
    {
        image: grow,
        imgWidth: 44,
        imgHeight: 44,
        title: "Grow with Us",
        desc: "HealthSy helps you to expand and track your business performance."
    },
    {
        image: logout,
        imgWidth: 44,
        imgHeight: 44,
        title: "Simple Exit policy",
        desc: "HealthSy has a very simple and hassle-free exit policy."
    }
]


const SellwithUsPage = ({ setDownloadModal }) => {
    const [ctaModal, setCTAModal] = useState(null);
    const [showCTAcard, setShowCTAcard] = useState(true);
    const [ctaPopupModal, setCtaPopupModal] = useState(false);
    const [successPopupModal, setSuccessPopupModal] = useState(false);

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}cta-banner/ctabannerlist`, { category: "retail-pharmacies" })
            .then((response) => {
                setCTAModal(response?.data?.rows?.filter((val) => val?.active));
            });
    }, [])
    return (
        <>
            <FormPageHeader />
            <FormLandingBanner
                breadcrumbText="For Retail Pharmacies"
                title={"Are you a Pharmacy Business Looking to Increase your Sales?"}
                describtion="Then partner with us now and start selling to thousands more…"
                scanText="Scan the QR code to download the ‘HealthSy for Pharmacies’ App"
                bannerImage={retailPharmacyBanner}
                bannerImageAlt="Retail PharmacyBanner"
                getStartedLink="#register-for-pharmacy"
                bannerName="pharmacyLandingBanner"
                QRcodeImg={pharmaciesQR}
            />
            <FormLandingAdvantages
                title={<>Advantages of HealthSy</>}
                desc={<><span className="primaryColor">“Partnered Pharmacies Network Programme”</span></>}
                advantageArr={advantageArr}
            />
            <FormLandingSteps
                getStartedLink="register-for-pharmacy"
                registerLink="for-retail-pharmacies/register-your-interest" />
            <HighlightsPharmacy />
            <FormLandingOnboard
                title="Get ‘HealthSy for Pharmacies’ App now"
                desc="Manage and grow your business on the app!"
                mobTitle="Get ‘HealthSy for Pharmacies’ App now "
                mobDesc="Manage your profession effectively and efficiently!"
                getStartedLink="#register-for-pharmacy"
                pageName="for-retail-pharmacies"
                onClickDownload={setDownloadModal}
            />
            {showCTAcard && ctaModal?.length && ctaModal[0]?.bannerImage ? (
                <CTACard
                    setShowCTAcard={setShowCTAcard}
                    setCtaPopupModal={setCtaPopupModal}
                    ctaModal={ctaModal}
                />) : null}
            {showCTAcard && (
                <CTAMobileFooter
                    ctxBannerText="Connect with your relationship manager to know more"
                    setCtaPopupModal={setCtaPopupModal}
                    setShowCTAcard=
                    {setShowCTAcard}
                />)}
            {ctaPopupModal && (
                <CtaBannerModel
                    successModal={ctaPopupModal}
                    setSuccessModal={setCtaPopupModal}
                    setSuccessPopupModal={setSuccessPopupModal}
                    uniqueField="pharmacy_name"
                    category="retail-pharmacies"

                />)}
            {successPopupModal && <SuccessModal successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} />}
        </>
    )
}

export default SellwithUsPage