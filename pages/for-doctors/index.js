import { useEffect, useState } from "react";
import axios from "axios";

import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import FormLandingBanner from "../../src/components/Common/formLandingBanner";
import FormLandingAdvantages from "../../src/components/Common/formLandingAdvantages";
import FormLandingSteps from "../../src/components/Common/formLandingSteps";
import FormLandingOnboard from "../../src/components/Common/formLandingOnboard";
import HighlightsDoctorApp from "../../src/components/PartneredDoctors/highlights";
import CtaBannerModel from "../../src/components/Common/ctaBannerModel";
import CTAMobileFooter from "../../src/components/Common/ctaMobileFooter";
import CTACard from "../../src/components/Common/ctaCard";
import SuccessModal from "../../src/components/Common/ctaSuccessModal";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";

const forDoctorBanner = "/assets/forDoctor/for_doctor_banner.webp";
const forDoctorBannerMob = "/assets/forDoctor/for_doctor_banner_mobile.webp";

const easyCancell = "/assets/alarm.svg";
const pay = "/assets/rupee.svg";
const grow = "/assets/icons/grow.svg";
const laptop = "/assets/icons/laptop.svg";
const notepad = "/assets/icons/notepad.svg";
const doctorQR = "/assets/qrCode/doctor-banner-qr.png";
const doctorDedicatedApp = "/assets/icons/doctors_dedicated_app.svg";

const advantageArr = [
    {
        image: notepad,
        imgWidth: 44,
        imgHeight: 44,
        title: "Simple & Hassle Free",
        desc: "The registration and onboarding process is simple and hassle free."
    },
    {
        image: doctorDedicatedApp,
        imgWidth: 44,
        imgHeight: 44,
        title: "Dedicated App",
        desc: "Best app for doctors available on App Store and Play Store."
    },
    {
        image: pay,
        imgWidth: 44,
        imgHeight: 44,
        title: "Timely Payments",
        desc: "Get your settlements within 2 working days without any delay."
    },
    {
        image: easyCancell,
        imgWidth: 44,
        imgHeight: 44,
        title: "Manage Appointments",
        desc: "Manage your both online and In-Clinic practice on HealthSy."
    },
    {
        image: laptop,
        imgWidth: 44,
        imgHeight: 44,
        title: "Start your Digital Journey",
        desc: "Start your digital journey with us effectively at no cost."
    },
    {
        image: grow,
        imgWidth: 44,
        imgHeight: 44,
        title: "Grow with Us",
        desc: "Expand your service and track your growth with HealthSy."
    }
]

const PartneredDoctorsPage = ({ setDownloadModal }) => {
    const [ctaModal, setCTAModal] = useState(null);
    const [showCTAcard, setShowCTAcard] = useState(true);
    const [ctaPopupModal, setCtaPopupModal] = useState(false);
    const [successPopupModal, setSuccessPopupModal] = useState(false);

    const isDesktop = useIsDesktop()

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}cta-banner/ctabannerlist`, { category: "doctors" })
            .then((response) => {
                setCTAModal(response?.data?.rows?.filter((val) => val?.active));
            });
    }, [])
    return (<>
        <FormPageHeader />
        <FormLandingBanner
            breadcrumbText="For Doctors"
            title={<>Manage both Online and In-clinic Practices with <span> HealthSy </span></>}
            describtion="Are you looking to provide your valuable services beyond your geographical location ? Get on-board HealthSy now and provide your services to thousands more"
            scanText="Scan the QR code to download the 'HealthSy - Doctors App'"
            bannerImage={isDesktop ? forDoctorBanner : forDoctorBannerMob}
            bannerImageAlt="Doctor Banner"
            getStartedLink="#register-for-doctors"
            QRcodeImg={doctorQR}
        />
        <FormLandingAdvantages
            title={<>Advantages of HealthSy</>}
            desc={<><span className="primaryColor">“Partnered Doctor Network Programme”</span></>}
            advantageArr={advantageArr}
        />
        <FormLandingSteps
            getStartedLink="register-for-doctors"
            registerLink="for-doctors/register-your-interest" />
        <HighlightsDoctorApp />
        <FormLandingOnboard
            title="Get ‘HealthSy - Doctors’ App now"
            desc="Manage your profession seamlessly on the go!"
            mobTitle="Get ‘HealthSy - Doctors’ App now"
            mobDesc="Make us your trusted healthcare partner for your daily healthcare needs !"
            getStartedLink="#register-for-doctors"
            pageName="for-doctors"
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
                ctxBannerText="Connect with your relationship manager to know more"
                setCtaPopupModal={setCtaPopupModal}
                setShowCTAcard=
                {setShowCTAcard}
            />)}
        {ctaPopupModal && (
            <CtaBannerModel
                successModal={ctaPopupModal}
                setSuccessModal={setCtaPopupModal}
                specialisation={true}
                setSuccessPopupModal={setSuccessPopupModal}
                category="doctors"
            />)}
        {successPopupModal && <SuccessModal successModal={successPopupModal} setSuccessModal={setSuccessPopupModal} />}
    </>
    )
}

export default PartneredDoctorsPage